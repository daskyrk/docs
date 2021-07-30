# 制品部署
## 部署制品

进入部署中心

> DevOps 平台 -> 项目 -> 应用 -> 部署中心

选择一个环境，选择分支，选择制品ID，即可完成部署

:::tip
制品ID可在制品管理中查看
:::

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/29/a6d65aac-43d2-4de4-ad32-8d08ee30e63e.png)

## 修改部署
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/29/505aa8fb-0d33-4c2e-9f56-b8e3ca2a2f25.png)

在部署中心中选择想要更新或删除的已被部署的制品旁的下拉菜单，点击更新/删除/重启即可

## 跨集群部署
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/29/8278f955-6ede-43c1-ba41-2f135612829d.png)

在流水线文件中的Relese Action的params中添加

```cross_cluster: "true"```

则流水线生成的制品可以跨集群部署


