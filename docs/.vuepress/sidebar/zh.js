const {fs, path} = require('@vuepress/shared-utils')

// const officialPlugins = fs
//   .readdirSync(path.resolve(__dirname, '../../plugin/official'))
//   .map(filename => 'official/' + filename.slice(0, -3))
//   .sort()

module.exports = {
    '/1.0/manual/': [
        // '',
        {
            title: '关于 Erda',
            collapsable: true,
            children: [
                'about/intro'
            ]
        },
        {
            title: '安装配置',
            collapsable: true,
            children: [
                'install/helm-install',
                'install/high-availability',
                'install/provider-install',
                'install/upgrade'
            ]
        },
        {
            title: '快速入门',
            collapsable: true,
            children: [
                'quick-start/premise',
                'quick-start/newbie'
            ]
        },
        {
            title: '多云管理平台',
            collapsable: true,
            children: [
                'cmp/example',
                'cmp/concept',
                'cmp/best-practice',
                {
                    title: '使用指南',
                    collapsable: true,
                    children: [
                        {
                            title: '集群管理',
                            collapsable: true,
                            children: [
                                'cmp/guide/cluster/management',
                                'cmp/guide/cluster/autoscaling',
                                'cmp/guide/cluster/cluster-node-labels',
                            ]
                        },
                    ]
                },
            ]
        },
        {
            title: 'DevOps 平台',
            collapsable: true,
            children: [
                {
                    title: '场景示例',
                    collapsable: true,
                    children: [
                        ['dop/examples/cicd', 'Erda 的持续集成'],
                        ['dop/examples/project-management', '业务项目管理'],
                    ]
                },
                {
                    title: '设计理念',
                    collapsable: true,
                    children: [
                        ['dop/concepts/overview', '概述 | Overview'],
                        ['dop/concepts/agile-info', '高效协同'],
                        ['dop/concepts/erda-yaml', '声明式应用部署 erda.yml'],
                        ['dop/concepts/pipeline', '流水线/工作流 pipeline.yml'],
                        ['', 'gitflow'],
                    ]
                },
                {
                    title: '最佳实践',
                    collapsable: true,
                    children: [
                        {
                            title: 'CI/CD',
                            collapsable: true,
                            children: [
                                'dop/best-practices/CICD/deploy-from-git',
                                'dop/best-practices/CICD/deploy-from-image',
                                ['dop/best-practices/CICD/deploy-from-go-build', '部署一个 Go Web 程序'],
                                ['dop/best-practices/CICD/deploy-from-java-build', '更灵活的自定义构建你的 Java 应用'],
                                ['dop/best-practices/CICD/deploy-from-caches-build', '使用缓存加速你的构建'],
                                ['', '使用Nexus加速你的构建'],
                                ['', '你的镜像是如何被管理的'],
                                {
                                    title: '开发语言',
                                    collapsable: true,
                                    children: [
                                        'dop/best-practices/CICD/language/java',
                                        'dop/best-practices/CICD/language/javascript',
                                        'dop/best-practices/CICD/language/php',
                                        'dop/best-practices/CICD/language/go',
                                    ]
                                },
                            ]
                        },
                    ]
                },
                {
                    title: '使用指南',
                    collapsable: true,
                    children: [
                        ['dop/guides/overview', '概述 | Overview'],
                        {
                            title: '项目管理',
                            collapsable: true,
                            children: [
                                ['dop/guides/project/agile', '项目协同'],
                                ['dop/guides/project/ticket', '工单'],
                                ['dop/guides/project/statistics', '项目大盘'],
                                ['dop/guides/project/addon', '扩展服务'],
                                ['', '资源汇总'],
                                ['', '通知管理'],
                            ]
                        },
                        {
                            title: '应用管理',
                            collapsable: true,
                            children: [
                                {
                                    title: '代码仓库',
                                    collapsable: true,
                                    children: []
                                },
                                {
                                    title: '流水线',
                                    collapsable: true,
                                    children: []
                                },
                                {
                                    title: '部署中心',
                                    collapsable: true,
                                    children: [
                                        ['dop/guides/application/deploy/release-deploy', '制品部署'],
                                        ['dop/guides/application/deploy/release-manage', '制品管理'],
                                        'dop/guides/application/deploy/config',
                                        'dop/guides/application/deploy/config-center',
                                        'dop/guides/application/deploy/management',
                                        'dop/guides/application/deploy/metrics_logs.md',
                                    ]
                                },
                                {
                                    title: '代码质量',
                                    collapsable: true,
                                    children: [
                                        ['dop/guides/application/codequality/sonar.md', '质量报告和问题列表'],
                                        ['', '门禁规则配置'],
                                        ['', '单元测试'],
                                    ]
                                },
                            ]
                        },
                    ]
                },
                ['dop/api-management', 'API集市'],
                {
                    title: '测试平台',
                    collapsable: true,
                    children: [
                        'dop/testing/auto-test-getting-started',
                        'dop/testing/function-test',
                    ]
                },
                {
                    title: '移动开发',
                    collapsable: true,
                    children: [
                        'dop/mobileapp/basic',
                        'dop/mobileapp/framework',
                        'dop/mobileapp/local-environment',
                        'dop/mobileapp/howto-dev',
                        'dop/mobileapp/management',
                        'dop/mobileapp/certificates',
                        'dop/mobileapp/libraries',
                        'dop/mobileapp/ios-ci'
                    ]
                },
            ]
        },
        {
            title: '微服务治理平台',
            collapsable: true,
            children: [
                {
                    title: '场景示例',
                    collapsable: true,
                    children: [
                        {
                            title: 'API 网关',
                            collapsable: true,
                            children: [
                                'msp/examples/apigw/config',
                                'msp/examples/apigw/rate-limit',
                                'msp/examples/apigw/custom-header',
                                'msp/examples/apigw/access-limit',
                                'msp/examples/apigw/cors',
                                'msp/examples/apigw/openapi',
                            ],
                        },
                        {
                            title: '注册中心&配置中心',
                            collapsable: true,
                            children: [
                                'msp/examples/nc/dubbo',
                                'msp/examples/nc/springcloud',
                                'msp/examples/nc/spring',
                            ],
                        },
                    ]
                },
                {
                    title: '设计理念',
                    collapsable: true,
                    children: [
                        {
                            title: 'API 网关',
                            collapsable: true,
                            children: [
                                'msp/concepts/apigw/arch',
                                'msp/concepts/apigw/core',
                            ],
                        },
                        {
                            title: '注册中心&配置中心',
                            collapsable: true,
                            children: [
                                'msp/concepts/nc/arch',
                                'msp/concepts/nc/core',
                            ],
                        },
                    ]
                },
                {
                    title: '最佳实践',
                    collapsable: true,
                    children: [
                        {
                            title: 'API 网关',
                            collapsable: true,
                            children: [
                                'msp/practice/apigw/iac',
                                'msp/practice/apigw/apim',
                            ],
                        },
                        {
                            title: '注册中心&配置中心',
                            collapsable: true,
                            children: [
                                'msp/practice/nc/mse',
                            ],
                        },
                    ]
                },
                {
                    title: '使用指南',
                    collapsable: true,
                    children: [
                        ['msp/guides/apm/topology', '全局拓扑'],
                        {
                            title: '应用监控',
                            collapsable: true,
                            children: [
                                'msp/guides/apm/service-analysis',
                                'msp/guides/apm/browser-monitor',
                                'msp/guides/apm/browser-monitor-config',
                                'msp/guides/apm/trace',
                                'msp/guides/apm/status',
                                'msp/guides/apm/alarm',
                                'msp/guides/apm/custom-alarm',
                                'msp/guides/apm/dashboard',
                                'msp/guides/apm/dashboard-advanced',
                            ]
                        },
                        {
                            title: 'API 网关',
                            collapsable: true,
                            children: [
                                'msp/guides/apigw/policy',
                                'msp/guides/apigw/auth',
                                'msp/guides/apigw/bench',
                                'msp/guides/apigw/status',
                            ]
                        },
                        {
                            title: '注册中心&配置中心',
                            collapsable: true,
                            children: [
                                'msp/guides/nc/console',
                                'msp/guides/nc/info',
                            ]
                        },
                    ]
                },
            ]
        },
        {
            title: '边缘计算平台',
            collapsable: true,
            children: [
                'ecp/example',
                'ecp/concept',
                'ecp/best-practice',
                {
                    title: '使用指南',
                    collapsable: true,
                    children: [
                        ['ecp/resource', '资源管理'],
                        ['ecp/config-set', '配置管理'],
                        ['ecp/application', '应用管理'],
                    ]
                },
            ]
        },
        {
            title: '快数据平台',
            collapsable: true,
            children: [
                'fdp/example',
                'fdp/concept',
                'fdp/best-practice',
                'fdp/guide',
            ]
        },
        {
            title: '命令行工具',
            collapsable: true,
            children: [
                'cli/deploy-by-code',
                'cli/explain-args'
            ]
        },
        {
            title: '常见问题',
            collapsable: true,
            children: [
                'faq/faq',
            ]
        },
        {
            title: '发布声明',
            collapsable: true,
            children: [
                'release-notes/v1.1',
            ]
        },
        'glossary'
    ]
}
