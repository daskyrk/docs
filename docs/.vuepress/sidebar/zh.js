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
                        'cmp/guide/cluster-overview',
                        {
                            title: '集群管理',
                            collapsable: true,
                            children: [
                                'cmp/guide/cluster/management',
                                'cmp/guide/cluster/autoscaling',
                                'cmp/guide/cluster/cluster-node-labels',
                            ]
                        },
                        'cmp/guide/dashboard',
                        'cmp/guide/report',
                        {
                            title: '运维告警',
                            collapsable: true,
                            children: [
                                'cmp/guide/alert/alarm-statistics',
                                'cmp/guide/alert/alarm-strategy',
                                'cmp/guide/alert/alarm-list',
                                'cmp/guide/alert/alarm-custom',
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
                        ['dop/examples/erda-project', 'Erda 工程实践'],
                        ['dop/examples/project-management', '业务项目管理'],
                        'dop/examples/deploy/deploy-from-git',
                        'dop/examples/deploy/deploy-from-image',
                        'dop/examples/deploy/deploy-from-go-build',
                        'dop/examples/deploy/deploy-from-java-build',
                        'dop/examples/deploy/deploy-from-caches-build',
                        'dop/examples/deploy/nexus',
                        ['dop/examples/deploy/manage-mirror', '你的镜像是如何被管理的'],
                    ]
                },
                {
                    title: '设计理念',
                    collapsable: true,
                    children: [
                        ['dop/concepts/overview', '概述 | Overview'],
                        ['dop/concepts/agile-info', '高效协同'],
                        ['dop/concepts/pipeline', '流水线/工作流 pipeline.yml'],
                        ['dop/concepts/erda-yaml', '声明式应用部署 erda.yml'],
                        ['dop/concepts/artifact', '制品'],
                        ['dop/concepts/gitflow', 'gitflow'],
                    ]
                },
                {
                    title: '最佳实践',
                    collapsable: true,
                    children: [
                        'dop/best-practices/api-management',
                    ]
                },
                {
                    title: '使用指南',
                    collapsable: true,
                    children: [
                        ['dop/guides/overview', '概述 | Overview'],
                        {
                            title: '协同',
                            collapsable: true,
                            children: [
                                'dop/guides/collaboration/milestone',
                                'dop/guides/collaboration/backlog-and-iteration',
                                'dop/guides/collaboration/ticket',
                                'dop/guides/collaboration/issue',
                                'dop/guides/collaboration/issue-requirement-and-task',
                                'dop/guides/collaboration/issue-bug',
                                'dop/guides/collaboration/issue-customize-and-workflow',
                                'dop/guides/collaboration/statistics',
                                'dop/guides/collaboration/label',
                                'dop/guides/collaboration/notification',
                            ]
                        },
                        {
                            title: '代码',
                            collapsable: true,
                            children: [
                                'dop/guides/code/code-hosting',
                                'dop/guides/code/branch-and-tag',
                                'dop/guides/code/merge-request',
                            ]
                        },
                        {
                            title: 'API',
                            collapsable: true,
                            children: [
                                'dop/guides/api/api-design',
                            ]
                        },
                        {
                            title: '开发语言',
                            collapsable: true,
                            children: [
                                'dop/guides/language/java',
                                'dop/guides/language/javascript',
                                'dop/guides/language/php',
                                'dop/guides/language/go',
                            ]
                        },
                        {
                            title: '部署和管理',
                            collapsable: true,
                            children: [
                                'dop/guides/deploy/artifact-and-build',
                                'dop/guides/deploy/deploy-from-artifact',
                                'dop/guides/deploy/addon-out-of-box',
                                'dop/guides/deploy/addon-custom',
                                'dop/guides/deploy/deploy-by-cicd-pipeline',
                                'dop/guides/deploy/config',
                                'dop/guides/deploy/config-center',
                                'dop/guides/deploy/db-migration',
                                'dop/guides/deploy/management',
                                'dop/guides/deploy/metrics_logs',
                                'dop/guides/deploy/resource-management',
                                'dop/guides/deploy/block-deploy',
                            ]
                        },
                        {
                            title: 'CI/CD Pipeline',
                            collapsable: true,
                            children: [
                                'dop/guides/cicd-pipeline/pipeline-yml-config',
                                'dop/guides/cicd-pipeline/pipeline-yml-graph',
                                'dop/guides/cicd-pipeline/pipeline-execution',
                                'dop/guides/cicd-pipeline/pipeline-customize-and-extension',
                            ]
                        },
                        {
                            title: '质量保障和测试',
                            collapsable: true,
                            children: [
                                'dop/guides/qa-and-testing/sonar-report',
                                'dop/guides/qa-and-testing/sonar-quality-gate',
                                'dop/guides/qa-and-testing/unit-test',
                                'dop/guides/qa-and-testing/auto-test-getting-started',
                                'dop/guides/qa-and-testing/testing-in-cicd-pipeline',
                                'dop/guides/qa-and-testing/function-test',
                            ]
                        },
                        {
                            title: '移动开发',
                            collapsable: true,
                            children: [
                                'dop/guides/mobileapp/basic',
                                'dop/guides/mobileapp/framework',
                                'dop/guides/mobileapp/local-environment',
                                'dop/guides/mobileapp/howto-dev',
                                'dop/guides/mobileapp/management',
                                'dop/guides/mobileapp/certificates',
                                'dop/guides/mobileapp/libraries',
                                'dop/guides/mobileapp/ios-ci'
                            ]
                        },
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
                            title: '应用监控',
                            collapsable: true,
                            children: [
                                'msp/examples/apm/service-dashboard',
                                'msp/examples/apm/exception-alert',
                                'msp/examples/apm/status-alert',
                            ],
                        },
                        {
                            title: '日志分析',
                            collapsable: true,
                            children: [
                                'msp/examples/log/java-log-rule',
                                'msp/examples/log/log-alert',
                                'msp/examples/log/log-dashboard',
                            ],
                        },
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
                            title: '应用监控',
                            collapsable: true,
                            children: [
                                'msp/concepts/apm/observability',
                                'msp/concepts/apm/arch',
                                'msp/concepts/apm/concept',
                            ],
                        },
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
                            title: '应用监控',
                            collapsable: true,
                            children: [
                                'msp/practice/apm/service-alert',
                                'msp/practice/apm/pressure-test-dashboard',
                            ],
                        },
                        {
                            title: '日志分析',
                            collapsable: true,
                            children: [
                                'msp/practice/log/log-to-diagnose-business-exception',
                            ],
                        },
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
                                'msp/guides/apm/alert-config',
                                'msp/guides/apm/alert-history',
                                'msp/guides/apm/alert-index',
                                'msp/guides/apm/alert-custom',
                                'msp/guides/apm/dashboard',
                                'msp/guides/apm/dashboard-advanced',
                            ]
                        },
                        {
                            title: '日志分析',
                            collapsable: true,
                            children: [
                                'msp/guides/log/quickstart',
                                'msp/guides/log/query',
                                'msp/guides/log/rules',
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
                                'msp/guides/nc/dubbo',
                                'msp/guides/nc/springcloud',
                                'msp/guides/nc/spring',
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
                        ['ecp/config-set', '配置集管理'],
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
