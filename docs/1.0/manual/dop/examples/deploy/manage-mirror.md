# 通过 dockerfile 文件构建镜像并推送到 erda 镜像仓库

```yaml
- stage:
   - dockerfile:
       params:
         workdir: ${git-checkout}
         path: Dockerfile
         build_args:   
          JAVA_OPTS: -Xms700m
          NODE_OPTIONS: --max_old_space_size=3040
```

Dockerfile Action 是用于自定义 dockerfile 进行打包，产出应用镜像用于部署。产出的镜像会推送到 erda 上的镜像仓库中

## 参数申明

workdir 声明命令在那个目录下执行   
path dockerfile 相对应用路径
build_args Dockerfile build args，在这里填写的键值对 会被渲染成为 Dockerfile 中的 ARG

# 通过 docker push 推送镜像到指定仓库 

```yaml
- stage:
  - docker-push:
      params:
        image: registry.erda.cloud/erdaxxx:v1.0            
        from: imageResult.img                               
        service: test-server                                
        username: admin                                    
        password: xxxx                                      
```

docker-push 主要完成如下两个功能：
1.从本地文件读取镜像，push 到指定镜像仓库
2.将 外部仓库的镜像 push 到 dice 内部仓库，供部署使用

## 参数申明

image 要 push 到外部镜像名称, require
from 应用下面的文件,一般从 buildPack 的出参中获取
service 服务名称，要与镜像文件里的module_name一致
username 外部镜像仓库用户名
password 外部镜像仓库用密码

# 通过 docker pull 拉去镜像到 erda 仓库 

```yaml
- stage:
  - docker-push:
      params:
        image: registry.erda.cloud/erdaxxx:v1.0  
        service: test-server                               
        username: admin                                    
        password: xxxx                                      
        pull: true                                                                
```

使用 docker-push Action, 增加 pull 字段申明是 docker pull 

## 参数申明

要 pull 的外部镜像名称, require
image 要 push 到外部镜像名称, require
service 服务名称，要与镜像文件里的module_name一致
username 外部镜像仓库用户名
password 外部镜像仓库用密码
pull 该值必须为: true,表示是拉取代码

### 使用自定义命令推送镜像或者 pull 镜像

推送到 erda 仓库
```yaml
  - stage:
      - custom-script:
          alias: docker-push
          # 基于 docker hub 上的 docker 镜像
          image: docker
          commands:
            # 设置镜像加速
            - echo "http://mirrors.aliyun.com/alpine/v3.6/main/" > /etc/apk/repositories && echo "http://mirrors.aliyun.com/alpine/v3.6/community/" >> /etc/apk/repositories
            # 进入代码根目录
            - cd ${git-checkout} 
            # 设置 repo 的名称，这里用 erda 内部的 dockerRegisterAddr, imageName，tagName 自行填写
            - repo=""$BP_DOCKER_ARTIFACT_REGISTRY"/"$DICE_PROJECT_APPLICATION":"imageName"-"tagName""
            # 构建镜像
            - docker build -t $repo .
            # login 和 registerAddr 地址看用户自定义情况来定，因为 $BP_DOCKER_ARTIFACT_REGISTRY 是 erda 自带 docker 的仓库，不需要登录，直接推送即可 
            # - 否则需要执行 docker login --username= --password= registerAddr
            - docker push $repo
            # 写入 image 的名称给下面的 action 使用 -> ${{ outputs.docker.image }}
            - echo "image="$repo"" >> $METAFILE
            # 打个别名
            - docker tag $repo xxx/xx/xx:tag 
            # 推送到 tag 的地址，如果需要登录请 docker login --username= --password= registerAddr
            - docker push xxx/xx/xx:tag
```

拉取 erda 仓库中的镜像，推送到外置仓库

```yaml
  - stage:
      - custom-script:
          alias: docker-tag
          # 基于 docker hub 上的 docker 镜像
          image: docker
          commands:
            # 设置镜像加速
            - echo "http://mirrors.aliyun.com/alpine/v3.6/main/" > /etc/apk/repositories && echo "http://mirrors.aliyun.com/alpine/v3.6/community/" >> /etc/apk/repositories
            # 进入代码根目录
            - cd ${git-checkout} 
            # 如果需要登录请 docker login --username= --password= registerAddr
            - docker pull xxx/xxx/xx1:tag
            # 使用前置节点的镜像出参, ${{ outputs.xxx.image }} xxx 节点的出参
            # - docker tag ${{ outputs.xxx.image }} xxx/xx/xx:tag 
            # 自己定义的镜像名称
            - docker tag xxx/xxx/xx1:tag xxx/xx/xx:tag 
            # 推送到新的地址，如果需要登录请 docker login --username= --password= registerAddr
            - docker push xxx/xx/xx:tag
```
上面 2 个例子其实就是使用 `docker` 命令进行镜像打包推送和拉取，只是 `erda` 的仓库地址需要用 `$BP_DOCKER_ARTIFACT_REGISTRY` 这种方式拿，然后 `erda` 的仓库不需要登录，其余的命令都是 `docker` 和 `linux` 命令实现