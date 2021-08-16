# 基于 Helm 在 Kubernetes 中安装

本节主要包含如下几个部分：

- 先决条件：介绍需要的环境依赖
- 前置操作：介绍先决条件中涉及的一些依赖项的安装、部署指引
- 安装 Erda
    - 安装: 通过 helm 命令一键安装 Erda
    - 验证安装: 通过检查 Erda 组件及资源对象的创建情况判断安装操作是否完成
- 配置访问 Erda 平台

其中，Erda 安装包含两种模式:

- demo: 极简试用模式，Erda 组件全部单副本方案部署
- prod: 生产环境使用模式，Erda 核心组件及重要组件采用多副本高可用方案部署



## 先决条件

- 硬件资源配置(其中资源数据不包含运行 Kubernetes 组件所需的资源)

  |               |         demo（1～10 nodes）         | prod（3～50 nodes） | prod（51～100 nodes） | prod（101～200 nodes） | prod（201～300 nodes） | prod（300+ nodes） |
  | :-----------: | :---------------------------------: | :-----------------: | :-------------------: | :--------------------: | :--------------------: | :----------------: |
  |      CPU      |                  8                  |         32          |          48           |           64           |           80           |         96         |
  | Memory（GB）  |                 32                  |         96          |          128          |          192           |          288           |        336         |
  | Storage（GB） |                 400                 |        4000         |         6000          |         12000          |         16000          |       22500        |
  |   推荐配置    | 规模: 2 节点 <br> 规格: 4C/16G/200G |          /          |           /           |           /            |           /            |         /          |


- Kubernetes 1.16 - 1.20
    - 安装 [ingress controller](https://kubernetes.io/zh/docs/concepts/services-networking/ingress-controllers/) 组件
- Docker 19.03 +
- CentOS 7.4 +
- Helm 3 +
- 泛域名(可选项，通过 Kubernetes Ingress 配置域名来访问 Erda 平台，如 *.erda.io)



## 前置操作

- 您的 Kubernetes 集群中需要执行如下必要的前置操作（如已具备则无需执行）

    - 请确保 Kubernetes 集群的 Master 节点的 `~/.kube/` 路径下有 **kubeconfig** 文件, 并且可以使用 `kubectl` 访问集群

    - 执行安装 Erda 操作所在的 Kubernetes Master 节点已安装 Helm 3+ （以 3.5.2 版本为例）

        ```shell
        # 下载 helm 安装包
        wget https://get.helm.sh/helm-v3.5.2-linux-amd64.tar.gz
        
        # 解压安装包
        tar -xvf helm-v3.5.2-linux-amd64.tar.gz
        
        # 安装 helm 3.helm在解压后的目录 linux-amd64中找到 helm 二进制文件，然后将其移至所需的目标位置
        mv linux-amd64/helm /usr/local/bin/helm
        
        # erda chart 包直接在本地解压文件中，无需添加 repo， helm 添加 repo 等操作请参考官方文档  
        ```

- 修改 docker daemon 文件中的 `insecure-registries` 字段

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

- 在安装了 Helm 的 Kubernetes Master 节点上下载 Erda [压缩包](https://github.com/erda-project/erda-release/releases) 并解压

  > **Note**: 当前仅支持 Linux 系统

  ```shell
  tar -xzvf erda-release-linux.tar.gz
  cd erda-release
  ```

- 在每个节点上设置 NFS 作为网络共享存储

    - 如您有如阿里云的网络共享存储您可以用如下命令将其设置在**每台节点**上:

      ```shell
      mount -t <storage_type> <your-share-storage-node-ip>:<your-share-storage-dir> /netdata
      
      # 举例如下：假设您拥有阿里云 NAS v4 服务作为共享网络存储，阿里云 NAS 的 Host 为 file-system-id.region.nas.aliyuncs.com 您需要通过如下命令挂载目录:
      
      mount -t nfs -o vers=4,minorversion=0,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport file-system-id.region.nas.aliyuncs.com:/ /netdata
      ```

    - 否则您需要执行如下脚本，它会协助安装 NFS 组件，在当前节点上创建 `/netdata` 文件夹并将其挂载到剩余的节点上

      ```shell
      cd erda-helm/
      bash scripts/storage_prepare.sh
      ```



## 安装 Erda

> **Note:** 当前版本 Erda 仅支持安装在 default namespace

### Demo 模式安装

通过 Helm 安装 Erda ，并且等待所有的 Erda 组件准备就绪

```shell
cd erda-release/erda-helm

# 指定 Erda 集群名称, erda.clusterName=erda-test
# 指定 Erda 平台的泛域名, erda.domain=erda.io
helm install erda erda --set erda.clusterName="erda-demo",erda.domain="erda.io"
```

**注意：** 如果您在 **Kubernetes 节点上无法直接访问 Kubernetes 内部域名**  (比如：kubernetes.default.svc.cluster.local )，需要安装 Erda 时指定一台 Node 以 `hostNework` 安装 Registry , 并且 `--set registry.custom.nodeIP="",registry.custom.nodeName=""`  参数 ，**否则您将无法使用流水线**



### Prod 模式安装

Prod 模式部署 Erda，我们提供了适用于生产环境的默认配置，但是需要您注意以下几点：

- MySQL 不支持高可用，我们建议您接入自己的 MySQL 或 云服务商 RDS 以保证稳定性，请参考 [接入外部 MySQL](high-availability.html#接入外部-mysql)

- 我们强烈建议您保存私有化配置，方便后续的升级维护，请参考 [如何保存私有化配置](high-availability.html#如何保存私有化配置)

- 我们提供了 Erda 及依赖的配置参数，您可以根据实际部署情况修改部署参数，请参考[高可用部署可配置参数列表](high-availability.html#高可用部署可配置参数列表)



参考示例如下：

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

指定上述文件进行安装

```SHELL
helm install erda erda -f custom_values.yaml
```



### 验证安装

Erda 安装完成后，您可以通过如下命令验证 Erda 安装结果

- 验证 Erda 状态

```SHELL
# kubectl get erda erda
NAME   STATUS    LASTMESSAGE
erda   Running   create dice cluster success
```

- 验证 Erda 依赖
  - erda-cassandra-*-*: Erda 后端的 Cassandra 集群实例，由 Cassandra Operator 通过 CassandraCluster 对象创建，demo 模式部署时名称为 erda-cassandra-dc1-rack1 
  - erda-elasticsearch: Erda 后端的 ElasticSearch 集群实例
  - erda-etcd-*: Erda 的后端 Etcd 集群节点实例，demo 模式部署时名称为 erda-etcd
  - erda-zookeeper-*: Erda 的后端 Zookeeper 集群节点实例，demo 模式部署时名称为 erda-zookeeper
  - erda-kafka-*: Erda 的后端 Kafka 集群节点实例，demo 模式部署时名称为 erda-kafka
  - erda-mysql: Erda 的后端 mysql 实例，暂不支持高可用部署方案
  - erda-registry: Erda 的后端 registry 实例，暂不支持高可用部署方案
  - rfr-erda-redis: Erda 的后端 RedisFailover 部署的 Redis 集群中 Redis 主备集群实例

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



## Erda 平台的配置及访问

安装完成 Erda 后，您需要进行一些简单的配置

### 推送 Erda 扩展组件

您需要执行如下命令用于推送 Erda 扩展组件（扩展组件将作为一种插件被用于流水线）

```
cd erda-release/erda-helm

export ERDA_ADMIN_USERNAME=admin
export ERDA_ADMIN_PASSWORD=password123456

bash scripts/push-ext.sh
```



### 域名配置

如果有真实的泛域名，您需要进行域名配置，将该域名的访问流量导入 Kubernetes 集群的 Ingress Controller，让集群中配置的 Ingress 域名能正常访问。如果没有真实的泛域名, 您需要在浏览器所在的机器上将下列的 URL 写到 `etc/hosts` 文件中，请将下面的示例 IP 替换为该 Kubernetes 集群的 Ingress Controller 的入口 IP

举个例子，假设您的 Kubernetes 集群的 Ingress Controller 的入口 IP 为 10.0.0.1，泛域名(ERDA_GENERIC_DOMAIN 变量中设置)为 `erda.io`, 需要将下列的信息写入到 `/etc/hosts` 文件中

```
10.0.0.1 collector.erda.io
10.0.0.1 openapi.erda.io
10.0.0.1 uc.erda.io
10.0.0.1 erda.io
```



### 访问平台

通过配置的域名，访问 Erda 平台并注册用户登录

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/98b75395-4055-4f38-83b3-381936281dde.png)

此时可以根据平台引导快速创建一个属于您的[组织](../quick-start/premise.html#组织)

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/bfb9bf44-625d-4e8b-94e2-89d47b579095.png)

组织创建完成后，您需要将创建好的组织名称作为标签设置到您希望被 Erda 托管的所有 Kubernetes 节点上

```
kubectl label node <node_name> dice/org-<orgname>=true --overwrite
```

​    

在创建项目之前，您需要先将 Erda 平台所在的 Kubernetes 集群进行导入

> **Note：** 入口：多云管理平台 -》资源管理 -》集群管理

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/13/e205320d-d73e-4a7c-b2e4-8b15e8e7b86c.png)

导入[集群](../quick-start/premise.html#集群)时，您界面中填写的配置需要与安装时指定的配置**保持一致**，比如图中，集群标识为 `erda-demo`，泛域名为 `erda.io`, 并采用 Kubeconfig 作为认证方式

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/6ec45959-7d02-43e7-82c0-0dc49f8f0dd9.png)

集群导入完成后，可以在集群管理页面看到您当前集群的状态，可以从集群总览页面看到当前集群的监控信息

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/03fa7584-fa65-4a47-bcce-cff44d6d5c71.png)

在创建[项目](../quick-start/premise.html#项目)之前，您需要对节点进行标签设置，用于 Erda 的节点标签调度，请参考[节点标签设置](../cmp/guide/cluster/cluster-node-labels.html)

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/d816f4b0-cf85-4b5e-a5a4-d17e96488f90.png)



此时，您可以根据引导创建您的第一个项目， [开始您的Erda 之旅](../quick-start/newbie.html)

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/12/dbddabe5-2468-4de7-bdd0-84675448afcb.png)