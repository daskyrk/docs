# 技术架构

平台提供的注册中心和配置中心，都是基于 [Nacos](https://nacos.io/en-us/) 实现的。对比使用 ZooKeeper 做注册中心，Apollo 做配置中心的方案，在中间件运维复杂度和资源利用率上有着巨大的优势。

平台还将 Nacos 的能力进行了 BaaS 化，可以实现多个项目的不同环境共用一套 Nacos，进一步提高资源利用率，同时业务开发无需关注底层租户隔离机制。

平台注册中心的功能主要包括：
- Dubbo 微服务框架注册发现
- Spring Cloud 微服务框架注册发现

平台配置中心的功能主要包括：
- Spring Cloud 配置热更新机制

# 架构示意

如图所示，两个不同项目的环境，可以在一个物理集群内共用一套 Nacos。

对于平台侧创建 Nacos 租户的流程，业务是无需感知的：

业务应用的 `erda.yml` 中通过 addon 扩展机制申明了注册中心或配置中心，就会跟随应用的部署，自动创建好租户，同时将租户 ID 以环境变量的方式自动注入应用服务的容器中。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/03/1d3e3e52-ae2b-402d-afa7-6c320e4440cf.jpeg)
