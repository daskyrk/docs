# 服务分析
:::tip

名词解释

* Apdex 指数：Application Performance Index，性能指数，[WIKI](https://en.wikipedia.org/wiki/Apdex)。
* cpm：count per minute，每分钟次数。
* PV：page view，页面浏览量。

:::


## 服务概览

服务概览展示了 Server 应用实例列表和性能总览。

* 接口吞吐量：展示了选择时间内各个事务 (HTTP、RPC、DB 等 ) 的总吞吐量趋势。
* 响应时间：展示了选择时间内各个事务 (HTTP、RPC、DB 等 ) 的平均响应时间趋势。
* Http 状态：展示了选择时间内 HTTP 事务中各种状态次数的趋势。

![服务实例列表](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/26/92228a56-2ea5-4c3b-847f-8189ae572fdf.png)
![性能总览](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/26/127ea30d-a2dd-4f02-bf4d-b948db6e939f.png)

## 事务分析

事务分析展示了 Server 应用的事务详情，包括HTTP事务、RPC事务、缓存和数据库事务。

* WEB 事务明细：平均响应时间、响应时间占比、吞吐量分别展示了每个事务接口在选择时间内的平均响应时间、每个接口占用总体调用时间的百分比，与每个接口的每分钟调用次数。
* 响应时间：展示了选择时间内平均响应时间的事务接口与趋势。
* 吞吐量 ：展示了选择时间内每分钟被请求的事务接口与趋势。
* HTTP 错误：展示了选择时间内 HTTP 请求中状态大于 400 的数量趋势。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/26/cc880b81-fc1a-4f4c-8407-1faaa668b7e8.png)

* 慢事务追踪 Top10：展示了选择时间内响应时间超过 300 ms 并且排列前十的事务接口的发生次数与平均响应时间等信息，展开后可以看到采样的请求对应的日志和链路。
* 异常事务追踪 Top10：展示了选择时间内发生异常并且排列前十的事务接口的发生次数与平均响应时间等信息，展开后可以看到采样的请求对应的日志和链路。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/26/8ba86b62-d4b1-40bc-b3c4-39325df71a1d.png)


## 进程分析

进程分析展示了应用中的各个模块的容器状态和 JVM 状态，并默认显示第一个模块，如果一个应用部署了多个实例，则默认显示第一个模块的第一个实例。可以切换模块名/实例名。

* Heap memory usage：JVM 堆内存使用情况。
* Non Heap memory usage：JVM 非堆内存使用情况。
* PS-Eden-Space，PS-Old-Gen，PS-Survivor-Space：分别表示 jvm 堆内存中伊甸园，老年代区，幸存者区。
* GC 次数，GC 平均时间：分别表示 JVM GC 的次数和平均时间。
* Class count：展示JVM从启动开始加载和卸载的类的个数。
* Thread：JVM加载线程。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/26/672f6f1d-8e65-432c-aaea-18626affae92.png)
