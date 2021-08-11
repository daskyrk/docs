# 告警历史

用户配置好告警策略经过erda-analyzer处理与metric进行匹配后触发告警，当用户配置的告警众多，每条告警策略
配置的通知组不同，不同的告警会通知到不同的通知组中导致用户不方便统一查看告警，及时发现问题。
告警列表集中展示了根据用户配置的告警策略而触发的告警记录，在告警列表中展示的是以group_id主键作为区分的最新的告警记录，
以更新时间的倒序展示，而不是以告警时间的倒序展示如图所示:

![告警列表](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/05/44c209a1-4faa-4980-b8de-606487cfb9ab.png)

用户想看告警历史的入口在告警列表的界面，点击用户想要了解的告警即可进入到该告警的告警历史界面如图所示:

![告警历史](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/05/7067e7fa-dcbe-4049-b61b-2b2190192223.png)
在告警历史页中会根据告警记录的创建时间倒序展示告警记录，展示告警的状态是告警还是恢复，在其上方会显示触发该告警的告警策略名，告警历史可以根据时间进行筛选，
用户最多只能查看最近7天的告警历史记录，时间范围可以精确到秒，如图所示:

![历史时间](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/05/a9f06d88-0cc7-4cc5-b590-45d7858d3d1c.png)
用户点击历史记录左边的"+"可以查看告警的具体信息，如图所示:

![告警详情](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/05/1b549b6d-d73e-4513-8950-ee5247ad4115.png)
