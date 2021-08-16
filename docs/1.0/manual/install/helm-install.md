# 基于 Helm 在 Kubernetes 中安装

## 前提条件

### 安装要求

- 硬件资源配置（不含运行 Kubernetes 组件所需资源）

  | 规格          | Demo（1～10 节点）                        | Prod（3～50 节点） | Prod（51～100 节点） | Prod（101～200 节点） | Prod（201～300 节点） | Prod（300+ 节点） |
  | ------------- | :---------------------------------------- | :----------------- | :------------------- | :-------------------- | :-------------------- | :---------------- |
  | CPU（核）     | 8                                         | 32                 | 48                   | 64                    | 80                    | 96                |
  | Memory（GB）  | 32                                        | 96                 | 128                  | 192                   | 288                   | 336               |
  | Storage（GB） | 400                                       | 4000               | 6000                 | 12000                 | 16000                 | 22500             |
  | 推荐配置      | 规模：2 节点 <br>规格： 4 核/16 GB/200 GB | /                  | /                    | /                     | /                     | /                 |


- Kubernetes 1.16～1.20（安装 [Ingress Controller](https://kubernetes.io/zh/docs/concepts/services-networking/ingress-controllers/) 组件）
- Docker 19.03 及以上
- CentOS 7.4 及以上
- Helm 3 及以上
- 泛域名（可选，通过 Kubernetes Ingress 配置域名以访问 Erda 平台，例如 **.erda.io*）

### 操作指引

1. 在 Kubernetes 集群中执行如下操作（如已具备则无需执行）：

   * 确认 Master 节点的 `~/.kube/` 路径下有 kubeconfig 文件，并且可以使用 `kubectl` 访问集群。

   * 确认 Master 节点下已安装 Helm（以 3.5.2 版本为例）。

     ```shell
     # 下载 helm 安装包
     wget https://get.helm.sh/helm-v3.5.2-linux-amd64.tar.gz
     
     # 解压安装包
     tar -xvf helm-v3.5.2-linux-amd64.tar.gz
     
     # 安装 helm 3.helm在解压后的目录 linux-amd64中找到 helm 二进制文件，然后将其移至所需的目标位置
     mv linux-amd64/helm /usr/local/bin/helm
     
     # erda chart 包直接在本地解压文件中，无需添加 repo， helm 添加 repo 等操作请参考官方文档  
     ```

2. 修改 `docker/daemon` 文件中的 `insecure-registries` 字段。

   ```shell
   # 在*每台节点*上编辑 /etc/docker/daemon.json 文件
   ...
   "insecure-registries": [
     "0.0.0.0/0"
   ],
   ...
   
   # 重启 docker daemon
   systemctl restart docker
   ```

3. 在已安装 Helm 的 Kubernetes Master 节点上下载 Erda [压缩包](https://github.com/erda-project/erda-release/releases) 并解压。

   ```shell
   tar -xzvf erda-release-linux.tar.gz
   cd erda-release
   ```

   ::: tip 提示
   当前仅支持 Linux 系统。
   :::

4. 在每个节点上设置 NFS 作为网络共享存储。

   * 如您已有网络共享存储（如阿里云），请执行如下命令将其设置在各节点上：

     ```shell
     mount -t <storage_type> <your-share-storage-node-ip>:<your-share-storage-dir> /netdata
     
     # 举例如下：假设您拥有阿里云 NAS v4 服务作为共享网络存储，阿里云 NAS 的 Host 为 file-system-id.region.nas.aliyuncs.com 您需要通过如下命令挂载目录:
     
     mount -t nfs -o vers=4,minorversion=0,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport file-system-id.region.nas.aliyuncs.com:/ /netdata
     ```

   * 如没有网络共享存储，请执行如下脚本。该脚本将协助安装 NFS 组件，在当前节点上创建 `/netdata` 文件夹并将其挂载到其余节点上。

     ```shell
     cd erda-helm/
     bash scripts/storage_prepare.sh
     ```

## 安装步骤

::: tip 提示
当前版本 Erda 仅支持安装在 `default namespace` 下。
:::

### Demo 模式安装

Demo 为极简试用模式，Erda 组件将全部以单副本方案部署。

请通过 Helm 安装 Erda ，并等待所有 Erda 组件准备就绪。

```shell
cd erda-release/erda-helm

# 指定 Erda 集群名称, erda.clusterName=erda-test
# 指定 Erda 平台的泛域名, erda.domain=erda.io
helm install erda erda --set erda.clusterName="erda-demo",erda.domain="erda.io"
```

::: tip 提示
如果您在 Kubernetes 节点上无法直接访问 Kubernetes 内部域名 （例如 *kubernetes.default.svc.cluster.local*），安装 Erda 时需指定一个 Node 以 `hostNework` 安装 Registry，并且 `--set registry.custom.nodeIP="",registry.custom.nodeName=""`  参数，否则您将无法使用流水线功能。
:::

### Prod 模式安装

Prod 为生产环境使用模式，Erda 的核心组件及重要组件均采用多副本高可用方案部署。

该模式将提供适用于生产环境的默认配置，但请注意以下几点：

- MySQL 不支持高可用，建议您接入自己的 MySQL 或云服务商 RDS 以保证稳定性，具体请参见 [接入外部 MySQL](high-availability.html#如何接入已有中间件)。

- 建议您妥善保存私有化配置，以便后续升级维护，具体请参见 [如何保存私有化配置](high-availability.html#如何保存私有化配置)。

- 默认已提供 Erda 及依赖的配置参数，您可以根据实际部署情况修改，具体请参见 [高可用部署可配置参数列表](high-availability.html#高可用部署可配置参数)。

具体参考示例如下：

```yaml
vim custom_values.yaml

# 指定 Prod 模式安装
global:
  size: prod
# 配置 Erda 集群名及泛域名
erda:
  clusterName: "erda-prod"domain: "erda.io"
# 指定 Registry 安装的节点信息
registry:
  custom:
    nodeIP: 172.16.0.6
    nodeName: cn-hangzhou.172.16.0.6
# 配置指定外部 MySQL 信息
mysql:
  enbaled: false
  custom:
    address: "rds.xxx.com"
    port: "3306"
    database: "erda"
    user: "erda"
    password: "********"
```

指定上述文件进行安装。

```SHELL
helm install erda erda -f custom_values.yaml
```

### 验证安装

您可以通过如下命令验证 Erda 安装结果：

- 验证 Erda 状态

  ```shell
  # kubectl get erda erda
  NAME   STATUS    LASTMESSAGE
  erda   Running   create dice cluster success
  ```

- 验证 Erda 依赖
  - **erda-cassandra--**：Erda 后端的 Cassandra 集群实例，由 Cassandra Operator 通过 CassandraCluster 对象创建，以 Demo 模式部署时名称为 erda-cassandra-dc1-rack1。
  - **erda-elasticsearch**：Erda 后端 Elasticsearch 集群实例。
  - **erda-etcd-***：Erda 后端的 etcd 集群节点实例，以 Demo 模式部署时名称为 erda-etcd。
  - **erda-zookeeper-***：Erda 后端的 Zookeeper 集群节点实例，以 Demo 模式部署时名称为 erda-zookeeper。
  - **erda-kafka-***：Erda 后端的 Kafka 集群节点实例，以 Demo 模式部署时名称为 erda-kafka。
  - **erda-mysql**：Erda 后端的 MySQL 实例，暂不支持高可用部署方案。
  - **erda-registry**：Erda 后端的 Registry 实例，暂不支持高可用部署方案。
  - **rfr-erda-redis**：Erda 后端 RedisFailover 部署的 Redis 主备集群实例。
  
  ```shell
  # kubectl  get statefulset
  NAME                       READY   AGE
  erda-cassandra-dc1-rack1   1/1     12h
  erda-cassandra-dc1-rack2   1/1     12h
  erda-cassandra-dc1-rack3   1/1     12h
  erda-elasticsearch         3/3     12h
  erda-etcd-0                1/1     12h
  erda-etcd-1                1/1     12h
  erda-etcd-2                1/1     12h
  erda-kafka-1               1/1     12h
  erda-kafka-2               1/1     12h
  erda-kafka-3               1/1     12h
  erda-mysql                 1/1     12h
  erda-registry              1/1     12h
  erda-zookeeper-1           1/1     12h
  erda-zookeeper-2           1/1     12h
  erda-zookeeper-3           1/1     12h
  rfr-erda-redis             2/2     12h
  ```

## 配置及访问

完成 Erda 安装后，您需要进行一些简单的配置。

### 推送 Erda 扩展组件

请执行如下命令以推送 Erda 扩展组件（扩展组件将作为一种插件用于流水线中）。

```
cd erda-release/erda-helm

export ERDA_ADMIN_USERNAME=admin
export ERDA_ADMIN_PASSWORD=password123456

bash scripts/push-ext.sh
```

### 配置域名

如果已有真实的泛域名，您需要进行域名配置，将该域名的访问流量导入 Kubernetes 集群的 Ingress Controller，从而能够正常访问集群中配置的 Ingress 域名。

如果没有真实的泛域名，您需要在浏览器所在的机器上将下列 URL 写入 `etc/hosts` 文件，并将示例 IP 替换为该 Kubernetes 集群的 Ingress Controller 入口 IP。

例如，Kubernetes 集群的 Ingress Controller 入口 IP 为 10.0.0.1，泛域名（ERDA_GENERIC_DOMAIN 变量中设置）为 *erda.io*，则需写入 `/etc/hosts` 文件的信息如下：

```
10.0.0.1 collector.erda.io
10.0.0.1 openapi.erda.io
10.0.0.1 uc.erda.io
10.0.0.1 erda.io
```

### 访问平台

1. 通过配置的域名，访问 Erda 平台并注册登录。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/16/e0b27dee-541a-4c31-b8c9-5c9d894b0691.png)

2. 根据平台引导快速创建一个属于您的 [组织](../quick-start/premise.html#组织)。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/16/227b6df6-2613-4c01-9952-b91d770b0468.png)

3. 完成组织创建后，您需要在受 Erda 托管的所有 Kubernetes 节点上，设置该组织名称为标签。

   ```
   kubectl label node <node_name> dice/org-<orgname>=true --overwrite
   ```

   * 导入 Erda 平台所在的 Kubernetes 集群。

     * 进入 **多云管理平台 > 资源管理 > 集群管理**，选择 **导入已创建的 Erda Kubernetes 集群**。

     ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/16/42d94b90-76fe-4280-823e-c93841f50f40.png)

     * 根据界面提示完成配置，配置需与安装时指定的配置保持一致，例如集群标识为 erda-demo，泛域名为 *erda.io*，并选择认证方式为 **Kubeconfig**。

     ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/16/f27b8a4b-89dd-41a7-ac3d-88e3f49bf302.png)

     * 完成集群导入后，可在 **集群管理** 页面查看当前集群状态，在 **集群总览** 页面查看当前集群的监控信息。

     ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/16/3a90a6ae-8b5e-4262-83f6-05815f99b75f.png)

   * 设置节点标签，用于 Erda 的节点标签调度，具体请参见 [节点标签设置](../cmp/guide/cluster/cluster-node-labels.html)。

     ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/16/aeb9e652-3419-443c-98e0-a553032a450a.png)

4. 根据引导创建第一个项目， [开始您的Erda 之旅](../quick-start/newbie.html)。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/16/be1e15fc-6ecb-439d-a35c-68efed40bef3.png)