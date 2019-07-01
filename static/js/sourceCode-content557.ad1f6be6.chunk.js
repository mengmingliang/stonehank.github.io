(window.webpackJsonp=window.webpackJsonp||[]).push([[534],{592:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number} N\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> fib = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">N</span>) </span>{\n  <span class="hljs-keyword">let</span> dp=[<span class="hljs-number">0</span>,<span class="hljs-number">1</span>]  \n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">2</span>;i&lt;=N;i++){\n    dp[i]=dp[i<span class="hljs-number">-1</span>]+dp[i<span class="hljs-number">-2</span>]\n  }\n  <span class="hljs-keyword">return</span> dp[N]\n};\n</code></pre>\n'],titleSlug:"fibonacci-number",hasThinking:!1,content:"<p><strong>\u6590\u6ce2\u90a3\u5951\u6570</strong>\uff0c\u901a\u5e38\u7528&nbsp;<code>F(n)</code> \u8868\u793a\uff0c\u5f62\u6210\u7684\u5e8f\u5217\u79f0\u4e3a<strong>\u6590\u6ce2\u90a3\u5951\u6570\u5217</strong>\u3002\u8be5\u6570\u5217\u7531&nbsp;<code>0</code> \u548c <code>1</code> \u5f00\u59cb\uff0c\u540e\u9762\u7684\u6bcf\u4e00\u9879\u6570\u5b57\u90fd\u662f\u524d\u9762\u4e24\u9879\u6570\u5b57\u7684\u548c\u3002\u4e5f\u5c31\u662f\uff1a</p>\n\n<pre>F(0) = 0,&nbsp; &nbsp;F(1)&nbsp;= 1\nF(N) = F(N - 1) + F(N - 2), \u5176\u4e2d N &gt; 1.\n</pre>\n\n<p>\u7ed9\u5b9a&nbsp;<code>N</code>\uff0c\u8ba1\u7b97&nbsp;<code>F(N)</code>\u3002</p>\n\n<p>&nbsp;</p>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>2\n<strong>\u8f93\u51fa\uff1a</strong>1\n<strong>\u89e3\u91ca\uff1a</strong>F(2) = F(1) + F(0) = 1 + 0 = 1.\n</pre>\n\n<p><strong>\u793a\u4f8b 2\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>3\n<strong>\u8f93\u51fa\uff1a</strong>2\n<strong>\u89e3\u91ca\uff1a</strong>F(3) = F(2) + F(1) = 1 + 1 = 2.\n</pre>\n\n<p><strong>\u793a\u4f8b 3\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>4\n<strong>\u8f93\u51fa\uff1a</strong>3\n<strong>\u89e3\u91ca\uff1a</strong>F(4) = F(3) + F(2) = 2 + 1 = 3.\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ul>\n\t<li>0 &le; <code>N</code> &le; 30</li>\n</ul>\n"}}}]);
//# sourceMappingURL=sourceCode-content557.ad1f6be6.chunk.js.map