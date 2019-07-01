(window.webpackJsonp=window.webpackJsonp||[]).push([[339],{416:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number} n\n * @param {number[][]} edges\n * @return {number[]}\n */</span>\n<span class="hljs-keyword">var</span> findMinHeightTrees = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">n, edges</span>) </span>{\n  <span class="hljs-keyword">if</span>(n===<span class="hljs-number">1</span>)<span class="hljs-keyword">return</span> [<span class="hljs-number">0</span>]\n  <span class="hljs-keyword">let</span> graph=<span class="hljs-built_in">Array</span>(n).fill().map(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>[])\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> [v,w] <span class="hljs-keyword">of</span> edges){\n    graph[v].push(w)\n    graph[w].push(v)\n  }\n  <span class="hljs-keyword">let</span> leaf=[]\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;graph.length;i++){\n    <span class="hljs-keyword">if</span>(graph[i].length===<span class="hljs-number">1</span>){\n      leaf.push(i)\n    }\n  }\n  <span class="hljs-keyword">while</span>(n&gt;<span class="hljs-number">2</span>){\n    <span class="hljs-keyword">let</span> len=leaf.length\n    n-=len\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;len;i++){\n      <span class="hljs-keyword">let</span> v=leaf.shift()\n      <span class="hljs-keyword">let</span> nxtV=graph[v].pop()\n      <span class="hljs-keyword">let</span> adj=graph[nxtV]\n      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;j&lt;adj.length;j++){\n        <span class="hljs-keyword">if</span>(adj[j]===v)adj.splice(j,<span class="hljs-number">1</span>)\n      }\n      <span class="hljs-keyword">if</span>(adj.length===<span class="hljs-number">1</span>)leaf.push(nxtV)\n    }\n  }\n  <span class="hljs-keyword">return</span> leaf\n};\n</code></pre>\n'],titleSlug:"minimum-height-trees",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u6211\u4eec\u8981\u627e\u51fa\u4e00\u68f5\u6811\u7684\u6700\u5c0f\u9ad8\u5ea6\u7684\u6839\u8282\u70b9\uff0c\u5176\u5b9e\u5c31\u662f\u8981\u627e\u5230\u6700\u4e2d\u5fc3\u7684<code>1</code>\u4e2a\u6216\u8005<code>2</code>\u4e2a\u70b9\u3002</p>\n<p>\u53ef\u4ee5\u5148\u5047\u8bbe\uff0c\u4e00\u6761\u76f4\u7ebf\u7684\u8def\u5f84\uff0c\u6211\u4eec\u5e94\u8be5\u5982\u4f55\u627e\u4e2d\u5fc3\u70b9\uff0c\u4e00\u4e2a\u5f88\u7b80\u5355\u7684\u65b9\u6cd5\uff0c\u76f4\u7ebf\u4e24\u7aef\u4e24\u4e2a\u6307\u9488\uff0c\u5404\u81ea\u5f80\u4e2d\u95f4\u9760\u8fd1\uff0c\u5f532\u4e2a\u6307\u9488\u76f8\u9047\uff0c\n\u8bf4\u660e\u627e\u5230\u4e86\u4e2d\u5fc3\u70b9\u3002</p>\n<p><code>\u6811</code>\u540c\u6837\u5982\u6b64\uff0c\u6211\u4eec\u9996\u5148\u627e\u5230<strong>\u53ea\u67091\u4e2a\u90bb\u63a5\u70b9</strong>\u7684\u8282\u70b9\uff0c\u7136\u540e\u901a\u8fc7\u4e0d\u65ad\u5220\u9664\uff0c\u627e\u51fa\u5b83\u4eec\u7684\u4e0b\u4e00\u4e2a\u53ea\u67091\u4e2a\u90bb\u63a5\u70b9\u7684\u8282\u70b9\uff0c\u76f4\u5230\u6700\u540e\u7684\u4e00\u4e2a\u6216\u8005\u4e24\u4e2a\u8282\u70b9\u3002</p>\n",content:'<p>\u5bf9\u4e8e\u4e00\u4e2a\u5177\u6709\u6811\u7279\u5f81\u7684\u65e0\u5411\u56fe\uff0c\u6211\u4eec\u53ef\u9009\u62e9\u4efb\u4f55\u4e00\u4e2a\u8282\u70b9\u4f5c\u4e3a\u6839\u3002\u56fe\u56e0\u6b64\u53ef\u4ee5\u6210\u4e3a\u6811\uff0c\u5728\u6240\u6709\u53ef\u80fd\u7684\u6811\u4e2d\uff0c\u5177\u6709\u6700\u5c0f\u9ad8\u5ea6\u7684\u6811\u88ab\u79f0\u4e3a\u6700\u5c0f\u9ad8\u5ea6\u6811\u3002\u7ed9\u51fa\u8fd9\u6837\u7684\u4e00\u4e2a\u56fe\uff0c\u5199\u51fa\u4e00\u4e2a\u51fd\u6570\u627e\u5230\u6240\u6709\u7684\u6700\u5c0f\u9ad8\u5ea6\u6811\u5e76\u8fd4\u56de\u4ed6\u4eec\u7684\u6839\u8282\u70b9\u3002</p>\n\n<p><strong>\u683c\u5f0f</strong></p>\n\n<p>\u8be5\u56fe\u5305\u542b&nbsp;<code>n</code>&nbsp;\u4e2a\u8282\u70b9\uff0c\u6807\u8bb0\u4e3a&nbsp;<code>0</code>&nbsp;\u5230&nbsp;<code>n - 1</code>\u3002\u7ed9\u5b9a\u6570\u5b57&nbsp;<code>n</code>&nbsp;\u548c\u4e00\u4e2a\u65e0\u5411\u8fb9&nbsp;<code>edges</code>&nbsp;\u5217\u8868\uff08\u6bcf\u4e00\u4e2a\u8fb9\u90fd\u662f\u4e00\u5bf9\u6807\u7b7e\uff09\u3002</p>\n\n<p>\u4f60\u53ef\u4ee5\u5047\u8bbe\u6ca1\u6709\u91cd\u590d\u7684\u8fb9\u4f1a\u51fa\u73b0\u5728&nbsp;<code>edges</code>&nbsp;\u4e2d\u3002\u7531\u4e8e\u6240\u6709\u7684\u8fb9\u90fd\u662f\u65e0\u5411\u8fb9\uff0c <code>[0, 1]</code>\u548c&nbsp;<code>[1, 0]</code>&nbsp;\u662f\u76f8\u540c\u7684\uff0c\u56e0\u6b64\u4e0d\u4f1a\u540c\u65f6\u51fa\u73b0\u5728&nbsp;<code>edges</code>&nbsp;\u91cc\u3002</p>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> <code>n = 4</code>, <code>edges = [[1, 0], [1, 2], [1, 3]]</code>\n\n        0\n        |\n        1\n       / \\\n      2   3 \n\n<strong>\u8f93\u51fa:</strong> <code>[1]</code>\n</pre>\n\n<p><strong>\u793a\u4f8b 2:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> <code>n = 6</code>, <code>edges = [[0, 3], [1, 3], [2, 3], [4, 3], [5, 4]]</code>\n\n     0  1  2\n      \\ | /\n        3\n        |\n        4\n        |\n        5 \n\n<strong>\u8f93\u51fa:</strong> <code>[3, 4]</code></pre>\n\n<p><strong>\u8bf4\u660e</strong>:</p>\n\n<ul>\n\t<li>&nbsp;\u6839\u636e<a href="https://baike.baidu.com/item/%E6%A0%91/2699484?fromtitle=%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84+%E6%A0%91&amp;fromid=12062173&amp;fr=aladdin" target="_blank">\u6811\u7684\u5b9a\u4e49</a>\uff0c\u6811\u662f\u4e00\u4e2a\u65e0\u5411\u56fe\uff0c\u5176\u4e2d\u4efb\u4f55\u4e24\u4e2a\u9876\u70b9\u53ea\u901a\u8fc7\u4e00\u6761\u8def\u5f84\u8fde\u63a5\u3002 \u6362\u53e5\u8bdd\u8bf4\uff0c\u4e00\u4e2a\u4efb\u4f55\u6ca1\u6709\u7b80\u5355\u73af\u8def\u7684\u8fde\u901a\u56fe\u90fd\u662f\u4e00\u68f5\u6811\u3002</li>\n\t<li>\u6811\u7684\u9ad8\u5ea6\u662f\u6307\u6839\u8282\u70b9\u548c\u53f6\u5b50\u8282\u70b9\u4e4b\u95f4\u6700\u957f\u5411\u4e0b\u8def\u5f84\u4e0a\u8fb9\u7684\u6570\u91cf\u3002</li>\n</ul>\n'}}}]);
//# sourceMappingURL=sourceCode-content381.247d48e8.chunk.js.map