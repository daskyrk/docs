# 设计理念

为了更好的支持边缘应用的发布，运维，我们对边缘场景的相关概念进行了抽象，底层采用 Openyurt 来实现使用云原生的方式管理这些概念，从而将 Erda 本身具有的统一发布，服务编排，监控，日志等特性带进了边缘场景。

## 站点 / NodePool
在边缘场景下，边缘节点一般具有很强的区域性、地域性、或者其余逻辑上的分组特性，不一样分组的节点间存在网络不互通、资源不共享、资源异构、应用独立等明显的隔离属性，这也是 站点/NodePool 的由来。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/23/4a869d82-5ac1-443e-87e1-fdc883c06710.png
)

不同站点的节点共享一个 Kubernetes 网络平面，我们希望通一个应用的流量在一个站点中闭环，我们知道再k8s中，Service用来对一组pod做负载均衡，默认情况下访问Service，流量会均衡的被调度到后端的pod中，但是在缘场景下的部署，我们更希望访问距离自己最近的Pod，也就是在站点级别只访问到本站点对应 pod， 因此我们再产品层面封装了 k8s Service Topology 特性，实现站点级别的流量闭环。

通过创建边缘应用svc的时候增加topologyKeys，结合 nodepool 的统一标签管理完成流量的站点级分发。
                                       
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
不同于传统应用，边缘应用是需要将分相同发到多个地域下的计算节点上，以 Deployment 为例，传统的作法是先将相同地域的计算节点设置相同的 Label，而后建立多个 Deployment，每一个 Deployment 经过 nodeSelectors 选定不一样的 Label，依次来达到相同的应用部署到不一样地域的需求。可是这些表明相同应用的多个 Deployment，除了 name、nodeselectors、replicas 这些特性外，其余的差别化配置很是小。

可是随着地域分布愈来愈多，以及不一样地域对应用的差别化需求，使得运维变得愈来愈复杂，具体表如今如下几个方面：

* 镜像版本升级，须要将每一个 Deployment 逐一修改。
* 须要自定义 Deployment 的命名规范，以此来代表相同的应用。
* 随着边缘场景愈来愈复杂，需求增多，每一个节点池的 Deployment 会有一些差别化的配置，很差管理。
* 单元化部署（UnitedDeployment）经过更上层次的抽象，对这些子的 Deployment 进行统一管理: 自动建立/更新/删除。以下图所示：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/23/f082f9c6-6fc0-49cf-9717-8258c582116a.png)

UnitedDeployment 是一个CRD, 控制器能够提供一个模板来定义应用，并经过管理多个 workload 来匹配下面不一样的区域。每一个 UnitedDeployment 下每一个区域的 workload 被称为 pool， 目前 pool 支持使用两种 workload：StatefulSet 和 Deployment。控制器会根据 UnitedDeployment 中 pool 的配置建立子的 workload 资源对象，每一个资源对象都有一个指望的 replicas Pod 数量。经过一个 UnitedDeployment 实例就能够自动维护多个 Deployment 或者 Statefulset 资源。

Erda 边缘计算平台通过底层封装 UnitedDeployment 来实现边缘应用的分发。

### 配置集

单元化部署解决了我们如何将同一个应用分发到多个地域的问题，理想情况下应该所有地域的应用都是完全一致的，但现实往往会有例外，会存在地域之间存在差异的情况，比如配置门店名，门店 Logo，甚至在某些特定场景下对接的支付渠道也会有差异，因为需要考虑不通站点应用的配置差异化问题，由于我们的应用部署采用了单元化部署，即使用一个模板描述了边缘应用的配置以及发布范围，因此针对配置，我们设计了一个配置集的资源，在单元化部署的时候将不同的配置作为环境变量下发到不通的地域中。
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
配置集的操作可以再产品的配置管理来进行白屏化配置。