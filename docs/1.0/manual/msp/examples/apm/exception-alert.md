# 服务异常告警和诊断

## 异常告警配置

如果想要在服务请求频繁产生异常时，触发告警，然后及时处理，即可使用 Erda 监控内置告警策略，Erda 为用户内置应用错误、应用事务等内置告警规则，开箱即用。

在微服务治理平台非常容易配置，配置方法：

### 1、进入微服务治理平台

![微服务治理平台菜单](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/16/a1ca253b-37f4-4c5e-ba65-79b037b85d67.png)

### 2、配置告警

![异常告警配置](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/16/1e769c1a-53c9-4a4c-aa0e-a7f43f7a78b3.png)

## 诊断

异常诊断的方式有很多种，那么如何借助 Erda 监控，更好进行诊断呢？

### 1、通过容器日志查看日志

![容器日志图](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/16/84afb504-6094-4288-9f55-46b51aacc75f.png)

### 2、通过错误分析页诊断异常

![错误分析图](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/16/a8b5bfd4-f029-4a28-bc10-705dacfda13a.png)

### 3、通过链路追踪查看调用链路

![链路追踪图](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/16/4d570cc4-274c-4893-b344-836b39629f89.png)