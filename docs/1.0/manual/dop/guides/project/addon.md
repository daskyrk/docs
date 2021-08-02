# 自定义扩展服务

## 使用场景

* 非平台部署的中间件服务（比如单独购置机器部署的 mysql 等）
* 公用的三方服务（比如短信渠道配置等）

## 设置入口

> DevOps 平台 -> 我的项目 -> 项目详情 -> 扩展服务 -> 右上角添加服务

注意 “三方服务” 选择 **Custom**

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/11/09/46234c44-6ee2-421d-b1fa-542f2e040aed.png)

填写业务配置

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/11/09/1bea9fb8-547f-4187-8133-8ea1b21803ab.png)

## 使用入口

> DevOps 平台 -> 我的项目 -> 应用列表 -> 应用详情 -> 代码浏览

打开 dice.yml，进入编辑模式，选择先前创建的 addon

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/11/09/ed4d81c3-1709-45ab-8d96-a759c5189924.png)

保存后，进行构建和部署，最终生效

## 使用方式

通过系统环境变量的方式，业务程序便可以拿到配置，以 `spring-boot` 程序为例，可以通过 application.yml 中 ${MYSQL_HOST} 的方式获取到配置

```yaml
server:
  port: 8080

spring:
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://${MYSQL_HOST:127.0.0.1}:${MYSQL_PORT:3306}/${MYSQL_DATABASE}?useUnicode=true&characterEncoding=UTF-8
    username: ${MYSQL_USERNAME:root}
    password: ${MYSQL_PASSWORD:}
```

## 导入导出自定义扩展服务

### 导出

> DevOps 平台 -> 我的项目 -> \<选择某个项目\> -> 扩展服务

在 `自定义` 部分, 有 `查看配置` 按钮, 内容是当前项目下所有 自定义 addon 的 json 形式配置.

### 导入

> DevOps 平台 -> 我的项目 -> \<选择某个项目\> -> 扩展服务 -> 添加服务

选择 `Custom` 类型服务, 创建方式选择 `配置导入`, 将上面 `导出` 中获取的 json 粘贴, 如有需要, 根据实际情况修改配置参数, 
即可实现将自定义addon从其他项目导入到当前项目


# 开箱即用扩展服务

## 使用场景

* 开箱即用
* 一键拉起

::: tip
mysql 不提供生产级别支持，建议只在开发测试环境使用
:::

## 创建/使用入口

::: tip
开箱即用的扩展服务（addon）使用入口即创建入口，使用时可以直接申请全新 addon 创建
:::

> DevOps 平台 -> 我的项目 -> 应用列表 -> 应用详情 -> 代码浏览

打开 dice.yml，进入编辑模式，选择开箱即用的 addon

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/11/11/fa77c96c-ba56-45b1-8cf6-ebcfe831ab39.png)

保存后，进行构建和部署，最终生效

### 新建和实例的区别

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/11/11/05a48a09-9a00-4502-953c-351f614308f7.png)

如上图，选择实例时会有实例和非实例的区别
1. 有“实例”标签的，代表是这个项目中，已经发起的扩展服务实例（例如这个项目中其他应用已经申请创建的）
2. 没有“实例”标签的，是允许当前应用创建全新的扩展服务，当编辑完成，进行构建和发布后，扩展服务便自动拉起并将配置注入给程序

## 使用方式

通过系统环境变量的方式，业务程序便可以拿到配置，以 `spring-boot` 程序为例，可以通过 application.yml 中 ${MYSQL_HOST} 的方式获取到配置。

```yaml
server:
  port: 8080

spring:
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://${MYSQL_HOST:127.0.0.1}:${MYSQL_PORT:3306}/${MYSQL_DATABASE}?useUnicode=true&characterEncoding=UTF-8
    username: ${MYSQL_USERNAME:root}
    password: ${MYSQL_PASSWORD:}
```

每款开箱即用扩展服务均有其特色的环境变量配置，详细可进入：[扩展服务名录](https://www.erda.cloud/market/addon)，参看每款扩展服务的配置，以 mysql 为例： [MYSQL](https://www.erda.cloud/market/addon/mysql)

可在扩展服务详情页面查看使用介绍，红框位置描述了这款扩展服务提供的配置清单：

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/11/11/35f9b7f5-2453-4023-b25f-b81c49cff6ca.png)
