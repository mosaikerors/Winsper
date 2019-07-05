# Prometheus Tutorial

## 1. 简介

- 目的：使用Prometheus+Grafana对运行中的Spring程序进行监控
- Prometheus：一个根据应用的metrics来进行监控的开源工具
- Grafana：使用Grafana监控很高大上，提供了很多可视化的图标

## 2. 配置

1. 参考文章  
**注:** 由于Spring的部分组件更新，两篇文献需要对比起来看
- [SpringBoot使用prometheus监控](https://blog.csdn.net/qq_33257527/article/details/88294016)
- [Prometheus实现Spring cloud应用监控](https://www.jianshu.com/p/9ec4f5f63932)

2. 配置步骤
   1. 修改springboot程序
      1. 添加依赖
      2. 修改启动程序如下
      3. 配置application.properities文件(即yml文件)
      4. 访问[http://localhost:8080/actuator/prometheus](http://localhost:8080/actuator/prometheus)可以看见正常监控
   2. 配置Prometheus
      1. [下载](https://prometheus.io/download/)
      2. 修改prometheus.yml文件，此改为如下代码
      3. 启动prometheus程序
      4. 访问[localhost:9090](localhost:9090)可以看见监控情况
   3. 配置Grafana
      1. [下载](http://docs.grafana.org/installation/windows/)
      2. 在安装包中启动程序
      3. 浏览器输入[localhost:3000](localhost:3000),用户名与密码均为admin
      4. 配置数据源
      5. 加载graph
      6. 加载dashboard
```
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
    <version>1.1.3</version>
</dependency>
```
```JAVA
package hello;

import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.autoconfigure.metrics.MeterRegistryCustomizer;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
    @Bean
    MeterRegistryCustomizer<MeterRegistry> configurer(
            @Value("${spring.application.name}") String applicationName) {
        return (registry) -> registry.config().commonTags("application", applicationName);
    }
}

```
```
spring.application.name=springboot_prometheus
management.endpoints.web.exposure.include=*
management.metrics.tags.application=${spring.application.name}
```
```
# my global config
global:
  scrape_interval:     15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

# Alertmanager configuration
alerting:
  alertmanagers:
  - static_configs:
    - targets:
      # - alertmanager:9093

# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  - job_name: 'prometheus'
    static_configs:
    - targets: ['127.0.0.1:9090']
###以下内容为SpringBoot应用配置
  - job_name: 'springboot_prometheus'
    scrape_interval: 5s
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets: ['127.0.0.1:8080']
```
      


