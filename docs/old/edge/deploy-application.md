# 应用发布

## 发布边缘应用

目前边缘应用支持两种类型的发布：

- [镜像](#镜像发布)：以镜像作为部署源，支持资源、健康检查、私有仓库等多种配置
- [中间件](#addon)：开箱即用，目前支持 `mysql` 

### 镜像发布

按镜像类型发布需要关注以下配置：

- 站点：所选集群下的站点列表
- 配置集：所选集群下的配置集
- 依赖：应用间的依赖关系，镜像发布的应用可以依赖**镜像发布以及 Addon 类型**的应用；被依赖应用的**环境变量**会被注入到依赖其的应用中；应用**不可互相依赖**
- 副本数：镜像发布的边缘应用网络模式为 **hostNetwork**, 所以该站点可正常运行的副本数 <= 边缘站点节点数
- 镜像配置：边缘计算平台支持私有仓库的镜像配置，按需填写仓库用户名以及密码即可
- 健康检查：目前健康检查支持 **HTTP** 以及 **COMMAND** 类型
- 端口映射：端口映射目前支持 **TCP** 类型

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/04/06/4c1d65f6-ce57-413c-bd0c-fe6fe445be67.png)

镜像类型的应用发布后，可以点击应用名称查看在各个站点的部署状态

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/04/06/7dbe2a91-27bd-445c-b916-b30bd06eb271.png)

### Addon

Addon 类型的边缘应用目前仅支持边缘 `mysql` ，采用**主从复制**的方式部署，边缘站点至少需要**2**个节点

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/04/06/a2442837-3b56-455a-ae7f-4b3a38f302b9.png)

## 查看边缘应用

边缘应用可以通过应用的**详情**查看当前的发布配置信息以及**链接信息**

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/04/06/2042cfd3-b7ab-4442-bd40-17e93dd648e9.png)



## 编辑边缘应用

### 镜像类型

镜像类型的边缘应用可以对 站点、配置集、依赖、副本数、CPU和内存、镜像配置、健康检查配置、端口映射进行编辑。新增的站点会部署对应的实例, 被删除的站点上应用对应的实例会被销毁，其他站点不会受到影响。

::: tip

编辑中涉及到站点的删除，如果该应用在被删除的站点存在被依赖关系，需要先解除依赖关系

:::

::: warning

其中**配置集**、**依赖**、**副本数**的变更会导致该应用已发布站点的容器重建，请谨慎操作

:::

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/04/06/9ca3fb02-0901-40ce-bb9d-d65a2d1c16f1.png)

### Addon类型

Addon 类型发布的应用只可以对站点进行编辑

新增的站点会部署对应的实例, 被删除的站点上应用对应的实例会被销毁，其他站点不会受到影响。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/04/06/fb30bbf9-62c6-467d-8bf1-e2abab112a36.png)



## 边缘应用站点级的重启与下线

点击边缘应用名称可以查看该应用的站点列表，对该应用在不同站点可以进行重启以及下线操作，只有部署状态是 **成功** 状态的站点才可以进行重启以及下线操作

::: tip

站点下线，如果该应用在被下线的站点存在被依赖关系，需要先**解除依赖关系**

:::

::: warning

站点下线前请注意有状态应用的数据迁移

:::

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/04/06/f1d81cdd-4c2a-4acb-826c-59536e237221.png)

## 边缘应用监控

> 边缘计算平台 > 应用管理 > 应用名称 > 站点名称

边缘计算平台提供对应用在某个站点下的监控，包括日志、资源监控以及控制台操作

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/04/06/6bf08f93-6c06-45fc-8103-6abffed8fd6b.png)



## 删除边缘应用

删除边缘应用需要优先解决应用依赖关系