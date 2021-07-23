# 使用 erda.yml 管理配置

通过 `erda.yml`，为服务指定 `endpoints` 即可实现微服务网关的功能，将一个域名的不同路径转发给相同项目环境下的不同服务。

**完整的例子**

```yaml
version: 2.0
services:
  user-center:
    ports:
    - port: 8080
    endpoints:
    # 可以写成 .* 后缀，会根据集群泛域名自动补全
    - domain: hello.*
      path: /api/user
      backend_path: /api
      policies:
      # 允许跨域访问
        cors:
          allow_origins: any
      # 限制访问 qps 为100
        rate_limit:
          qps: 100
    # 可以写完整域名
    - domain: uc.app.terminus.io
      # 如果后端路径一致，可以省略 backendPath
      path: /
  acl-center:
    ports:
    - port: 8080
    endpoints:
    - domain: hello.*
      path: /api/acl
      backend_path: /api
```

`endpoints` 中的每一项由以下几个属性构成

**domain**

*必填字段*

域名，可以填完整域名，也可以只写最后一级域名，平台会基于集群泛域名进行自动补全

**path**

*选填字段*

域名路径，表示将域名下基于URL 前缀匹配到当前路径的请求都转发给该服务，不填时默认为`/`

URL 前缀匹配总是根据路径长度优先匹配，越精确越优先

**backend_path**

*选填字段*

转发给服务的路径，可以理解为将`path`部分匹配到的 URL 路径抹除后，剩余部分拼接在`backend_path`上转发给服务，不填时默认和`path`一致

**policies**

*选填字段*

当前支持跨域策略和限流策略

跨域策略：

跨域相关知识，请参考[跨域资源共享](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)

以允许跨域应答头`Access-Control-Allow-Origin` 为例，配置`allow_origins`的值，会作为这个应答头的值

但当值为`any`时，比较特殊，会直接获取请求头的`Orgin`字段，作为值

对于`Access-Control-Allow-Methods`,`Access-Control-Allow-Headers`等也是同理

```yaml
      policies:
        cors:
          # 必填字段，当为 any 时，允许 origin 是任何域名进行跨域访问
          allow_origins: any
          # 非必填，默认是 any，允许 http method 是任何类型
          allow_methods: any
          # 非必填，默认是 any，允许 http header 是任何字段
          allow_headers: any
          # 非必填，默认是 true，允许 cookie 字段跨域传输
          allow_credentials: true
          # 非必填，默认是 86400，跨域预检请求一次成功后的有效时间
          max_age: 86400
```


限流降级策略：

`deny_status` 可以填`302`，这时`deny_content`可以是一个 http 地址，提供跳转

可以将这个 http 地址配置为一个降级接口，例如一个 cdn 页面，用于透出当前服务过载的信息

```yaml
      policies:
        rate_limit:
          # 必填字段，每秒最大请求速率
          qps: 100
          # 非必填字段，最大延后处理时间，默认是 50 毫秒，超过速率时不会立即拒绝，进行去峰填谷处理
          max_delay: 50
          # 非必填字段，默认是 429，延后处理后仍然超过速率，会进行拒绝，返回对应的状态码
          deny_status: 429
          # 非必填字段，默认是 server is busy，拒绝时返回的应答
          deny_content: "server is busy"
```


