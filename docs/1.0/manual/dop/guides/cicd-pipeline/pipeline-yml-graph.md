# 流水线配置（图形界面）

手写流水线可能造成语法的错误或上手比较困难，可视化图形编辑，通过图形界面交互快速配置流水线，更直观的呈现整个流水线流程。

## 编辑流水线
入口：应用 -> 流水线 -> 选择分支

点击编辑按钮
![](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/31/b931ed8a-5f99-4116-8173-bf8aba93c9bf.png)

## 添加节点
在添加节点前可能需要了解一下[流水线的基本构成元素](https://docs.erda.cloud/1.1/manual/deploy/pipeline.html#%E5%A6%82%E4%BD%95%E7%BC%96%E5%86%99-pipeline-yml-%E6%96%87%E4%BB%B6)
流水线是有多个阶段（Stage）构成的， 每个阶段可以同时进行多个action
根据需求选择串行节点或并行节点，点击加号
![](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/31/4d6c1597-5bd6-4d18-91d3-36fc23f0baa5.png)
有丰富的制品仓库可供选择

## 配置制品信息
点击相应的制品，选择或输入需要的配置，其中包括版本，任务参数，运行资源等。
每个制品的参数都不尽相同，详细的制品信息可以查看[扩展市场](https://www.erda.cloud/market/pipeline)
![](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/31/d1364ef0-64c3-4450-af06-771a2a19132c.png)
在界面上编辑对应的配置信息，然后点击保存按钮

## 查看图形化流水线
在选择制品并编辑保存，可在界面上查看可视化的流水线
![](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/31/28009e9f-557d-4a06-b4b8-56daeb6c6777.png)

在图形化编辑完流水线后，可以很直观的看到整个流水线的执行流程，最后如何执行流水线请查看[流水线运行](https://docs.erda.cloud/1.1/manual/dop/guides/cicd-pipeline/pipeline-yml-graph)