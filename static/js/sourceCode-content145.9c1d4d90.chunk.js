(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{180:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} A\n * @return {boolean}\n */</span>\n<span class="hljs-keyword">var</span> canThreePartsEqualSum = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">A</span>) </span>{\n  <span class="hljs-keyword">if</span>(A.length&lt;<span class="hljs-number">3</span>)<span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>\n  <span class="hljs-keyword">let</span> sum=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> n <span class="hljs-keyword">of</span> A)sum+=n\n  <span class="hljs-keyword">if</span>(sum % <span class="hljs-number">3</span>!==<span class="hljs-number">0</span>)<span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>\n  <span class="hljs-keyword">let</span> target=sum/<span class="hljs-number">3</span>\n  <span class="hljs-keyword">let</span> cur=<span class="hljs-number">0</span>,count=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;A.length;i++){\n    cur+=A[i]\n    <span class="hljs-keyword">if</span>(cur===target){\n      count++\n      cur=<span class="hljs-number">0</span>\n    }\n  }\n  <span class="hljs-keyword">return</span> count===<span class="hljs-number">3</span>\n};\n</code></pre>\n'],titleSlug:"partition-array-into-three-parts-with-equal-sum",hasThinking:!1,content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u6574\u6570\u6570\u7ec4&nbsp;<code>A</code>\uff0c\u53ea\u6709\u6211\u4eec\u53ef\u4ee5\u5c06\u5176\u5212\u5206\u4e3a\u4e09\u4e2a\u548c\u76f8\u7b49\u7684\u975e\u7a7a\u90e8\u5206\u65f6\u624d\u8fd4\u56de&nbsp;<code>true</code>\uff0c\u5426\u5219\u8fd4\u56de <code>false</code>\u3002</p>\n\n<p>\u5f62\u5f0f\u4e0a\uff0c\u5982\u679c\u6211\u4eec\u53ef\u4ee5\u627e\u51fa\u7d22\u5f15&nbsp;<code>i+1 &lt; j</code>&nbsp;\u4e14\u6ee1\u8db3&nbsp;<code>(A[0] + A[1] + ... + A[i] == A[i+1] + A[i+2] + ... + A[j-1] == A[j] + A[j-1] + ... + A[A.length - 1])</code>&nbsp;\u5c31\u53ef\u4ee5\u5c06\u6570\u7ec4\u4e09\u7b49\u5206\u3002</p>\n\n<p>&nbsp;</p>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<pre><strong>\u8f93\u51fa\uff1a</strong>[0,2,1,-6,6,-7,9,1,2,0,1]\n<strong>\u8f93\u51fa\uff1a</strong>true\n<strong>\u89e3\u91ca\uff1a</strong>0 + 2 + 1 = -6 + 6 - 7 + 9 + 1 = 2 + 0 + 1\n</pre>\n\n<p><strong>\u793a\u4f8b 2\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>[0,2,1,-6,6,7,9,-1,2,0,1]\n<strong>\u8f93\u51fa\uff1a</strong>false\n</pre>\n\n<p><strong>\u793a\u4f8b 3\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>[3,3,6,5,-2,2,5,1,-9,4]\n<strong>\u8f93\u51fa\uff1a</strong>true\n<strong>\u89e3\u91ca\uff1a</strong>3 + 3 = 6 = 5 - 2 + 2 + 5 + 1 - 9 + 4\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ol>\n\t<li><code>3 &lt;= A.length &lt;= 50000</code></li>\n\t<li><code>-10000 &lt;= A[i] &lt;= 10000</code></li>\n</ol>\n"}}}]);
//# sourceMappingURL=sourceCode-content145.9c1d4d90.chunk.js.map