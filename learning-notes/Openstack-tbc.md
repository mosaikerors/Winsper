# Openstack

## 搭建环境

### 创建实例

1个 master，3个 slave，内存分配为 8, 4, 4, 4 。

#### 创建 master

1. 实例 -> 创建实例

2. 详情 -> 实例名称：master

3. 源 -> 选择源 -> 镜像 -> 选择 CentOS 镜像

4. 实例类型 -> 选择 8G 内存

5. 密钥对 -> 导入密钥对 -> 填写密钥对名称和公钥

   这里的公钥是用来**通过自己的电脑访问到 master 服务器**的，执行以下命令获取到公钥：

   ```bash
   # for windows
   C:
   cd Users/${your username}/.ssh
   cat id_rsa.pub
   
   # for linux
   cd ~/.ssh
   cat id_rsa.pub
   ```

   将打印出的公钥复制过去就可以了。

   如果没有 `id_rsa.pub` 文件，可以参考[这篇教程](<https://www.cnblogs.com/chuyanfenfei/p/8035067.html>)创建。

   实例创建完成。

6. 绑定浮动 ip

7. 进入 master：`ssh centos@202.120.40.8 -p30xx0`  xx 为浮动 ip 的最后两位

8. 执行以下命令获取 root 权限：

   ```bash
   sudo su
   cd ~/.ssh
   vi authorized_keys  # attention: vi here, not vim
   删除 ssh-rsa 前面的部分
   ```

   之后可以通过 `ssh root@202.120.40.8 -p30xx0` 进入 master

9. 参考[这篇教程](<https://www.cnblogs.com/chuyanfenfei/p/8035067.html>)创建 `id_rsa.pub` 文件。

10. 执行以下命令预装一些软件：

    ```bash
    curl -O https://raw.githubusercontent.com/linxuyalun/oh-my-os/master/preconfig-of-	centos7.sh   # 下载预装脚本
    chmod +x preconfig-of-centos7.sh  # 加可执行权限
    ./preconfig-of-centos7.sh  # 执行脚本
    ```

11. 获得了一台 CentOS 机器 ✔

#### 创建 slave

1. 实例 -> 创建实例

2. 详情 -> 实例名称：slave-x ( x in {1, 2, 3} )

3. 源 -> 选择源 -> 镜像 -> 选择 CentOS 镜像

4. 实例类型 -> 选择 4G 内存

5. 创建**第一个** slave 时

   密钥对 -> 导入密钥对 -> 填写密钥对名称和公钥

   这里的公钥是用来**通过 master 服务器访问到 slave 服务器**的，执行以下命令获取到公钥：

   ```bash
   # in master machine
   cd ~/.ssh
   cat id_rsa.pub
   ```

   将打印出的公钥复制过去就可以了。

   之后再创建 slave 时，可以直接使用创建好的**用于连接 master 和 slave 的**密钥对。

6. **在 master 中** `ssh centos@ip` ip 为 slave 的内网 ip （10.0.0. 开头）  

7. 执行以下命令获取 root 权限：

   ```bash
   sudo su
   cd ~/.ssh
   vi authorized_keys  # attention: vi here, not vim
   删除 ssh-rsa 前面的部分
   ```

   之后可以**在 master 中**通过 `ssh root@10.0.0.x` 进入 slave

8. 执行以下命令预装一些软件：

   ```bash
   curl -O https://raw.githubusercontent.com/linxuyalun/oh-my-os/master/preconfig-of-	centos7.sh   # 下载预装脚本
   chmod +x preconfig-of-centos7.sh  # 加可执行权限
   ./preconfig-of-centos7.sh  # 执行脚本
   ```

9. 获得了一台 CentOS 机器 ✔

### 连接实例

现在只有一台机器可以用 `ssh root@202.120.40.8 -p30xx0` 连接到 master，要让更多机器可以访问 master，执行以下步骤：

1. 依照*创建 master 的第 5 步*获取到自己机器的公钥。

2. 通过已连接到 master 的机器访问 master，执行以下命令以让更多机器可以访问 master：

   ``` bash
   cd ~/.ssh
   vim authorized_keys
   将第一步获取到的公钥复制到文件末尾
   ```

3. 可访问 master 的机器数量 +1 ✔

### Troubleshooting

+ 连接过一台 master 之后删了 master 又新建 master 发现连不上去了
  + 原因：连接其他机器会在本机 `.ssh` 目录下的 `known_hosts` 文件保存该机器所在的 ip 和端口的信息，当这个 ip 和端口变成其他机器时会发生访问错误。
  + 解决办法：将 `.ssh` 目录下的 `known_hosts` 文件中和该 ip，端口有关的信息删掉，重新连接。

##### Last-modified date: 2019.7.12, 2 p.m.