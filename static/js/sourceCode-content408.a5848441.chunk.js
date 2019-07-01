(window.webpackJsonp=window.webpackJsonp||[]).push([[369],{443:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number} n\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> integerBreak = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">n</span>) </span>{\n    <span class="hljs-keyword">if</span>(n===<span class="hljs-number">2</span>)<span class="hljs-keyword">return</span> <span class="hljs-number">1</span>\n    <span class="hljs-keyword">if</span>(n===<span class="hljs-number">3</span>)<span class="hljs-keyword">return</span> <span class="hljs-number">2</span>\n    <span class="hljs-keyword">if</span>(n===<span class="hljs-number">4</span>)<span class="hljs-keyword">return</span> <span class="hljs-number">4</span>\n    <span class="hljs-keyword">let</span> res=<span class="hljs-number">1</span>\n    <span class="hljs-keyword">while</span>(n&gt;<span class="hljs-number">4</span>){\n        res*=<span class="hljs-number">3</span>\n        n=n<span class="hljs-number">-3</span>\n    }\n    <span class="hljs-keyword">return</span> res*n\n<span class="hljs-comment">//     let c={</span>\n<span class="hljs-comment">//         2:1,</span>\n<span class="hljs-comment">//         3:2,</span>\n<span class="hljs-comment">//         4:4,</span>\n<span class="hljs-comment">//         5:6,</span>\n<span class="hljs-comment">//         6:9,</span>\n<span class="hljs-comment">//     }</span>\n<span class="hljs-comment">//     if(n&lt;7) return c[n]</span>\n    \n<span class="hljs-comment">//     function getMax(n){</span>\n<span class="hljs-comment">//         if(n&lt;=4)return n</span>\n<span class="hljs-comment">//         return getMax(n-3)*3</span>\n<span class="hljs-comment">//     }</span>\n<span class="hljs-comment">//     return getMax(n)</span>\n};\n</code></pre>\n'],titleSlug:"integer-break",hasThinking:!1,content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u6b63\u6574\u6570&nbsp;<em>n</em>\uff0c\u5c06\u5176\u62c6\u5206\u4e3a<strong>\u81f3\u5c11</strong>\u4e24\u4e2a\u6b63\u6574\u6570\u7684\u548c\uff0c\u5e76\u4f7f\u8fd9\u4e9b\u6574\u6570\u7684\u4e58\u79ef\u6700\u5927\u5316\u3002 \u8fd4\u56de\u4f60\u53ef\u4ee5\u83b7\u5f97\u7684\u6700\u5927\u4e58\u79ef\u3002</p>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<pre><strong>\u8f93\u5165: </strong>2\n<strong>\u8f93\u51fa: </strong>1\n<strong>\u89e3\u91ca: </strong>2 = 1 + 1, 1 &times; 1 = 1\u3002</pre>\n\n<p><strong>\u793a\u4f8b&nbsp;2:</strong></p>\n\n<pre><strong>\u8f93\u5165: </strong>10\n<strong>\u8f93\u51fa: </strong>36\n<strong>\u89e3\u91ca: </strong>10 = 3 + 3 + 4, 3 &times;&nbsp;3 &times;&nbsp;4 = 36\u3002</pre>\n\n<p><strong>\u8bf4\u660e: </strong>\u4f60\u53ef\u4ee5\u5047\u8bbe&nbsp;<em>n&nbsp;</em>\u4e0d\u5c0f\u4e8e 2 \u4e14\u4e0d\u5927\u4e8e 58\u3002</p>\n"}}}]);
//# sourceMappingURL=sourceCode-content408.a5848441.chunk.js.map