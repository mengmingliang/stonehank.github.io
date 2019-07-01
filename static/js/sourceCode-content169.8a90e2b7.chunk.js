(window.webpackJsonp=window.webpackJsonp||[]).push([[103],{204:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} A\n * @param {number[]} B\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> maxUncrossedLines = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">A, B</span>) </span>{\n  <span class="hljs-keyword">let</span> aL=A.length,bL=B.length;\n  <span class="hljs-keyword">let</span> arr=[]\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;=aL;i++){\n    arr[i]=[]\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;j&lt;=bL;j++)arr[i][j]=<span class="hljs-number">0</span>\n  }\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">1</span>;i&lt;=aL;i++){\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">1</span>;j&lt;=bL;j++){\n      <span class="hljs-keyword">if</span>(A[i<span class="hljs-number">-1</span>]===B[j<span class="hljs-number">-1</span>]) arr[i][j]=arr[i<span class="hljs-number">-1</span>][j<span class="hljs-number">-1</span>]+<span class="hljs-number">1</span>\n      <span class="hljs-keyword">else</span> arr[i][j]=<span class="hljs-built_in">Math</span>.max(arr[i<span class="hljs-number">-1</span>][j],arr[i][j<span class="hljs-number">-1</span>])\n    }\n  }\n  <span class="hljs-keyword">return</span> arr[aL][bL]\n};\n</code></pre>\n'],titleSlug:"uncrossed-lines",hasThinking:!1,content:'<p>\u6211\u4eec\u5728\u4e24\u6761\u72ec\u7acb\u7684\u6c34\u5e73\u7ebf\u4e0a\u6309\u7ed9\u5b9a\u7684\u987a\u5e8f\u5199\u4e0b&nbsp;<code>A</code>&nbsp;\u548c&nbsp;<code>B</code>&nbsp;\u4e2d\u7684\u6574\u6570\u3002</p>\n\n<p>\u73b0\u5728\uff0c\u6211\u4eec\u53ef\u4ee5\u7ed8\u5236\u4e00\u4e9b\u8fde\u63a5\u4e24\u4e2a\u6570\u5b57&nbsp;<code>A[i]</code>&nbsp;\u548c&nbsp;<code>B[j]</code>&nbsp;\u7684\u76f4\u7ebf\uff0c\u53ea\u8981&nbsp;<code>A[i] == B[j]</code>\uff0c\u4e14\u6211\u4eec\u7ed8\u5236\u7684\u76f4\u7ebf\u4e0d\u4e0e\u4efb\u4f55\u5176\u4ed6\u8fde\u7ebf\uff08\u975e\u6c34\u5e73\u7ebf\uff09\u76f8\u4ea4\u3002</p>\n\n<p>\u4ee5\u8fd9\u79cd\u65b9\u6cd5\u7ed8\u5236\u7ebf\u6761\uff0c\u5e76\u8fd4\u56de\u6211\u4eec\u53ef\u4ee5\u7ed8\u5236\u7684\u6700\u5927\u8fde\u7ebf\u6570\u3002</p>\n\n<p>&nbsp;</p>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/04/28/142.png" style="height: 72px; width: 100px;"></strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>A = [1,4,2], B = [1,2,4]\n<strong>\u8f93\u51fa\uff1a</strong>2\n<strong>\u89e3\u91ca\uff1a\n</strong>\u6211\u4eec\u53ef\u4ee5\u753b\u51fa\u4e24\u6761\u4e0d\u4ea4\u53c9\u7684\u7ebf\uff0c\u5982\u4e0a\u56fe\u6240\u793a\u3002\n\u6211\u4eec\u65e0\u6cd5\u753b\u51fa\u7b2c\u4e09\u6761\u4e0d\u76f8\u4ea4\u7684\u76f4\u7ebf\uff0c\u56e0\u4e3a\u4ece A[1]=4 \u5230 B[2]=4 \u7684\u76f4\u7ebf\u5c06\u4e0e\u4ece A[2]=2 \u5230 B[1]=2 \u7684\u76f4\u7ebf\u76f8\u4ea4\u3002</pre>\n\n<p><strong>\u793a\u4f8b 2\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>A = [2,5,1,2,5], B = [10,5,2,1,5,2]\n<strong>\u8f93\u51fa\uff1a</strong>3\n</pre>\n\n<p><strong>\u793a\u4f8b 3\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>A = [1,3,7,1,7,5], B = [1,9,2,5,1]\n<strong>\u8f93\u51fa\uff1a</strong>2</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ol>\n\t<li><code>1 &lt;= A.length &lt;= 500</code></li>\n\t<li><code>1 &lt;= B.length &lt;= 500</code></li>\n\t<li><code>1 &lt;= A[i], B[i] &lt;= 2000</code></li>\n</ol>\n\n<p>&nbsp;</p>\n'}}}]);
//# sourceMappingURL=sourceCode-content169.8a90e2b7.chunk.js.map