# 事项自定义 & 工作流

## 自定义字段

如果默认的事项字段无法满足用户需求，用户可以创建自定义事项字段。

### 创建自定义字段

自定义字段配置入口

> 管理中心 -> 组织设置 -> 项目

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/05f96e73-e9c0-4e3c-9380-599bf7ccd29b.png)

自定义事项字段支持多种类型

* Select 单选框
* MultiSelect 多选框
* Text   文本
* URL 网址
* Email 电子邮箱
* Date 日期
* Person 人员
* Number 数字
* Phone 电话

其中Select和MultiSelect属于枚举类型，需要用户自定义枚举值。

### 配置自定义字段

创建好自定义字段之后，可以选择配置该自定义字段的事项类型

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/799ba6f2-6a96-497f-b196-3b43b7c3eebd.png)

选择事项类型,即可选择自定义字段进行引用，引用字段之后，组织下的全部该类型的事项都会新增一个字段

事项处自定义字段显示的顺序和配置的顺序保持一致。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/7c1dc67e-b030-49ba-89b6-e3c828d2fa0c.png)

### 更新自定义字段

除了枚举类型的自定义字段都可以自由修改类型。

如果字段是枚举类型，只允许Select类型的字段转换到MultiSelect类型。

## 事项工作流

工作流是指事项状态的流转集合，事项状态能否流转到另一状态由工作流所决定。

事项工作流拥有多个主状态，每个主状态都是若干个子状态的集合，子状态之间拥有流转状态。

里程碑、需求、缺陷和任务都拥有单独的工作流，在这里你可以自定义管理各个事项类型的工作流。

入口：

> DevOps 平台 -> 项目 -> 项目设置 -> 事项工作流

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/29/95152605-0faa-4062-b2f0-5ecda6fa0cea.png)

在每个项目被创建时，平台都会自动为其创建默认工作流。

如需改变工作流，您可以选择具体的事项类型进行工作流的修改。可以进行状态设置，也可以进行流转设置。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/29/7046d79b-a9cc-4a80-b3f4-35f47cb3db49.png)
