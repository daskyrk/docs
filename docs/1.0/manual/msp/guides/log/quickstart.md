# 快速接入

日志分析服务能够收集应用的日志进行存储，并提供全文搜索和日志统计等功能

## 编辑 erda.yml 添加日志分析 addon

日志分析是以 addon 的形式提供的，因此需要编辑应用的erda.yml文件添加日志分析的 addon，并重建流水线进行部署

以可视化的方式添加日志分析 addon：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/04/e6168bd1-b616-4ba3-918f-128647811557.png)

以代码的方式添加日志分析 addon:

```yaml
version: 2.0
envs: {}
services:
  foobar:
...
...
addons:
  log-analytics:
    plan: "log-analytics:basic"
```

需要指出的是，每个需要与日志分析集成的应用都需要添加`log-analytics` addon，该应用的日志才会被日志分析服务收集

## 重建流水线执行部署

编辑并保存erda.yml之后，需要去重建应用对应分支的流水线，执行部署：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/04/bfd2b603-ad29-48b6-b18c-db97f810d12d.png)

流水线执行成功之后，会在所部署的集群中部署日志分析的必要组件，包括：

- **monitor-collector**: 用于接收`filebeat`采集的应用日志，写入 `kafka`
- **kafka**: 作为缓冲通道存储 `monitor-collector` 收集的日志，供 `log-exporter` 消费
- **zookeeper**: 给kafka使用  
- **log-exporter**: 读取kafka存储的日志，写入 `elaticsearch`
- **elasticsearch**: 存储并索引日志数据

## 进入日志分析模块查看数据

部署完成之后，应用容器的日志会被收集并写入到日志分析的 `elasticsearch` 中，我们可以通过进入 `微服务治理平台` 模块，选择对应项目和环境后，点击左侧 `日志分析` 菜单进行日志数据的查看和操作：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/05/cd34efff-ee81-48e1-8c73-8aad9df9bdc7.png)
