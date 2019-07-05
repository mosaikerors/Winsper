# JMeter Tutorial

## 1. [JMeter简介](https://baike.baidu.com/item/Jmeter/3104456?fr=aladdin)
- Apache JMeter是Apache组织开发的基于Java的压力测试工具。
- 用于对软件做压力测试，它最初被设计用于Web应用测试，但后来扩展到其他测试领域。
  - 它可以用于测试静态和动态资源，例如静态文件、Java 小服务程序、CGI 脚本、Java 对象、数据库、FTP 服务器。
  - JMeter 可以用于对服务器、网络或对象模拟巨大的负载，来自不同压力类别下测试它们的强度和分析整体性能。
  - JMeter能够对应用程序做功能/回归测试，通过创建带有断言的脚本来验证你的程序返回了你期望的结果。

## 2. <span id="1">[JMeter性能测试，完整入门篇](https://blog.csdn.net/lovesoo/article/details/78579547)(最简单的入门基本功)</span>

- 功能：一款纯java编写负载功能测试和性能测试开源工具软件
- [安装](http://jmeter.apache.org/download_jmeter.cgi)下载Binary版本
- 常用功能：
  - 添加线程组（线程数，持续时间，循环次数）
  - 添加HTTP请求（网址，接口，参数）
  - 添加查看结果树（结果：请求成功与否，返回内容）
  - 添加用户自定义变量
  - 添加断言（返回内容包含，匹配等等）
  - 查看断言结果
  - 添加聚合报告（查看结果）

## 3. [JMeter入门教程- Jmeter教程及技巧汇总](https://www.hissummer.com/jmeter-summary.html)

**注:** 只选取了部分有意义的内容，该网址对应内容版本较老！！！具体内容有待完善！！！

1. [创建简单的web测试(同1)](#1)
2. [添加响应断言](https://www.hissummer.com/tutorials/149-jmeter-.html)
   - 对每次请求测试的返回作校验
3. [设置集合点](https://www.hissummer.com/loadtesting-jmeter/272-jmeter.html)
   - 集合点：为了更真实的实现并发这感念，我们可以在需要压力的地方设置集合点
4. [参数关联化](https://www.hissummer.com/loadtesting-jmeter/276-jmeter-.html)
   - 示例场景：脚本中有登录操作，需要输入用户名和密码，假如系统不允许相同的用户名和密码同时登录，或者想更好的模拟多个用户来登录系统。这个时候就需要对用户名和密码进行参数化，使每个虚拟用户都使用不同的用户名和密码进行访问。
5. [聚合报告](https://www.hissummer.com/loadtesting-jmeter/262-jmeter.html)


