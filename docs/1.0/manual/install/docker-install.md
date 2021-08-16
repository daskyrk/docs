# 基于 docker-compose 本地安装

::: tip
使用 docker-compose 安装的方式仅适用于在您不具备 Kubernetes 条件的情况下，在本地快速体验 Erda，并不推荐您在生产环境采用此方式安装部署。
:::

## 前置条件

- docker 20.10.0+
- 节点配置 4 核 8G

## 使用脚本快速安装

您可以通过执行如下命令快速部署 Erda

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/erda-project/erda/master/quick-start/quick-start.sh)"
```

命令成功执行之后，您可以通过访问 [http://erda.local](http://erda.local) 体验 Erda。
