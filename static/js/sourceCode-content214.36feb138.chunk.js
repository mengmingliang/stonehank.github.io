(window.webpackJsonp=window.webpackJsonp||[]).push([[154],{249:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} A\n * @param {number} K\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> twoSumLessThanK = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">A, K</span>) </span>{\n  <span class="hljs-keyword">let</span> max=<span class="hljs-number">-1</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;A.length;i++){\n    <span class="hljs-keyword">let</span> rest=K-A[i]\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;j&lt;A.length;j++){\n      <span class="hljs-keyword">if</span>(i===j)<span class="hljs-keyword">continue</span>\n      <span class="hljs-keyword">if</span>(A[j]&gt;=rest)<span class="hljs-keyword">continue</span>\n      max=<span class="hljs-built_in">Math</span>.max(max,A[i]+A[j])\n    }\n  }\n  <span class="hljs-keyword">return</span> max\n};\n</code></pre>\n'],titleSlug:"two-sum-less-than-k",hasThinking:!1,content:"<p>\u7ed9\u4f60\u4e00\u4e2a\u6574\u6570\u6570\u7ec4&nbsp;<code>A</code> \u548c\u4e00\u4e2a\u6574\u6570&nbsp;<code>K</code>\uff0c\u8bf7\u5728\u8be5\u6570\u7ec4\u4e2d\u627e\u51fa\u4e24\u4e2a\u5143\u7d20\uff0c\u4f7f\u5b83\u4eec\u7684\u548c\u5c0f\u4e8e&nbsp;<code>K</code>&nbsp;\u4f46\u5c3d\u53ef\u80fd\u5730\u63a5\u8fd1 <code>K</code>\uff0c<strong>\u8fd4\u56de\u8fd9\u4e24\u4e2a\u5143\u7d20\u7684\u548c</strong>\u3002</p>\n\n<p>\u5982\u4e0d\u5b58\u5728\u8fd9\u6837\u7684\u4e24\u4e2a\u5143\u7d20\uff0c\u8bf7\u8fd4\u56de <code>-1</code>\u3002</p>\n\n<p>&nbsp;</p>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>A = [34,23,1,24,75,33,54,8], K = 60\n<strong>\u8f93\u51fa\uff1a</strong>58\n<strong>\u89e3\u91ca\uff1a</strong>\n34 \u548c 24 \u76f8\u52a0\u5f97\u5230 58\uff0c58 \u5c0f\u4e8e 60\uff0c\u6ee1\u8db3\u9898\u610f\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b&nbsp;2\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>A = [10,20,30], K = 15\n<strong>\u8f93\u51fa\uff1a</strong>-1\n<strong>\u89e3\u91ca\uff1a</strong>\n\u6211\u4eec\u65e0\u6cd5\u627e\u5230\u548c\u5c0f\u4e8e 15 \u7684\u4e24\u4e2a\u5143\u7d20\u3002</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ol>\n\t<li><code>1 &lt;= A.length &lt;= 100</code></li>\n\t<li><code>1 &lt;= A[i] &lt;= 1000</code></li>\n\t<li><code>1 &lt;= K &lt;= 2000</code></li>\n</ol>\n"}}}]);
//# sourceMappingURL=sourceCode-content214.36feb138.chunk.js.map