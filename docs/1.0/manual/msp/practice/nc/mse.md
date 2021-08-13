# 使用 Nacos 云服务

选择云厂商提供的 Nacos 云服务，您将获得更好的 SLA 保障

并且对于开发者，使用方式上与平台自建的 Nacos 完全一致

建议您在非生产环境使用平台自建 Nacos 节约成本，在生产环境使用云服务提高可用性

例如阿里云的 [MSE Nacos 服务](https://www.aliyun.com/product/aliware/mse)。

## 初始化配置

要使用云服务 Nacos，需要在对应集群内执行以下命令进行配置

首先获取云服务 Nacos 的访问地址和端口例如, 地址为`mse-id-xxx`，端口为`8848`

```bash
kubectl patch cm dice-addons-info --patch '{"data":{"MS_NACOS_HOST":"mse-id-xxx","MS_NACOS_PORT":"8848"}}'
```

完成如上配置后，再到`erda.yml`中添加注册中心或配置中心的扩展服务，部署的时候不会再在集群内部署 Nacos，而是直接使用对应的云服务。用户使用平台上的注册中心和配置中心的功能，还是和自建 Nacos 完全一致

如下 `erda.yml` 配置示例，无需关心是使用的云服务 Nacos 还是自建 Nacos

```yaml
addons:
  ## 启用配置中心扩展服务
  config:
    plan: "config-center:basic"
  ## 启用注册中心扩展服务
  naming:
    plan: "registercenter:basic"
```
