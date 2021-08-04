# 设计理念

为更好地支持边缘应用的发布和运维，平台抽象化边缘场景的相关概念，并通过底层的 OpenYurt 以云原生的方式管理，从而将 Erda 本身具有的统一发布、服务编排、监控、日志等特性带入边缘场景。

## 站点（Node Pool）
在边缘场景下，边缘节点一般具有明显的地域性，或是其他逻辑上的分组特性。不同分组的节点间通常存在网络不互通、资源不共享、资源异构、应用独立等隔离属性，这也是站点（Node Pool）的由来。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/23/4a869d82-5ac1-443e-87e1-fdc883c06710.png)

不同站点的节点会共享一个 Kubernetes 网络平面。理想状态下，同一个应用的流量应该在一个站点中闭环。在 K8s 中，Service 可以为 Pod 做均衡负载，访问 Service 时流量会被均衡地调度到后端的 Pod 中。

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
不同于传统应用，边缘应用需要将相同的应用分发到多个地域的计算节点上。以 Deployment 为例，传统的做法是将同一地域的计算节点设置相同的 Label，再建立多个 Deployment，每一个 Deployment 经过 nodeSelectors 选定不一样的 Label，以此达到相同的应用部署到不同地域的需求。然而除了 name、nodeselectors、replicas 等特性外，这些 Deployment 的其他配置并无差异。

随着分布地域的增加，以及不同地域对应用的差异化需求的增长，运维也面临着越来越多的挑战：

* 镜像版本升级，需要将 Deployment 逐一修改。
* 需要自定义 Deployment 的命名规范，以此来代表相同的应用。
* 边缘场景需求复杂，数量增加，每个节点池的 Deployment 都有一些差别化的配置，管理难度大。

单元化部署（UnitedDeployment）通过更上层次的抽象，对这些 Deployment 进行统一管理（自动建立、更新、删除），如下图所示：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/23/f082f9c6-6fc0-49cf-9717-8258c582116a.png)

UnitedDeployment 控制器可以提供模板来定义应用，并通过管理多个 Workload 匹配不一样的区域。每个区域的 Workload 被称为 Pool， 目前支持两种 Workload，StatefulSet 和 Deployment。控制器会根据 UnitedDeployment 中 Pool 的配置建立子 workload 资源对象，每个资源对象都有期望的 replicas Pod 数量。如此一来，通过一个 UnitedDeployment 实例就可以自动维护多个 Deployment 或者 Statefulset 资源。

Erda 边缘计算平台即通过底层封装 UnitedDeployment 来实现边缘应用的分发。

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