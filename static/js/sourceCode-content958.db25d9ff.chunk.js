(window.webpackJsonp=window.webpackJsonp||[]).push([[978],{993:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[][]} stones\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> removeStones = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">stones</span>) </span>{\n  <span class="hljs-keyword">let</span> N=stones.length, count=N\n  <span class="hljs-keyword">let</span> uf=<span class="hljs-built_in">Array</span>(N).fill().map(<span class="hljs-function">(<span class="hljs-params">n,i</span>)=&gt;</span>i),\n      weight=<span class="hljs-built_in">Array</span>(N).fill(<span class="hljs-number">1</span>)\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">find</span>(<span class="hljs-params">i</span>)</span>{\n    <span class="hljs-keyword">while</span>(i!==uf[i]){\n      i=uf[i]\n    }\n    <span class="hljs-keyword">return</span> i\n  }\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">union</span>(<span class="hljs-params">a,b</span>)</span>{\n    <span class="hljs-keyword">let</span> i=find(a),\n        j=find(b)\n    <span class="hljs-keyword">if</span>(i===j)<span class="hljs-keyword">return</span> \n    <span class="hljs-keyword">if</span>(weight[i]&lt;weight[j]){\n      uf[i]=j\n      weight[j]+=weight[i]\n    }<span class="hljs-keyword">else</span>{\n      uf[j]=i\n      weight[i]+=weight[j]\n    }\n    count--\n  }\n  \n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;stones.length<span class="hljs-number">-1</span>;i++){\n    <span class="hljs-keyword">let</span> [x1,y1]=stones[i]\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=i+<span class="hljs-number">1</span>;j&lt;stones.length;j++){\n      <span class="hljs-keyword">let</span> [x2,y2]=stones[j]\n      <span class="hljs-keyword">if</span>(x1===x2 || y1===y2){\n        union(i,j)\n      }\n    }\n  }\n  <span class="hljs-keyword">return</span> N-count\n};\n</code></pre>\n'],titleSlug:"most-stones-removed-with-same-row-or-column",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u9898\u76ee\u7ffb\u8bd1\u7684\u4e0d\u592a\u597d\uff0c\u5176\u5b9e\u610f\u601d\u662f\u8fd9\u6837\u7684\uff0c<code>move</code>\u64cd\u4f5c\u53ef\u4ee5\u5220\u9664<code>1</code>\u4e2a\u77f3\u5934\uff0c\u6761\u4ef6\u662f\u8fd9\u4e2a\u77f3\u5934\u5b83\u6240\u5728\u7684\u884c\u6216\u8005\u5217\u8fd8\u6709\u53e6\u4e00\u5757\u77f3\u5934\uff0c\u4e5f\u5c31\u662f\u8bf4\uff0c\n\u5982\u679c\u4e00\u5757\u77f3\u5934\uff0c\u5b83\u6240\u5728\u7684\u884c\u548c\u5217\u90fd\u6ca1\u6709\u5176\u4ed6\u77f3\u5934\u4e86\uff0c\u5b83\u662f\u4e0d\u53ef\u4ee5\u6267\u884c<code>move</code>\u64cd\u4f5c\u7684\u3002</p>\n<p>\u641e\u61c2\u9898\u610f\uff0c\u5c31\u77e5\u9053\u8fd9\u662f\u8981\u6c42\u51fa\u8fde\u901a\u5206\u91cf<code>count</code>\uff0c\u4e24\u4e2a\u77f3\u5934\u53ea\u8981\u5b83\u4eec\u7684<code>x1===x2 || y1===y2</code>\uff0c\u5c31\u53ef\u4ee5\u8fde\u901a\u3002</p>\n<p>\u6700\u540e\u8fd4\u56de<code>stones.length-count</code>\u3002</p>\n",content:"<p>\u5728\u4e8c\u7ef4\u5e73\u9762\u4e0a\uff0c\u6211\u4eec\u5c06\u77f3\u5934\u653e\u7f6e\u5728\u4e00\u4e9b\u6574\u6570\u5750\u6807\u70b9\u4e0a\u3002\u6bcf\u4e2a\u5750\u6807\u70b9\u4e0a\u6700\u591a\u53ea\u80fd\u6709\u4e00\u5757\u77f3\u5934\u3002<br>\n<br>\n\u73b0\u5728\uff0c<em>move</em> \u64cd\u4f5c\u5c06\u4f1a\u79fb\u9664\u4e0e\u7f51\u683c\u4e0a\u7684\u67d0\u4e00\u5757\u77f3\u5934\u5171\u4eab\u4e00\u5217\u6216\u4e00\u884c\u7684\u4e00\u5757\u77f3\u5934\u3002<br>\n<br>\n\u6211\u4eec\u6700\u591a\u80fd\u6267\u884c\u591a\u5c11\u6b21 <em>move</em> \u64cd\u4f5c\uff1f</p>\n\n<p>&nbsp;</p>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]\n<strong>\u8f93\u51fa\uff1a</strong>5\n</pre>\n\n<p><strong>\u793a\u4f8b 2\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]\n<strong>\u8f93\u51fa\uff1a</strong>3\n</pre>\n\n<p><strong>\u793a\u4f8b 3\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>stones = [[0,0]]\n<strong>\u8f93\u51fa\uff1a</strong>0\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ol>\n\t<li><code>1 &lt;= stones.length &lt;= 1000</code></li>\n\t<li><code>0 &lt;= stones[i][j] &lt; 10000</code></li>\n</ol>\n"}}}]);
//# sourceMappingURL=sourceCode-content958.db25d9ff.chunk.js.map