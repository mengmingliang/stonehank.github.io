(window.webpackJsonp=window.webpackJsonp||[]).push([[689],{732:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[][]} grid\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> maxAreaOfIsland = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">grid</span>) </span>{\n    <span class="hljs-keyword">let</span> visited=[], max=<span class="hljs-number">0</span>\n    <span class="hljs-keyword">let</span> cL=grid.length, rL=grid[<span class="hljs-number">0</span>].length\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;cL;i++){\n        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;j&lt;rL;j++){\n            <span class="hljs-keyword">if</span>(!visited[i])visited[i]=[]\n            visited[i][j]=<span class="hljs-literal">false</span>\n        }\n    }\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;cL;i++){\n        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;j&lt;rL;j++){\n            <span class="hljs-keyword">let</span> count=<span class="hljs-number">0</span>\n            count=check(i,j,count)\n            <span class="hljs-keyword">if</span>(count&gt;max)max=count\n        }\n    }\n    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">check</span>(<span class="hljs-params">i,j,count</span>)</span>{\n        <span class="hljs-keyword">if</span>(i&lt;<span class="hljs-number">0</span> || i&gt;=cL || j&lt;<span class="hljs-number">0</span> || j&gt;=rL)<span class="hljs-keyword">return</span> count\n        <span class="hljs-keyword">if</span>(!visited[i][j] &amp;&amp; grid[i][j]===<span class="hljs-number">1</span>){\n            visited[i][j]=<span class="hljs-literal">true</span>\n            count++\n            count=check(i<span class="hljs-number">-1</span>,j,count)\n            count=check(i,j+<span class="hljs-number">1</span>,count)\n            count=check(i+<span class="hljs-number">1</span>,j,count)\n            count=check(i,j<span class="hljs-number">-1</span>,count)\n        }<span class="hljs-keyword">else</span>{\n            visited[i][j]=<span class="hljs-literal">true</span>\n        }\n        <span class="hljs-keyword">return</span> count\n    }\n    <span class="hljs-keyword">return</span> max\n};\n</code></pre>\n'],titleSlug:"max-area-of-island",hasThinking:!1,content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u5305\u542b\u4e86\u4e00\u4e9b 0 \u548c 1\u7684\u975e\u7a7a\u4e8c\u7ef4\u6570\u7ec4&nbsp;<code>grid</code>&nbsp;, \u4e00\u4e2a&nbsp;<strong>\u5c9b\u5c7f</strong>&nbsp;\u662f\u7531\u56db\u4e2a\u65b9\u5411 (\u6c34\u5e73\u6216\u5782\u76f4) \u7684&nbsp;<code>1</code>&nbsp;(\u4ee3\u8868\u571f\u5730) \u6784\u6210\u7684\u7ec4\u5408\u3002\u4f60\u53ef\u4ee5\u5047\u8bbe\u4e8c\u7ef4\u77e9\u9635\u7684\u56db\u4e2a\u8fb9\u7f18\u90fd\u88ab\u6c34\u5305\u56f4\u7740\u3002</p>\n\n<p>\u627e\u5230\u7ed9\u5b9a\u7684\u4e8c\u7ef4\u6570\u7ec4\u4e2d\u6700\u5927\u7684\u5c9b\u5c7f\u9762\u79ef\u3002(\u5982\u679c\u6ca1\u6709\u5c9b\u5c7f\uff0c\u5219\u8fd4\u56de\u9762\u79ef\u4e3a0\u3002)</p>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<pre>\n[[0,0,1,0,0,0,0,1,0,0,0,0,0],\n [0,0,0,0,0,0,0,1,1,1,0,0,0],\n [0,1,1,0,1,0,0,0,0,0,0,0,0],\n [0,1,0,0,1,1,0,0,<strong>1</strong>,0,<strong>1</strong>,0,0],\n [0,1,0,0,1,1,0,0,<strong>1</strong>,<strong>1</strong>,<strong>1</strong>,0,0],\n [0,0,0,0,0,0,0,0,0,0,<strong>1</strong>,0,0],\n [0,0,0,0,0,0,0,1,1,1,0,0,0],\n [0,0,0,0,0,0,0,1,1,0,0,0,0]]\n</pre>\n\n<p>\u5bf9\u4e8e\u4e0a\u9762\u8fd9\u4e2a\u7ed9\u5b9a\u77e9\u9635\u5e94\u8fd4\u56de&nbsp;<code>6</code>\u3002\u6ce8\u610f\u7b54\u6848\u4e0d\u5e94\u8be5\u662f11\uff0c\u56e0\u4e3a\u5c9b\u5c7f\u53ea\u80fd\u5305\u542b\u6c34\u5e73\u6216\u5782\u76f4\u7684\u56db\u4e2a\u65b9\u5411\u7684&lsquo;1&rsquo;\u3002</p>\n\n<p><strong>\u793a\u4f8b 2:</strong></p>\n\n<pre>\n[[0,0,0,0,0,0,0,0]]</pre>\n\n<p>\u5bf9\u4e8e\u4e0a\u9762\u8fd9\u4e2a\u7ed9\u5b9a\u7684\u77e9\u9635, \u8fd4\u56de&nbsp;<code>0</code>\u3002</p>\n\n<p><strong>\u6ce8\u610f:&nbsp;</strong>\u7ed9\u5b9a\u7684\u77e9\u9635<code>grid</code>&nbsp;\u7684\u957f\u5ea6\u548c\u5bbd\u5ea6\u90fd\u4e0d\u8d85\u8fc7 50\u3002</p>\n"}}}]);
//# sourceMappingURL=sourceCode-content697.6ca1cca3.chunk.js.map