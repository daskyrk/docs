# 最佳实践

## 运维实践
Erda 边缘计算平台旨在解决分布在众多地理位置的同类应用，将您的应用的能力延伸的距离用户最近的地方，以获取更好的用户体验，因此涉及稳定性的边缘站点的资源规划就显得尤为重要，我们建议您：
* 所有的边缘站点尽可能采购同一厂商、同一型号的服务器。
* 不必采购虚拟化平台，直接基于物理机部署，减少 IT 成本。
* 单台主机规格最小为 4C，8G。
* 边缘应用最少部署双实例，由客户端做负载均衡。
* 使用 Erda 的流水线来基于代码生成制品镜像，基于镜像部署边缘应用。
## 云边协同
边缘应用通常作为一个大的云端应用的延伸来服务终端用户，但是最终的云端应用理论上应该具备所有边缘应用的数据，边缘应用可以使用边缘数据来缓存数据来达到更好的用户体验，普遍情况下边缘 IT 资产的运维往往不如云端资产严谨，会有比较高数据丢失的风险，因此我们建议在边缘应用实现数据的容错处理，定期汇报数据到云端，当边缘的数据丢失时，可以从中心拉取最新的数据继续保证边缘应用的可用性：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/23/995a93a6-6f50-42b4-8944-a37c7f243e4d.png)

## 使用 Erda 制作边缘应用镜像

Erda 边缘计算平台默认使用镜像来发布应用，镜像可以是任意可以被边缘节点访问到的镜像仓库，我们建议是 [dockerhub](https://www.docker.com/products/docker-hub), 您可以使用 Erda 的流水线功能来将您的代码打包成镜像并且推送到 dockerhub 中。

跟普通应用一样，您需要创建一个应用并且写好具备代码拉取，构建的 pipeline.yaml，最后再增加一个容器镜像推送的 action 将打好的镜像推送到 dockerhub 中，具体步骤如下：

1. 增加一个容器推送的节点

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/23/e1340599-66bb-41f2-b3ca-ad2fbb60fe98.png
)

2. 切换到代码编辑模式，增加如下参数

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/23/a2649930-49b0-467c-924c-38f1617b8ce9.png
)

```
- docker-push:
    alias: docker-push
    version: "1.0"
    params:
      image: yourrepo/erdaxxx:v1.0                        // 要 push 到外部镜像名称, require
      from: imageResult.img                               // 应用下面的文件
      service: test-server                                // 服务名称，要与镜像文件里的module_name一致
      username: admin                                     // 外部镜像仓库用户名
      password: xxxx                                      // 外部镜像仓库用密码
```

3. 最后运行流水线，成功后便可以使用 dockerhub 中的镜像来发布边缘应用。