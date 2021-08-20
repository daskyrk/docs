# 集群总览

集群总览界面相当于是飞机的总控台，您可以通过改界面观察您企业下的集群、物理机的运行状况，以及给物理机节点设置标签、下线物理机节点等。

在完成新建集群之后，点击集群总览tab，即可看到如下界面，下文将分块进行介绍：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/05/03ba25b7-d4ef-48ee-9d37-d6b28593ee73.png)

## 洞察集群

### 对机器分组

默认情况下，机器默认是按照集群维度进行分组的，您也可以通过点击**群组**下拉框，选择内存、CPU来分组。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/05/b781bdb5-bd51-49e2-9d1c-54b7386c5c52.png)

<center>以CPU核数分组</center>

每个机器组的信息块，会展示当前组下的机器数，CPU、内存、磁盘的总体使用率的统计信息

### 过滤机器

我们提供了众多的过滤条件，以方便您快速找到目标机器，点击**过滤**下拉框并选择过滤条件或者直接输入文本信息，即可实现搜索。

![image-20210805112003777](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/2df84147-af94-40ac-8b4e-88170393b5e4.png)

<center>过滤IP为10.167.0.10的机器</center>

### 着色

当您想一览所有物理机的CPU使用率状况，可以点击**着色**下拉框，选择*CPU使用*

![image-20210805112459992](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/19/e2270af9-c8a2-42c1-a850-9a8cd730d469.png)

<center>通过CPU使用率来着色</center>

### 集群整体状态

集群状态提供了集群维度下的运行状况总览，

点击状态文字会跳转到`多云管理平台->集群管理->集群状态页`，而展开单个集群，同样能通过集群状态页查看

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/05/6fb9b139-30be-47f7-9d8a-503d625951b4.png)

<center>展开集群块，自动在集群概览项下展示集群整体状态</center>

我们一共以4个方面来展示当前的集群状况：

- 集群组件状态：主要是Erda自身组件的状态
- 集群节点状态：主要是物理机节点的状态
- kubernetes状态：主要是Kubernetes相关组件的状态，若无则代表组价均正常
- 集群中间件状态：主要是Erda使用的相关中间件的状态，若无则代表中间件均正常



## 洞察所有机器

以高纬度来统计所有机器的各项信息

### 机器列表

机器列表展示了各个机器的基本信息：

- IP：当前机器IP，点击后进入机器的机器概览界面
- 实例数：当前机器上运行的容器实例数，点击后进入机器的实例裂变界面
- CPU：当前机器CPU的分配情况和实际使用情况
- 内存：当前机器内存的分配情况和实际使用情况
- 磁盘使用：当前机器的磁盘使用情况
- 负载：当前机器的负载（Load5）情况
- 标签：当前机器的标签
- 操作：可对机器设置标签或执行下线

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/06/a02349b4-2807-4e6f-9ab9-9e7d01fff296.png)

### 机器告警

展示了所有机器的告警情况

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/06/31ec2bf9-e686-4d22-b6f0-3c5a909a2738.png)

### 资源统计

更加细致地统计了所有机器的资源状况

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/05/9b0e9cc5-d472-4af2-b52c-ff9080dbdf5f.png)

### 服务列表

展示当前所有机器上运行的服务

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/06/9f49597d-59dc-4f7f-b369-9755757172b8.png)

### 任务列表

展示当前所有机器上运行的任务

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/06/c9ffbc20-1096-468b-a6ce-a4a5fa481118.png)

## 洞察单个机器

以单个机器的维度统计其相关信息，您可以通过**点击机器IP**，或则**点击小方块**来进入单个机器的总览界面

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/05/896fb9d4-8003-4deb-bd16-cb8ebbfab7c8.png)

<center>机器概览界面</center>



### 机器概览

首先，我们进入的就是机器概览界面，此界面有多张图表，方便您分析任意时间范围内的机器运行状况

- CPU使用率：CPU使用率走势图
- 内存使用率：内存使用率走势图
- 系统load值：三种load的走势图
- 磁盘读：磁盘读的速率走势图
- 磁盘写：磁盘写的速率走势图
- 磁盘使用率：磁盘设备的使用率
- 磁盘使用量：磁盘设备的使用率
- 网络发送：网卡的发送流量速率
- 网络接收：网卡的接收流量速率

### 机器告警

展示单个机器的告警情况

### 实例列表

展示单个机器上运行的容器实例

### 任务列表

展示单个机器上运行的任务

### 机器详情

机器的基本信息

