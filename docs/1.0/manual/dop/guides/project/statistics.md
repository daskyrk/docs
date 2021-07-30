### 迭代选择

![迭代选择](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/e3fa7c48-abde-4641-9acb-fba91fe5844f.png)

项目大盘右上方有个下拉框，下拉框的内容就是项目协同中的迭代名称，选择后就会过滤出相关迭代的缺陷和任务，有个待处理的迭代是`项目协同中的待处理`的缺陷和任务

### 缺陷按状态分布

![缺陷按状态分布](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/29/6b6e6d68-8341-4cda-b038-9671938e4062.png)

项目协同中所有的缺陷按照状态的分布

- OPEN 代表待处理
- RESOLVED 代表已完成
- CLOSED 代表已关闭
- REOPEN 代表重新打开
- WONTFIX 代表无需修复

### 缺陷按严重等级分布

![缺陷按严重等级分布](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/29/33c56158-6aa4-4a1c-bacc-bf057c207ff4.png)

项目协同中所有的缺陷按照严重程度的分布

- FATAL: 致命
- SERIOUS: 严重
- NORMAL: 一般
- SLIGHT: 轻微
- SUGGEST: 建议

### 缺陷新增 / 关闭趋势

![缺陷新增/关闭趋势](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/29/cd5434a0-5842-4506-b053-ffe632493bb2.png)

记录了每天缺陷新增的数量，和每天缺陷关闭的数量，图形下面有左右滚轮可以滚动时间，当没选迭代的时候开始时间就是项目创建时间，结束时间就是当天，
当选了迭代后开始时间就是迭代的开始时间，结束时间就是迭代的结束时间，当天的数据都不会被统计，每天临晨2点会统计昨天的数据，通过该趋势图可以看到项目协同中的缺陷每天新增和关闭的趋势图

y 轴按时间分布，x 轴有 2 条折线，一条代表新增的趋势，一条代表关闭的趋势

### 缺陷按人员分布
![缺陷按人员分布](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/29/feceeb11-571c-42b0-9a1d-ce7a9c65ffb3.png)

项目下的成员都有2个柱状图，一个代表缺陷总数，一个代表未关闭的总数，人员过多的时候下方会有左右滚轮拖动。通过这张图可以知道当前迭代，人员身上还有多少缺陷未完成和缺陷最多的人员

y 轴按人员排列，x 轴分 2 个柱状图，一个是缺陷总数，一个是未关闭缺陷总数

### 缺陷按重新打开分布

![缺陷按重新打开分布](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/29/134e64a3-b9de-43dc-949a-469478bf380e.png)

统计整个项目或者迭代，人员缺陷重新打开的次数。如果一个缺陷被重新打开多次，每次都会被记录

y 轴按人员分布，x 轴分 5 个柱状图，每个柱状图按照缺陷的严重等级划分

- is_re_open_FATAL: 致命缺陷重新打开
- is_re_open_SERIOUS: 严重缺陷重新打开
- is_re_open_NORMAL: 一般缺陷重新打开
- is_re_open_SLIGHT: 轻微缺陷重新打开
- is_re_open_SUGGEST: 建议缺陷重新打开

### 缺陷平均修复工作量 (天)
![缺陷平均修复工作量](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/29/e8287058-a390-48d1-ae5b-b48d2d095232.png)

缺陷关闭的时候填写的`时间跟踪`中的`所用时间`除以人数的一个平均值

### 缺陷平均响应时间 (天)
![缺陷平均响应时间](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/29/e8287058-a390-48d1-ae5b-b48d2d095232.png)

缺陷的最后更新时间减去创建时间的均值

### 缺陷按优先级分布

![缺陷按优先级分布](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/f87f9ceb-0a4d-48c4-b36a-09ae8ab29f46.png)

项目下的成员都有2个柱状图，一个代表缺陷总数，一个代表未关闭的总数，人员过多的时候下方会有左右滚轮拖动。通过这张图可以知道当前迭代，人员身上还有多少缺陷未完成和缺陷最多的人员

y 轴按人员排列，x 轴分 2 个柱状图，一个是缺陷总数，一个是未关闭缺陷总数

右上方有个下拉框可以根据缺陷优先级进行过滤

### 实际工作量

![实际工作量](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/6102a1db-8eff-48dc-800f-69a614f2bde5.png)

所有任务的已用工时的总和

### 预计工作量

![预计工作量](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/cae61cee-14e2-4db0-bb9f-d98481d209fa.png)

所有任务的分配工时的总和

### 成员工作量分布 (人天)

![成员工作量分布](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/bf07c7eb-8a74-4ea4-8381-373312afeb99.png)

展示成员身上的任务按照已用和预估工时的分布图，y 坐标展示的是人员名称，x 坐标有 2 根柱状图，一根表示预估工时，一根表示已用工时

### 人员事件分布

![人员事件分布](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/7b6dd657-abf2-4f96-81bc-9b4af8e58723.png)

展示成员身上的任务和缺陷的数量，y 坐标展示的是人员名称，x 坐标有 2 根柱状图，一根表示任务数，一根表示缺陷数

- issue_type_BUG: 缺陷
- issue_type_TASK: 任务


### 缺陷 耗时TOP10 (人天)
![缺陷耗时TOP10](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/8616b04f-076f-4ddf-8280-504af6fb6cc9.png)

展示前 10 的缺陷耗时排名，y 坐标展示的是缺陷 id, x 坐标展示的是耗时人天

### 任务 耗时TOP10 (人天)
![任务耗时TOP10](//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/30/31106748-1614-41fb-b7e8-a5fb4e57014d.png)

展示前 10 的任务耗时排名，y 坐标展示的是缺任务 id，x 坐标展示的是耗时人天
