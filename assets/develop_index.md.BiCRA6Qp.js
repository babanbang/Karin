import{_ as i,c as a,o as s,a3 as e}from"./chunks/framework.BqNSDv7K.js";const g=JSON.parse('{"title":"编写插件","description":"","frontmatter":{},"headers":[],"relativePath":"develop/index.md","filePath":"develop/index.md"}'),l={name:"develop/index.md"},n=e(`<h1 id="编写插件" tabindex="-1">编写插件 <a class="header-anchor" href="#编写插件" aria-label="Permalink to &quot;编写插件&quot;">​</a></h1><h2 id="目录" tabindex="-1">目录 <a class="header-anchor" href="#目录" aria-label="Permalink to &quot;目录&quot;">​</a></h2><p><a href="./plugin.html">普通插件编写</a><br><a href="./plugins.html">插件包编写</a></p><hr><ul><li><a href="#编写插件">编写插件</a><ul><li><a href="#目录">目录</a></li><li><a href="#命名规范">命名规范</a><ul><li><a href="#温馨提示">温馨提示</a></li></ul></li><li><a href="#插件包目录参考结构">插件包目录参考结构</a></li><li><a href="#karin">#karin</a></li></ul></li></ul><blockquote><p>推荐使用 VSCode 进行开发<br> 推荐安装 <code>pnpm</code> 进行包管理<br> 推荐安装 <code>ESLint</code> 扩展插件进行语法格式检查<code>(需安装开发依赖，pnpm install)</code></p></blockquote><h2 id="命名规范" tabindex="-1">命名规范 <a class="header-anchor" href="#命名规范" aria-label="Permalink to &quot;命名规范&quot;">​</a></h2><ul><li>单个js插件：请使用英文进行命名，方便开发者跟踪日志。</li><li>插件包：要求以 <code>kritor-plugin-</code> 开头，后面跟上插件名，如 <code>kritor-plugin-hello-world</code>。</li><li>可在仓库标签添加 <code>karin</code> 、 <code>karin-plugin</code> 等标签，方便用户搜索。</li><li><code>plugins</code>目录只识别以 <code>kritor-plugin-</code> 开头的文件夹</li></ul><h3 id="温馨提示" tabindex="-1">温馨提示 <a class="header-anchor" href="#温馨提示" aria-label="Permalink to &quot;温馨提示&quot;">​</a></h3><ul><li>只有附带 <code>index.js</code> 文件在插件包根目录，才会被视为插件包</li><li>如不存在 <code>apps</code> 目录，则只会加载 <code>index.js</code> 文件</li><li>如存在 <code>apps</code> 目录，则会加载 <code>apps</code> 目录下所有的 <code>js</code> 文件、根目录的<code>index.js</code>。</li></ul><h2 id="插件包目录参考结构" tabindex="-1">插件包目录参考结构 <a class="header-anchor" href="#插件包目录参考结构" aria-label="Permalink to &quot;插件包目录参考结构&quot;">​</a></h2><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">kritor-plugin-hello-world</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├── apps</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│   ├── app1.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│   └── app2.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├── lib</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├── model</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├── README.md</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├── index.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">└── package.json</span></span></code></pre></div><h2 id="karin" tabindex="-1">#karin <a class="header-anchor" href="#karin" aria-label="Permalink to &quot;#karin&quot;">​</a></h2><p>在模板仓库下，有这么一段代码</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { plugin, segment } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;#Karin&#39;</span></span></code></pre></div><p><code>#Karin</code> 是一个别名，指向 <code>./lib/index.js</code> 文件。<br> 此文件为入口文件，开发者无需像以下这样引入模块：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> segment </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./lib/bot/segment.js&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> plugin </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./lib/plugins/plugin.js&#39;</span></span></code></pre></div><p>详情请查看 <a href="./../utils/">开发工具</a> 文档</p>`,18),t=[n];function p(h,d,o,r,c,k){return s(),a("div",null,t)}const E=i(l,[["render",p]]);export{g as __pageData,E as default};
