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
      title: '快速开始',
      collapsable: true,
      children: [
        'quick-start/premise'
      ]
    },
    {
      title: '多云管理平台',
      collapsable: true,
      children: [
        'cmp/example',
        'cmp/concept',
        'cmp/best-practice',
        'cmp/guide',
      ]
    },
    {
      title: 'DevOps 平台',
      collapsable: true,
      children: [
        ['dop/example', '场景示例'],
        {
          title: '设计理念',
          collapsable: true,
          children: [
            ['dop/concepts/overview', '概述 | Overview'],
            ['dop/concepts/agile-info', '高效协同'],
            ['dop/concepts/erda-yaml', '声明式应用部署 erda.yml'],
            ['dop/concepts/pipeline', '流水线/工作流 pipeline.yml'],
          ]
        },
        ['dop/best-practice', '最佳实践'],
        {
          title: '使用指南',
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
          ]
        },
        {
          title: '设计理念',
          collapsable: true,
          children: [
          ]
        },
        {
          title: '最佳实践',
          collapsable: true,
          children: [
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
                  'msp/old/api-gateway',
                  'msp/old/api-gateway-advanced1',
                  'msp/old/api-gateway-advanced2',
                  'msp/old/sign-auth',
                  'msp/old/api-gateway-statuscode',
                  'msp/old/api-gateway-benchmark',
              ]
            },
            {
              title: '注册中心',
              collapsable: true,
              children: [
                  'msp/old/dubbo',
                  'msp/old/spring-cloud'
              ]
            },
            {
              title: '配置中心',
              collapsable: true,
              children: [
                  'msp/old/config-center',
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
        'ecp/guide',
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
  ]
}
