# 合并请求

内置代码仓库支持合并请求操作。

入口：

> DevOps 平台 -> 项目 -> 应用 -> 代码仓库 -> 合并请求

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/81fa03df-e006-4e1f-af0f-c49ca7109edf.png)

点击右上角 `新建合并请求` 按钮创建新的合并请求。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/e359389d-b1f2-42fc-b9eb-35444e545f0a.png)

## MR 模板

在**默认分支** .gitlab/merge_request_templates 目录下添加你的模板md文件，如下图所示。

> 应用设置里合并请求描述模板功能暂不支持，敬请期待。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/edd47b66-d5b9-41b4-af27-7ea7ab23ba51.png)

添加完模板之后，就可以在新建合并请求的时候选择模板。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/d3b4a7e5-610b-4ca9-a9fe-30c60be10535.png)

添加完合并请求之后，点击该合并请求，就可以查看合并请求信息以及对比结果，对比结果中可以查看评论、提交和变更。 点击右上角的按钮，合并或者关闭请求。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/3a0500a1-004f-4f96-b2d4-60163fb41731.png)

查看变更内容的时候，鼠标移到某一行就会出现对话按钮，点击这个按钮就可以添加评论。

<img src="http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/72a42c0d-64cd-406a-9285-a24fb9e23999.png" style="zoom:50%;" />