# 限制特定 IP 访问

基于流量入口下的 API 策略，可以根据来源 IP ，限制访问

具体操作入口：

- 全局策略：API 网关控制面板->流量入口管理->选择对应的流量入口，点击详情->全局策略->安全策略下的`IP 拦截`
- 针对具体 API 的策略：API 网关控制面板->流量入口管理->选择对应的流量入口，点击详情->选择对应的 API，点击策略->安全策略下的`IP 拦截`

## 配置示例

### 示例一

**需求**

- 当前来源 IP 网段命中 `42.120.0.0/16` 时禁止访问
- 来源IP 为`42.121.0.1` 时也禁止访问

**配置截图示意**

配置 IP 黑名单列表

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/06/2ea68ed3-a475-452e-a50a-07d1ddf3261b.png)

### 示例二

**需求**

- 只允许 `10.1.0.0/16` 来源的内网 IP 访问
- 请求链路上会经过其他七层负载均衡设备 ，不能直接使用对端 IP ，要根据请求头中的[`X-Forwarded-For`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For)获取真实 IP

**配置截图示意**

配置 IP 白名单列表

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/06/1570561f-d6b1-434f-a6b1-12d4970c87b2.png)

### 示例三

**需求**

- 限制每个 IP 访问时最多建立 20 条并发连接，且每个 IP 的请求速率不允许超过 100 次/秒

**配置截图示意**

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/06/999ee7bf-2dd2-4627-8e03-c75e90856edb.png)
