# Go

Erda 通过统一的任务插件机制支撑不同的构建能力，利用这一机制，Erda 提供了开箱即用的 Go 构建插件。

## Go 版本

当前支持的版本如下:

- Go 1.14

其他版本正在支持中

## 依赖管理
依赖管理Go Modules

优先从包go vendor和go mod中探测， 否则将代码放到gopath下构建

## 构建打包
go action的必须参数：
1. `context` 需要添加到go容器的代码路径

可选参数：
1. `service` 服务名
2. `command` 构建命令
3. `target` 构建产物路径
4. `assets` 静态资源文件
5. `package` go包名（优先从包govendor和gomod中探测）

pipeline.yml

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
```