# 自动化测试

欢迎使用 Erda 自动化测试

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/03/04/4ba35bac-139a-4bc7-a157-3a79fd6d60a4.png)


在使用自动化测试之前你需要提前掌握必要的知识：
* 自动化测试基本概念
* HTTP 基本知识

## 自动化测试介绍

### 什么是自动化测试？

* 接口测试是测试系统组件间接口的一种测试，主要用于测试系统与外部其他系统之间的接口，以及系统内部各个子模块之间的接口。测试的重点是要检查接口参数传递的正确性，接口功能实现的正确性，输出结果的正确性，以及对各种异常情况的容错处理的完整性和合理性。
* 自动化测试是将接口脚本进行统一维护、管理和执行的平台，它可以实现测试流程的自动化，可以帮助团队提高测试效率、项目质量、回归效率等。
### 为什么要做自动化测试？

* 越底层发现 bug ，它的修复成本是越低的。
* 前端随便变，接口测好了，后端不用变，前后端是两拨人开发的。
* 检查系统的安全性、稳定性，前端传参不可信，比如京东购物，前端价格不可能传入 -1 元，但是通过接口可以传入 -1 元。
* 如今的系统复杂度不断上升，传统的测试方法成本急剧增加且测试效率大幅下降，接口测试可以提供这种情况下的解决方案。
* 接口测试相对容易实现自动化持续集成，且相对UI自动化也比较稳定，可以减少人工回归测试人力成本与时间，缩短测试周期，支持后端快速发版需求。接口持续集成是为什么能低成本高收益的根源。
* 现在很多系统前后端架构是分离的，从安全层面来说：
    + 只依赖前端进行限制已经完全不能满足系统的安全要求（绕过前面实在太容易）， 需要后端同样进行控制，在这种情况下就需要从接口层面进行验证。
    + 前后端传输、日志打印等信息是否加密传输也是需要验证的，特别是涉及到用户的隐私信息，如身份证，银行卡等。

### 怎样做自动化测试？

一般情况下，由于项目前后调用主要是基于http协议的接口，所以测试接口时主要是通过工具或代码模拟http请求的发送和接收。 接口测试用例设计的整体方案：
+ 第一步：分析出测试需求，并拿到开发提供的接口说明文档；
+ 第二步：从接口说明文档中整理出接口测试用例场景和具体 API，API 要包括详细的入参和出参数据以及明确的格式和检查点，并将数据录入平台
+ 第三步：和开发一起对接口测试用例进行评审；
+ 第四步：准备接口测试数据、配置环境变量、根据接口测试用例设计、调试单接口、调试场景用例；
+ 第五步：接口调试通过后加入测试计划中批量执行用例、跟踪测试结果。

### 什么时候引入自动化测试？

* 需求稳定
* 项目周期长
* 新的项目，先手工测试，然后逐渐开始自动化测试
* 回归测试


### 如何从工程角度管理自动化测试用例？
项目进入正轨后，往往伴随着成百的业务流程，以及成千的 API，而一个接口又有可能有多种参数场景。自动化测试工程师在编写测试流程以及流程中的单元接口时，尤其时多人协作编写时，需要有合理的规划和管理才能让自动化持续。

Erda 提供了【[测试空间](#测试空间)】>【[场景集合](#场景集合)】>【[场景](#场景)】三级管理能力。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/03/04/109f4836-4f70-4099-b47f-a68e1c3e8d72.png)




## 自动化测试使用流程图
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/25caf8f8-5145-45d3-9b2e-fd141412dde0.png)



## 平台入口：

> DevOps 平台 -> 我的项目 -> 项目详情 -> 测试管理 -> 测试用例 -> 自动化测试

创建一个或选择一个已建好的测试空间，通过点击具体空间，进入空间
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/02/591e5b5a-6202-4eef-a414-295c0efbaec1.png
)


进入空间后，各模块布局介绍如下：
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/03/04/4b0bd884-46d9-45f5-80f2-56161119aa1d.png)



## 测试空间


一个项目下可以创建多个测试空间，测试空间之间无任何关联，不互相影响，是完全隔离的空间。
很多项目只需要一个默认测试空间即可，使用多个测试空间有以下几种情况：
1. 一个项目下有多个子项目，子项目间没有产品上的联动，它们的自动化用例可以完全独立在自己空间
2. 一个项目要同时支持多个版本，那可以一个版本一个空间，当进入新版本迭代时，可以通过复制老版本的空间以创建新版本的空间，并在新版本空间上进行功能变动后的调整

注意：空间复制需要较长时间，复制过程中时，原空间无法操作


## 场景集合

**场景集合** 是一个完整闭环的自动化测试流程，这个完整的流程由多个场景组成，场景之间有简单的依赖（包括执行依赖和数据依赖）
场景集合或者说自动化测试流程有以下几个例子：
1. 登录流程
2. 购物流程
3. 退货流程

而一般来说流程中可能有正向的场景（比如登录成功、下单成功等）也有逆向或者预期失败的场景（比如密码错误次数过多登录失败、退货成功后不能退货），这些场景可以自由的在流程中添加和编排，你可以详细阅读 [场景](#场景) 以了解。


## 场景

**场景** 是自动化测试管理的最小单元，可以对应到功能测试的一个用例。如字面意思，是自动化测试的一个场景，以下将按几种场景集合分别举例：
1. 登录流程：
    - 正常登录场景
    - 异常登录场景
    - 密码错误次数过多场景
    - 登录成功后校验登录态场景
    - 等
2. 购物流程：
    - 商品查看场景（能够正确查询/或者下架商品无法查询）
    - 下单场景（无货时购买失败、优惠计算正确、库存扣减成功等逻辑）
    - 等
3. 退货流程：
    - 订单关闭退货失败的场景
    - 退货成功场景（成功后，后续状态流转正确、通知正确等逻辑）
    - 等

场景的设计理念是短小、尽量内聚，在同一个场景集合下场景们有一定的关联，一定的执行依赖，一定的数据依赖。

## 场景中的步骤

场景步骤可选有 “接口”、“配置单”、“等待”。步骤为接口可以测试接口是否按照预期执行和返回，步骤为配置单可以执行 SQL 等数据准备逻辑，步骤为等待可以为这个测试场景插入思考时间。

步骤默认为串行执行，即按自上而下的顺序执行；点击步骤左侧上下箭头即可进行上下拖拽调整顺序。

点击接口右侧“+”：步骤也可以进行按组并行，默认添加到组内的最后。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/03/04/6f32f97b-0d51-4831-b0d4-d1d6c7c7afa9.png)

点击拖动：拖动（1）是拖动组间的串行顺序，拖动（2）是并行顺序，可以在同组内，也可以跨组拖动。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/03/04/bc0eea30-9a8d-4682-83e0-10ee7a7749a1.png)

点击解除并行关系：并行的接口关系解除，自动移到当前组下一行改为串行关系
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/02/78deb95b-3209-4e7c-8472-2bc0dc270769.png)

点击接口右侧复制按钮：复制一个内容完全相同的接口，名字自动拼接"_copy"
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/02/0aa6bd02-a7b1-4f3e-909c-4bf2a47279f9.png)

## 场景中的步骤 - 接口

点击场景步骤的 “+ 接口”，填写接口请求参数

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/03/04/8e6967df-f066-4960-91e8-f3085d436ad5.png)

-  自动化测试目前支持哪些类型的请求？
   1. 目前只支持HTTP和HTTPS请求。
   2. 目前支持的请求方式有：GET、POST、PUT、DELETE、OPTIONS、PATCH、COPY、HEAD等
    

以下操作可以让你更好的使用自动化进行测试：
- 通过 [新增接口-选择接口集市的规范接口](#新增接口-选择接口集市的规范接口) 填充接口定义，以减少接口参数的配置工作
- [新增接口-通过小试一把进行单接口调试](#新增接口-通过小试一把进行单接口调试)
- [新增接口-设置断言以进行有效测试](#新增接口-设置断言以进行有效测试)



## 新增接口-选择接口集市的规范接口

自动化测试工程师最苦恼的是和开发工程师沟通接口的定义，如果接口数量庞大并且频繁修改，所有的时间都将消耗在无止尽的沟通和调整测试用例。

在接口配置界面便可以直接选择集市中已上传的规范接口，如果和你对接的开发工程师是 “[API-first](../microservice/api-management)” 理念的践行者，那一切都变得很容易。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/03/04/3d54acc0-e435-49b2-87bd-236f36b44d8f.png)

## 新增接口-通过小试一把进行单接口调试

###小试一把的作用
编写完成的接口测试可以被立即执行，方便自动化测试工程师调试接口测试的配置，比如网络是否联通、是否有拼写错误等小毛病。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/03/04/dbe2ade4-c0ce-44b0-b23c-e1afebed295c.png)

###如何使用环境变量进行小试一把（即单接口调试）？

1. 首先需要按照[参数配置](#参数配置)里说明的配置方式，提前准备好环境配置。
2. 点击新增接口页面的保存并执行按钮，选择配置好的环境配置执行即可：
   - 当接口的URL去掉域名部分，在单接口调试时，会自动拼接上选择的参数配置里的域名；<br/>
   - 当接口的URL未去掉域名部分，在单接口调试时，不会拼接上选择的参数配置里的域名；
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/02/c374af2a-a3c1-4c68-9925-77ff38d4617b.png)
3. 小试一把，执行结果如下：
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/c77a2b4b-8280-43ad-98a2-42fd9f429837.png)
**注意：**
   1. 小试一把中可解析的参数表达式如下：
       - 当前场景参数：${{ params.xxx }}
       - 全局参数：${{ configs.autotest.xxx }}
       - mock参数：${{ random.integer }}</br>
   2. 小试一把中无法解析的参数表达式如下:
       - 前置场景入参：${{ outputs.12345.xxx }}
       - 前置接口出参：${{ outputs.12345.xxx }}
## 新增接口-设置断言以进行有效测试

::: tip
若测试没有断言，那所有用例都将通过，没有阻塞。
:::

###如何设置断言？
1. 在接口配置页切换到 "Tests" 以设置出参以及断言。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/03/04/f8f6212a-ecfd-4698-b2b1-d6ce1554efb8.png)

2. 可通过[新增接口-通过小试一把进行单接口调试](#新增接口-通过小试一把进行单接口调试)，查看接口返回的Response。</br>
   出参是从当前请求的 Response 中截取需要的内容，截取方式可参考 [表达式规范](#表达式规范)</br>

   
**断言说明：**
断言用于从业务维度判断请求是否成功。
将某个出参的临界值定义为业务异常判断标准，类似检查点，格式为: Key + Value + Description，
检查点可分为响应状态码、响应 Header、响应 Body 3 种类型。
多个断言之间是"且"关系。支持形式如下：

* 大于、大于等于、小于、小于等于: 支持整数，小数。
* 等于、不等于: 支持整数，小数，字符串，对象(数组，Map)。
* 包含、不包含: 支持字符串和正则匹配。
* 为空、不为空: 支持判断数组，Map，字符串是否为空。
* 存在、不存在: 判断出参是否存在。出参为 Response 的 Key。
* 属于、不属于: 支持正负整数、0、字符串。
    + 数值：请按照标准的数学表达式规范填写。示例如下：
        区间支持开区间和闭区间、示例闭区间：[-20,20]
        表示集合：{[-200,200],-1,2}
    + 字符串仅支持集合、示例：{“abc”,”bcd”,”200”,”-200”,”已报名”,”报名成功”}




##表达式规范
参数解析支持状态响应码，Header:K/V，Body:JSON(body) 三种形式。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/16/83f831a5-de2e-4078-8050-fd9a234cdb1b.png)

**出参说明：**
* 出参名：只能包含英文字母、数字和下划线。
* 来源：
  + Body：JSON ：以 JSON 格式解析 Response Body
  + Header：K/V ：以键值对格式解析 Response Header
  + 响应状态码 ：提取 Response 中的状态码
* 解析表达式：从 Response 截取需要的内容，对应到当前变量。例如：data.items[0].id

## 场景步骤-参数设置

**设置参数**
- 全局参数
- 接口出参设置
- 场景出参设置

**出参的表达式规范：**
**参数优先级说明**

**引用参数**

场景入参
- 前置场景出参 
- mock
- 全局变量入参

场景步骤入参
- 本场景入参
- 前置场景出参
- mock 
- 全局变量入参



前置接口必须要先定义出参，才能被后继接口使用，如下图：

![前置接口定义出参](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/03/04/468d99a1-0266-482d-9b33-42cca15842bf.png)

后继接口在填写参数值时，便可以通过“选择器”选择：【前置接口出参】>【选择接口】>【前置接口定义的出参】。

也可以直接输入运算表达式：

```
${{ outputs.1845.userId }}
```

其中 1845 是接口 ID，这个 ID 可以在步骤上看到。

![后继接口使用](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/03/04/4b8f4b66-7f2f-4b2d-bc4e-930a564405c5.png)

::: tip
“选择器” 以及表达式的使用可以查看：[表达式规范](#表达式规范)
:::




## 场景中的步骤 - 配置单

配置单是可以被多个场景/多个场景集合（或者说流程）使用的，可复用的数据初始化/数据清理的公共逻辑。
所以配置单的配置在独立的入口：[数据银行](#数据银行)。

选择已经创建好的配置单，按照配置单定义的入参配置即可。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/03/04/de5a1f10-f680-43e7-8d9e-de69b919c713.png)

## 场景中的步骤 - 等待

设置等待时间以实现场景执行的暂停和恢复。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/03/04/aa64ad4d-609c-4c95-ae8f-cd511cb6f041.png)

## 单场景调试
-  如何使用环境变量进行单场景调试？
    1. 首先需要按照[参数配置](#参数配置)里说明的配置方式，提前准备好环境配置。
    2. 点击场景页面的右上角执行按钮，选择配置好的环境配置：
       当接口的URL去掉域名部分，在单场景调试时，会自动拼接上选择的参数配置里的域名；<br/>
       当接口的URL未去掉域名部分，在单场景调试时，不会拼接上选择的参数配置里的域名；
-  单场景调试参数使用需要注意：

## 同场景下 Cookie 保持



## 引用场景集

###引用场景集的作用

###如何使用引用场景集

## 数据银行

###平台入口：

> DevOps 平台 -> 我的项目 -> 项目详情 -> 测试管理 -> 数据银行

### 数据银行的作用
使用过接口自动化平台的朋友们都知道，我们在实现接口自动化过程中，除了需要调用不同的接口，许多场景还需要通过查询数据库结果来判断用例执行后的正确性。除此以外可能还需要借助操作数据库、Redis和shell脚本等功能，来实现场景执行前的数据准备和场景执行后的数据删除等操作。而这些功能需求在我们的自动化测试平台，就是通过数据银行来实现的。
### 数据银行中配置单和数据源的概念和关系
   配置单配置的是执行脚本，例如MySQL脚本、Redis脚本、shell脚本；</br>
   数据源配置的是连接不同环境的数据库或Redis的连接信息，通过配置的信息访问对应数据库和Redis；</br>
   配置单配置完执行脚本，需要选择在哪个环境的数据库或redis中执行，这就需要选择不同的数据源进行执行；</br>
   **注意:** shell脚本执行不区分环境，所以不用配置数据源，可直接执行，可以理解为是在新起的一个虚拟机中执行的脚本。

### 数据源
1. 数据源分为MySql和Redis两种。
2. 数据源有3种创建或连接方式：</br>
   方式一: 在项目部署时，选择添加MySQL或Redis的addon,项目选择develop分支部署成功后，数据银行-数据源模块就会有一个对应的新的数据源了；</br>
    1. 找一个应用，在dice.yml中以添加插件（addon）的形式来拉起一个新的MySQL或Redis服务；
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/83ca0c66-31d0-48fa-97a8-aa32f46996e9.png)
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/02224b39-ebf7-4ad9-9072-c19dd87a1a0d.png)
    以下为新增一个MySQL-addon：
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/ff96421f-9784-46cc-9391-bbe2993934ec.png)
    以下为新增一个Redis-addon：
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/0372c21f-ae96-4f85-a98b-fd53ed80012f.png)
    2. 开始构建流水线，等待执行成功
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/1c6d5e30-3baa-4f5e-9b17-f1b30d2a03ce.png)
    3. 部署成功后，可查看项目下的数据银行中，已存在2个新配置的数据源信息
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/e3500259-fd8b-43f2-8bfe-4901052ceaa3.png)
    
   方式二: 选择创建MySQL或Redis数据源，根据填写的信息连接对应已存在的数据源。</br>
    1. 手动新建一个新的MySQL或Redis数据源
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/a722fa70-eaa0-4e09-8242-1dfbbb7b9c43.png)
    以下为新增一个MySQL-服务实例：
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/d0808300-1e90-464d-af59-a3d1864fd075.png)
    以下为新增一个Redis-服务实例，此处需要注意是新买一个服务还是自定义填写已有的服务信息：
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/79ada88f-c89c-4463-a581-227e2e8f83dc.png)
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/8fdf5b5f-5cbf-401f-ac93-822bd29a2483.png)
    
    方式三: 选择创建custom自定义数据源，根据填写的信息连接对应已存在的数据源。
    1. 选择custom选项，可连接MySQL和Redis
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/a722fa70-eaa0-4e09-8242-1dfbbb7b9c43.png)
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/c3c9a349-0d2a-42f2-a61a-30104a021fd3.png)
    以下为连接一个已存在的Redis-服务实例：
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/897759b1-385c-4eaa-870f-885765c5cfba.png)
    以下为连接一个已存在的MySQL-服务实例：
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/e0a76516-094c-4515-bf4f-8e7870008670.png)
### 配置单
1. 如何使用配置单？</br>
   下面以新增MySQL配置单为例，结合业务场景描述下，如何通过配置单实现前置数据准备。
   1. 新增配置单目录，新增配置单，准备语句
   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/c537daca-2dd4-42a5-b207-2a34ec7182ec.png)
   2. 新增配置单
   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/29ecdbda-956c-43dd-8cd5-3bec6659e0f8.png)
   3. 编辑配置单，新增节点
   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/41cdbac1-91ec-4b4f-80bc-864a59949961.png)
   4. 新增MySQL配置单，配置数据源、database和语句
   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/f93b5902-1326-4718-9aa6-61c83768db66.png)
   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/1d5dafe8-bd50-4b36-a038-9db90100cd12.png)
   5.保存后可执行，调试当前语句是否能执行成功
   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/7d0358ae-e6fb-45f3-9eea-7c85a0e57a01.png)
   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/7b7ef4b7-e3fe-474b-8cf3-b99fe644ed5e.png)
   6. 加入到自动化用例的场景中，结合场景使用
   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/7d00c55e-c672-468e-93c6-1465ef55be97.png)
   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/08553594-f4b6-44e5-8e02-7682e63f8f52.png)
   移动后结果如下，该配置单就加到场景中了
   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/01bbc37f-8546-40c6-9a53-4eb604507873.png)
   点击场景中的执行即可按顺序触发执行脚本，以及查看执行结果
   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/f17b3035-3fbd-4c19-87b2-8dcb05491efb.png)
   7. 可将数据源、database和语句中的表名参数化</br>
      - 作用：
        1. 参数化后可通过切换全局变量中的值而统一切换所有配置单的数据源和database信息；</br>
        2. 配置单复用，例如查询功能的配置单可通过参数化表名而达到配置单的复用；
      - 如何操作？
        1. 点击入参配置
        ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/93b5e1b2-5534-4847-8ec8-d2a80ab82dab.png)
        设置参数名称和字段类型，描述和默认值非必填，参数字段是否必输：默认必输。
        ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/208e8a44-e913-4e3d-86a5-6c60b080f31f.png)
        ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/60dfce95-1593-44b9-b578-9e951f446a2a.png)
        **注意：**在配置单直接点击执行，会弹出输入参数的输入框，第一次对应字段会带出该默认值，若修改后，这个字段就会保留最后一次执行时传的参数值；
        ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/af4e4336-b9d7-44fe-a629-c654d69e7268.png)
        2. 修改配置单中的固定内容，设置为引用入参内容</br>
        具体表达式为：${{ params.xxx }}</br>
        以下内容进行了参数化：
        ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/9d7cab7f-5292-4507-acfd-c832eb0d2bf2.png)   
        3.场景中引入该配置单的地方，需要传入参数内容</br>
        ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/9187b977-65f6-4a40-a78f-70481bf0c4e8.png)
         - 传入的参数内容也可以是表达式，具体表达式的意义，可参考[场景步骤-参数设置](#场景步骤-参数设置)</br>
         - 如果传入全局环境变量${{ configs.autotest.xxx }}，意味着参数值可跟着不同环境进行切换。
        ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/c9f30b96-ad60-4813-8fee-426ef7b246b7.png)


## 执行计划

### 平台入口：

> DevOps 平台 -> 我的项目 -> 项目详情 -> 测试管理 -> 执行计划

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/05/99ddff24-1875-4297-b715-dd9affe94445.png)

### 执行计划功能介绍
1. **使用场景：** 当所有场景集的接口调试通过后，通过构建执行计划来调度接口，以完成某一维度或目的的测试任务。例如：某一功能或服务冒烟任务、某一功能或服务回归任务等；
2. **使用方法：** 
    1. 准备1：需要按照[参数配置](#参数配置)里说明的配置方式，提前准备好环境配置。</br>
       ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/05/ce40de7d-77aa-4dd7-8ad2-d67d0307f7e9.png)
       准备2：准备多个空间-创建多个场景集-创建多个场景-创建多个接口 （单场景都调试用过的）
       ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/05/06e6796f-f5c0-42f7-a140-83aa5af532f4.png)
    
    2. 创建一个新的执行计划,注意选择接口所在的空间
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/05/c871e095-5ed4-42a9-8c02-0f87f86de4d6.png)
    
    3. 点击新建的执行计划，进入测试计划，添加需要的场景集
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/05/aa53c5dd-cd3c-44ea-824f-c54919e38813.png)
    
    4. 选择配置的环境执行即可,最后可通过点击执行明细查看整个执行计划的执行结果
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/05/179b0140-5aa7-4439-a099-41db70075923.png)


3. **注意：** 在执行执行计划的过程中，使用的参数场景入参的引用值
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/05/46816b05-10ae-4e2e-8681-e7ea0ddc87be.png)



## 参数配置

### 平台入口：

> DevOps 平台 -> 我的项目 -> 项目详情 -> 测试管理 -> 参数配置 -> 自动化测试

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/05/9a0defa3-1439-4bc1-a96a-650bb58de941.png)

### 参数配置包含内容：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/05/9e942fd0-08c1-4da0-a129-4f278e51ddda.png)
1. **名称：** 定义配置环境，例如：测试环境、开发环境、生成环境等
2. **描述：** 可描述根据环境变化，需要注意修改的内容
3. **环境域名：** 根据定义的名称填写对应环境的固定域名，例如：https://terminus-org.erda.cloud。</br>
   - 注意： </br>
   用户后续选择该执行环境时，若接口url没有设置固定域名，会自动拼接该域名发起请求；</br>
   用户后续选择该执行环境时，若接口url中已经有固定域名，会优先使用接口中固定的域名发起请求；</br>
   - 使用方法：
    1. 先定义环境域名
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/05/a797e670-ad80-4ec8-84e5-070b26b3d025.png)
    2. 在接口中添加url
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/05/b7c290a6-3171-4437-8eb8-812e512ccc9f.png)
    下图即为接口url没有设置固定域名的场景
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/05/94d0caf3-c18b-4482-87cc-fed3336f6efc.png)
    3. 选择环境执行
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/05/4bc8049a-f532-4ed5-b32b-464223cab25b.png)
    4. 执行后自动拼接url
    ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/05/2f824ce0-9da9-4a1a-8015-91df0c88da21.png)

4. **Header：** 若自动化过程中需要固定某些header参数时，可以选择下拉框中的选项或自定义字段。</br>
   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/05/c3260527-af8f-4c05-aeac-c6c7e1ed26c8.png)
   用户后续选择该执行环境时，若接口中没有同名的header信息，会自动传该环境配置中的header信息到请求接口中;</br>
   用户后续选择该执行环境时，若接口中有同名的header信息，会优先用接口中已定义的header信息传到请求接口中;</br>
   - 使用方法：
   1. 先定义全局参数key和value
   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/05/1fd70752-4e32-4987-8985-3a4988c0cb21.png)

   2. 选择执行选择配置的环境配置
   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/05/3bac8a88-1e94-4bbd-a78e-d9f862edd290.png)
   
   3. 查看执行明细中，每个接口的执行结果，例如其中一个接口的请求详情对应如下，和环境配置中设置的header中的key和value一致：
   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/05/a4bb674d-3a5b-40a7-9910-b3f05ace417a.png)

5. **Global：** 若自动化过程中，多个测试接口（无论是否是同一场景或同一场景集或同一空间等），当它们的输入都引用到同一个特定的值或者遵循某一特定的规律，且可能随着环境切换而变化的内容，都可以配置到环境配置的Global参数中，例如：数据库链接信息等。</br>
   - 使用方法：
   1. 先定义全局参数key和value
      ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/05/90197b9c-ea65-48e1-84b5-f9d849c1d36e.png)
   2. 在场景的场景入参或接口中入参或配置单传参处，引用全局参数</br>
      引用表达式：${{ configs.autotest.xxx }}</br>
      场景入参：
      ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/05/b1ef815e-1eb4-488e-999e-108c02769826.png)
      接口中入参：
      ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/05/3361f271-eba7-4455-8ced-b8d10dfb0525.png)
      配置单传参：
      ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/05/38e8e71e-e184-415f-80fb-132ee3e8e93f.png)
