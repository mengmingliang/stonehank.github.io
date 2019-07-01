(window.webpackJsonp=window.webpackJsonp||[]).push([[552],{608:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number} N\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> countArrangement = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">N</span>) </span>{\n  <span class="hljs-keyword">let</span> used=<span class="hljs-built_in">Array</span>(N+<span class="hljs-number">1</span>).fill(<span class="hljs-literal">false</span>)\n  <span class="hljs-keyword">let</span> res=<span class="hljs-number">0</span>\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">backtrack</span>(<span class="hljs-params">curIdx</span>)</span>{\n    <span class="hljs-keyword">if</span>(curIdx===<span class="hljs-number">0</span>)<span class="hljs-keyword">return</span> res++\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">1</span>;i&lt;=N;i++){\n      <span class="hljs-keyword">if</span>(used[i])<span class="hljs-keyword">continue</span>\n      <span class="hljs-keyword">if</span>(i % curIdx===<span class="hljs-number">0</span> || curIdx % i===<span class="hljs-number">0</span>){\n        used[i]=<span class="hljs-literal">true</span>\n        backtrack(curIdx<span class="hljs-number">-1</span>)\n        used[i]=<span class="hljs-literal">false</span>\n      }\n    }\n  }\n  backtrack(N)\n  <span class="hljs-keyword">return</span> res\n};\n</code></pre>\n'],titleSlug:"beautiful-arrangement",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u56de\u6eaf\u7ef4\u62a4\u4e00\u4e2a\u53d8\u91cf<code>curIdx</code>\uff0c\u5b9a\u4e49\u7684\u662f\u7b2c<code>curIdx</code>\u4f4d\uff0c\u5982\u679c\u5b58\u5728\u67d0\u4e2a\u6570<code>i % curIdx===0 || curIdx % i===0</code>\uff0c\u8bf4\u660e\u8fd9\u4e2a\u7b2c<code>curIdx</code>\u4f4d\u7684\u6570\u5b57<code>i</code>\u6ee1\u8db3\u8981\u6c42\uff0c\n\u7ee7\u7eed\u9012\u5f52\u8ba1\u7b97\u7b2c<code>curIdx+1</code>\u4f4d\u7684\u6570\u5b57\u3002</p>\n",content:"<p>\u5047\u8bbe\u6709\u4ece 1 \u5230 N \u7684&nbsp;<strong>N&nbsp;</strong>\u4e2a\u6574\u6570\uff0c\u5982\u679c\u4ece\u8fd9&nbsp;<strong>N&nbsp;</strong>\u4e2a\u6570\u5b57\u4e2d\u6210\u529f\u6784\u9020\u51fa\u4e00\u4e2a\u6570\u7ec4\uff0c\u4f7f\u5f97\u6570\u7ec4\u7684\u7b2c <strong>i</strong>&nbsp;\u4f4d (1 &lt;= i &lt;= N) \u6ee1\u8db3\u5982\u4e0b\u4e24\u4e2a\u6761\u4ef6\u4e2d\u7684\u4e00\u4e2a\uff0c\u6211\u4eec\u5c31\u79f0\u8fd9\u4e2a\u6570\u7ec4\u4e3a\u4e00\u4e2a\u4f18\u7f8e\u7684\u6392\u5217\u3002\u6761\u4ef6\uff1a</p>\n\n<ol>\n\t<li>\u7b2c&nbsp;<strong>i&nbsp;</strong>\u4f4d\u7684\u6570\u5b57\u80fd\u88ab&nbsp;<strong>i&nbsp;</strong>\u6574\u9664</li>\n\t<li><strong>i</strong> \u80fd\u88ab\u7b2c <strong>i</strong> \u4f4d\u4e0a\u7684\u6570\u5b57\u6574\u9664</li>\n</ol>\n\n<p>\u73b0\u5728\u7ed9\u5b9a\u4e00\u4e2a\u6574\u6570 N\uff0c\u8bf7\u95ee\u53ef\u4ee5\u6784\u9020\u591a\u5c11\u4e2a\u4f18\u7f8e\u7684\u6392\u5217\uff1f</p>\n\n<p><strong>\u793a\u4f8b1:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> 2\n<strong>\u8f93\u51fa:</strong> 2\n<strong>\u89e3\u91ca:</strong> \n\n\u7b2c 1 \u4e2a\u4f18\u7f8e\u7684\u6392\u5217\u662f [1, 2]:\n  \u7b2c 1 \u4e2a\u4f4d\u7f6e\uff08i=1\uff09\u4e0a\u7684\u6570\u5b57\u662f1\uff0c1\u80fd\u88ab i\uff08i=1\uff09\u6574\u9664\n  \u7b2c 2 \u4e2a\u4f4d\u7f6e\uff08i=2\uff09\u4e0a\u7684\u6570\u5b57\u662f2\uff0c2\u80fd\u88ab i\uff08i=2\uff09\u6574\u9664\n\n\u7b2c 2 \u4e2a\u4f18\u7f8e\u7684\u6392\u5217\u662f [2, 1]:\n  \u7b2c 1 \u4e2a\u4f4d\u7f6e\uff08i=1\uff09\u4e0a\u7684\u6570\u5b57\u662f2\uff0c2\u80fd\u88ab i\uff08i=1\uff09\u6574\u9664\n  \u7b2c 2 \u4e2a\u4f4d\u7f6e\uff08i=2\uff09\u4e0a\u7684\u6570\u5b57\u662f1\uff0ci\uff08i=2\uff09\u80fd\u88ab 1 \u6574\u9664\n</pre>\n\n<p><strong>\u8bf4\u660e:</strong></p>\n\n<ol>\n\t<li><strong>N</strong> \u662f\u4e00\u4e2a\u6b63\u6574\u6570\uff0c\u5e76\u4e14\u4e0d\u4f1a\u8d85\u8fc715\u3002</li>\n</ol>\n"}}}]);
//# sourceMappingURL=sourceCode-content573.d4de5c77.chunk.js.map