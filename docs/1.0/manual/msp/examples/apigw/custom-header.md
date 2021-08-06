# 自定义 HTTP Header

基于流量入口下的 API 策略，还可以灵活控制转发请求头，以及后端的应答头

具体操作入口：

- 全局策略：API 网关控制面板->流量入口管理->选择对应的流量入口，点击详情->全局策略->业务策略下的`自定义nginx配置`
- 针对具体 API 的策略：API 网关控制面板->流量入口管理->选择对应的流量入口，点击详情->选择对应的 API，点击策略->业务策略下的`自定义nginx配置`

## 什么是自定义 nginx 配置

在这里配置的 nginx 原生配置片段，会转化成 API 对应的 nginx location 区块内的配置；

需要注意要严格按照 nginx 的配置语法进行配置，比如每行结束有`;`结尾；

注意不能配置 `location / {}` 字样的路由块配置，这里只能配置 location 区块内的配置项。

::: tip nginx 配置项参考

具体可参考 [Nginx 配置指令列表](https://nginx.org/en/docs/dirindex.html)

注意只能配置这些 context 中包含 location 的指令 

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/06/14773446-fdcc-4c47-b078-d36de44fae4d.png)

:::

## 配置示例

### 示例一

**需求**

- 需要通过配置 [HSTS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Strict-Transport-Security) 应答头，让浏览器强制跳转 https，且不允许忽略不安全的证书

**配置截图示意**

```bash
more_set_headers Strict-Transport-Security "max-age=86400";
```

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/06/f310e930-f4f8-4ee8-ae41-f0a4c9c11dc2.png)


### 示例二

**需求**

- 将请求转发给后端时添加一个特殊的请求头 `X-From-Where: XXX` 
- 同时，移除请求头 `Accept-Encoding`

**配置截图示意**

```bash
proxy_set_header X-From-Where "XXX";
proxy_set_header Accept-Encoding "";
```

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/06/8b9dc7ec-de83-41ea-8be0-ae7c292af420.png)
