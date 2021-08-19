# 流水线配置（文本）

## 编辑流水线
入口：应用 -> 流水线 -> 选择分支

点击编辑按钮并切换到文本编辑模式

![](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/e933b087-b2d8-4435-9a71-478d9906de58.png)

## 编写 pipeline.yml

pipeline.yml 是一个 [YAML](https://yaml.org/spec/1.2/spec.html) 格式的文件

### yaml 语法简介

它的基本语法规则如下。

- 使用缩进表示层级关系
- 缩进时不允许使用Tab键，只允许使用空格。
- 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可

 yaml 语法中的对象是一组键值对，使用冒号结构表示。
 
 ``` yaml
 version: "1.1"
 ```
 
一组连词线开头的行，构成一个数组。
例如

``` yaml
stages
 - stage
 - stage
 - stage
```


数据结构的子成员是一个数组，则可以在该项下面缩进一个空格。

``` yaml
stages
 - stage
    - action
    - action
 - stage
    - action
    - action
 - stage
    - action
    - action
```

一个 stages 下包含着多个 stage ,所以在流水线文本编辑时，要把 stage 当成数组而不是对象。
同理 stage 下包含多个 action。

### 配置 version
version 表示 pipeline.yml 的版本号。目前最新版本为 1.1。
        
配置为：`version: 1.1` 即可

初始化 pipeline.yml

``` yaml
version: "1.1"
stages:[]
```

### 配置 stages
stages 由 stage 列表组成

stage 表示一个 **阶段** , stage 中至少存在一个 action

Action 是流水线的最小执行单元，表示一个 **任务** 或 **动作**。

stages 与 stage 和 action 如下所示

``` yaml
# stage 和 stage 之间是串行的，即前面一个 stage 执行完毕才会开始执行下一个 stage.
# 该例子中一共有 2 个 stage.
stages:

# 在一个 stage 中，多个 Actions 是并行的，不会有依赖关系;
# 该例子中，该 stage 包含 2 个并行 Action.
- stage:
  # Action1-1 是 Action 的类型，不能任意填写，需要能在扩展市场中找到该类型.
  - Action1-1:
      params:
        ...
  # Action1-2 是 Action 的类型，不能任意填写，需要能在扩展市场中找到该类型.
  - Action1-2:
      params:
        ...

# 这里定义了第二个 stage，它在第一个 stage 执行结束后才会开始执行.
# 该 stage 只有一个 Action.
- stage:
  # Action2-1 是 Action 的类型，不能任意填写，需要能在扩展市场中找到该类型.
  - Action2-1:
      params:
        ...
```

### 配置 action

#### alias

alias 是 Action 的别名，是不可重复的。

#### version

Action 的版本。

#### params

Action 的参数，主要用来定义 Action 的行为。

每个 Action 的参数都不一样，具体 Action 的参数信息请参考 [扩展市场](https://www.erda.cloud/market/pipeline) 里具体内容。

#### resources

Action 运行资源。

可配置项包括：

- cpu
- mem (单位为 MB)

``` yaml
- git-checkout:
    params:
      ...
    resources:
      cpu: 0.5
      mem: 2048
```

#### 一个配置 action 的例子

``` yaml
version: "1.1"
stages:
  - stage:
      - git-checkout:
          alias: git-checkout
          version: "1.0"
          params:
            branch: ((gittar.branch))
            password: ((gittar.password))
            uri: ((gittar.repo))
            username: ((gittar.username))
          resources:
            cpu: 0.53
            mem: 1024
```

#### 上下文引用

在一条流水线中，Action 独立运行的场景很少，大多数 Action 需要拿上一个 Action 的输出作为输入。

例如：

用于编译和制作镜像的 buildpack Action 需要代码作为输入，而代码一般由 git-checkout Action 拉取。

因此在 buildpack Action 中可以使用类似 ${git-chekcout} 的语法来引用指定 git-checkout Action 命名空间里的代码仓库。

``` yaml
...
stages:
- stage:
  - git-checkout: # 代码仓库1
      alias: repo1
      params:
        uri: xxx
  - git-checkout: # 代码仓库2
      alias: repo2
      params:
        uri: yyy

- stage:
  - buildpack:
      params:
          code_dirs:
          - ${repo1} # 引用代码仓库1的代码
          - ${repo2} # 引用代码仓库2的代码
```

### 配置 on push

push 代码时会触发所有包含 on push 的 pipeline 

``` yaml
version: "1.1"
"on":
  push:
    branches:
      - master
      - develop
      - feature/*
stages:
  - stage:
      - custom-script:
          alias: custom-script
          version: "1.0"
          commands:
            - echo "hello world"
```

### 配置 on merge

从 develop 分支 merge 到 master 分支 

a 里面包含 on merge 的 pipeline 都会触发,b 里面 包含 on push 的 pipeline 都会触发

``` yaml
version: "1.1"
"on":
  merge:
    branches:
      - master
      - develop
      - feature/*
stages:
  - stage:
      - custom-script:
          alias: custom-script
          version: "1.0"
          commands:
            - echo "hello world"
```

#### check run 

提交合并请求触发 check run 

![](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/17/02067b26-56a8-4b1f-82ca-8e9ec4608154.png)

check run 会去查看流水线结果,如果有 流水线失败则 check run 失败

![](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/17/b30c07c0-6ffa-42e4-b294-e1c1969fca78.png)

流水线全部成功则 check run 成功

![](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/17/7e12d79c-2eb8-4320-8a7f-46ed1d988baf.png)

