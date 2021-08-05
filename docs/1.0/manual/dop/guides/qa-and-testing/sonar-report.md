# 代码质量（Sonar 报告）
## Sonar

质量报告由Sonar Action提供,主要有以下参数

### code_dir

需要扫描的代码目录

### language

语言类型，当前版本需要用户需要明确指定。支持 java / go / js

## 获取质量报告

在流水线文件中添加Sonar Action（任务类型 -> 测试管理 -> sonar 代码质量检查）

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/29/4bc53cda-1a3d-4406-b953-6945644ccd1f.png)

执行流水线后可查看质量报告和问题列表

> DevOps 平台 -> 项目 -> 应用 -> 代码质量 

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/29/8a57d436-3ce7-4f62-9bdd-144e7a8620ed.png)

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/07/29/6e07741a-7d59-47da-90a9-f93194a83919.png)
