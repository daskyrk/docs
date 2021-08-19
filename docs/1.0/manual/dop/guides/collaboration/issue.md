# 事项

研发项目创建完成后，平台免费帮忙开启研发项目协作事项管理之旅。

## 事项类型

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/87becf19-cc10-4122-8708-37860915db9b.png)

事项有四个类型：

- 需求

  用户渴望得到的功能。
  
  由产品经理创建需求，和开发工程师进行沟通过后确认所属迭代、工期等信息。

- 任务
  
  拆分需求成若干个任务，一般一个任务就是一个功能点，然后分配给开发工程师完成。
  
  任务不应该设定范围过大，单个任务完成时间应该在2天以内。
  
- 缺陷
  
  测试工程师在执行测试用例的时候发现的BUG，
  
  测试工程师创建缺陷并指派给开发工程师，待开发工程师修复之后转给测试工程师进行验证。

- 里程碑
  
  里程碑是产品的重要节点
  
## 事项视图

事项有三种视图，三种视图各有特色，适用于不同的使用场景

全部视图都提供筛选功能

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/52ebf73c-2a8e-4031-b6bb-dde6b6234ca4.png)

- 列表
  
  列表视图展示全部的主要信息，标题、优先级、状态、处理人、截止时间等等。
  
  可以选择下拉框对事项进行更新，例如修改事项优先级、修改事项处理人等等。
  
  可以对事项进行筛选，但是无法进行排序，适合浏览事项的全貌。
  
  ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/5a57069d-25bf-4b80-ad3c-cd385725e81d.png)
  
- 看板
  
  目前有截止日期、优先级、状态、处理人、自定义五种看板视图。
  
  看板视图根据用户所选择的视角，对事项进行针对性的分类，例如选择了优先级看板，则事项会根据优先级归属于不同的看板。
  
  可以通过拖拽事项卡片的方式来快速更新事项，也可以和列表视图一样，点击事项卡片上的下拉菜单来更新事项。
  
  ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/a671607b-8bcf-4876-b0b0-0c98b8b0090b.png)
  
  用户可以在自定义看板中自己设定看板，按照自己的需求将事项进行分类。
  
  ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/200fa26e-c4f2-44ae-b9dc-1e895a2a4fb1.png)
  
  不同于列表视图，看板视图会针对性的显示事项数据，不显示用户不关心的数据。
  
- 甘特图
  
  甘特图可以直观的展示事项的进度，以不同颜色的柱状图展示事项的剩余工时、已用工时、逾期时间。具体定义在下图中已有介绍。
  
  ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/11e69fe5-d16d-4ba2-b760-57ba4630bcf7.png)
  
  不同于其他视图，甘特图是唯一一个在页面上可以显示事项具体工作时间的视图。
  
## 事项导入导出

事项均支持批量导入导出功能，可以根据筛选的条件导出事项。

事项导入和事项导出的文件均为xlsx文件。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/46facdc9-d0e7-4f52-a70f-149a8b4de70d.png)

## 事项关联

- 关联MR

为了便于事项协作，事项可以关联该项目下应用的代码仓库的MR，点击链接即可跳转查看MR详情

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/1487176f-6bb5-44bc-b9e4-8607c188196b.png)

- 关联事项

为了便于事项协作，事项可以关联其他事项，需求还可以根据关联事项的状态，自动计算需求的完成度

```
tip：在关联界面快速创建事项时，只需要填写标题和处理人即可
```

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/3931bfd5-339e-427d-9bca-d3281760574f.png)

## 事项活动日志

事项拥有活动日志，对事项做的任何修改操作都会新增一条日志，日志无法被删除。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/0052400f-1f30-4806-95f5-77880b8e4153.png)

## 事项类型转换

为了快速协作，事项支持类型转换。例如可以将需求类型的事项转换成任务，状态默认为初始状态。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/8f60f003-f29c-47e7-8ef0-850a8dda2e15.png)

## 事项关注

为了能够及时提醒用户，所关心的事项发生了变更，事项支持关注功能。

当用户关注了事项后，事项发生变更时，用户都会收到站内信提醒。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/f5816178-c5de-4e62-a800-a03153290acb.png)

## 事项复制

事项支持复制功能，输入新标题即可复制，事项的复制内容不包括活动日志。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/10/01877443-bc06-4866-9cc7-6521759d9d85.png)