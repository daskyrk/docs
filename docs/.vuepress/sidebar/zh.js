const { fs, path } = require('@vuepress/shared-utils')

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
        'about/intro',
        'about/why-erda',
        'about/platform-design'
      ]
    },
    {
      title: '快速入门',
      collapsable: true,
      children: [
        'quick-start/premise',
        'quick-start/create-org',
        'quick-start/create-project',
        'quick-start/create-application',
        'quick-start/agile-cooperation',
        'quick-start/agile-dev',
        'quick-start/auto-test',
        'quick-start/microservice',
        'quick-start/edge-publish',
      ]
    },
    {
      title: '部署配置',
      collapsable: true,
      children: [
        'install/requirement',
        'install/step-by-step',
        'install/upgrade'
      ]
    },
    {
      title: '多云管理平台',
      collapsable: true,
      children: [
        'cmp/intro',
        'cmp/cluster-overview',
        'cmp/cluster-management',
        'cmp/cloud-resource',
        'cmp/domain-management',
        'cmp/service-list',
        'cmp/addon-list',
        'cmp/job-list',
        'cmp/dashboard',
        'cmp/report',
        'cmp/alarm-statistics',
        'cmp/alarm-list',
        'cmp/alarm-strategy',
        'cmp/alarm-custom',
      ]
    },
    {
      title: 'DevOps 平台',
      collapsable: true,
      children: [
        ['dop/intro', '介绍 | Introduction'],
        {
          title: '设计理念 | Concepts',
          collapsable: true,
          children: [
            ['dop/concepts/overview', '概述 | Overview'],
            ['dop/concepts/agile-info', '高效协同'],
            ['dop/concepts/erda-yaml', '声明式应用部署 erda.yml'],
            ['dop/concepts/pipeline', '流水线/工作流 pipeline.yml'],
          ]
        },
        {
          title: '使用指南 | Guides',
          collapsable: true,
          children: [
            ['dop/guides/overview', '概述 | Overview'],
            {
              title: '协作',
              collapsable: true,
              children: [
                ['dop/guides/agile/best-practices', '最佳实践'],
              ]
            },
            {
              title: '部署和管理',
              collapsable: true,
              children: [
                'dop/guides/deploy/deploy-from-git',
                'dop/guides/deploy/deploy-from-image',
                'dop/guides/deploy/config',
                'dop/guides/deploy/config-center',
                'dop/guides/deploy/management',
                'dop/guides/deploy/metrics_logs.md',
                'dop/guides/deploy/branch-rule',
                'dop/guides/deploy/db-migration',
              ]
            },
            {
              title: 'API',
              collapsable: true,
              children: [
                'dop/guides/api/api-management',
              ]
            },
            {
              title: '测试',
              collapsable: true,
              children: [
                'dop/guides/testing/auto-test-getting-started',
                'dop/guides/testing/function-test',
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
            {
              title: '开发语言',
              collapsable: true,
              children: [
                'dop/guides/language/java',
                'dop/guides/language/javascript',
                'dop/guides/language/php',
                'dop/guides/language/python',
              ]
            },
          ]
        },
        {
          title: '参考 | Reference',
          collapsable: true,
          children: [
            'dop/reference/overview',
          ]
        },
      ]
    },
    {
      title: '微服务治理平台',
      collapsable: true,
      children: [
        'msp/intro',
        'msp/topology',
        'msp/monitor-service',
        'msp/monitor-browser',
        'msp/monitor-mobile',
        'msp/error-analysis',
        'msp/trace',
        'msp/service-status',
        'msp/alarm',
        'msp/custom-alarm',
        'msp/alarm-history',
        'msp/dashboard',
        'msp/log-analysis',
        {
          title: 'API 网关',
          collapsable: true,
          children: [
              'msp/api-gateway',
              'msp/api-gateway-advanced1',
              'msp/api-gateway-advanced2',
              'msp/sign-auth',
              'msp/api-gateway-statuscode',
              'msp/api-gateway-benchmark',
          ]
        },
        {
          title: '注册中心',
          collapsable: true,
          children: [
              'msp/dubbo',
              'msp/spring-cloud'
          ]
        },
        {
          title: '配置中心',
          collapsable: true,
          children: [
              'msp/config-center',
          ]
        },
      ]
    },
    {
      title: '边缘计算平台',
      collapsable: true,
      children: [
        'ecp/intro',
        'ecp/application',
        'ecp/resource',
        'ecp/config-set',
      ]
    },
    {
      title: '快数据平台',
      collapsable: true,
      children: [
        'fdp/intro',
      ]
    },
    {
      title: '管理中心',
      collapsable: true,
      children: [
        'org-center/intro',
        'org-center/project',
        'org-center/certificate',
        'org-center/approve',
        'org-center/announcement',
        'org-center/audit',
        'org-center/setting',
      ]
    },
    {
      title: '平台后台',
      collapsable: true,
      children: [
        'admin/intro',
        'admin/org',
        'admin/user',
        'admin/audit',
        'admin/config',
        'admin/cluster',
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
    'glossary'
    // {
    //   title: '开发语言',
    //   collapsable: true,
    //   children: [
    //     'language/java',
    //     'language/javascript',
    //     'language/php',
    //     'language/python',
    //   ]
    // },
    // {
    //   title: '安全',
    //   collapsable: true,
    //   children: [
    //     'safe/identity-management',
    //     'safe/isolation',
    //     'safe/enable-https',
    //     'safe/api-security',
    //     'safe/operator-system-security',
    //     'safe/docker-security',
    //     'safe/kubernets-security',
    //     'safe/public-cloud-security',
    //     'safe/private-cloud-security',
    //   ]
    // },
    // {
    //   title: 'Add-ons',
    //   collapsable: true,
    //   children: [
    //     'addons/design',
    //     'addons/out-of-the-box',
    //     'addons/custom'
    //   ]
    // },
    // {
    //   title: 'Actions',
    //   collapsable: true,
    //   children: [
    //     'actions/',
    //     'actions/runner'
    //   ]
    // },
    // {
    //   title: '问题排查和服务支持',
    //   collapsable: true,
    //   children: [
    //     'support/diagnostics',
    //     'support/cicd'
    //   ]
    // },
    // {
    //   title: '平台安装',
    //   collapsable: true,
    //   children: [
    //     'install/deployment-architecture',
    //     'install/env-requirements',
    //     'install/env-check'
    //   ]
    // }
  ],
}
