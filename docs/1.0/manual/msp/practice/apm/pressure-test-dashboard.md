# 压测场景的监控大盘配置

一些对于性能有高要求的系统，在开发完成之后或者在线上环境遇到性能瓶颈时，很大程度是会借助一些性能压测工具来提升服务的应对大流量时的能力，这时可借助 Erda 大盘的能力查看压测过程中需要注意的一些指标，如：

- 服务运行中出现的慢sql
- 服务运行中出现的慢请求
- 压测场景下，服务的内存及CPU使用情况

## 下面是通过 Erda 在性能压测场景下相关的大盘配置方法

以 apm-demo-api 服务为例

![慢sql-慢请求](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/05dec815-cfb2-4f42-b5a6-d3645ff59d63.png)
![CPU-MEM水位图](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/7536287f-0dbb-4345-b0eb-10996547c588.png)

### 慢 SQL 大盘配置

针对于慢 SQL，最关心的必定是 SQL 本身，可以通过大盘查询出 SQL语句，SQL请求的平均时间，SQL请求的最大时间，SQL请求的最小时间，SQL发生在什么应用，SQL发生在什么服务。这时可以选在 Erda
大盘中的表格类型的图表，相关的配置如图：
![慢sql大盘配置](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/41a3860e-eeff-493a-8118-4ce47a319e30.png)

### 慢请求大盘配置

![慢请求](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/d1ed20cd-b6f1-41c2-a14f-9fb0fba0ff71.png)

不仅仅是慢请求，还可以查看特定请求路径的请求折线图

![特定path请求配置](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/06a5cbee-acac-4bde-abf3-0b7fc6a3d2f9.png)

同时如果服务为JAVA服务，还可通过大盘查看堆内存使用情况，以及 GC 情况

#### 堆内存使用情况大盘配置

![堆内存使用](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/55942ea1-d32d-4df7-88ce-341d70c37edd.png)

#### 服务 GC 使用情况大盘配置

![gc 大盘](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/9eb4bcd3-da80-434c-a515-8341be19ba8c.png)

### 内存及 CPU 使用情况大盘配置

还可以通过运维大盘配置容器内存及 CPU 水位图表，有一点需要注意的是：压测场景下，关注 CPU 或者内存的峰值更多点，这时候可以通过最大值来获取峰值。

#### 单个实例 CPU 限制值卡片配置

![cpu limit](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/683a6ef0-a618-4276-9f30-f27bd4b3a38d.png)

#### 单个实例 MEM 限制值卡片配置

![mem limit](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/0a6cc827-ae0c-4334-9cb8-21f0bcd0a04b.png)

#### 实例数量卡片配置

![pod count](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/0ef2f768-7c55-4299-8d87-afc73b88f119.png)

#### 实例 CPU 水位配置

![cpu](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/082dc599-e4d5-499a-9f0d-4a7a973e38f0.png)

#### 实例 MEM 水位配置

![mem](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/9b0d5428-dc67-4d60-84cd-f72545f7af63.png)

如果需要基于 pod name 进行筛选，可以在部署中心查看 pod name

![pod name](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/c933c19e-d15d-4245-9a65-1dd38a5db062.png)

