# 测试与 CI/CD Pipeline 结合

上述文章中描述了如何使用 sonar 漏洞扫描，单元测试，自动化测试，下面我们看下如何将这些节点都结合到现有的 CICD 流水线文件中

## CI/CD Pipeline

![cicd](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/b266b084-2b54-4c6c-8cfc-2562c68c2336.png)

```yaml
version: "1.1"
stages:
  - stage:
      - git-checkout:
          alias: git-checkout
  - stage:
      - buildpack:
          alias: backend
          params:
            context: ${git-checkout}
            modules:
              - name: java-demo
                path: .
  - stage:
      - release:
          alias: release
          version: "1.0"
          params:
            dice_yml: ${git-checkout}/dice.yml
            replacement_images:
              - ${backend}/pack-result
  - stage:
      - dice:
          alias: dice
          params:
            release_id: ${release:OUTPUT:releaseID}
```

## 增加 sonar 扫描节点

![sonar](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/80e9719e-5175-49ae-8579-8bf1469a1bc2.png)

如图所示，点击图形界面的 `+` 号然后搜索 `sonar` 节点，填写好必填的字段 `code_dir` 和 `language`，`code_dir` 填写为 `${git-checkout}`, `git-checkout` 为 `git-checkout` action 的 `alias` 声明的字段，
我这里是 `java` 项目 所以 `language` 这里填写 `java`, 其他的一些字段可以根据自己是否熟悉 `sonar` 进行配置，最后有个 `use_platform_quality_gate` 字段默认值是 `true`，代表使用 `erda` 平台的扫描规则，
具体规则配置可以到项目的 `项目设置` 下进行设置

增加了 `sonar` 扫描节点后的 `yml` 结构如下

```yaml
version: "1.1"
stages:
  - stage:
      - git-checkout:
          alias: git-checkout
  - stage:
      - sonar:
          alias: sonar
          version: "1.0"
          params:
            code_dir: ${git-checkout}
            delete_project: true
            language: java
  - stage:
      - buildpack:
          alias: backend
          params:
            context: ${git-checkout}
            modules:
              - name: java-demo
                path: .
  - stage:
      - release:
          alias: release
          version: "1.0"
          params:
            dice_yml: ${git-checkout}/dice.yml
            replacement_images:
              - ${backend}/pack-result
  - stage:
      - dice:
          alias: dice
          params:
            release_id: ${release:OUTPUT:releaseID}
```

执行后在 `代码质量` -> `质量报告` 中将会看到代码扫描后的报告
执行后在 `代码质量` -> `问题列表` 中查看代码异味的报告工单
 
## 增加单元测试节点

![unit-test](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/de6a884e-b306-4873-99d9-a42021e7d216.png)

同上，点击 `+` 号搜索并选中 `unit-test`, 然后填写关键字段 `context`, `context` 填写为 `${git-checkout}`, `git-checkout` 为 `git-checkout` action 的 `alias` 声明的字段，如果不是 `golang` 语言其他非必填字段可以忽略

增加了 `unit-test` 单元测试节点后的 `yml` 结构如下

```yaml
version: "1.1"
stages:
  - stage:
      - git-checkout:
          alias: git-checkout
  - stage:
      - sonar:
          alias: sonar
          version: "1.0"
          params:
            code_dir: ${git-checkout}
            delete_project: true
            language: java
  - stage:
      - unit-test:
          alias: unit-test
          version: "1.0"
          params:
            context: ${git-checkout}
  - stage:
      - buildpack:
          alias: backend
          params:
            context: ${git-checkout}
            modules:
              - name: java-demo
                path: .
          resources:
            cpu: 0.1
            mem: 500
  - stage:
      - release:
          alias: release
          version: "1.0"
          params:
            dice_yml: ${git-checkout}/dice.yml
            replacement_images:
              - ${backend}/pack-result
  - stage:
      - dice:
          alias: dice
          params:
            release_id: ${release:OUTPUT:releaseID}
```

`unit-test` 执行完后，可以在`代码质量`->`执行列表`中查看单侧的结果

## 构建成功后增加自动化测试执行的节点

![场景](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/09/1ab369db-a34f-456c-88e6-3114ca150ba7.png)

选中 `testscene-run`(场景), 填写必填字段，下拉框选中对应的空间，场景集，场景，参数配置    
同理 `testplan-run`(计划) 也是一样的，只是一个是场景的执行，一个是计划的执行    
填好自动化测试执行的 `action` 后，等待服务启动完成后，这个 `action` 会自动帮你使用填写好的参数配置去执行对应的计划或者场景，
当接口用例没有 `100%` 执行通过，该节点就会失败，执行结果也可以到对应的场景的`执行历史`中查看 
