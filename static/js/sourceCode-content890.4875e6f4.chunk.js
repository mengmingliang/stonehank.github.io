(window.webpackJsonp=window.webpackJsonp||[]).push([[903],{925:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number} N\n * @param {number[][]} dislikes\n * @return {boolean}\n */</span>\n<span class="hljs-keyword">var</span> possibleBipartition = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">N, dislikes</span>) </span>{\n  <span class="hljs-keyword">let</span> graph=<span class="hljs-built_in">Array</span>(N+<span class="hljs-number">1</span>).fill().map(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>[])\n  <span class="hljs-keyword">let</span> color=<span class="hljs-built_in">Array</span>(N+<span class="hljs-number">1</span>).fill(<span class="hljs-literal">null</span>)\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> [a,b] <span class="hljs-keyword">of</span> dislikes){\n    graph[a].push(b)\n    graph[b].push(a)\n  }\n  <span class="hljs-keyword">let</span> valid=<span class="hljs-literal">true</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">1</span>;i&lt;N;i++){\n    <span class="hljs-keyword">if</span>(color[i]!=<span class="hljs-literal">null</span>)<span class="hljs-keyword">continue</span>\n    color[i]=<span class="hljs-literal">false</span>\n    twoColor(i)\n    <span class="hljs-keyword">if</span>(!valid)<span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>\n  }\n  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>\n  \n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">twoColor</span>(<span class="hljs-params">v</span>)</span>{\n    <span class="hljs-keyword">if</span>(!valid)<span class="hljs-keyword">return</span>\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;graph[v].length;i++){\n      <span class="hljs-keyword">let</span> w=graph[v][i]\n      <span class="hljs-keyword">if</span>(color[w]==<span class="hljs-literal">null</span>){\n        color[w]=!color[v]\n        twoColor(w)\n      }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(color[w]===color[v]){\n        <span class="hljs-keyword">return</span> valid=<span class="hljs-literal">false</span>\n      }\n    }\n  }\n};\n</code></pre>\n'],titleSlug:"possible-bipartition",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u8fd9\u5176\u5b9e\u662f\u4e00\u4e2a\u65e0\u5411\u56fe\u7684\u53cc\u8272\u95ee\u9898\uff0c\u5148\u6784\u5efa\u4e00\u4e2a\u65e0\u5411\u56fe\uff0c\u5c06<code>dislikes</code>\u7684\u4e24\u8fb9\u76f8\u8fde\uff0c\u5bf9\u6bcf\u4e00\u4e2a\u70b9\u5c1d\u8bd5<code>\u67d3\u8272</code>\uff0c\n\u76f8\u90bb\u7684\u70b9\u989c\u8272\u4e0d\u80fd\u76f8\u540c\uff0c\u5982\u679c\u5b58\u5728\u51b2\u7a81\uff0c\u8fd4\u56de<code>false</code>\uff0c\u5982\u679c\u6ca1\u6709\u51b2\u7a81\uff0c\u4fdd\u5b58\u8fd9\u4e2a\u8282\u70b9\u7684\u989c\u8272\uff0c\u4ee5\u514d\u91cd\u590d\u8ba1\u7b97\u3002</p>\n",content:"<p>\u7ed9\u5b9a\u4e00\u7ec4&nbsp;<code>N</code>&nbsp;\u4eba\uff08\u7f16\u53f7\u4e3a&nbsp;<code>1, 2, ..., N</code>\uff09\uff0c&nbsp;\u6211\u4eec\u60f3\u628a\u6bcf\u4e2a\u4eba\u5206\u8fdb<strong>\u4efb\u610f</strong>\u5927\u5c0f\u7684\u4e24\u7ec4\u3002</p>\n\n<p>\u6bcf\u4e2a\u4eba\u90fd\u53ef\u80fd\u4e0d\u559c\u6b22\u5176\u4ed6\u4eba\uff0c\u90a3\u4e48\u4ed6\u4eec\u4e0d\u5e94\u8be5\u5c5e\u4e8e\u540c\u4e00\u7ec4\u3002</p>\n\n<p>\u5f62\u5f0f\u4e0a\uff0c\u5982\u679c <code>dislikes[i] = [a, b]</code>\uff0c\u8868\u793a\u4e0d\u5141\u8bb8\u5c06\u7f16\u53f7\u4e3a <code>a</code> \u548c <code>b</code> \u7684\u4eba\u5f52\u5165\u540c\u4e00\u7ec4\u3002</p>\n\n<p>\u5f53\u53ef\u4ee5\u7528\u8fd9\u79cd\u65b9\u6cd5\u5c06\u6bcf\u4e2a\u4eba\u5206\u8fdb\u4e24\u7ec4\u65f6\uff0c\u8fd4\u56de <code>true</code>\uff1b\u5426\u5219\u8fd4\u56de <code>false</code>\u3002</p>\n\n<p>&nbsp;</p>\n\n<ol>\n</ol>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>N = 4, dislikes = [[1,2],[1,3],[2,4]]\n<strong>\u8f93\u51fa\uff1a</strong>true\n<strong>\u89e3\u91ca\uff1a</strong>group1 [1,4], group2 [2,3]\n</pre>\n\n<p><strong>\u793a\u4f8b 2\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>N = 3, dislikes = [[1,2],[1,3],[2,3]]\n<strong>\u8f93\u51fa\uff1a</strong>false\n</pre>\n\n<p><strong>\u793a\u4f8b 3\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>N = 5, dislikes = [[1,2],[2,3],[3,4],[4,5],[1,5]]\n<strong>\u8f93\u51fa\uff1a</strong>false\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ol>\n\t<li><code>1 &lt;= N &lt;= 2000</code></li>\n\t<li><code>0 &lt;= dislikes.length &lt;= 10000</code></li>\n\t<li><code>1 &lt;= dislikes[i][j] &lt;= N</code></li>\n\t<li><code>dislikes[i][0] &lt; dislikes[i][1]</code></li>\n\t<li>\u5bf9\u4e8e&nbsp;<code>dislikes[i] == dislikes[j]</code>&nbsp;\u4e0d\u5b58\u5728&nbsp;<code>i != j</code>&nbsp;</li>\n</ol>\n"}}}]);
//# sourceMappingURL=sourceCode-content890.4875e6f4.chunk.js.map