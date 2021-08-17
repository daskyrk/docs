# 主动监控自定义告警使用

目前由于主动监控内置告警，只可以进行请求状态码进行告警，此时如果还需要根据请求延时，请求次数等来进行告警，则可以使用自定义告警配合主动监控一起使用 ，下面是使用流程：

## 1、配置主动监控

以 redis 1s 慢请求为例：首先进入微服务治理平台-应用监控-主动监控页，添加主动监控

![添加主动监控图](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/0cb80da0-8653-43df-9893-9db68e7a4197.png)

## 2、配置完成之后可以查看主动监控详情

![主动监控详情](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/16caa3ef-fcd7-4794-ba8e-871fb7ff21af.png)

## 3、配置自定义告警规则

![自定义告警配置图](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/9ce28a6b-7fa9-41fc-9da4-8c07e0f23289.png)

### 字段规则配置

这时可以根据想要的规则来配置告警规则，如图：

![告警规则图](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/b8ef5a87-8590-458a-8ee9-89351c2133d6.png)

### 消息模板配置

![消息模板图](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/d510088f-9585-4637-930b-4203f8bb8fae.png)

## 4、告警策略配置

自定义告警配置完成之后，还需要配置告警策略，这时即可选择刚刚配置好的自定义告警规则，如图所示

![告警策略图1](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/2b31caf1-260b-481b-808e-3607fd8df021.png)

![告警策略图2](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/b6d8bd1a-f410-4a13-b5c9-983c984a4f56.png)

最后选择一个钉钉群组

![消息群组配置](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/2d428fbf-e7cd-412c-89f1-76e6656dbbfd.png)

在完成上述操作之后，在触发告警阈值时，监控系统将会根据自定义的消息模板，将告警消息通知到钉钉群组中