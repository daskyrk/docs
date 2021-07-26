# 全局拓扑

Erda 微服务平台能够自动发现服务的上下游依赖关系，根据生成的服务拓扑大图，可以帮助你发现服务的性能瓶颈或者系统的错误热点。在服务拓扑图上的每个节点表示服务组件或服务的依赖项，并且在节点上标注服务的运行状态和请求信息，可以点击节点获取更详细的观测图表。

## API 网关
API 网关节点，如果你的流量是基于微服务平台中的 API 网关转发，会显示该节点。点击 API 网关节点时，右侧的观测图表会切换到网关的域名请求、整体请求QPS和响应时间。  

![API 网关节点](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/26/6fd21632-b731-4a06-952d-41ceefe99843.png)

## 应用服务
平台能够自动识别 HTTP 和 RPC 请求，并标注为服务节点。在每个业务服务的节点上展示服务的运行实例、所选时间段内的已停止实例和请求错误率等状态数据，点击服务节点时，观测图表会切换到服务的状态概览、事务分析等数据，点击详情可以跳转到[服务分析](./service-analysis.md)页面。  

![服务节点](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/26/7f2901d5-ec9d-4d95-9e23-b30c1574ca59.png)

## 中间件
平台能够自动识别服务调用的中间件，并标注为中间件节点，当前支持 MySQL、Redis、RocketMQ、ElasticSearch 等。

![中间件节点](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/26/2da450d7-2728-47f9-bcff-c08a7b15b0a8.png)

## 外部请求调用
平台能够自动识别服务调用的外部 HTTP 请求，并标注为外部事务节点，点击节点会切换到外部请求的 QPS 和吞吐量等观测数据。

![外部事务节点](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/26/d6bdcbcc-5aae-46d2-bf6c-6f0aa70d54f9.png)