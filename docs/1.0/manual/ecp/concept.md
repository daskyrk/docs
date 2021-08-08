# 设计理念

为更好地支持边缘应用的发布和运维，平台抽象化边缘场景的相关概念，并通过底层的 OpenYurt 以云原生的方式管理，从而将 Erda 本身具有的统一发布、服务编排、监控、日志等特性带入边缘场景。

## 站点（Node Pool）
在边缘场景下，往往一个边缘应用会由若干个微服务以及少量的中间件组成，业务场景相对比较简单，但是也需要一定的稳定性，因此也是需要高可用部署，对应的底层的计算资源也就需要多台服务器。我们将这一组服务器称之为站点，站点是地域分散的，站点之间的网络是互相隔离的，ECP 通过底层的 Node Pool 资源来管理这些站点的生命周期，提供给运维工程师资源管理的功能来有效纳管分布在不同地缘的海量计算资源。

对于边缘场景下的部署来说，为了访问距离最近的 Pod，即在站点级别只访问本站点对应的 Pod，平台封装了 K8s Service Topology 特性，以实现站点级别的流量闭环。在创建边缘应用 SVC 时增加 `topologyKeys`，结合 Node Pool 的统一标签管理完成流量的站点级分发。

```
apiVersion: v1
kind: Service
metadata:
  name: ud-test
  labels:
    app: ud-test
spec:
  ports:
  - name: ud-test
    port: 80
    targetPort: 80
  selector:
    app: ud-test
  topologyKeys:
    - "topology.kubernetes.io/zone"
    # - "*"
```

## 单元化部署
不同于传统的 Kubernetes 应用，对边缘应用而言，是将传统的 Deployment 或者 StatefulSet 资源批量部署到海量的边缘站点上，也就是前文提到 Node Pool 资源，ECP 底层使用 UnitedDeployment 来描述这种边缘应用，UnitedDeployment 通过 topology 字段来描述一个 Deployment 或者 StatefulSet资源会被部署到那些 Node Pool 上以及每个 Node Pool 需要部署多少个副本，未来也可以扩展更多的站点级配置的字段，如下是一段简单的 topology 实例：
```
topology:
    pools:
    - name: beijing 
      nodeSelectorTerm:
        matchExpressions:
        - key: apps.openyurt.io/nodepool
          operator: In
          values:
          - beijing 
      replicas: 1
    - name: hangzhou 
      nodeSelectorTerm:
        matchExpressions:
        - key: apps.openyurt.io/nodepool
          operator: In
          values:
          - hangzhou 
      replicas: 2
      tolerations:
      - effect: NoSchedule
        key: apps.openyurt.io/example
        operator: Exists
```

Erda 边缘计算平台即通过底层封装 UnitedDeployment 来实现边缘应用的分发，同时解决了多个边缘应用之间的依赖问题。ECP 通过资源的监控以及日志组件实现了对边缘应用的统一监控以及统一日志采集， 同时基于 websocket 隧道实现了容器控制台的访问功能，是的对于边缘应用的运维管理可以像普通的云端应用的一样的简单高效。

## 配置集

单元化部署解决了如何将同一个应用分发到多个地域的问题。理想状态下，所有地域的应用都应该是一致的，而现实往往有地域之间存在差异的问题，例如配置门店名称、门店 Logo，甚至在某些特定场景下对接的支付渠道也会有差异。

为此，Erda 边缘计算平台采用了单元化部署，使用一个模板描述边缘应用的配置及发布范围，同时设计了配置集资源，能够将不同的配置作为环境变量下发到不同的地域中。

```
apiVersion: v1
kind: UnitConfigMap
metadata:
  name: ud-test
  namespace: default
data:
  common:
    CLUSTER_DNS: 10.96.0.3
    DICE_CLUSTER_NAME: terminus-dev
    DICE_CLUSTER_TYPE: kubernetes
  hangzhou:
    NAME: hangzhou-shop
  beijng:
    NAME: beijing-mall
```