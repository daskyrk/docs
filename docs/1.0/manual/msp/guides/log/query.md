# 日志查询

日志分析部署完成后，业务容器打印在标准输出的日志会被部署在业务集群中的 `filebeat` 组件采集并上报给 `monitor-collector`，最终存储到 `elasticsearch` 中。我们可以通过进入 `微服务治理平台` 模块，选择对应项目和环境后，点击左侧 `日志分析` 菜单进行日志数据的查看。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/3f8b21a1-183d-43b3-8553-554abb53a656.png)

如图，可以看到，日志查询页面主要分为三个板块：最上方的筛选条件输入区、中间的日志数量统计图表区，以及下方的日志信息列表区。

## 筛选条件输入区

筛选条件目前主要支持三个纬度，分别如下：

- 日志时间：基于日志产生的时间范围过滤
- 日志内容：基于日志内容的全文搜索过滤
- 日志标签：基于日志上报时附带的标签信息过滤

对于日志时间和日志内容相信应该是比较容易理解的，这里我们重点介绍下日志标签。

### 标签筛选方式

标签过滤的基本输入形式是 `tagKey=tagValue`, `tagValue` 是精确匹配的（非模糊匹配）。如果你知道想要搜索的标签键值信息，你可以直接在标签搜索框内键入内容后按回车键确认输入一个标签筛选条件。
另外， 鼠标点击标签输入框，可以看到如下图的下拉框提示，这主要是将一些常用的标签选项展示出来方便操作。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/cb871c43-64f2-42f6-a651-d2a48f594ba3.png)

标签提示下拉框中的 `平台` 组下的列表，是当前项目下的应用列表，选择这其中某一个标签后，相当于过滤出属于这个应用的日志。

### 标签数据来源

标签数据来源主要有两个，分别是平台内置标签和应用自定义标签。

#### 平台内置标签
部署在业务集群中的采集组件在上报数据时，会自动提取一些环境上下文信息作为标签上报，这些标签主要有：

| 标签 | 含义 | 示例 |
| ---- | ---- | ---- |
| origin | 来源 | origin=dice |
| dice_org_id | 所属组织 ID | dice_org_id=2 |
| dice_org_name | 所属组织名称 | dice_org_name=integration |
| dice_cluster_name | 所属集群名称 | dice_cluster_name=erda-hongkong |
| dice_project_id | 所属项目 ID | dice_project_id=123 |
| dice_project_name | 所属项目名称 | dice_project_name=base-project |
| dice_application_id | 所属应用 ID | dice_application_id=667 |
| dice_application_name | 所属应用名称 | dice_application_name=log-analytics-demo |
| dice_runtime_id | 所属 runtime ID | dice_runtime_id=593 |
| dice_runtime_name | 所属 runtime 名称 | dice_runtime_name=master |
| dice_workspace | 所属环境 | dice_workspace=prod |
| dice_service_name | 所属服务名称 | dice_service_name=apm-demo-api |
| pod_namespace | pod 所在 k8s namespace | pod_namespace=project-123-prod |
| pod_name | pod 名称 | pod_name=apm-demo-api-9c7963be16-69f4d9fc6-fwzd5 |
| container_name | 容器名称 | container_name=apm-demo-api |

#### 自定义标签

除了平台内置的标签，Erda 的采集组件还支持业务自定义一些标签，不过这些标签需要以一定的格式写入日志中才能够被识别，从日志中提取标签的正则表达式如下：
```regexp
(?P<timedate>^\d{4}-\d{2}-\d{2} \d{1,2}:\d{1,2}:\d{1,2}(\.\d+)*)\s+(?P<log_level>[Aa]lert|ALERT|[Tt]race|TRACE|[Dd]ebug|DEBUG|[Nn]otice|NOTICE|[Ii]nfo|INFO|[Ww]arn(?:ing)?|WARN(?:ING)?|[Ee]rr(?:or)?|ERR(?:OR)?|[Cc]rit(?:ical)?|CRIT(?:ICAL)?|[Ff]atal|FATAL|[Ss]evere|SEVERE|[Ee]merg(?:ency)?|EMERG(?:ENCY))\s+\[(?P<ext_info>.*?)\](?P<content>.*?$)
```
匹配示例：
```text
2021-08-09 10:27:57.704 DEBUG [apm-demo-api,bc3d8ffa-5388-4c76-861b-f121955c2dec,tag1=value1,tag2=value2] - [qtp1590404373-19] org.eclipse.jetty.io.ManagedSelector    : content
```
如上日志输出，正则表达式的 `ext_info` 分组将匹配出 `apm-demo-api,bc3d8ffa-5388-4c76-861b-f121955c2dec,tag1=value1,tag2=value2`，其中 `tag1=value1,tag2=value2` 部分便是允许业务插入自定义标签的位置。 前两个逗号分割的内容，目前是保留字段，专用于 Trace 信息的插入，如示例中的`bc3d8ffa-5388-4c76-861b-f121955c2dec`便为当前日志所对应的请求的ID。

如果是 java 或 nodejs 应用，通过平台提供的对应的 agent，会自动的注入 Trace 信息，当前注入的信息主要是请求ID：

| 标签 | 含义 | 示例 |
| ---- | ---- | ---- |
| request-id | 关联请求ID | request-id=bc3d8ffa-5388-4c76-861b-f121955c2dec |

对于 java 应用，还可以结合使用 slf4j 提供的 Mapped Diagnostic Context(MDC) 来向日志中插入自定义键值对，agent 会感知到 MDC 中的值并自动按照前述格式作为标签插入到日志的 `ext_info` 位置。

## 日志数量统计图表区

日志数量图表目前提供的功能较为简单，会根据筛选条件统计指定时间区间内的日志数量分时统计信息。

## 日志信息列表区

日志信息列表分页展示符合筛选条件的日志详细列表。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/4c9de1a5-5367-49fc-86e0-eaecb0b2fb06.png)

如上图所示，列表中的每行数据，支持点击行首的 `+` 号展开查看日志的 Text 或 Json 格式。

针对每条日志，支持两个快捷操作项：

- 链路追踪：对于关联了 Trace 请求信息的日志，`链路追踪`的操作会变为可点击状态，此时相当于一个筛选条件的快捷输入操作，即会自动将该条日志关联的 `request-id` 作为标签筛选项自动填入页面上方的标签筛选框内并执行搜索，当想查看某条日志关联的 Trace 相关的所有日志信息时可以使用该操作
- 创建分析：相当于一个创建分析规则的快捷操作入口，点击会跳转到 `分析规则` 创建页面，并将日志的部分标签和内容作为创建页面表单的部分输入项。关于 `分析规则` 的详细介绍请查阅 [分析规则](rules.md)。

