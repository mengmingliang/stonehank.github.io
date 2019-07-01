(window.webpackJsonp=window.webpackJsonp||[]).push([[508],{568:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {string} S\n * @param {number} K\n * @return {string}\n */</span>\n<span class="hljs-keyword">var</span> licenseKeyFormatting = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">S, K</span>) </span>{\n  <span class="hljs-keyword">let</span> uS=S.toUpperCase()\n  <span class="hljs-keyword">let</span> res=<span class="hljs-string">\'\'</span>,count=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=uS.length<span class="hljs-number">-1</span>;i&gt;=<span class="hljs-number">0</span>;i--){\n      <span class="hljs-keyword">if</span>(uS[i]===<span class="hljs-string">"-"</span>)<span class="hljs-keyword">continue</span>\n      <span class="hljs-keyword">if</span>(count===K){\n          res=<span class="hljs-string">\'-\'</span>+res\n          count=<span class="hljs-number">0</span>\n      }\n      res=uS[i]+res\n      count++\n  }\n  <span class="hljs-keyword">return</span> res\n};\n</code></pre>\n'],titleSlug:"license-key-formatting",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u5148\u5c06<code>S</code>\u8f6c\u6362\u4e3a\u5927\u5199<code>uS</code>\uff0c\u63a5\u7740<strong>\u5012\u5e8f\u904d\u5386</strong>\uff0c\u6bcf\u9694<code>K</code>\u4e2a\u52a0\u4e00\u4e2a\u7834\u6298\u53f7\u3002</p>\n",content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u5bc6\u94a5\u5b57\u7b26\u4e32S\uff0c\u53ea\u5305\u542b\u5b57\u6bcd\uff0c\u6570\u5b57\u4ee5\u53ca &#39;-&#39;\uff08\u7834\u6298\u53f7\uff09\u3002N \u4e2a &#39;-&#39; \u5c06\u5b57\u7b26\u4e32\u5206\u6210\u4e86 N+1 \u7ec4\u3002\u7ed9\u5b9a\u4e00\u4e2a\u6570\u5b57 K\uff0c\u91cd\u65b0\u683c\u5f0f\u5316\u5b57\u7b26\u4e32\uff0c\u9664\u4e86\u7b2c\u4e00\u4e2a\u5206\u7ec4\u4ee5\u5916\uff0c\u6bcf\u4e2a\u5206\u7ec4\u8981\u5305\u542b K \u4e2a\u5b57\u7b26\uff0c\u7b2c\u4e00\u4e2a\u5206\u7ec4\u81f3\u5c11\u8981\u5305\u542b 1 \u4e2a\u5b57\u7b26\u3002\u4e24\u4e2a\u5206\u7ec4\u4e4b\u95f4\u7528 &#39;-&#39;\uff08\u7834\u6298\u53f7\uff09\u9694\u5f00\uff0c\u5e76\u4e14\u5c06\u6240\u6709\u7684\u5c0f\u5199\u5b57\u6bcd\u8f6c\u6362\u4e3a\u5927\u5199\u5b57\u6bcd\u3002</p>\n\n<p>\u7ed9\u5b9a\u975e\u7a7a\u5b57\u7b26\u4e32 S \u548c\u6570\u5b57 K\uff0c\u6309\u7167\u4e0a\u9762\u63cf\u8ff0\u7684\u89c4\u5219\u8fdb\u884c\u683c\u5f0f\u5316\u3002</p>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<pre>\n<strong>\u8f93\u5165\uff1a</strong>S = &quot;5F3Z-2e-9-w&quot;, K = 4\n\n<strong>\u8f93\u51fa\uff1a</strong>&quot;5F3Z-2E9W&quot;\n\n<strong>\u89e3\u91ca\uff1a</strong>\u5b57\u7b26\u4e32 S \u88ab\u5206\u6210\u4e86\u4e24\u4e2a\u90e8\u5206\uff0c\u6bcf\u90e8\u5206 4 \u4e2a\u5b57\u7b26\uff1b\n&nbsp;    \u6ce8\u610f\uff0c\u4e24\u4e2a\u989d\u5916\u7684\u7834\u6298\u53f7\u9700\u8981\u5220\u6389\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 2\uff1a</strong></p>\n\n<pre>\n<strong>\u8f93\u5165\uff1a</strong>S = &quot;2-5g-3-J&quot;, K = 2\n\n<strong>\u8f93\u51fa\uff1a</strong>&quot;2-5G-3J&quot;\n\n<strong>\u89e3\u91ca\uff1a</strong>\u5b57\u7b26\u4e32 S \u88ab\u5206\u6210\u4e86 3 \u4e2a\u90e8\u5206\uff0c\u6309\u7167\u524d\u9762\u7684\u89c4\u5219\u63cf\u8ff0\uff0c\u7b2c\u4e00\u90e8\u5206\u7684\u5b57\u7b26\u53ef\u4ee5\u5c11\u4e8e\u7ed9\u5b9a\u7684\u6570\u91cf\uff0c\u5176\u4f59\u90e8\u5206\u7686\u4e3a 2 \u4e2a\u5b57\u7b26\u3002\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a:</strong></p>\n\n<ol>\n\t<li>S \u7684\u957f\u5ea6\u4e0d\u8d85\u8fc7 12,000\uff0cK \u4e3a\u6b63\u6574\u6570</li>\n\t<li>S \u53ea\u5305\u542b\u5b57\u6bcd\u6570\u5b57\uff08a-z\uff0cA-Z\uff0c0-9\uff09\u4ee5\u53ca\u7834\u6298\u53f7&#39;-&#39;</li>\n\t<li>S \u975e\u7a7a</li>\n</ol>\n\n<p>&nbsp;</p>\n"}}}]);
//# sourceMappingURL=sourceCode-content533.fa0a1ea2.chunk.js.map