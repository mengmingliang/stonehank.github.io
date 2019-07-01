(window.webpackJsonp=window.webpackJsonp||[]).push([[971],{986:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {string} S\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> distinctSubseqII = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">S</span>) </span>{\n  <span class="hljs-keyword">let</span> mem={},mod=<span class="hljs-number">1000000007</span>\n    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getNum</span>(<span class="hljs-params">s</span>)</span>{\n      <span class="hljs-keyword">if</span>(mem[s])<span class="hljs-keyword">return</span> mem[s]\n      <span class="hljs-keyword">if</span>(s.length===<span class="hljs-number">0</span>)<span class="hljs-keyword">return</span> <span class="hljs-number">0</span>\n      <span class="hljs-keyword">if</span>(s.length===<span class="hljs-number">1</span>)<span class="hljs-keyword">return</span> <span class="hljs-number">1</span>\n      <span class="hljs-keyword">let</span> e=<span class="hljs-number">0</span>\n      <span class="hljs-keyword">let</span> idx=s.substr(<span class="hljs-number">0</span>,s.length<span class="hljs-number">-1</span>).lastIndexOf(s[s.length<span class="hljs-number">-1</span>])\n      <span class="hljs-keyword">if</span>(idx!==<span class="hljs-number">-1</span>){\n        e=getNum(s.substr(<span class="hljs-number">0</span>,idx))+<span class="hljs-number">1</span>\n      }\n      <span class="hljs-keyword">let</span> r=getNum(s.substr(<span class="hljs-number">0</span>,s.length<span class="hljs-number">-1</span>))*<span class="hljs-number">2</span>+<span class="hljs-number">1</span>-e\n      mem[s]=r % mod\n      <span class="hljs-keyword">return</span> mem[s]\n    }\n  <span class="hljs-keyword">return</span> getNum(S)&lt;<span class="hljs-number">0</span>?getNum(S)+mod:getNum(S)\n};\n</code></pre>\n'],titleSlug:"distinct-subsequences-ii",hasThinking:!1,content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u5b57\u7b26\u4e32&nbsp;<code>S</code>\uff0c\u8ba1\u7b97&nbsp;<code>S</code>&nbsp;\u7684\u4e0d\u540c\u975e\u7a7a\u5b50\u5e8f\u5217\u7684\u4e2a\u6570\u3002</p>\n\n<p>\u56e0\u4e3a\u7ed3\u679c\u53ef\u80fd\u5f88\u5927\uff0c\u6240\u4ee5<strong>\u8fd4\u56de\u7b54\u6848\u6a21</strong><strong> <code>10^9 + 7</code></strong>.</p>\n\n<p>&nbsp;</p>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>&quot;abc&quot;\n<strong>\u8f93\u51fa\uff1a</strong>7\n<strong>\u89e3\u91ca\uff1a</strong>7 \u4e2a\u4e0d\u540c\u7684\u5b50\u5e8f\u5217\u5206\u522b\u662f &quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;ab&quot;, &quot;ac&quot;, &quot;bc&quot;, \u4ee5\u53ca &quot;abc&quot;\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 2\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>&quot;aba&quot;\n<strong>\u8f93\u51fa\uff1a</strong>6\n<strong>\u89e3\u91ca\uff1a</strong>6 \u4e2a\u4e0d\u540c\u7684\u5b50\u5e8f\u5217\u5206\u522b\u662f &quot;a&quot;, &quot;b&quot;, &quot;ab&quot;, &quot;ba&quot;, &quot;aa&quot; \u4ee5\u53ca &quot;aba&quot;\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 3\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>&quot;aaa&quot;\n<strong>\u8f93\u51fa\uff1a</strong>3\n<strong>\u89e3\u91ca\uff1a</strong>3 \u4e2a\u4e0d\u540c\u7684\u5b50\u5e8f\u5217\u5206\u522b\u662f &quot;a&quot;, &quot;aa&quot; \u4ee5\u53ca &quot;aaa&quot;\u3002\n</pre>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ol>\n\t<li><code>S</code>&nbsp;\u53ea\u5305\u542b\u5c0f\u5199\u5b57\u6bcd\u3002</li>\n\t<li><code>1 &lt;= S.length &lt;= 2000</code></li>\n</ol>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n"}}}]);
//# sourceMappingURL=sourceCode-content951.4f22ac60.chunk.js.map