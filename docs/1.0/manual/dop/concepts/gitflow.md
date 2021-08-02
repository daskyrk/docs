# Gitflow

Gitflow 是一个 Git 工作流，有助于持续软件开发和实施DevOps实践。它由文森特·德里森在 [nvie](http://nvie.com/posts/a-successful-git-branching-model/)首次出版并广受欢迎 。Gitflow 工作流定义了围绕项目发布设计的严格分支模型，非常适合于有计划的发布周期项目和持续交付。

如下图所示，就是一个标准的 Gitflow 。

<img src="//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/02/63182c72-d730-4690-8d09-bc1d8959a137.png" alt="2" style="zoom:50%;" />

## 概括

Gitflow的整体流程为：
1. `develop`分支是从`master`分支切出来的
2. `release`分支是从`develop`切出来的
3. `feature` 分支是从 `develop`切出来的
4. 当 `feature`完成时，它会合并到`develop` 分支中
5. 当`release`分支完成时，它被合并到`develop`和`master`分支
6. 如果`master` 检测到问题，则会从`master`切出一个`hotfix`分支
7. 一旦`hotfix`完成，它就会同时合并到`develop`和`master`分支中

## develop 和 master 分支

<img src="//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/02/5ba6cca2-d6ac-42b0-839a-22550cc963ee.png" alt="5" style="zoom:50%;" />

标准的 Gitflow 使用两个分支而不是一个分支来记录项目的演进历史。其中master 分支记录正式发布记录，develop 记录演进历程。develop 分支和各个 feature 交互，feature 不断集成到 develop 分支，develop 不断切出分支作为新的 feature 的基线。

master 分支可以通过 tag 来标记版本。master 分支可以以 tag 为节点发布到生产环境。

## feature 分支

<img src="//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/02/b7400cec-f674-4814-9821-d8574ab4591d.png" alt="5" style="zoom:50%;" />

每一个 feature 都应当有一个自己的 feature 分支，不同的 feature 不应当混用一个分支，当然，这也要看研发人员对 feature 划分的粒度。

feature 总是以最新的 develop 分支为基线，完成开发后，总是要合并回 develop 分支中。feature 分支永远不会与 master 分支发生关系。

## release 分支

<img src="//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/02/7d73a92b-a5f4-4687-86e2-b16456ab8235.png" alt="5" style="zoom:50%;" />

当 develop 中集成了足够多的 feature或者预定的发布日期临近，就可以考虑发版了。发版就是从 develop 切出一个 release 分支。一旦切出一个 release 分支，则表示本 release 周期结束，并且开启了下一个 release 周期。此后所有新的 feature 都不会体现到这个已 release 分支，只会集成到 develop 并最终切到下一个 release 分支。

release 分支上的修改仅限于 bugfixies、自动化文档生成工具生成的文档等，绝不能出现新的 feature。

对 release 分支上的修复，应当开出新的分支修复并验证问题，然后合并回该 release 和 develop 分支。

release 分支可以合并到 master 分支并打对应 tag 。

## hotfix 分支

<img src="//terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/02/ce4125be-7826-4fd0-987b-d5db9a51c705.png" style="zoom:50%;" />

hotfix 分支用以快速修复生产上的问题。当生产线上出现问题，定位问题后，从对应的 tag 的 master 分支切出 hotfix 分支，解决问题并验证后，hotfix 分支要合并回 master 和 develop 分支，并在 master 分支上 tag 。

