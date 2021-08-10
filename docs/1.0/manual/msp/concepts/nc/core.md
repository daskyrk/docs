# 核心概念

## 租户

在 Nacos 中有 Namespace 的概念，不同 Namespace 之间的服务注册发现和配置管理都是隔离的。

在 Nacos 的原生控制台中，可以看到对应的 Namespace 列表

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/03/09f3b127-491b-4e55-8076-79952c168f9c.png)

如下图选择对应的 Namespace，可以看租户下具体的服务注册列表

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/03/dc766e9c-ff9c-47fe-866e-280d04bfc5aa.png)

在 Erda 的注册中心和配置中心控制台，租户是自动和所属的项目环境关联的，因此用户无需选择指定的 Nacos Namespace 即可查看项目环境下的服务注册列表等信息。

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/03/ec7e5fe2-c78b-4cba-85c8-782cb91f50a8.png)

在微服务的组件信息中，可以找到和 Nacos 的 NamespaceId 对应的服务参数（即自动注入的环境变量）

注册中心对应的服务参数为`NACOS_TENANT_ID`

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/03/6daf8e39-a1f8-4d31-996b-725b681969a6.png)

配置中心对应的服务参数为`CONFIGCENTER_TENANT_NAME`

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/03/2326eded-23dd-415d-b7ba-ea589bf94b7d.png)


## 注册中心

### dubbo 协议

Dubbo 框架的微服务注册发现机制。接口名称由对应的 Dubbo Service 和版本号构成。

供应者列表中出现的 IP 为提供该 Dubbo Service 的 Provider 实例的 K8S Pod IP。在 Nacos 原生控制台中服务名以`providers:`开头；

消费者列表中出现的 IP 为订阅消费该 Dubbo Service 的 Consumer 实例的 K8S Pod IP。在 Nacos 原生控制台中服务名以`consumers:`开头。

### http 协议

Spring Cloud 框架的微服务注册发现机制。因为 Spring Cloud 框架消费者不会注册自己的信息，所以只能看到供应者的名称和 IP 信息。

## 配置中心

### 应用配置项 - Spring application.yml

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/03/2eebbfaa-8b72-4343-85f1-34cd67c10cd1.png)

配置中心里的 key/value 配置项，会拼接起来形成一份 application.yml，动态下发配置。

对应到 Nacos 中每个应用配置都是一个独立的 Data 配置项。

`parana-trade` 这个应用的 key/value 配置会合并为 Nacos 中的这一个 Data 条目：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/03/c6f33465-3098-4581-a7dd-2d817143706a.png)

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/03/d1691a98-6ceb-482a-a8ef-1db3cd4a9362.png)
