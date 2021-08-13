# 高可用配置说明

使用 Erda 的 Helm chart 包部署 Erda 时，可以通过全局参数 global.size 实现不同部署模式:
* 设置 global.size 为 `demo`,则 Erda 各组件以最简方式（低资源配置、单实例副本）部署，适用于试用环境部署
* 设置 global.size 为 `prod`,则 Erda 的核心组件以高可用方式（高资源配置、多实例副本）部署，用于生产环境部署

本文档主要介绍 Erda 生产部署(`prod`部署)时的相关配置和说明。

## 高可用部署可配置参数列表

Erda 的 helm chart 中的 values.yaml 文件中定义了大量的配置参数。下表总结了高可用部署时，可以根据实际部署情况考虑修改的配置参数，以供高可用部署时参考。


| 参数 | 描述 | 默认值 |
|:----|:---|:---:|
|**Gobal**|  |  |
| golbal.size | 表示部署模式（支持`demo`和`prod`两种），高可用部署设置为‘prod’ | "prod" |
| golbal.image.repository | 设置镜像仓库地址，对于不能访问外网的用户，需要修改该配置为内网私有仓库，并在部署前将 Erda 部署所需的镜像都上传到这里设置的私有仓库中 | "registry.erda.cloud/erda" |
| golbal.image.imagePullPolicy | 设置镜像拉取策略 | "IfNotPresent" |
| golbal.image.imagePullSecrets | 如果不是从用户私有仓库拉取镜像则无需设置，否则需要设置为访问用户私有镜像仓库的 secrets |  |
| **Cassandra** |  |  |
| cassandra.capacity | 设置 cassandra 单节点存储容量,可以根据实际集群及业务量规模进行缩放 | "1000Gi" |
| cassandra.storageClassName | 设置存储卷对应的 Kubernetes storageclass 对象 | "dice-local-volume" |
| cassandra.resources.requests.cpu | 设置 cassandra 实例 Pod 的 CPU 资源请求值 | "2" |
| cassandra.resources.requests.memory | 设置 cassandra 实例 Pod 的 Memory 资源请求值 | "4Gi" |
| cassandra.resources.limits.cpu | 设置 cassandra 实例 Pod 的 CPU 资源限制值 | "4" |
| cassandra.resources.limits.memory | 设置 cassandra 实例 Pod 的 Memory 资源限制值 | "16Gi" |
| cassandra.racks | 机架名称列表（注意名称不能重复），对应机架名称列表中机架的数量就是 cassandra 节点的数量 | - name: rack1<br>- name: rack2<br>- name: rack3 |
| **ElasticSearch** |  |  |
| elasticsearch.replicas | 设置 ElasticSerarch 集群节点数量 | 3 |
| elasticsearch.capacity | 设置 ElasticSearch 单节点存储容量,可以根据实际集群及业务量规模进行缩放 | "1000Gi" |
| elasticsearch.storageClassName | 设置存储卷对应的 Kubernetes storageclass 对象 | "dice-local-volume" |
| elasticsearch.numberOfMasters | 高可用部署 ElasticSearch 集群时，可作为 Master 的 ElasticSearch 实例数量，一般至少设置为超过集群节点数量一半以避免 ElasticSearch 集群脑裂 | 2 |
| elasticsearch.javaOpts | 设置 ElasticSearch 的环境变量 JAVA_OPTS (java heap size 建议设置为 0.75 * resources.limits.memory) | "-Xms6144m -Xmx6144m" |
| elasticsearch.resources.requests.cpu | 设置 elasticsearch 实例 Pod 的 CPU 资源请求值 | "2" |
| elasticsearch.resources.requests.memory | 设置 elasticsearch 实例 Pod 的 Memory 资源请求值 | "4Gi" |
| elasticsearch.resources.limits.cpu | 设置 elasticsearch 实例 Pod 的 CPU 资源限制值 | "4" |
| elasticsearch.resources.limits.memory | 设置 elasticsearch 实例 Pod 的 Memory 资源限制值 | "8Gi" |
| **Etcd** |  |  |
| etcd.storageClassName | 设置存储卷对应的 Kubernetes storageclass 对象 | "dice-local-volume" |
| etcd.capacity | 设置 etcd 单节点存储容量,可以根据实际集群及业务量规模进行缩放 | "32Gi" |
| etcd.resources.requests.cpu | 设置 etcd 实例 Pod 的 CPU 资源请求值 | "1" |
| etcd.resources.requests.memory | 设置 etcd 实例 Pod 的 Memory 资源请求值 | "2Gi" |
| etcd.resources.limits.cpu | 设置 etcd 实例 Pod 的 CPU 资源限制值 | "4" |
| etcd.resources.limits.memory | 设置 etcd 实例 Pod 的 Memory 资源限制值 | "8Gi" |
| **Zookeeper** |  |  |
| zookeeper.storageClassName | 设置存储卷对应的 Kubernetes storageclass 对象 | "dice-local-volume" |
| zookeeper.capacity | 设置 zookeeper 单节点存储容量,可以根据实际集群及业务量规模进行缩放 | "32Gi" |
| zookeeper.resources.requests.cpu | 设置 zookeeper 实例 Pod 的 CPU 资源请求值 | "100m" |
| zookeeper.resources.requests.memory | 设置 zookeeper 实例 Pod 的 Memory 资源请求值 | "256Mi" |
| zookeeper.resources.limits.cpu | 设置 zookeeper 实例 Pod 的 CPU 资源限制值 | "1" |
| zookeeper.resources.limits.memory | 设置 zookeeper 实例 Pod 的 Memory 资源限制值 | "512Mi" |
| **Kafka** |  |  |
| kafka.storageClassName | 设置存储卷对应的 Kubernetes storageclass 对象 | "dice-local-volume" |
| kafka.capacity | 设置 kafka 单节点存储容量,可以根据实际集群及业务量规模进行缩放 | "32Gi" |
| kafka.javaOpts | 设置 kafka 的环境变量 JAVA_OPTS (java heap size 建议设置为 0.75 * resources.limits.memory) | "-Xms6144m -Xmx6144m" |
| kafka.resources.requests.cpu | 设置 kafka 实例 Pod 的 CPU 资源请求值 | "2" |
| kafka.resources.requests.memory | 设置 kafka 实例 Pod 的 Memory 资源请求值 | "4Gi" |
| kafka.resources.limits.cpu | 设置 kafka 实例 Pod 的 CPU 资源限制值 | "4" |
| kafka.resources.limits.memory | 设置 kafka 实例 Pod 的 Memory 资源限制值 | "8Gi" |
| **Kms** |  |  |
| kms.replicas | 设置 kms 实例副本数量 | 2|
| kms.resources.requests.cpu | 设置 kms 实例 Pod 的 CPU 资源请求值 | "500m" |
| kms.resources.requests.memory | 设置 kms 实例 Pod 的 Memory 资源请求值 | "1Gi" |
| kms.resources.limits.cpu | 设置 kms 实例 Pod 的 CPU 资源限制值 | "1" |
| kms.resources.limits.memory | 设置 kms 实例 Pod 的 Memory 资源限制值 | "2Gi" |
| **Mysql** |  |  |
| mysql.user | 访问 mysql 的用户 | 'erda' |
| mysql.database | 访问 mysql 的目标数据库 | 'erda' |
| mysql.password | 访问 mysql 数据库的密码 | 'password' |
| mysql.storageClassName | 设置存储卷对应的 Kubernetes storageclass 对象 | "dice-local-volume" |
| mysql.capacity | 设置 mysql 单节点存储容量，可以根据实际集群及业务量规模进行缩放 | 100Gi |
| mysql.resources.requests.cpu | 设置 kms 实例 Pod 的 CPU 资源请求值 | "500m" |
| mysql.resources.requests.memory | 设置 kms 实例 Pod 的 Memory 资源请求值 | "512Mi" |
| mysql.resources.limits.cpu | 设置 kms 实例 Pod 的 CPU 资源限制值 | "2" |
| mysql.resources.limits.memory | 设置 kms 实例 Pod 的 Memory 资源限制值 | "2Gi" |
| **Redis** |  |  |
| redis.redisFailover.redis.replicas | 设置 redis 副本数量，redis 实例之间用于主备切换 | 2 |
| redis.redisFailover.redis.resources.requests.cpu | 设置 redis Pod 的 CPU 资源请求值 | "150m" |
| redis.redisFailover.redis.resources.requests.memory | 设置 redis Pod 的 Memory 资源请求值 | "1Gi" |
| redis.redisFailover.redis.resources.limits.cpu | 设置 redis Pod 的 CPU 资源限制值 | "300m" |
| redis.redisFailover.redis.resources.limits.memory | 设置 redis Pod 的 CPU 资源限制值 | "2Gi" |
| redis.redisFailover.sentinel.replicas | 设置 redis sentinel 副本数量 | 3 |
| **Registry** |  |  |
| registry.storageClassName | 设置存储卷对应的 Kubernetes storageclass 对象 | "dice-local-volume" |
| registry.capacity | 设置 registry 单节点存储容量,可以根据实际集群及业务量规模进行缩放 | "1000Gi" |
| registry.resources.requests.cpu | 设置 registry 实例 Pod 的 CPU 资源请求值 | "500m" |
| registry.resources.requests.memory | 设置 registry 实例 Pod 的 Memory 资源请求值 | "512Mi" |
| registry.resources.limits.cpu | 设置 registry 实例 Pod 的 CPU 资源限制值 | "1" |
| registry.resources.limits.memory | 设置 registry 实例 Pod 的 Memory 资源限制值 | "1Gi" |
| registry.networkMode | 如果值为 "host" 则设置 registry 容器网络模式为 host 模式 |  |
| registry.custom.nodeName | registry 采用 host 模式部署的节点名，此时registry 会部署在该节点，并且容器网络模式为 host 模式 |  |
| registry.custom.nodeIP | registry 采用 host 模式部署时节点的 IP 地址 |  |
| **Sonar** |  |  |
| sonar.resources.requests.cpu | 设置 sonar 实例 Pod 的 CPU 资源请求值 | "750m" |
| sonar.resources.requests.memory | 设置 sonar 实例 Pod 的 Memory 资源请求值 | "1536Mi" |
| sonar.resources.limits.cpu | 设置 sonar 实例 Pod 的 CPU 资源限制值 | "1500m" |
| sonar.resources.limits.memory | 设置 sonar 实例 Pod 的 Memory 资源限制值 | "3Gi" |
| **volume-provisioner** |  |  |
| volume-provisioner.provisioner.local.path | local volume 卷使用此挂载点作为存储卷来源 | /data |
| volume-provisioner.provisioner.local.path | fs volume 卷使用此挂载点作为存储卷来源 | /netdata |
| volume-provisioner.resouces.requests.cpu | 设置 volume-provisioner 实例 Pod 的 CPU 资源请求值 | "10m" |
| volume-provisioner.resouces.requests.memory | 设置 volume-provisioner 实例 Pod 的 Memory 资源请求值 | "10Mi" |
| volume-provisioner.resouces.limits.cpu | 设置 volume-provisioner 实例 Pod 的 CPU 资源限制值 | "100m" |
| volume-provisioner.resouces.limits.memory | 设置 volume-provisioner 实例 Pod 的 Memory 资源限制值 | "256Mi" |
| **Erda** |  |  |
| erda.clusterName | erda 所在 Kubernetes 集群的标识 | "erda" |
| erda.domain | erda 当前集群绑定的泛域名 | "erda.io" |
| erda.operator.resources.requests.cpu | 设置 erda-operator 实例 Pod 的 CPU 资源请求值 | "10m" |
| erda.operator.resources.requests.memory | 设置 erda-operator 实例 Pod 的 Memory 资源请求值  | "10Mi" |
| erda.operator.resources.limits.cpu | 设置 erda-operator 实例 Pod 的 CPU 资源限制值 | "100m" |
| erda.operator.resources.limits.memory | 设置 erda-operator 实例 Pod 的 Memory 资源限制值 | "128Mi" |
| erda.clusterConfig.protocol | 声明当前 erda 集群的请求协议，http/https/http,https | http |
| erda.clusterConfig.clusterType | erda 集群标识，比如 Kubernetes, EDAS | kubernetes |
| erda.component.admin.replicas | erda admin 组件副本数 | 2 |
| erda.component.admin.resources.cpu | erda admin 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.admin.resources.mem | erda admin 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.admin.resources.max_cpu | erda admin 组件实例 Pod 的 CPU 资源限制值 | "200m" |
| erda.component.admin.resources.max_mem | erda admin 组件实例 Pod 的 Memory 资源限制值 | "256Mi" |
| erda.component.clusterManager.replicas | erda clusterManager 组件副本数 | 2 |
| erda.component.clusterManager.resources.cpu | erda clusterManager 组件实例 Pod 的 CPU 资源请求值  | "100m" |
| erda.component.clusterManager.resources.mem | erda clusterManager 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.clusterManager.resources.max_cpu | erda clusterManager 组件实例 Pod 的 CPU 资源限制值 | "200m" |
| erda.component.clusterManager.resources.max_mem | erda clusterManager 组件实例 Pod 的 Memory 资源限制值 | "256Mi" |
| erda.component.collector.replicas | erda collector 组件副本数 | 2 |
| erda.component.collector.resources.cpu | erda collector 组件实例 Pod 的 CPU 资源请求值  | "100m" |
| erda.component.collector.resources.mem | erda collector 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.collector.resources.max_cpu | erda collector 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.collector.resources.max_mem | erda collector 组件实例 Pod 的 Memory 资源限制值 | "1024Mi" |
| erda.component.coreServices.replicas | erda coreServices 组件副本数 | 2 |
| erda.component.coreServices.resources.cpu | erda coreServices 组件实例 Pod 的 CPU 资源请求值  | "100m" |
| erda.component.coreServices.resources.mem | erda coreServices 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.coreServices.resources.max_cpu | erda coreServices 组件实例 Pod 的 CPU 资源限制值 | "300m" |
| erda.component.coreServices.resources.max_mem | erda coreServices 组件实例 Pod 的 Memory 资源限制值 | "512Mi" |
| erda.component.dicehub.replicas | erda dicehub 组件副本数 | 2 |
| erda.component.dicehub.resources.cpu | erda dicehub 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.dicehub.resources.mem | erda dicehub 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.dicehub.resources.max_cpu | erda dicehub 组件实例 Pod 的 CPU 资源限制值 | "150m"  |
| erda.component.dicehub.resources.max_mem | erda dicehub 组件实例 Pod 的 Memory 资源限制值 | "1024Mi" |
| erda.component.hepa.replicas | erda hepa 组件副本数 | 2 |
| erda.component.hepa.resources.cpu | erda hepa 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.hepa.resources.mem | erda hepa 组件实例 Pod 的 Memory 资源请求值 | "512Mi" |
| erda.component.hepa.resources.max_cpu | erda hepa 组件实例 Pod 的 CPU 资源限制值 | "500m" |
| erda.component.hepa.resources.max_mem | erda hepa 组件实例 Pod 的 Memory 资源限制值 | -  |
| erda.component.monitor.replicas | erda monitor 组件副本数 | 2 |
| erda.component.monitor.resources.cpu | erda monitor 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.monitor.resources.mem | erda monitor 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.monitor.resources.max_cpu | erda monitor 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.monitor.resources.max_mem | erda monitor 组件实例 Pod 的 Memory 资源限制值 | "512Mi" |
| erda.component.msp.replicas | erda msp 组件副本数 | 2 |
| erda.component.msp.resources.cpu | erda msp 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.msp.resources.mem | erda msp 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.msp.resources.max_cpu | erda msp 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.msp.resources.max_mem | erda msp 组件实例 Pod 的 Memory 资源限制值 | "512Mi" |
| erda.component.openapi.replicas | erda openapi 组件副本数 | 2 |
| erda.component.openapi.resources.cpu | erda openapi 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.openapi.resources.mem | erda openapi 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.openapi.resources.max_cpu | erda openapi 组件实例 Pod 的 CPU 资源限制值 |"500m" |
| erda.component.openapi.resources.max_mem | erda openapi 组件实例 Pod 的 Memory 资源限制值 | "512Mi" |
| erda.component.scheduler.replicas | erda scheduler 组件副本数 | 2 |
| erda.component.scheduler.resources.cpu | erda scheduler 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.scheduler.resources.mem | erda scheduler 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.scheduler.resources.max_cpu | erda scheduler 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.scheduler.resources.max_mem | erda scheduler 组件实例 Pod 的 Memory 资源限制值 | "2048Mi" |
| erda.component.streaming.replicas | erda streaming 组件副本数 | 2 |
| erda.component.streaming.resources.cpu | erda streaming 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.streaming.resources.mem | erda streaming 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.streaming.resources.max_cpu | erda streaming 组件实例 Pod 的 CPU 资源限制值 | "1500m" |
| erda.component.streaming.resources.max_mem | erda streaming 组件实例 Pod 的 Memory 资源限制值 | "1024Mi" |
| erda.component.ui.replicas | erda ui 组件副本数 | 2 |
| erda.component.ui.resources.cpu | erda ui 组件实例 Pod 的 CPU 资源请求值 | "200m" |
| erda.component.ui.resources.mem | erda ui 组件实例 Pod 的 Memory 资源请求值 | "256Mi" |
| erda.component.ui.resources.max_cpu | erda ui 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.ui.resources.max_mem | erda ui 组件实例 Pod 的 Memory 资源限制值 | "512Mi" |
| erda.component.ucAdaptor.replicas | erda ucAdaptor 组件副本数 | 2 |
| erda.component.ucAdaptor.resources.cpu | erda ucAdaptor 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.ucAdaptor.resources.mem | erda ucAdaptor 组件实例 Pod 的 Memory 资源请求值 | "64Mi" |
| erda.component.ucAdaptor.resources.max_cpu | erda ucAdaptor 组件实例 Pod 的 CPU 资源限制值 | "200m" |
| erda.component.ucAdaptor.resources.max_mem | erda ucAdaptor 组件实例 Pod 的 Memory 资源限制值 | - |
| erda.component.uc.replicas | erda uc 组件副本数 | 2 |
| erda.component.uc.resources.cpu | erda uc 组件实例 Pod 的 CPU 资源请求值 | "10m"  |
| erda.component.uc.resources.mem | erda uc 组件实例 Pod 的 Memory 资源请求值 | "100Mi" |
| erda.component.uc.resources.max_cpu | erda uc 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.uc.resources.max_mem | erda uc 组件实例 Pod 的 Memory 资源限制值 | "2048Mi" |
| erda.component.analyzerAlert.resources.cpu | erda analyzerAlert 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.analyzerAlert.resources.mem | erda analyzerAlert 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.analyzerAlert.resources.max_cpu | erda analyzerAlert 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.analyzerAlert.resources.max_mem | erda analyzerAlert 组件实例 Pod 的 Memory 资源限制值 | "1024Mi" |
| erda.component.analyzerAlertTask.resources.cpu | erda analyzerAlertTask 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.analyzerAlertTask.resources.mem | erda analyzerAlertTask 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.analyzerAlertTask.resources.max_cpu | erda analyzerAlertTask 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.analyzerAlertTask.resources.max_mem | erda analyzerAlertTask 组件实例 Pod 的 Memory 资源限制值 | "2048Mi" |
| erda.component.analyzerErrorInsight.resources.cpu | erda analyzerErrorInsight 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.analyzerErrorInsight.resources.mem | erda analyzerErrorInsight 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.analyzerErrorInsight.resources.max_cpu | erda analyzerErrorInsight 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.analyzerErrorInsight.resources.max_mem | erda analyzerErrorInsight 组件实例 Pod 的 Memory 资源限制值 | "2048Mi" |
| erda.component.analyzerErrorInsightTask.resources.cpu | erda analyzerErrorInsightTask 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.analyzerErrorInsightTask.resources.mem | erda analyzerErrorInsightTask 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.analyzerErrorInsightTask.resources.max_cpu | erda analyzerErrorInsightTask 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.analyzerErrorInsightTask.resources.max_mem | erda analyzerErrorInsightTask 组件实例 Pod 的 Memory 资源限制值 | "2048Mi" |
| erda.component.analyzerMetrics.resources.cpu | erda analyzerMetrics 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.analyzerMetrics.resources.mem | erda analyzerMetrics 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.analyzerMetrics.resources.max_cpu | erda analyzerMetrics 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.analyzerMetrics.resources.max_mem | erda analyzerMetrics 组件实例 Pod 的 Memory 资源限制值 |  "2048Mi" |
| erda.component.analyzerMetricsTask.resources.cpu | erda analyzerMetricsTask 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.analyzerMetricsTask.resources.mem | erda analyzerMetricsTask 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.analyzerMetricsTask.resources.max_cpu | erda analyzerMetricsTask 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.analyzerMetricsTask.resources.max_mem | erda analyzerMetricsTask 组件实例 Pod 的 Memory 资源限制值 | "2048Mi" |
| erda.component.actionRunnerScheduler.resources.cpu | erda actionRunnerScheduler 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.actionRunnerScheduler.resources.mem | erda actionRunnerScheduler 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.actionRunnerScheduler.resources.max_cpu | erda actionRunnerScheduler 组件实例 Pod 的 CPU 资源限制值 | "300m" |
| erda.component.actionRunnerScheduler.resources.max_mem | erda actionRunnerScheduler 组件实例 Pod 的 Memory 资源限制值 | - |
| erda.component.clusterAgent.resources.cpu | erda clusterAgent 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.clusterAgent.resources.mem | erda clusterAgent 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.clusterAgent.resources.max_cpu | erda clusterAgent 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.clusterAgent.resources.max_mem | erda clusterAgent 组件实例 Pod 的 Memory 资源限制值 | "1024Mi" |
| erda.component.clusterDialer.resources.cpu | erda clusterDialer 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.clusterDialer.resources.mem | erda clusterDialer 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.clusterDialer.resources.max_cpu | erda clusterDialer 组件实例 Pod 的 CPU 资源限制值  | "2" |
| erda.component.clusterDialer.resources.max_mem | erda clusterDialer 组件实例 Pod 的 Memory 资源限制值 | "2048Mi" |
| erda.component.cmp.resources.cpu | erda cmp 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.cmp.resources.mem | erda cmp 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.cmp.resources.max_cpu | erda cmp 组件实例 Pod 的 CPU 资源限制值 | "200m" |
| erda.component.cmp.resources.max_mem | erda cmp 组件实例 Pod 的 Memory 资源限制值 | - |
| erda.component.dop.resources.cpu | erda dop 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.dop.resources.mem | erda dop 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.dop.resources.max_cpu | erda dop 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.dop.resources.max_mem | erda dop 组件实例 Pod 的 Memory 资源限制值 | "2048Mi" |
| erda.component.eventbox.resources.cpu | erda eventbox 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.eventbox.resources.mem | erda eventbox 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.eventbox.resources.max_cpu | erda eventbox 组件实例 Pod 的 CPU 资源限制值 | "2" |
| erda.component.eventbox.resources.max_mem | erda eventbox 组件实例 Pod 的 Memory 资源限制值 | "2560Mi" |
| erda.component.filebeat.resources.cpu | erda filebeat 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.filebeat.resources.mem | erda filebeat 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.filebeat.resources.max_cpu | erda filebeat 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.filebeat.resources.max_mem | erda filebeat 组件实例 Pod 的 Memory 资源限制值 | "512Mi" |
| erda.component.gittar.resources.cpu | erda gittar 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.gittar.resources.mem | erda gittar 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.gittar.resources.max_cpu | erda gittar 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.gittar.resources.max_mem | erda gittar 组件实例 Pod 的 Memory 资源限制值 | "1536Mi" |
| erda.component.pipeline.resources.cpu | erda pipeline 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.pipeline.resources.mem | erda pipeline 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.pipeline.resources.max_cpu | erda pipeline 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.pipeline.resources.max_mem | erda pipeline 组件实例 Pod 的 Memory 资源限制值 | "1536Mi" |
| erda.component.telegraf.resources.cpu | erda telegraf 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.telegraf.resources.mem | erda telegraf 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.telegraf.resources.max_cpu | erda telegraf 组件实例 Pod 的 CPU 资源限制值 | "500m" |
| erda.component.telegraf.resources.max_mem | erda telegraf 组件实例 Pod 的 Memory 资源限制值 | "512Mi" |
| erda.component.telegrafApp.resources.cpu | erda telegrafApp 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.telegrafApp.resources.mem | erda telegrafApp 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.telegrafApp.resources.max_cpu | erda telegrafApp 组件实例 Pod 的 CPU 资源限制值 | "500m" |
| erda.component.telegrafApp.resources.max_mem | erda telegrafApp 组件实例 Pod 的 Memory 资源限制值 | "512Mi" |
| erda.component.telegrafPlatform.resources.cpu | erda telegrafPlatform 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.telegrafPlatform.resources.mem | erda telegrafPlatform 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.telegrafPlatform.resources.max_cpu | erda telegrafPlatform 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.telegrafPlatform.resources.max_mem | erda telegrafPlatform 组件实例 Pod 的 Memory 资源限制值 | "1536Mi" |
| erda.component.orchestrator.resources.cpu | erda orchestrator 组件实例 Pod 的 CPU 资源请求值 | "100m" |
| erda.component.orchestrator.resources.mem | erda orchestrator 组件实例 Pod 的 Memory 资源请求值 | "128Mi" |
| erda.component.orchestrator.resources.max_cpu | erda orchestrator 组件实例 Pod 的 CPU 资源限制值 | "1" |
| erda.component.orchestrator.resources.max_mem | erda orchestrator 组件实例 Pod 的 Memory 资源限制值 | "256Mi" |

## 核心数据存储组件高可用配置建议  

针对不同节点规模的集群，高可用配置中对于 Cassandra、ElasticSearch、Kafka 等存储组件的参数配置可以参考下表：

| 集群规模 | 0～50 nodes | 50～100 nodes | 100～200 nodes | 200～300 nodes | 300+ nodes |
|:---|:---:|:---:|:---:|:---:|:---:|
| **Cassandra**|  |  |  |  |  |
| cassandra.resources.requests.cpu| "1" | "2" | "4" | "4" | "4" |
| cassandra.resources.requests.memory | "6Gi" | "12Gi" | "16Gi" | "16Gi" | "16Gi" |
| cassandra.resources.limits.cpu| "2" | "4" | "6" | "6" | "6" |
| cassandra.resources.limits.memory | "12Gi" | "16Gi" | "24Gi" | "24Gi" | "24Gi" |
| cassandra.capacity | 512G | 1T | 1.5T | 1.5T | 2T |
| cassandra.racks | - name: rack1<br>- name: rack2<br>- name: rack3 | - name: rack1<br>- name: rack2<br>- name: rack3 | - name: rack1<br>- name: rack2<br>- name: rack3 | - name: rack1<br>- name: rack2<br>- name: rack3<br>- name: rack4<br>- name: rack5 | - name: rack1<br>- name: rack2<br>- name: rack3<br>- name: rack4<br>- name: rack5<br>- name: rack6<br>- name: rack7 |
| **ElasticSearch**|  |  |  |  |  |
| elasticsearch.resources.requests.cpu| "1" | "2" | "4" | "4" | "4" |
| elasticsearch.resources.requests.memory | "4Gi" | "8Gi" | "16Gi" | "16Gi" | "16Gi" |
| elasticsearch.resources.limits.cpu| "2" | "4" | "6" | "6" | "6" |
| elasticsearch.resources.limits.memory | "8Gi" | "16Gi" | "24Gi" | "24Gi" | "24Gi" |
| elasticsearch.capacity | 512G | 768G | 1T | 1.5T | 1.5T |
| elasticsearch.replicas | 3 | 3 | 3 | 3 | 5 |
| elasticsearch.numberOfMasters | 2 | 2 | 2 | 2 | 3|
| **Kafka**|  |  |  |  |  |
| kafka.resources.requests.cpu| "0.5" | "1" | "1" | "1" | "2" |
| kafka.resources.requests.memory | "1Gi" | "2Gi" | "2Gi" | “2Gi" | "4Gi" |
| kafka.resources.limits.cpu| "1" | "2" | "2" | "2" | "4" |
| kafka.resources.limits.memory | "2Gi" | "4Gi" | "4Gi" | "4Gi" | "8Gi" |
| kafka.capacity | 150G | 150G | 200G | 300G | 300G |





## 如何接入已有中间件
Erda 部署时包含大量中间件类组件，如 ElasticSearch、Mysql、Kafka、镜像仓库 Registry 等。对于部分中间件，用户的部署环境中可能已有可以直接访问的实例，因此可以通过设置特定参数实现无需部署对应的中间件组件，直接使用已有中间件。

**注意**：当前版本支持接入外部 Mysql，对其他常用中间件（如 Kafka、ElasticSearch）的接入后续会陆续支持。

### 接入外部 Mysql
如需接入外部 Mysql，可以通过修改 Erda 的 chart 包的 values.yaml 增加如下字段设置实现:

```yaml
mysql:
  custom:
    address:      #  eg: 192.168.100.100
    port:         #  eg: 3306
    database:     #  eg: erda
    user:         #  eg: root
    password:     #  eg: HasdDwqwe23#

```
通过加入以上配置，在 Erda 部署过程中就不再部署 Mysql 组件，Erda 组件直接使用用户提供的 Mysql 数据库。

具体参数解释如下：

| 参数 | 描述 | 默认值 |
|:----|:---|:---:|
| mysql.custom.address | 接入用户提供的 mysql 主机地址 |  |
| mysql.custom.port | 接入用户提供的 mysql 主机端口 |  |
| mysql.custom.databases | 接入用户提供的 mysql 数据库 |  |
| mysql.custom.user | 接入用户提供的 mysql 数据库的访问用户名 |  |
| mysql.custom.password | 接入用户提供的 mysql 数据库的访问用户名对应的访问密码 |  |




# 补充说明

## 如何根据部署模式（demo 或 prod）设置相关参数配置？

demo 部署模式的相关参数配置是经过测试验证的有效配置，原则上无需调整即可安装且功能正常。

由于 demo 模式 和 prod 模式部署安装使用的是相同的 helm chart，对应的 values.yaml 中变量置空以确保 demo 部署模式和 prod 部署模式都能使用对应的默认值。如果需要修改 demo 模式的相关参数配置，可以通过修改 helm chart 的  values.yaml 文件来设置 demo 相关配置参数。但需要注意的是：
* 如果想使用默认 demo 设置，必须将 values.yaml 文件中对应的参数置空
* 如果想采用默认 prod 部署，必须将  values.yaml 文件中对应的参数置空
* 如果想自定义 demo 设置，请合理设置 values.yaml 文件中对应的参数值，确保资源足够 Erda 所有组件部署成功
* 如果想自定义 prod 设置，请合理设置 values.yaml 文件中对应的参数值，确保配置合理以满足高并发高吞吐量需求

## 如何保存私有化配置

虽然直接使用 values.yaml 文件中的参数配置部署 helm chart 包是最简单的部署方式，但仍然存在可能无法满足用户需求的情况。此时，用户可以有三个选择来设置调整参数配置：
* 方式一：执行 helm 安装/升级 时，使用 --set 参数设置参数值
    * 缺点：--set 选项无法持久化配置，可能导致升级操作与安装操作参数设置不一致的情况
* 修改 helm chart 包中的  values.yaml 文件中的参数值
    * 缺点：参数量大、参数多的情况下，参数是否需要更改、参数是否已经更改难以快速确定
* 将用户希望修改的参数变量写入到自定义配置的 custom_values.yaml 文件，执行 helm 安装/升级 时，使用 -f 参数指定自定义配置文件 custom_values.yaml
    * 推荐的保存私有化配置信息的方案


## Erda 离线部署所需镜像列表

以下是 Erda 部署所需镜像列表，对于不能访问外网的用户，可以获取相应镜像之后上传到私有镜像仓库。然后修改 erda 的 helm chart 包的 gloabl.image.repository 来从私有仓库获取镜像，完成安装。具体镜像列表如下：
* registry.erda.cloud/erda/cassandra-operator:v1.1.3-release
* registry.erda.cloud/erda/addon-kms:1.0.0-20200608-f11445f
* registry.erda.cloud/erda/redis-operator:1.0.0-20200723-1a7a9f14
* registry.erda.cloud/erda/addon-sonar:8.4.2
* registry.erda.cloud/erda/dice-operator:v1.1-f08d3a78-20210728
* registry.erda.cloud/erda/addon-elasticsearch:6.2.4
* registry.erda.cloud/erda/kubedb-busybox:1.0.0
* registry.erda.cloud/erda/erda-etcd:3.3.15-0
* registry.erda.cloud/erda/addon-kafka:1.1.0-20210323-be01a9b
* registry.erda.cloud/erda/erda-mysql:5.7.34
* registry.erda.cloud/erda/addon-redis:3.2.12
* registry.erda.cloud/erda/addon-registry:2.7.1
* registry.erda.cloud/erda/addon-zookeeper:3.4.13-monitor
* registry.erda.cloud/erda/instaclustr-icarus:1.0.9
* registry.erda.cloud/erda/init-image:20210730-ca1833c
* registry.erda.cloud/erda/erda:1.1-20210801-b21ed4e
* registry.erda.cloud/erda/erda:4.0-20210521-3a995ee
* registry.erda.cloud/erda/ui-ce:1.1-20210801-4d7018ba6a91ad4d334b7a23caf0889cc240f4ea
* registry.erda.cloud/erda/erda-analyzer-alert:1.1.0-20210801-a274c27
* registry.erda.cloud/erda/erda-analyzer-error-insight:1.1.0-20210801-a274c27
* registry.erda.cloud/erda/uc:dice-4.0-20210630-f4d63b99
* registry.erda.cloud/erda/terminus/telegraf:4.0-20210801-ee49757
* registry.erda.cloud/erda/terminus/filebeat:4.0.0-20210801-02ea6b8
* registry.cn-shanghai.aliyuncs.com/viper/etcd_ssl_gen:v0.2.0
* registry.cn-shanghai.aliyuncs.com/viper/dop:v1.1
