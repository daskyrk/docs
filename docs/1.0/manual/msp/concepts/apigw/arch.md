# 技术架构

API 网关是实现微服务架构的必要组件，平台提供的 API 网关基于 Openresty/Kong 实现，具备高并发低延时的特性；同时结合了 Kubernetes Ingress Controller，基于云原生的声明式配置方式，实现了丰富的 API 策略

核心功能包含微服务 API 管理和流量入口管理两部分：

- 微服务 API 管理，可以完成 API 的创建以及精细化的流量管控，可以针对每个 API 分析 QPS ，延时，流量数据等。
- 流量入口管理，可以快速创建一个域名，并将来自此域名的流量请求转发给相应的微服务 API ；可以针对域名 配置 QPS 限流，IP 拦截等安全策略

:::tip
Kong 的版本当前为 2.2.0，版本会持续 Follow 开源，有更稳定、安全的版本，就会进行升级
:::

## 架构示意

用户可以使用集群原生安装的 Kubernetes Ingress，结合 Kong 的能力实现对 API 网关功能的增强。因为 Kong 是以 Addon 扩展插件的方式存在，用户可以灵活选择域名流量是否要经过 Kong。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/9dc6289b-a310-49a9-86c7-a5d28795726f.png)
