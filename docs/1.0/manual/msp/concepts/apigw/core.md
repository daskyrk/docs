# 核心概念

## 流量入口（Endpoint）

是由一组域名，及域名下的路由规则构成的，用于接入特定业务流量的访问入口

创建一个流量入口：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/dc03d1f6-89f5-4dd7-850d-06582a1a88a7.png)

流量入口是隶属于一个项目的某个环境的，这也限制了跨项目共用域名的情况。

::: tip 集群级别的域名共用

在一些特殊的企业环境中，对域名的管理会特别严格，例如必须要加独立的 DNS 解析，或者在企业自己的 LB 节点上添加域名转发配置。这时，可能需要将一个环境下的所有服务都收敛到同一个域名下。

API 网关提供了针对集群泛域名生成的，四个环境域名，例如对于泛域名"app.terminus.io"，分别是以下域名：

- gateway.app.terminus.io
- staging-gateway.app.terminus.io
- test-gateway.app.terminus.io
- dev-gateway.app.terminus.io

在 API 网关的流量入口中，默认会有一个特殊的“统一域名入口”，即是用于此场景的：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/06/2a9f18d5-40f2-4946-95e9-6a2c5bde6ea2.png)

:::

查看流量入口的具体路由规则：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/e6e2b7e5-bdc1-4779-92cc-98c167ebcfd1.png)

## 微服务 API（Service API）

微服务暴露出来，允许提供流量入口路由达到的 API

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/6d7758cd-34ba-40c5-9aad-bb5c0188c84c.png)

所有服务默认情况下，都会自动注册一个全部方法，全部路径的API（`/`路径前缀匹配），这样这个服务的 API 就都可以被暴露出来了。

但对于一些特定的服务来说，这样暴露是不安全的，这时候可以删去这条自动注册的 API，添加上所有必需的 API 即可。

在流量入口中，创建路由规则时，选择转发给微服务的 API 前缀：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/e002e327-8207-471c-baec-b3690b726635.png)

## 调用方（Consumer）

开放 API 的场景下，需要识别出调用方的角色，从而继续判断其是否有权限调用，并且可以针对调用方分析其调用量等情况

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/2c72961c-f4e1-41ab-a949-452d64da5180.png)

调用方的核心是凭证信息，在请求中需要携带对应的 Key/Secret 凭证，提供网关进行识别认证

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/f63100c9-21b7-4ae3-af26-9dc8cd554702.png)

## 认证（Authentication/AuthN）

开放 API 的场景下，需要用到网关的认证功能，认证方式就是是识别调用方的方式，网关提供了多种认证方式

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/cbf40976-16ec-4a8f-ae59-05e062ada2de.png)

## 授权（Authorization/AuthZ）

开放 API 的场景下，在调用方认证通过之后，通常需要再检查调用方是否有权限访问这个 API

通过编辑流量入口，为流量入口添加允许访问的调用方：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/13d9dde6-931e-45b6-b618-a130c34a9718.png)

也可以为调用方添加允许访问的流量入口：

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/d3520542-c9c4-4570-bc4e-64b1b39a2ecb.png)
