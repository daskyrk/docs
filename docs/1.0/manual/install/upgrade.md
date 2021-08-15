# 版本升级

## 基于 Helm Chart 升级 Erda
> **Note:** v1.0.x 版本不支持升级

### 升级准备
在 Erda 升级前，我们需要您进行如下准备
- 数据备份
  - 我们推荐您在升级前对 Erda 使用的 MySQL 数据库进行数据备份，以防升级失败造成数据丢失
- 准备私有化配置参数或文件
  - 升级前需要您提前准备好您对 Erda Helm Chart 的私有化配置，可能是通过 `--set` 设置的参数或私有化配置文件
  - 参数您可以参考 [部署文档](helm-install.html#安装-erda)
  - 私有化配置文件您可以参考 [如何保存私有化配置](high-availability.html#如何保存私有化配置)
- 准备新的 Helm Chart 包
  - 在安装了 Helm 的 Kubernetes Master 节点上下载新的 Erda [压缩包](https://github.com/erda-project/erda-release/releases)

### 升级 Erda
- 进入到新的 Erda 压缩包所在的目录
```shell
tar -xzvf erda-release-linux.tar.gz
cd erda-release/erda-helm
```
- 使用 Helm 升级 Erda
  - 使用指定私有化配置文件升级 Erda
    
    ```shell
    # 指定您的私有化配置文件，比如 custom_values.yamls
    helm upgrade** erda -f custom_values.yaml 
    ```

  - 使用私有化配置参数升级 Erda, 推荐您使用[私有配置文件的方式](high-availability.html#如何保存私有化配置)管理您的配置

    ```shell
    # 指定您的私有化配置参数
    helm upgrade erda --set param1=value1,param2=value2....
    ```
### 升级验证
Erda 升级完成后，您可以通过以下步骤查看升级是否成功

- 查看 Erda 自定义资源状态是否为 `Running`

  ```shell
  kubectl get erda erda
  ```

- 查看当前集群的版本是否与目标版本一致

  ```SHELL
  kubectl get cm dice-cluster-info -o yaml | grep -i version
  ```

  > **Note:** 当前 Erda 只支持两位版本的显示，该验证方法不适用于小版本之间的升级，比如 v1.1.0 升级至 v1.1.1



