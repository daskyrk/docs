# 敏捷开发部署快速入门

平台基于标准的 Git 协议，内置了一个代码仓库。用户不需要依赖外部仓库（如 GitLab）就可以完成从源码开发到部署的全流程。在此基础上，平台提供代码管理、分支管理、权限管理等功能，内置丰富的 Action 和 Addon 能力，并且支持 Java、Go、Node、Python 等各种开发语言框架，帮助开发者更便捷、高效地完成开发迭代。



## 准备代码

在开始源码部署之前，请确认已完成项目和应用的创建。关于项目和应用的创建，请参见XXX。



### 克隆代码到本地

```shell
git clone https...
```



### 推送代码至平台

```shell

```

完成代码推送后，即可在代码仓库中查看代码信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/02/3ba8975c-cb95-447e-bd79-88f68deae896.png)



## 定义流水线

流水线 (Pipeline) 是平台自研的工作流引擎，覆盖平台所有的流水线相关任务，为平台提供了强大灵活的任务编排执行能力和动态配置能力等，具体包含 DevOps 平台中的 CI/CD 、快数据平台中的流式计算、运维 Ops 和监控报表等。

一条流水线由若干个 Stage 构成，多个 Stage 之间串行顺序执行； 一个 Stage 由若干个 Action 构成，多个Action 之间并行执行。Action 是流水线的最小执行单元，表示一个任务或动作。



### pipeline.yml

pipeline.yml 描述一个从代码编译构建到应用部署的流水线的配置文件，一般可以设置 4 个 Stage：

- 拉取 Git 源码
- 基于源码编译、构建，制作 Docker 镜像

- 生成版本产物
- 基于版本产物完成部署

4 个 Stage 分别可用如下 Action 来执行：

- git-checkout
- java

- release
- dice



### dice.yml 

dice.yml 是描述一个应用的服务架构，对 CPU、内存等资源的配置，服务插件的依赖关系以及发布形式的 yml 配置文件。



## 执行流水线

1. 进入 **DevOps 平台 > 我的应用 > 流水线**，点击右上角 **新建流水线**，选择 **feature/demo** 分支创建新的流水线任务。
2. 流水线任务分析完成后，处于待执行状态，点击右上角执行图标，开始执行构建。

3. 流水线任务执行过程中，可以实时查看流水线各步骤的执行状态，点击日志可以查看对应节点执行状况的日志信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/02/974beb40-928b-44e8-8e9f-b8df4063e123.png)



## 应用部署

通过流水线构建源码，并成功完成部署动作后，可在部署中心看到已经成功部署的应用实例 Runtime。进入 Runtime 可以进一步进行应用管理相关的操作，例如配置域名、服务实例扩缩容等。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/02/4e83b4e5-e8d7-4343-8422-e60f77f21357.png)

