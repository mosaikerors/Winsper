# Kubernetes

## 搭建环境

1. 下载 kubespray offline 安装包（学校给的）

   ```bash
   cd ~
   mkdir kube-1.14.1
   cd kube-1.14.1
   curl -O 192.168.2.24/kube-1.14.1/kube-1.14.1.tar  # docker images
   curl -O 192.168.2.24/kube-1.14.1/kubespray-2.10.0.tar.gz  # ansible scripts
   mkdir releases
   cd releases
   curl -O 192.168.2.24/kube-1.14.1/releases/calicoctl
   curl -O 192.168.2.24/kube-1.14.1/releases/cni-plugins-amd64-v0.6.0.tgz
   curl -O 192.168.2.24/kube-1.14.1/releases/hyperkube
   curl -O 192.168.2.24/kube-1.14.1/releases/kubeadm
   ```

   （我不知道怎么用 curl 下载一个目录下所有文件，所以只能一个一个下载）

2. 解压 kubespray

   ```bash
   tar -xf kubespray-2.10.0.tar.gz
   ```

3. 配置 `hosts.ini`

   ```bash
   cd kubespray-2.10.0/inventory/local/
   vim host.ini
   ```

   配置 k8s 节点信息，即 master，slave 以及他们的 ip，配置好的 `hosts.ini` 如下：

   ```ini
   kube-master ansible_host=10.0.0.x ansible_ssh_user=root
   kube-slave-1 ansible_host=10.0.0.x ansible_ssh_user=root
   kube-slave-2 ansible_host=10.0.0.x ansible_ssh_user=root
   kube-slave-3 ansible_host=10.0.0.x ansible_ssh_user=root
   # 将上面ip中的x替换为实际的值
   
   [kube-master]
   kube-master
   
   [etcd]
   kube-slave-1
   kube-slave-2
   kube-slave-3
   
   [kube-node]
   kube-master
   kube-slave-1
   kube-slave-2
   kube-slave-3
   
   [k8s-cluster:children]
   kube-node
   kube-master
   ```

4. 准备生产环境

   首先将 master 中的一些文件分发给 3 台 slave：

   ```bash
   rsync -r kube-1.14.1/releases ${name}:/tmp/
   rsync kube-1.14.1/kube-1.14.1.tar ${name}:~/
   # repeat for other two slaves
   ```

   这里的 `${name}` 是 `ssh ${name}` 中用到的 slave 的快捷访问别名。

   然后对于每一个实例（master 和 3 个 slave），添加 `kubeadm` 执行权限并装载镜像：

   ```bash
   cp /tmp/releases/kubeadm /usr/local/bin/kubeadm
   # 如果master中的/tmp/releases不存在，使用下面这条命令
   # cp ~/kube-1.14.1/releases/kubeadm /usr/local/bin/kubeadm
   chmod +x /usr/local/bin/kubeadm
   docker load -i kube-1.14.1.tar
   # repeat for other three instances
   ```

5. 修改 `cluster.yml`

   在 `kubespray-2.10.0/cluster.yml` 中，注释掉 container-engine 和 download 的部分：

   ```yml
   - hosts: k8s-cluster:etcd:calico-rr
   any_errors_fatal: "{{ any_errors_fatal | default(true) }}"
   roles:
       - { role: kubespray-defaults}
       - { role: kubernetes/preinstall, tags: preinstall }
       # - { role: "container-engine", tags: "container-engine", when: deploy_container_engine|default(true) }
       # - { role: download, tags: download, when: "not skip_downloads" }
   environment: "{{proxy_env}}"
   ```

   （但是我也不知道这一步是为什么）

6. 安装 `ansible`

   ```bash
   cd kubespray-2.10.0
   pip install -r requirements.txt
   ```

7. 部署

   ```bash
   cd kubespray-2.10.0
   ansible-playbook -i inventory/local/hosts.ini --become --become-user=root cluster.yml
   ```

8. 不出问题的话这个时候 k8s 的环境就已经搭建起来了，可以通过 `kubectl get node` 命令获得所有节点信息以确认搭建成功。

## 在集群中操作

### get

`kubectl get ${resource}` 查看某类资源的简略信息

resource 可以是 `pod`, `deploy`, `svc`

添加 `-o wide` 选项已查看稍详细一点的信息

### describe

`kubectl describe ${resource}/${name}` 查看某个资源的详细信息

### create

`kubectl create -f ${filename}` 以 filename 文件为配置创建资源，一般是 .yml 文件

### set

`kubectl set image deploy/${name} ${image}=${newImage}` 用于更新 pod 版本

### delete 

`kubectl delete ${resource}/${name}` 删除某个资源

##### Last-modified date: 2019.7.21, 6 p.m.