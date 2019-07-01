(window.webpackJsonp=window.webpackJsonp||[]).push([[607],{657:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number} m\n * @param {number} n\n * @param {number[][]} ops\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> maxCount = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">m, n, ops</span>) </span>{\n  <span class="hljs-keyword">let</span> minR=m,minC=n\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;ops.length;i++){\n      <span class="hljs-keyword">let</span> cur=ops[i]\n      <span class="hljs-keyword">if</span>(cur[<span class="hljs-number">0</span>]&lt;minR)minR=cur[<span class="hljs-number">0</span>]\n      <span class="hljs-keyword">if</span>(cur[<span class="hljs-number">1</span>]&lt;minC)minC=cur[<span class="hljs-number">1</span>]\n  }\n  <span class="hljs-keyword">return</span> minR*minC\n};\n</code></pre>\n'],titleSlug:"range-addition-ii",hasThinking:!1,content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u521d\u59cb\u5143\u7d20\u5168\u90e8\u4e3a&nbsp;<strong>0</strong>\uff0c\u5927\u5c0f\u4e3a m*n \u7684\u77e9\u9635&nbsp;<strong>M&nbsp;</strong>\u4ee5\u53ca\u5728&nbsp;<strong>M&nbsp;</strong>\u4e0a\u7684\u4e00\u7cfb\u5217\u66f4\u65b0\u64cd\u4f5c\u3002</p>\n\n<p>\u64cd\u4f5c\u7528\u4e8c\u7ef4\u6570\u7ec4\u8868\u793a\uff0c\u5176\u4e2d\u7684\u6bcf\u4e2a\u64cd\u4f5c\u7528\u4e00\u4e2a\u542b\u6709\u4e24\u4e2a<strong>\u6b63\u6574\u6570&nbsp;a</strong> \u548c <strong>b</strong> \u7684\u6570\u7ec4\u8868\u793a\uff0c\u542b\u4e49\u662f\u5c06\u6240\u6709\u7b26\u5408&nbsp;<strong>0 &lt;= i &lt; a</strong> \u4ee5\u53ca <strong>0 &lt;= j &lt; b</strong> \u7684\u5143\u7d20&nbsp;<strong>M[i][j]&nbsp;</strong>\u7684\u503c\u90fd<strong>\u589e\u52a0 1</strong>\u3002</p>\n\n<p>\u5728\u6267\u884c\u7ed9\u5b9a\u7684\u4e00\u7cfb\u5217\u64cd\u4f5c\u540e\uff0c\u4f60\u9700\u8981\u8fd4\u56de\u77e9\u9635\u4e2d\u542b\u6709\u6700\u5927\u6574\u6570\u7684\u5143\u7d20\u4e2a\u6570\u3002</p>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> \nm = 3, n = 3\noperations = [[2,2],[3,3]]\n<strong>\u8f93\u51fa:</strong> 4\n<strong>\u89e3\u91ca:</strong> \n\u521d\u59cb\u72b6\u6001, M = \n[[0, 0, 0],\n [0, 0, 0],\n [0, 0, 0]]\n\n\u6267\u884c\u5b8c\u64cd\u4f5c [2,2] \u540e, M = \n[[1, 1, 0],\n [1, 1, 0],\n [0, 0, 0]]\n\n\u6267\u884c\u5b8c\u64cd\u4f5c [3,3] \u540e, M = \n[[2, 2, 1],\n [2, 2, 1],\n [1, 1, 1]]\n\nM \u4e2d\u6700\u5927\u7684\u6574\u6570\u662f 2, \u800c\u4e14 M \u4e2d\u67094\u4e2a\u503c\u4e3a2\u7684\u5143\u7d20\u3002\u56e0\u6b64\u8fd4\u56de 4\u3002\n</pre>\n\n<p><strong>\u6ce8\u610f:</strong></p>\n\n<ol>\n\t<li>m \u548c n \u7684\u8303\u56f4\u662f&nbsp;[1,40000]\u3002</li>\n\t<li>a \u7684\u8303\u56f4\u662f [1,m]\uff0cb \u7684\u8303\u56f4\u662f [1,n]\u3002</li>\n\t<li>\u64cd\u4f5c\u6570\u76ee\u4e0d\u8d85\u8fc7 10000\u3002</li>\n</ol>\n"}}}]);
//# sourceMappingURL=sourceCode-content622.47c149fa.chunk.js.map