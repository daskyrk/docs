# 常见问题

## 如何对服务进行扩缩容？

扩缩容服务无需调整 dice.yml，直接在部署中心操作即可。

1. 进入 **DevOps 平台 > 我的应用 > 部署中心**，选择 **服务扩容**。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/260f3113-ab28-4b7d-b037-e03a2a7c839c.png)

2. 根据需要进行服务资源调整。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/c011e6b1-5c60-4e60-80b1-1fcd09fd8df5.png)



## 服务是否有提供内部调用的地址？

进入 **DevOps 平台 > 我的应用 > 部署中心** 可查看服务的内部地址。

该内部地址不会受服务的重新部署或流水线的重新构建影响。不会跟随服务的重新部署变化，也不会跟随流水线的重新构建而变化。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/7abb7a31-dd2b-482a-867d-bd939db9503f.png)



## 如何查看错误日志？

1. 进入 **DevOps 平台 > 我的应用 > 部署中心**，点击容器日志，此时显示的是标准输出（stdout）日志。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/292c236d-6725-42a4-8dca-103aad5a7c81.png)

2. 点击顶部切换开关，查看标准错误（stderr）日志。
   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/9701fd8c-bef1-40ab-b10a-2b9e6e7efda6.png)



## 访问服务域名返回 502，如何排查原因？

1. 请检查 dice.yml 里的 ports 是否是服务真正监听的端口。
2. 进入容器控制台使用 `telnet 容器IP 端口号` 查看服务端口是否监听成功。 
3. 在容器控制台内用 curl 命令请求服务，查看是否是服务自身问题。



## 如何查看已停止的容器实例？

1. 进入 **DevOps 平台 > 我的应用 > 部署中心**，选择 **已停止** 查看对应容器实例。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/53579d39-325d-49bd-a63e-30f2536da827.png)

2. 状态栏中标注了容器停止的原因（如 OOM 退出，此处将标注为 OOMKilled）。操作栏中可以查看容器运行时的资源使用情况以及对应日志。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/06/f605ca42-fc2f-462a-bd78-928ae3ad0b19.png)



## 如何复用 addon？

基于 addon 的名称进行复用，例如 dice.yml 中有如下描述，则 redis-abc 就是这个 addon 的名称：

```yaml
addons:
  redis-abc:
    plan: redis:basic
```



## 使用 API 网关进行转发，页面重定向失败怎么办？

失败原因一般是使用了请求头中的 Host，建议使用 X-Forwarded-Host 进行替代，或者开启 API 网关的域名透传，步骤如下：

1. 进入 **微服务治理平台 > API 网关 > 流量入口管理**，选择对应流量入口详情，点击 **全局策略**。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/07/ed92c2e9-96ac-495a-ac88-a922ccead4dc.png)

2. 进入 **业务策略 > 流量接收转发**，启用规则后开启 **入口域名透传**。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/07/cb315752-a675-4bc3-8f77-f5047edb0cb9.png)



## 如何对特定域名或 API 控制 HTTPS 强制跳转？

1. 进入 **微服务治理平台 > API 网关 > 流量入口管理**，点击对应流量入口详情，选择 **全局策略** 或 **策略**。（全局策略对该流量入口下所有 API 生效，具体 API 策略只对该 API 生效。）

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/07/4630dbe7-9d7f-4eed-95f1-c66dc3e8f265.png)

2. 进入 **业务策略 > 流量接收转发**，启用规则后开启 **强制跳转HTTPS**。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/07/a4089b8f-0636-42c2-9de6-990d69babe7a.png)

::: tip  

如果在 SLB 等外部负载均衡设备上，配置了 80 端口强制 HTTPS 跳转，则 Erda 上的跳转功能无效。

:::



## 如何在容器中使用存储？

* 场景一：多个容器需要共享某些特定文件（如支付证书）时，一个应用的多个实例将共享一块存储，对支付证书进行存取。dice.yaml 中的配置参考如下：

```yaml
volumes:
- storage: nfs
  path: /data/cert
```

* 场景二：部署一个需要持久化存储的服务时（如 oracle），可以在 dice.yaml 中声明一块 Local 类型的 Volumes，则该 Pod 在重启后也会再次分配到当前宿主机上。

```yaml
volumes:
- storage: local
  path: /u01/app/oracle
```



## 如何确定一个容器的出口 IP？

当部署在 Erda 上的应用需要调用外部接口（如支付接口）时，第三方服务通常需要获取公网的出口 IP 来定位问题，此时可以在容器控制台中执行以下命令：

```shell script
curl ifconfig.me
```

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/05/bc605c6f-fa52-4416-b56a-4c6c5850289d.png)



## 平台支持 java 11 吗？

支持，可以通过指定 `container_version` 来切换运行容器的 JDK 版本。目前支持 JDK 1.8 和 11 两个版本 。

pipeline.yml 中的配置如下:

```
- java:
    params:
      build_type: maven # 打包类型，这里选用 maven 打包
      workdir: ${git-checkout} # 打包时的当前路径，此路径一般为根 pom.xml 的路径
      options: -am -pl user # maven 打包参数，比如打包 user 模块使用命令 `mvn clean package -am -pl user`，这里省略命令 `mvn clean package` 只需要填写参数
      target: ./user/target/user.jar # 打包产物，一般为 jar，填写相较于 workdir 的相对路径。文件必须存在，否则将会出错。
      container_type: spring-boot # 运行 target（如 jar）所需的容器类型，比如这里我们打包的结果是 spring-boot 的 fat jar，故使用 spring-boot container
      #container_version: v1.8.0.181 # 可选: v1.8.0.181, v11.0.6, 默认 v1.8.0.181
```



## 平台支持自定义 Dockerfile 吗？

支持。在 dice.yml 中可以直接配置 image，pipeline.yml 可以省略打包过程，直接释出版本。具体示例如下。

dice.yml：

```
version: "2.0"
services:
  web:
    image: "nginx:latest"
    resources:
      cpu: 0.1
      mem: 128
    deployments:
      replicas: 1
    ports:
      - 80
    expose:
      - 80
    health_check:
      http:
        port: 80
        path: "/"
        duration: 30
```

pipeline.yml：

```
version: '1.1'

stages:
- stage:
  - git-checkout:

- stage:
  - release:
      params:
        dice_yml: ${git-checkout}/dice.yml

- stage:
  - dice:
      params:
        release_id: ${release:OUTPUT:releaseID}
```



## 应用是 gradle distribution 打包的 tar/zip，应该如何运行？

配置示例如下：

```yaml
- java:
    params:
      build_type: gradle
      build_cmd: ./gradlew :user:build
      workdir: ${git-checkout}
      target: ./user/build/distributions/user.tar
      container_type: openjdk
      #container_version: v1.8.0.181 # 可选: v1.8.0.181, v11.0.6, 默认 v1.8.0.181
```

当 target 配置为 tar 时，会自动识别并使用 tar 中的启动脚本来启动程序。



## java/kotlin 接入 Erda 的监控，需要如何调整代码？

不需要调整代码，Erda 将修改字节码自动插入采集逻辑来实现 java 监控。



## 如何为服务配置变量？

进入 **DevOps 平台 > 我的应用 > 应用设置 > 部署中心 > 参数设置**，为服务配置变量。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/08/5daa915e-f493-4c98-8c0a-d4c78f21cd0b.png)

