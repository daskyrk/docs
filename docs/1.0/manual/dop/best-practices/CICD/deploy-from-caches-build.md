### java 缓存使用
```yaml
- stage:
  - java:
      caches:
        - path: /root/.m2/repository
      params:
        build_type: maven
        workdir: ${git-checkout}
        options: -am -pl user
        target: ./user/target/user.jar
        container_type: openjdk
```

```yaml
- stage:
    - java-build:
        caches:
          - path: /root/.m2/repository
        version: "1.0"
        params:
          build_cmd:
            - mvn package
          jdk_version: 8
          workdir: ${git-checkout}
```

### js 缓存使用

```yaml
version: "1.1"
stages:
  - stage:
      - git-checkout:
          params:
          depth: 1
  - stage:
      - js:
        caches:
          - path: ${git-checkout}/node_modules
        params:
          workdir: ${git-checkout}
          build_cmd: npm run build
          container_type: spa
```

```yaml
version: "1.1"
stages:
  - stage:
      - git-checkout:
          params:
          depth: 1
  - stage:
      - js:
        caches:
          # 当缓存共享冲突的时候
          - key: '{{basePath}}/master/{{endPath}}'
            path: ${git-checkout}/node_modules
        params:
          workdir: ${git-checkout}
          build_cmd: npm run build
          container_type: spa
```

### 其他语言缓存加速及原理

`caches` 是个数组对象，可以定义多个 `path` 和 `key`   
`caches[]:path`: 指定目录进行缓存，下次构建会将这个缓存的文件放回原目录，`path` 只能是绝对路径(以 / 开头)，或者是 `dice` 中构建路径 `${}` (也是绝对路径)    
`caches[]:key`: 没有指定 `key` 的时候，系统会自动生成一个 `key`, 当缓存发生冲突的时候用户就需要自定义 `key` 了，`key` 必须以 <code v-pre>{{basePath}}</code> 开头和 <code v-pre>{{endPath}}</code> 结尾, 中间名称用户可以自定义    

为什么会发生冲突: 默认缓存是以 `/appId/projectId/hash(path)` 地址存储到 `nfs` 上，所以同一个项目中的同一个应用可能会发生冲突

::: tip
<code v-pre>{{basePath}}</code> = /appId/projectId/
<code v-pre>{{endPath}}</code> = hash(path)
:::

所以其他语言加速构建，例如 `golang` 你就可以缓存 `vendor` 文件 

```yaml
caches:
  - path: ${git-checkout}/vendor
```

