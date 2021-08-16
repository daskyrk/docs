# 基于 Docker Compose 本地安装

::: tip 提示
本安装方法仅适用于不具备 Kubernetes 条件的情况下，在本地快速体验 Erda 的场景。生产环境下不建议采用此方法。
:::

## 前提条件

- Docker 20.10.0 及以上
- 节点配置 4 核 8 GB

## 使用脚本快速安装

1. 执行以下命令：

   ```shell
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/erda-project/erda/master/quick-start/quick-start.sh)"
   ```

2. 访问 [*http://erda.local*](http://erda.local) 快速体验 Erda。

