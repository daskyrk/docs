# 制品和构建

## 创建制品
创建制品前需要配置项目的集群设置和分支规则
> DevOps 平台 -> 项目 -> 项目设置 -> 通用设置 -> 集群设置

> DevOps 平台 -> 项目 -> 项目设置 -> 代码设置 -> 分支规则

目前制品只能通过Release Action创建

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/29/4847df14-9fc4-45f7-81f6-b4513b70a528.png)
1.创建流水线文件，添加Action（任务类型->应用打包发布制品）并填写配置参数

> DevOps 平台 -> 项目 -> 应用 -> 代码仓库 -> 代码浏览

2.进入流水线，选择分支，选择流水线文件，点击新建流水线，构建完成之后执行流水线

> DevOps 平台 -> 项目 -> 应用 -> 流水线

## 查看制品
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/29/67187917-897b-44dd-aad5-bbd2c66225cc.png)
制品管理入口
> DevOps 平台 -> 项目 -> 应用 -> 制品管理

可以根据分支、关键字搜索指定制品

选择制品后可以查看制品的信息：所属集群、分支、应用，创建人，操作人，创建时间，提交ID，dice.yml

## 更新制品
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/29/aa6feaaa-c345-4de1-aa1c-ddc2c0f262bf.png)
只可以编辑制品的描述，其余信息不可修改

## 删除制品

制品的dice.yml信息中定义了制品所引用的docker image的信息

制品的过期时间根据环境变量RELEASE_MAX_TIME_RESERVED决定，默认为3天

每天0点集群会搜索已过期而且未被部署而且version为空的制品。

首先删除制品存储的image信息，如该制品下的image已无其他制品使用，则会删除image manifest。如果删除成功，则会删除制品。





