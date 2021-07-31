
## 部署前准备
1. 在创建部署我们的 go 应用之前，我们需要加入或创建一个组织，并为组织添加相应的集群用于资源的管理和服务的部署运行。
2. 在组织里创建项目，项目 (Project) 是研发运维的主要对象。
3. 在我们刚刚创建的项目下新建应用，这个应用我认为相当于 Github Repo，用来存放我们的应用程序和构建部署所需的声明文件。


现在假设我们已经在组织下新建了一个叫 base-project 的项目，并在项目中创建了名为 go-web 的应用，下文 git 地址将会涉及到这两个名字。


## 准备 go web 代码

示例代码只是一个 golang 的简单 web 服务，只需要能输出 Hello, World! 就可以了，现在新建一个文件夹并创建一个 main.go 文件，在其中写入：

```code
package main

import (
    "fmt"
    "log"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello World!")
}

func main() {
    http.HandleFunc("/", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

初始化 go 应用的包管理:

```
go mod init github.com/erda/go-web
```

当然了，这只是我为简化应用程序写的代码，你也可以写入自己的 Go 代码（Erda 平台可以部署运行任意语言、任意框架开发的代码，并不局限于 Go / Java 等）。

然后我们先在本地初始化 git 仓库，并进行 commit：

```bash
git init
git add .
git commit -m "initialize"
```

#### 推送示范代码到 Erda 平台

平台基于标准的 Git 协议内置实现了一个 git 代码仓库，用户不需要依赖外部仓库（比如：gitlab 等）就可以完成从源码开发到部署全流程。

平台远程仓库服务器地址查看入口位于：

> DevOps 平台 -> 项目 -> 应用 -> 代码仓库 -> 代码浏览 -> 仓库地址

![仓库地址](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/06/18/fd9147ee-04d6-4053-95dd-5f301965d8fa.png)

```bash
git remote add erda https://erda-org.erda.cloud/wb/base-project/go-web
git push -u erda --all
git push -u erda --tags
```

## 定义流水线
pipeline.yml 描述一个从代码编译构建到应用部署的流水线的配置文件，语法较为简单, 整体只有 stage / action 两级。stage 就是阶段，它用于控制串行和并行；action 则是实际的执行单位。

dice.yml 则是一个应用部署的描述文件，由服务基本信息和服务编排关系两部分组成，具体包含了微服务的 Docker 镜像、资源需求（CPU 和 Memory 等）、微服务之间的依赖关系、环境变量以及 AddOn 等信息，特别是 AddOn，可以让应用开发者完全不需要关心诸如 mysql 等的搭建过程，只需要“声明”应用依赖哪些 AddOn，平台就会自动拉起。

给该示范代码工程添加平台配置文件 pipeline.yml 和 dice.yml。

#### pipeline.yml
简单的完成部署，一般可以设置 4 个 stage 来组成 pipeline.yml，4 个 stage 按照书写顺序依次执行，分别是：

1. 拉取 Git 源码
2. 基于源码编译、构建，制作 Docker 镜像
3. 生成版本产物
4. 基于版本产物完成部署

4 个 stage 分别可用如下 Action 来执行：

1. [git-checkout](//www.erda.cloud/market/action/git-checkout)
2. [golang](//www.erda.cloud/market/action/golang)
3. [release](//www.erda.cloud/market/action/release)
4. [dice](//www.erda.cloud/market/action/dice)

该示例的完整 pipeline.yml:

```yml
version: "1.1"
stages:
  - stage:
      - git-checkout:
          alias: git-checkout
  - stage:
      - golang:
          alias: go-demo
          params:
            command: go build -o web-server main.go
            context: ${git-checkout}
            service: web-server
  - stage:
      - release:
          alias: release
          params:
            dice_yml: ${git-checkout}/dice.yml
            image:
              go-demo: ${go-demo:OUTPUT:image}
  - stage:
      - dice:
          alias: dice
          params:
            release_id: ${release:OUTPUT:releaseID}
```

#### dice.yml

dice.yml 来描述我们的应用所需的资源大小，副本数量等。

该示例的完整dice.yml：

```yml
version: "2.0"
services:
  go-demo:
    ports:
      - port: 8080
        expose: true
    resources:
      cpu: 0.2
      mem: 512
    deployments:
      replicas: 1
```

#### 提交文件

将新增的两个 yaml 文件提交至平台的代码仓：

```bash
git add .
git commit -m "add pipeline.yml and dice.yml"
git push erda
```

## 执行流水线

1. 进入`流水线`，右上角点击`新建流水线`。
2. 流水线任务分析完成后，处于待执行状态，右上角点击 `立即执行`，开始执行构建。
3. 流水线任务执行过程中，可以实时查看流水线各步骤的执行状态，并点击`日志`查看对应节点执行状况的日志信息。

## 查看应用部署结果

通过流水线构建源码，并成功完成部署动作后，可在部署中心看到已经成功部署的应用实例。

![](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/06/10/f1e73336-607c-422a-9e25-7a2ec5f56c9f.png)

点击 master进入应用管理，可以进一步进行配置域名、服务实例扩缩容等操作。

![](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/06/18/de6b2aa6-f443-41c6-ac1d-f970370eddcc.png)

查看实例 IP 地址并复制到浏览器，加上我们应用服务的端口 8080 可以看到已经成功打印出“Hello,World!”。
