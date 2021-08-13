# 配置自定义服务大盘
当平台上已有的图表无法满足我们的需求时，可以配置自定义图表，下面来举几个例子。

## 多实例指标对比
比如多个实例的内存对比图，一个服务可能会有多个实例，如果我们想在一个图表上对比他们的使用情况，则可以按 **服务IP** 进行分组来查看每个实例的内存，配置如下：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/13/69248e0e-f910-4e43-a6d2-30fceab411a1.jpg)

这里我们选择了 **堆内存已使用** 值，为了让图表知道这个值是容量单位，需要进行如下配置：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/13/80310b64-1863-4bb6-b601-48874bb2b8e9.jpg)

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/13/f7062bdd-f773-402b-89a9-216dfea7ac57.jpg)

## 展示自定义指标
我们可以通过 SDK 自定义指标，这些指标在 平台上没有对应的图表显示，我们可以通过自定义图表来展示他们：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/13/94d62806-f0d9-420d-a795-1bbcb887304b.jpg)

## 日志指标展示
通过配置的 **日志规则** 解析出来的指标，我们也可以通过大盘展示，具体例子查看 [用日志配置业务大盘](../log/log-dashboard.md)