# 自定义和扩展

现在action扩展市场已经有丰富的制品仓库满足大部分的需求，在某些特定的情况下，可能需要自定义的action， erda的扩展市场同样支持自定义扩展。

## 自定义ACTION
![action 开发流程图](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/38ae9db8-84b7-4ffb-b674-2760f52d1166.png)

1. 通过 spce.yml 来描述入参
2. 编写调试 Action
3. 编写 dockerfile 打包构建
4. 编写 dice.yml
5. 调试 action

Action 的交付产物是一个 Docker 镜像。开发者只需要在镜像中提供一个可执行文件（/opt/action/run），并且提前赋予执行权限（chmod +x）。

流水线执行时，会使用该镜像创建一个 Docker 容器，并且调用 /opt/action/run 文件，运行开发者定义好的逻辑。

## ActionExecutor 插件扩展
流水线提供灵活、一致的流程编排能力, 前提是单个任务的执行已经被很好的抽象了。

在 Pipeline 中，我们对一个任务执行的抽象是 ActionExecutor：
```go
type ActionExecutor interface {
    Kind() Kind
    Name() Name

    Create(ctx context.Context, action *spec.PipelineTask) (interface{}, error)
    Start(ctx context.Context, action *spec.PipelineTask) (interface{}, error)
    Update(ctx context.Context, action *spec.PipelineTask) (interface{}, error)

    Exist(ctx context.Context, action *spec.PipelineTask) (created bool, started bool, err error)
    Status(ctx context.Context, action *spec.PipelineTask) (apistructs.PipelineStatusDesc, error)
    // Optional
    Inspect(ctx context.Context, action *spec.PipelineTask) (apistructs.TaskInspect, error)

    Cancel(ctx context.Context, action *spec.PipelineTask) (interface{}, error)
    Remove(ctx context.Context, action *spec.PipelineTask) (interface{}, error)
}
```
因此，一个执行器只要实现 单个任务 的 创建、启动、更新、状态查询、删除 等基础方法，就可以注册成为一个 ActionExecutor。