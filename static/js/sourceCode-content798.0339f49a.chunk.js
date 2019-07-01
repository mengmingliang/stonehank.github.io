(window.webpackJsonp=window.webpackJsonp||[]).push([[800],{833:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[][]} graph\n * @return {number[]}\n */</span>\n<span class="hljs-keyword">var</span> eventualSafeNodes = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">graph</span>) </span>{\n  <span class="hljs-keyword">let</span> safe=<span class="hljs-literal">true</span>,res=[]\n  <span class="hljs-keyword">let</span> cache=<span class="hljs-built_in">Array</span>(graph.length).fill(<span class="hljs-literal">null</span>)\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;graph.length;i++){\n    dfs(i,[])\n    <span class="hljs-keyword">if</span>(cache[i])res.push(i)\n  }\n  <span class="hljs-keyword">return</span> res\n  \n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dfs</span>(<span class="hljs-params">v,marked</span>)</span>{\n    <span class="hljs-keyword">if</span>(cache[v]!=<span class="hljs-literal">null</span>)<span class="hljs-keyword">return</span> cache[v]\n    marked[v]=<span class="hljs-literal">true</span>\n    <span class="hljs-keyword">let</span> adj=graph[v],res=<span class="hljs-literal">true</span>\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;adj.length;i++){\n      <span class="hljs-keyword">if</span>(marked[adj[i]])<span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>\n      <span class="hljs-keyword">if</span>(!dfs(adj[i],marked)){\n        res=<span class="hljs-literal">false</span>\n        <span class="hljs-keyword">break</span>\n      }\n    }\n    cache[v]=res\n    marked[v]=<span class="hljs-literal">false</span>\n    <span class="hljs-keyword">return</span> res\n  }\n};\n</code></pre>\n'],titleSlug:"find-eventual-safe-states",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u53ef\u4ee5\u5c06\u8fd9\u9898\u770b\u6210\u7ed9\u6bcf\u4e2a\u8282\u70b9\u4e0a\u989c\u8272\u7684\u95ee\u9898\uff0c</p>\n<p><code>0</code>\u8868\u793a\u8fd9\u4e2a\u8282\u70b9\u8fd8\u672a\u8bbf\u95ee\n<code>1</code>\u8868\u793a\u662f\u4e00\u4e2a\u5b89\u5168\u8282\u70b9\n<code>2</code>\u8868\u793a\u662f\u4e00\u4e2a\u975e\u5b89\u5168\u8282\u70b9</p>\n<p>\u5f53\u9047\u5230\u975e<code>0</code>\u7684\u8282\u70b9\uff0c\u76f4\u63a5\u8fd4\u56de<code>color[i]===1</code>\u3002</p>\n<p>\u9047\u5230<code>0</code>\u8282\u70b9\uff0c\u9996\u5148\u7ed9\u5b83\u8bbe\u7f6e\u4e3a<code>2</code>\uff0c\u7136\u540e\u904d\u5386\u76f8\u90bb\u8282\u70b9\uff0c\u5982\u679c\u904d\u5386\u7684\u65f6\u5019\u5b58\u5728\u8282\u70b9\u4e3a<code>2</code>\uff0c\u8981\u4e48\u5c31\u662f\u5df2\u7ecf\u786e\u5b9a\u662f\u4e00\u4e2a\u975e\u5b89\u5168\u8282\u70b9\uff0c\n\u8981\u4e48\u5c31\u662f\u5728\u904d\u5386\u7684\u65f6\u5019\u91cd\u590d\u8bbf\u95ee\u4e86\uff0c\u90fd\u8981\u8fd4\u56de<code>false</code>\u3002</p>\n<p>\u5982\u679c\u76f8\u90bb\u8282\u70b9\u4e2d\u6ca1\u6709\u8282\u70b9\u4e3a<code>2</code>\uff0c\u90a3\u4e48\u5f53\u524d\u8282\u70b9\u8bbe\u7f6e\u4e3a<code>1</code>\u3002</p>\n",content:'<p>\u5728\u6709\u5411\u56fe\u4e2d, \u6211\u4eec\u4ece\u67d0\u4e2a\u8282\u70b9\u548c\u6bcf\u4e2a\u8f6c\u5411\u5904\u5f00\u59cb, \u6cbf\u7740\u56fe\u7684\u6709\u5411\u8fb9\u8d70\u3002 \u5982\u679c\u6211\u4eec\u5230\u8fbe\u7684\u8282\u70b9\u662f\u7ec8\u70b9 (\u5373\u5b83\u6ca1\u6709\u8fde\u51fa\u7684\u6709\u5411\u8fb9), \u6211\u4eec\u505c\u6b62\u3002</p>\n\n<p>\u73b0\u5728, \u5982\u679c\u6211\u4eec\u6700\u540e\u80fd\u8d70\u5230\u7ec8\u70b9\uff0c\u90a3\u4e48\u6211\u4eec\u7684\u8d77\u59cb\u8282\u70b9\u662f<em>\u6700\u7ec8\u5b89\u5168</em>\u7684\u3002 \u66f4\u5177\u4f53\u5730\u8bf4, \u5b58\u5728\u4e00\u4e2a\u81ea\u7136\u6570 <code>K</code>,&nbsp; \u65e0\u8bba\u9009\u62e9\u4ece\u54ea\u91cc\u5f00\u59cb\u884c\u8d70, \u6211\u4eec\u8d70\u4e86\u4e0d\u5230 <code>K</code> \u6b65\u540e\u5fc5\u80fd\u505c\u6b62\u5728\u4e00\u4e2a\u7ec8\u70b9\u3002</p>\n\n<p>\u54ea\u4e9b\u8282\u70b9\u6700\u7ec8\u662f\u5b89\u5168\u7684\uff1f \u7ed3\u679c\u8fd4\u56de\u4e00\u4e2a\u6709\u5e8f\u7684\u6570\u7ec4\u3002</p>\n\n<p>\u8be5\u6709\u5411\u56fe\u6709 <code>N</code> \u4e2a\u8282\u70b9\uff0c\u6807\u7b7e\u4e3a <code>0, 1, ..., N-1</code>, \u5176\u4e2d <code>N</code> \u662f&nbsp;<code>graph</code>&nbsp;\u7684\u8282\u70b9\u6570.&nbsp; \u56fe\u4ee5\u4ee5\u4e0b\u7684\u5f62\u5f0f\u7ed9\u51fa: <code>graph[i]</code> \u662f\u8282\u70b9 <code>j</code> \u7684\u4e00\u4e2a\u5217\u8868\uff0c\u6ee1\u8db3 <code>(i, j)</code> \u662f\u56fe\u7684\u4e00\u6761\u6709\u5411\u8fb9\u3002</p>\n\n<pre>\n<strong>\u793a\u4f8b\uff1a</strong>\n<strong>\u8f93\u5165\uff1a</strong>graph = [[1,2],[2,3],[5],[0],[5],[],[]]\n<strong>\u8f93\u51fa\uff1a</strong>[2,4,5,6]\n\u8fd9\u91cc\u662f\u4e0a\u56fe\u7684\u793a\u610f\u56fe\u3002\n\n</pre>\n\n<p><img alt="Illustration of graph" src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/03/17/picture1.png" style="height:86px; width:300px" /></p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ul>\n\t<li><code>graph</code> \u8282\u70b9\u6570\u4e0d\u8d85\u8fc7 <code>10000</code>.</li>\n\t<li>\u56fe\u7684\u8fb9\u6570\u4e0d\u4f1a\u8d85\u8fc7 <code>32000</code>.</li>\n\t<li>\u6bcf\u4e2a <code>graph[i]</code> \u88ab\u6392\u5e8f\u4e3a\u4e0d\u540c\u7684\u6574\u6570\u5217\u8868\uff0c \u5728\u533a\u95f4 <code>[0, graph.length - 1]</code>&nbsp;\u4e2d\u9009\u53d6\u3002</li>\n</ul>\n'}}}]);
//# sourceMappingURL=sourceCode-content798.0339f49a.chunk.js.map