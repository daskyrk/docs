# 单元测试

## 介绍

为了保证系统的稳定性，单元测试必不可少。平台通过 UT action，提供针对单元测试的能力抽象。

UT action 主要对用户的项目进行单元测试，当用户 push 代码时，会触发 UT action，其中会探测应用的语言框架，选择相应的单测方式进行单元测试。

## 快速上手

通过平台可以很方便地在流水线中嵌入该节点，然后进行单元测试。

建议通过流水线图形化编排的方式添加 UT Action，如下图所示：

![](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/7890d971-22b4-44db-ade7-644022fec26f.png)

参数说明：

> **context**: 必填， 需要做UT的代码存放目录。一般为 git action 的 destination 目录。如repo。若项目存在多种语言，必须指定模块路径，中间用 "," 分隔；如 "repo/path1,repo/path2"
>
> **name**:  选填，该次UT测试名称。
>
> **go_dir**: 选填，若UT的对象为golang，则必填。该值为$GOPATH下的项目路径。



## 测试结果

测试结果展示在代码质量里的执行列表中，在列表中我们可以看到执行的分支、耗时时间以及执行结果等。

入口：

> DevOps 平台 -> 项目 -> 应用 -> 代码质量 -> 执行列表

![](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/53642eb7-1334-4400-a686-c46fc5ed1a04.png)

点击执行列表中的一项，我们可以看到具体的测试详情。

![](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/9f5c25f1-61c7-44bb-869d-f8c34a091084.png)
