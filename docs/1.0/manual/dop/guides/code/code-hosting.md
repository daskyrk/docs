# 代码托管

## 新建仓库

Erda 代码托管支持系统内置 Git 仓库和外置通用 Git 仓库。可以在创建应用的时候进行选择。

入口：

> DevOps 平台 -> 项目 -> 应用列表 -> 新建应用

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/6ffaf64e-ffce-4d6a-98bb-7d84d5508d06.png)

选择外置仓库的时候需要指定仓库地址、用户名、密码等信息。

> 选择配置外置代码仓库后，DevOps 平台将不再提供代码浏览、提交历史查看、分支管理和合并请求等在线代码仓库功能，流水线和部署中心等其他功能不受影响。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/04d76f31-50b9-4783-9496-f9a5c6ef2500.png)

应用创建完成之后，点击应用进入的默认页面就是`如何开始`页面，在此页面即可查看 git 使用相关命令。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/f1b14747-a46c-47be-9361-cac127ef2714.png)

在已有仓库里 点击代码仓库页面右上角 `?` 图标也可查看到 `如何开始` 页面

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/7f2fa162-12b0-44e9-b20e-e304426a05d4.png)

## 仓库地址

点击代码仓库右上角 `仓库地址` 按钮可以查看代码仓库地址、用户名和token。

> 既可以使用内置的 git 和 token 进行 clone ，也可以使用 Erda 平台登录的用户名和密码进行 clone 。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/d13b82ee-1b91-4b8d-a783-e7e1332e1279.png)

## 新建分支

点击代码浏览页面右上角的 `新建分支` 按钮即可创建新的分支。

在添加分支页面，我们可以基于 Branch、Tag 以及 commit SHA 三类源来创建新的分支。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/6702b625-b589-475d-816f-85250d9cf495.png)

新的分支创建好了之后，点击分支下拉框查看所有的分支，选中某个分支即可进行分支切换。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/6dd40cdd-9823-49b8-8863-f7f5c1757f1c.png)

## 新建文件和文件夹

点击右上角的 `新建` 下拉框来选择新建文件或文件夹 。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/a70b2462-6b01-4f49-84b0-c5083d33bcf0.png)

在新建文件页面，输入文件名、文件内容、提交信息，点击 `保存` 按钮即可新建文件。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/984af3b8-dceb-46d0-b4e9-ca00672f57a2.png)

## 提交历史

入口：

> DevOps 平台 -> 项目 -> 应用 -> 代码仓库 -> 提交历史

如图所示，可以查看历史提交记录，可以根据分支名、提交信息进行过滤。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/b3ba44ba-0d22-46f9-88e2-4fc30ead9364.png)

点击提交信息即可查看具体提交的改动信息。包括修改了哪些文件，修改的具体内容。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/37003654-54c1-42a4-ab22-5ca2c5ede51a.png)

点击右上角的 `单行` 和 `分栏` 按钮可以进行切换查看。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/d6348883-2499-4690-a86b-f246ac0c5409.png)

如图所示，点击 `...` 按钮可以向前向后查看文件内容。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/3e6b558f-c264-4544-b677-d7d717e2c7f6.png)

在代码浏览页面中，可以查看最新提交信息。点击提交信息即可查看具体提交的改动信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/aa69e6a6-1e2f-492a-a41f-3a7ccf83164c.png)

在文件内容页面里，我们不仅可以查看当前文件内容，还可以按行查看提交者（blame）以及查看当前文件的提交历史。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/ae543f18-1c2a-40ef-921e-117f83ebe9bb.png)

## 流水线

入口：

> DevOps 平台 -> 项目 -> 应用 -> 流水线

我们提供了流水线可视化操作，在代码更新之后也可以触发流水线。具体流水线使用请查看[流水线使用指南](../cicd-pipeline/pipeline-yml-graph )

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/09dc3c65-84cd-4beb-8a6c-03e55c4c690c.png)





