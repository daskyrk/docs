# 版本升级

## 基于 Helm Chart 升级
::: tip 提示
v1.0.x 版本不支持升级。
:::

### 升级准备

开始 Erda 升级前，您需要完成如下准备：
- 数据备份

  建议您在升级前对 Erda 使用的 MySQL 数据库进行备份，以防升级失败造成数据丢失。
- 准备私有化配置参数或文件
  - 升级前需准备好 Erda Helm Chart 的私有化配置，可以是通过 `--set` 设置的参数或私有化配置文件。
  - 关于参数相关内容，请参见 [部署文档](helm-install.html#安装-erda)。
  - 关于私有化配置文件相关内容，请参见 [如何保存私有化配置](high-availability.html#如何保存私有化配置)。
- 准备新的 Helm Chart 包

  在已安装 Helm 的 Kubernetes Master 节点上下载新的 Erda [压缩包](https://github.com/erda-project/erda-release/releases)。

### 升级 Erda
1. 进入新版本 Erda 压缩包所在的目录。

   ```shell
   tar -xzvf erda-release-linux.tar.gz
   cd erda-release/erda-helm
   ```

2. 使用 Helm 升级 Erda。

   * 使用指定私有化配置文件升级 Erda。

     ```shell
     # 指定您的私有化配置文件，例如 custom_values.yamls
     helm upgrade** erda -f custom_values.yaml 
     ```

   * 使用私有化配置参数升级 Erda，建议通过 [私有配置文件的方式](high-availability.html#如何保存私有化配置) 管理配置。

     ```shell
     # 指定您的私有化配置参数
     helm upgrade erda --set param1=value1,param2=value2....
     ```

### 升级验证
完成 Erda 升级后，您可以通过以下方式查看升级是否成功。

- 查看 Erda 自定义资源状态是否为 `Running`。

  ```shell
  kubectl get erda erda
  ```

- 查看当前集群版本是否与目标版本一致。

  ```SHELL
  kubectl get cm dice-cluster-info -o yaml | grep -i version
  ```

  ::: tip 提示
  当前 Erda 仅支持两位版本的显示，该验证方法不适用于小版本之间的升级，例如从 v1.1.0 升级至 v1.1.1。
  :::

