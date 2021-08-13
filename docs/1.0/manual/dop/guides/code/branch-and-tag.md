# 分支和标签管理

## 分支管理

内置代码仓库提供了分支管理功能。

入口：

> DevOps 平台 -> 项目 -> 应用 -> 代码仓库 -> 分支管理

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/5bbe121e-6b12-4bf1-912b-d39f22cde563.png)

应用仓库默认会以第一个推送上来的分支作为默认分支，默认分支作为创建合并请求的默认目标分支，并且不能删除。

可以点击 `...` 按钮修改默认分支。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/26e74993-cfea-4fbf-bebd-a8c81d0fb4ae.png)

点击 `对比` 按钮可以比较两个分支的差异。在分支对比页面，可以选择 `基于源` 和 `对比分支` 进行比对。在此页面可以查看不同的提交历史。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/c5fe555d-6047-425a-8966-336397ae03e6.png)

也可以查看不同文件间内容的差异。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/1d7b357f-8434-4f91-9dc3-e1d345cb3ea9.png)

## 项目分支规则

平台对于分支与环境有严格关系管理，平台内置了 `DEV`、`TEST`、`STAGING `和 `PROD `四个部署环境。系统内置最佳实践配置的同时，支持用户进行自定义编辑配置。 分支管理可以查看[Gitflow设计理念](../../concepts/gitflow) 

在这里，可以设置分支对应的部署环境（流水线部署环境）和制品部署环境。

入口：

> DevOps 平台 -> 项目 -> 项目设置 -> 代码仓库 -> 分支规则

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/99e76eb0-5ebc-4be2-a9ae-6d9e15907bb2.png)

## 应用分支规则

应用分支规则主要是对应用代码分支的保护和持续集成的开关设置，请根据应用实际需要合理配置。

> 持续集成：该分支代码发生变化时触发持续集成
>
> 分支保护：分支保护开启后，只有应用所有者、应用研发主管才能操作，其他成员只能通过mr提交代码

入口：

> DevOps 平台 -> 项目 -> 应用-> 应用设置 -> 代码仓库 -> 分支规则

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/75274100-2c9c-4edf-9194-2f4e75deb428.png)

## 标签管理

内置代码仓库支持标签管理。在标签管理页面可以下载源代码压缩包。

入口：

> DevOps 平台 -> 项目 -> 应用列表 -> 代码仓库 -> 分支管理

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/9800a8d6-666f-4faa-96d8-581355591d84.png)

点击右上角的 `添加标签` 按钮即可添加标签，如下图所示，可以基于Branch和commit SHA两类愿类型进行打标签。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/3d4b4a4c-17de-49c4-b269-f34c3162a534.png)

