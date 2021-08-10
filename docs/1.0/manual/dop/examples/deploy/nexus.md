# 使用 Nexus 加速你的构建 

## 推送 jar 包到私服

### 上传 maven settings.xml 到平台

进入变量配置页面下

项目下 应用设置 > 流水线 / 变量配置 > {对应的环境}

点击`新增配置`， 然后选择类型为 *文件*，选择 *开启加密*，将自己的 settings.xml 上传上去，变量名称定义为 `MAVEN_SETTING_FILE`

::: warning
必须选择加密，因为文件中含有密码等敏感信息
:::

settings.xml 样例

```xml
<?xml version="1.0" encoding="UTF-8"?>

<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">

  <servers>
    <server>
      <id>terminus</id>
      <username>deployment</username>
      <password>******</password>
    </server>
  </servers>
</settings>
```

### 源代码中 pom.xml 配置推送地址

对应的项目的 pom 需要如下配置，没有添加就会报错无法推送上去

```xml
<distributionManagement>
    <repository>
        <id>terminus</id>    <!-- settings.xml 里配置的 server.id -->
        <name>Releases</name>
        <url>http://私服地址/repository/releases</url>  <!-- release 私服的地址 -->
    </repository>
    <snapshotRepository>
        <id>terminus</id>
        <name>Snapshots</name>
        <url>http://私服地址/repository/releases</url>  <!-- snapshot 私服的地址 -->
    </snapshotRepository>
</distributionManagement>
```

### 配置流水线实现 jar 包上传

- MAVEN_SETTING_FILE 就是上面配置的名称

```yaml
version: '1.1'

stages:
- stage:
  - git-checkout:
      alias: git-checkout
      params:
        depth: 1
- stage:
  - java-build:
      alias: java-build
      version: "1.0"
      params:
        build_cmd:
           - "mvn clean deploy  -e -B -U --settings ((MAVEN_SETTING_FILE)) -Dmaven.test.skip"
        jdk_version: 8
        workdir: ${git-checkout}
```

若需要自动触发构建，可增加持续集成配置，[详细参看](../deploy/pipeline.md#代码更新触发流水线)

```yaml
on:
  push:
    branches:
      - develop # 持续集成
```

### 注意点

::: tip
maven 401 错误是账号密码不对

maven 405 错误可能是私服地址有问题，有些私服地址是不能推送的，比如 public
:::

## 推送 jar 包到私服 (gradle)

### 在平台上配置 nexus 私服密码

进入变量配置页面下

项目下 应用设置 > 流水线 / 变量配置 > {对应的环境}

点击`新增配置`， 然后选择类型为 *值*，选择 *开启加密*，配置以下变量
- NEXUS_USERNAME
- NEXUS_PASSWORD

::: warning
必须选择加密，因为文件中含有密码等敏感信息
:::

### 源代码中 build.gradle 配置推送地址

对应的项目的 build.gradle 需要如下配置，没有添加就会报错无法推送上去。build.gradle 配置方式 [查看](https://docs.gradle.org/current/userguide/publishing_maven.html)

```groovy
publishing{

    ...

    repositories {
        maven {
            // change URLs to point to your repos, e.g. http://my.org/repo
            def releasesRepoUrl = "http://私服地址/repository/releases"
            def snapshotsRepoUrl = "http://私服地址/repository/snapshots"
            url = version.endsWith('SNAPSHOT') ? snapshotsRepoUrl : releasesRepoUrl
            credentials {
                username = System.getenv("NEXUS_USERNAME")
                password = System.getenv("NEXUS_PASSWORD")
            }
        }
    }
}
```

### 配置流水线实现 jar 包上传

```yaml
version: '1.1'

stages:
- stage:
  - git-checkout:
      alias: git-checkout
      params:
        depth: 1
- stage:
  - java-build:
      alias: java-build
      version: "1.0"
      params:
        build_cmd:
           - "./gradlew publish"
        jdk_version: 8
        workdir: ${git-checkout}
```

若需要自动触发构建，可增加持续集成配置，[详细参看](../deploy/pipeline.md#代码更新触发流水线)

```yaml
on:
  push:
    branches:
      - develop # 持续集成
```

### 注意点

::: tip
maven 401 错误是账号密码不对

maven 405 错误可能是私服地址有问题，有些私服地址是不能推送的，比如 public
:::
