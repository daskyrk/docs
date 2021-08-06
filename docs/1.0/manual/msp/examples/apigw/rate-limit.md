# 配置削峰填谷的限流

## erda.yml 配置

削峰填谷限流支持通过 erda.yml 配置，具体配置方式详见[使用 erda.yml 管理配置](./config.md)

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

## 流量入口 API 策略设置

也可以通过流量入口下的 API 策略，基于交互式控制台进行配置

::: tip

如果已经使用 erda.yml 进行了配置，会覆盖此处配置

:::

具体操作入口：

- 全局策略：API 网关控制面板->流量入口管理->选择对应的流量入口，点击详情->全局策略->安全策略下的`服务负载保护`
- 针对具体 API 的策略：API网关控制面板->流量入口管理->选择对应的流量入口，点击详情->选择对应的 API，点击策略->安全策略下的`服务负载保护`

## 配置示例

### 示例一

**需求**

- 限制流量入口下所有 API 各自的最大接收请求速率为 100 次/秒
- 当超过 100 次/秒时，通过增加延迟的方式对请求进行削峰填谷，并且延迟不得超过 50 毫秒
- 削峰填谷后仍然超出 100 次/秒，则超出部分的请求返回 429 状态码，将 http 应答体设置为 `System is busy, please try it later.`


**配置截图示意**

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/06/d5155189-af2f-431f-9b1a-fd1156d79d3c.png)

### 示例二

**需求**

- 全局限流的需求与上例相同，但对于一个首页 URL: `web.playground.erda.cloud/index.html` 要进行特殊配置
- 当超过限流时，返回 302 状态码，然后跳转到 CDN 静态页面 `cdn.erda.cloud/playground/index.html` （在这个页面设计了 UI 透出更为友好的限流提示）

**配置截图示意**

选择 URL 对应的 API 路由配置，点击策略

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/06/ca2110d2-8945-41c4-a7cb-355a112eb865.png)

关闭`使用全局策略`的开关

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/06/5d49383b-1e0c-4add-b49a-ef19a1183577.png)

配置此 API 专属的策略配置，点击提交

![](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/06/8ea42cd1-337c-4440-b380-8be1de559a68.png)
