# 浏览性能

您可以点击`应用监控`的`浏览性能`选项，查看浏览器监控的大致情况。可以直接面向您的浏览器应用的性能追踪，包括响应加载时间，页面错误，异步调用，地理追踪等等。

默认展示一小时内变化数据，也可以点击时间选择框选择所需展示时间。

功能分为：
* [总览](#browser_overview)
* [访问域名](#browser_domain)
* [访问页面](#browser_page)
* [定位分析](#browser_location)
* [Ajax接口](#browser_ajax)
* [脚本错误](#browser_script)
* [浏览器性能](#browser_performance)
* [摘要](#browser_summary)
* [地理](#browser_geography)

### 接入方式
* 前后端分离 - 单页应用 SPA（single page application）
    1. 在框架页(一般是index.html) 的 head 中添加 ta.js 的激活代码
    ```html
    <script src="/ta"></script>
    <script>
      var _taConfig = window._taConfig;
      if (_taConfig && _taConfig.enabled) {
        !function(e,n,r,t,a,o,c){e[a]=e[a]||function(){(e[a].q=e[a].q||[]).push(arguments)},e.onerror=function(n,r,t,o,c){e[a]("sendExecError",n,r,t,o,c)},n.addEventListener("error",function(n){e[a]("sendError",n)},!0),o=n.createElement(r),c=n.getElementsByTagName(r)[0],o.async=1,o.src=t,c.parentNode.insertBefore(o,c)}(window,document,"script",_taConfig.url,"$ta");
        $ta('start', { udata: { uid: 0 }, ak: _taConfig.ak, url: _taConfig.collectorUrl });
      }
    </script>
    ```
    2. 在 nginx.conf 中添加 /ta 请求处理，来返回ta.js的配置。环境变量在 Erda 中会默认注入
    ```bash
        set $taEnabled ${TERMINUS_TA_ENABLE};
        set $taUrl ${TERMINUS_TA_URL};
        set $collectorUrl ${TERMINUS_TA_COLLECTOR_URL};
        set $terminusKey ${TERMINUS_KEY};
        location /ta {
            default_type application/javascript;
            return 200 'window._taConfig={enabled:$taEnabled,ak:"$terminusKey",url:"$taUrl",collectorUrl:"$collectorUrl"}';
        }
    ```
    3. 采集用户 ID ，添加用户维度的统计，需要在前端，用户查询的位置把 userId 设置到 ta.js 的缓存
    ```js
    if (typeof window.$ta !== 'undefined') window.$ta('setUser', [userId])
    ```

* 前后端不分离 SpringMVC 页面
    1. 添加 Config 类读取 ta.js 环境变量，环境变量在 Erda 中会默认注入
    ```java
    @Component
    @Data
    public class TaConfig {
        @Value("${terminus.ta.collector.url}")
        private String terminusTaCollectorURL;

        @Value("${terminus.ta.enable}")
        private boolean terminusTaEnable;

        @Value("${terminus.ta.url}")
        private String terminusTaURL;

        @Value("${terminus.key}")
        private String terminusKey;
    }
    ```
    2. 添加 Controller 返回 ta.js 的配置
    ```java
    @Slf4j
    @RestController
    @RequestMapping("/api/ta")
    public class TaController {

        @Autowired
        private TaConfig config;

        @RequestMapping(produces = "application/javascript")
        @ResponseBody
        public String ta() {
            return String.format("window._taConfig={enabled:%b,ak:\"%s\",url:\"%s\",collectorUrl:\"%s\"}", config.isTerminusTaEnable(), config.getTerminusKey(), config.getTerminusTaURL(), config.getTerminusTaCollectorURL());
        }
    }
    ```
    3. 在需要被监控的页面 head 中添加 ta.js 激活代码
    ```html
    <head>
        <script src="/api/ta"></script>
        <script>
            var _taConfig = window._taConfig;
            if (_taConfig && _taConfig.enabled) {
                !function (e, n, r, t, a, o, c) {
                    e[a] = e[a] || function () {
                        (e[a].q = e[a].q || []).push(arguments)
                    }, e.onerror = function (n, r, t, o, c) {
                        e[a]("sendExecError", n, r, t, o, c)
                    }, n.addEventListener("error", function (n) {
                        e[a]("sendError", n)
                    }, !0), o = n.createElement(r), c = n.getElementsByTagName(r)[0], o.async = 1, o.src = t, c.parentNode.insertBefore(o, c)
                }(window, document, "script", _taConfig.url, "$ta");
                $ta('start', {udata: {uid: 0}, ak: _taConfig.ak, url: _taConfig.collectorUrl});
            }
        </script>
    </head>
    ```
* herd
    1. 添加 terminus-key.js 中间件
    ```html
    module.exports = () => async (ctx, next) => {
      ctx.herdContext['_TERMINUS_KEY_'] = process.env.TERMINUS_KEY;
      ctx.herdContext['_TA_ENABLE_'] = process.env.TERMINUS_TA_ENABLE || false;
      ctx.herdContext['_TA_URL_'] = process.env.TERMINUS_TA_URL || '//static.terminus.io/ta.js';
      ctx.herdContext['_TA_COLLECT_URL_'] = process.env.TERMINUS_TA_COLLECTOR_URL || '//analytics.terminus.io/collect';
      await next();
    }
    ```
    2. 在 layout.hbs 的 head 中添加 ta.js script
    ```html
     <head>
        <script>
            {{#if _TA_ENABLE_}}
              !function(e,t,n,s,a,c,i){e[a]=e[a]||function(){(e[a].q=e[a].q||[]).push(arguments)},c=t.createElement(n),i=t.getElementsByTagName(n)[0],c.async=1,c.src=s,i.parentNode.insertBefore(c,i)}(window,document,"script","{{_TA_URL_}}","$ta");
              $ta('start',{ udata: { uid: {{#if _USER_}}{{_USER_.id}}{{else}}0{{/if}} }{{#if _TERMINUS_KEY_}}, ak: '{{_TERMINUS_KEY_}}'{{/if}} , url: '{{_TA_COLLECT_URL_}}' })
            {{/if}}
        </script>
      </head>
    ```

    3. 采集用户 ID，添加用户维度的统计，需要在前端，用户查询的位置把 userId 设置到 ta.js 的缓存
    ```js
    if (typeof window.$ta !== 'undefined') window.$ta('setUser', [userId])
    ```

<h3 id="browser_overview">总览</h3>

`总览`展示浏览器的性能总览。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/01/03/d4961d8a-e4b8-450f-a117-2ae1907bf3bd.png)

<h3 id="browser_domain">访问域名</h3>

一个应用往往会配置多个子域名，例如移动端与PC端的域名、子域名二级域名等等，`访问域名`可以根据域名的维度区分性能数据。

此页面按照应用的域名维度展示页面加载性能趋势、响应时间趋势、吞吐量与慢加载，点击左侧域名后可以查看该域名的明细，并且将页面加载分为白屏时间，首屏时间，网页加载完成，资源加载完成4个时间维度进行查看。

* 白屏时间：从准备加载页面到浏览器开始显示内容的时间
* 首屏时间：指用户看到第一屏，即整个网页顶部大小为当前窗口的区域，显示完整的时间
* 网页加载完成：从接收到页面文档第一个字节到接收到最后一个字节的时间
* 资源加载完成：页面内js、css、image等资源加载时间

在选择左侧访问域名后，可以单独查看该域名访问的性能趋势等信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/01/03/920b1800-bdd1-4c95-b38d-5692714a330a.png)

<h3 id="browser_page">访问页面</h3>

类似于访问域名，访问页面的性能监控是根据页面维度来展示 BI 性能监控数据的，其交互逻辑与访问域名相同。

在选择左侧访问请求后，可以单独查看该请求的性能趋势等信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/01/03/854b2c80-aa23-426b-9450-62d2fb8a7e6e.png)

<h3 id="browser_location">定位分析</h3>

定位分析提供用户体验 Apdex，整页加载完成，白屏时间，首屏时间，资源加载完成，网页加载完成，性能分析多个维度的数据对比，同时提供了操作系统，设备，浏览器，域名，页面等多维度数据统计，用于多方位的浏览器浏览性能分析。

* 用户体验 Apdex：Apdex是用户对应用性能满意度的量化值
* 整页加载完成：Page Load Time，是指页面完成整个加载过程的时刻
* 白屏时间：从准备加载页面到浏览器开始显示内容的时间
* 首屏时间：指用户看到第一屏，即整个网页顶部大小为当前窗口的区域，显示完整的时间
* 资源加载完成：页面内js、css、image等资源加载时间
* 网页加载完成：从接收到页面文档第一个字节到接收到最后一个字节的时间
* 性能分析：可以根据以上指标和用户特征进行性能对比

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/01/03/db11977e-220e-4283-b43c-d076121fb749.png)

<h3 id="browser_ajax">Ajax接口</h3>

从 Ajax 维度，展示每条 Ajax 请求的平均响应时间，时间百分比，吞吐量，并且从响应时间 TOP5，吞吐量 TOP5，发送数据，接收数据四个方面展示请求性能趋势。

在选择左侧 Ajax 请求后，可以单独查看该请求的性能趋势等信息。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/01/03/399f52ab-06eb-4be4-b278-b7192999ed4c.png)

<h3 id="browser_script">脚本错误</h3>

从多维度展示 JavaScript 执行过程中的错误信息。

* 错误信息：具体的错误信息，在选择左侧错误信息后，可以单独查看该错误信息的详情。
* 出错页面：错误产生的请求页面

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/01/03/4f5e012d-2e1d-480a-ae27-0a19e62990bc.png)

<h3 id="browser_performance">浏览器性能</h3>

从浏览器维度，展示不同浏览器的性能指标，指标类型与 ajax 接口类似。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/01/03/f5170842-04a2-4c01-9569-19b06725e2b0.png)

<h3 id="browser_summary">摘要</h3>

从访问域名，访问页面，系统，浏览器，设备等方面展示页面加载的具体详情。

选择左侧某条维度信息后，会展示该维度信息的页面请求过程详情。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/01/03/4560438d-407d-4f6b-a81a-2b3daa5893f1.png)

<h3 id="browser_geography">地理</h3>

从访问地理维度展示各个地区的访问性能情况。

选择左侧地理信息，会展示该地区的具体访问性能指标。

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/01/03/42f96944-e796-43e1-b750-f003f58e699d.png)