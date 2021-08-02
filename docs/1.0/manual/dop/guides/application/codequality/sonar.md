# 门禁规则配置

## 介绍

在整个开发流程中，大家的目标都是交付可用的、高质量的代码。因此，代码质量至关重要。

平台通过 Sonar 为应用提供代码质量扫描能力。

## 快速上手

平台提供 Sonar Action，用户可以很方便地在流水线中嵌入该节点，进行代码质量扫描卡点。

建议通过流水线图形化编排的方式添加 Sonar Action，如下图所示：

![](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/761ad3ad-ad0a-46b5-8c32-b0cec9cb4404.png)

各个参数的解释说明将鼠标移至问好处即可查看。

下面对重要参数进行解释：

> **code_dir:** 需要扫描的代码目录
>
> **language**: 语言类型，当前版本需要用户需要明确指定。支持 java / go / js
>
> **sonar_exclustions**: 声明哪些文件不进行代码质量扫描
>
> **quality_gate**: 添加门禁指标

## 如何设置自定义门禁

当使用自定义门禁时，内置的规则不再生效，完全以用户自定义配置为准。

具体门禁指标配置请参考 [Sonar 官方文档](https://docs.sonarqube.org/latest/user-guide/metric-definitions/)

![](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/43de49a8-f88d-4a3f-9473-9424ede65bf6.png)

如上图所示，添加了两个自定义门禁指标：

- Bug 数小于 5 个
- 代码注释总行数大于 100 行

只有当这两个指标同时满足时，才算通过门禁。否则，判定代码质量不合格。

## 如何修改内置门禁

平台内置60余种门禁规则，添加门禁规则进行覆盖。

入口：

> DevOps 平台 -> 项目 -> 项目设置 -> 代码质量门禁

![](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/869801a0-0ea2-4423-8fcb-9a6a7120b834.png)

## 查看扫描报告

报告内容包括：

- 代码缺陷
- 代码弱点
- 代码异味
- 测试覆盖率
- 代码重复率

以及具体的问题列表。

入口：

> DevOps 平台 -> 项目 -> 应用 -> 代码质量 -> 质量报告｜问题列表

![](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/f1ff0f58-755f-4ac8-b30b-ddf340750e9b.png)

![](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/7b27967d-aade-48e3-919e-5bdf0a377639.png)
