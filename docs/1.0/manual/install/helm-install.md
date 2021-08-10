# 基于 Helm 命令安装

## 安装要求

- Kubernetes 1.16-1.18
  - 至少 4 个节点（1 个 Master 和 3 个 Worker）
  - 每个节点 4 CPU，16 GB 内存
  - 未安装 Ingress Controller 组件
- Docker 19.03 及以上
- CentOS 7.4 及以上
- Helm 3 及以上
- 泛域名（可选，用于访问 Erda 平台，例如 *.erda.io）



## 安装步骤

1. 从 Kubernetes Master 节点下载 [安装包](https://github.com/erda-project/erda/releases) 并解压。
	
   ```shell
   tar -xzvf erda-linux.tar.gz
   cd erda
   ```
   
   :::tip
   当前仅支持 Linux 系统。
   :::
   
2. 在 Kubernetes Master 节点进行安装配置。

   * 确认 `~/.kube/` 路径下有 `kubeconfig` 文件，且文件中有如下配置：

     * `certificate-authority-data`
     * `client-certificate-data`
     * `client-key-data`

   - 完成 Erda 安装前期所需配置，并执行 `prepare.sh` 脚本，脚本中会运行如下操作：

     - 生成 etcd 的 SSL
     - 生成多集群管理的 SSL
     - 为节点设置 Erda 应用所需标签
     - Erda 安装工具中所需配置

     ```shell
     # 可以在此处指定 Erda 组件所在的命名空间，默认为 default 且当前仅支持 default 命名空间
     export ERDA_NAMESPACE="default"
     
     # 可以在此处指定 Erda 平台所用的泛域名，如 *.erda.io，默认值为 erda.io
     export ERDA_GENERIC_DOMAIN="erda.io"
     
     # 可以在此处指定 Erda 平台所用的集群名称，默认为 erda-demo
     export ERDA_CLUSTER_NAME="erda-demo"
     
     # 执行 prepare.sh 脚本，用于设置 Erda 平台安装时必要的配置
     bash scripts/prepare.sh
     ```

   - 修改 `/docker/daemon` 文件中的 `insecure-registries` 字段。

      ```shell
      # 在*每台节点*上编辑 /etc/docker/daemon.json 文件
      ...
          "insecure-registries": [
              "0.0.0.0/0"
          ],
      ...
      
      # 重启 docker daemon
      systemctl restart docker
      ```

   - 在每个节点上设置 NFS 作为网络共享存储。

      - 如果您已经有网络共享存储（如阿里云），可运行如下命令将其设置在每个节点上：
      
        ```shell
        mount -t <storage_type> <your-share-storage-node-ip>:<your-share-storage-dir> /netdata
        
        # 举例如下：假设您拥有阿里云 NAS v4 服务作为共享网络存储，阿里云 NAS 的 Host 为 file-system-id.region.nas.aliyuncs.com 您需要通过如下命令挂载目录:
        
        mount -t nfs -o vers=4,minorversion=0,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport file-system-id.region.nas.aliyuncs.com:/ /netdata  
        ```

      - 或者执行如下脚本，以协助安装 NFS 组件，在当前节点上创建 `/netdata` 文件夹并将其挂载到剩余节点。

        ```shell
        bash scripts/storage_prepare.sh
        ```
      
   - 在 LB 机器上开放 80，443 端口，这台机器将承载所有的外部流量。

      ```shell
      # 您可以使用如下命令在您的 Kubernetes 集群上找到 LB 节点：
      
      kubectl get node -o wide --show-labels | grep dice/lb
      ```

      ::: tip
      该节点 IP 将用于后续泛域名设置，请妥善保存。
      :::
      

3. 通过 Helm 安装 Erda Helm 包，并等待所有的 Erda 组件准备就绪。

   ```shell
   # 安装 erda-base
   helm install package/erda-base-$(cat VERSION).tgz --generate-name
   
   # 安装 erda-addons
   helm install package/erda-addons-$(cat VERSION).tgz --generate-name
   
   # 安装 erda
   helm install package/erda-$(cat VERSION).tgz --generate-name
   ```

4. 安装 Erda 平台组件。

   - 设置管理员用户名和密码，用于推送 Erda 扩展组件（扩展组件将作为一种插件应用于流水线）。

     ```shell
     export ERDA_ADMIN_USERNAME=admin
     export ERDA_ADMIN_PASSWORD=password123456
     
     bash scripts/push-ext.sh
     ```

   - 如果您购买了真实的泛域名，请将该泛域名与之前获取到的 LB 节点 IP 绑定。

     ::: details 示例如下：

     假设您有 LB 节点的 IP 为 10.0.0.1，泛域名（ERDA_GENERIC_DOMAIN 变量中设置）为 `erda.io`，您需要在解析器（如 DNS 或 F5 服务器）上，将 LB 节点 IP 与泛域名绑定。

     :::

   - 如果没有真实的泛域名，您需要在浏览器所在机器上，将下列 URL 写入 `etc/hosts` 文件，并替换 IP 为 LB 节点的 IP。

     ::: details 示例如下：

     假设您有 LB 节点的 IP 为 10.0.0.1，泛域名（ERDA_GENERIC_DOMAIN 变量中设置）为 `erda.io`，org-name 为 `erda-test`，您需要将下列信息写入 `/etc/hosts` 文件。

     ```shell
      10.0.0.1 collector.erda.io
     10.0.0.1 openapi.erda.io
      10.0.0.1 uc.erda.io
     10.0.0.1 erda.io
     # 注意: org-name 举例为 erda-test
     10.0.0.1 erda-test-org.erda.io
     ```

     :::

   - 将创建的组织名称作为标签，设置到您的 Kubernetes 节点上。

     ```shell
      kubectl label node <node_name> dice/org-<orgname>=true --overwrite
     ```

5. 在您设置过 `/etc/hosts` 文件的机器上用浏览器访问 http://erda.io，开始您的 Erda 之旅。

