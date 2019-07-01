(window.webpackJsonp=window.webpackJsonp||[]).push([[320],{399:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[][]} board\n * @return {void} Do not return anything, modify board in-place instead.\n */</span>\n<span class="hljs-keyword">var</span> gameOfLife = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">board</span>) </span>{\n  <span class="hljs-comment">// \u53d1\u751f\u53d8\u53160,1 -&gt;  4,5</span>\n  <span class="hljs-keyword">let</span> m=board.length,n=board[<span class="hljs-number">0</span>].length\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;m;i++){\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;j&lt;n;j++){\n      <span class="hljs-keyword">let</span> cur=board[i][j]\n      <span class="hljs-keyword">let</span> live=<span class="hljs-number">0</span>\n      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> k=<span class="hljs-number">-1</span>;k&lt;=<span class="hljs-number">1</span>;k++){\n        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> l=<span class="hljs-number">-1</span>;l&lt;=<span class="hljs-number">1</span>;l++){\n          <span class="hljs-keyword">if</span>(k===<span class="hljs-number">0</span> &amp;&amp; l===<span class="hljs-number">0</span>)<span class="hljs-keyword">continue</span>\n          <span class="hljs-keyword">let</span> nx=i+k,ny=j+l\n          <span class="hljs-keyword">if</span>(nx&lt;<span class="hljs-number">0</span> || ny&lt;<span class="hljs-number">0</span> || nx&gt;=m || ny&gt;=n)<span class="hljs-keyword">continue</span>\n          <span class="hljs-keyword">let</span> adj=board[nx][ny]\n          <span class="hljs-keyword">if</span>(isLive(adj))live++\n        }\n      }\n      <span class="hljs-keyword">if</span>(isLive(cur)){\n        <span class="hljs-keyword">if</span>(live&lt;<span class="hljs-number">2</span> || live&gt;<span class="hljs-number">3</span>)board[i][j]=<span class="hljs-number">5</span>\n      }<span class="hljs-keyword">else</span>{\n        <span class="hljs-keyword">if</span>(live===<span class="hljs-number">3</span>)board[i][j]=<span class="hljs-number">4</span>\n      }\n    }\n  }\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;m;i++){\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;j&lt;n;j++){\n      <span class="hljs-keyword">if</span>(board[i][j]===<span class="hljs-number">4</span>)board[i][j]=<span class="hljs-number">1</span>\n      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(board[i][j]===<span class="hljs-number">5</span>)board[i][j]=<span class="hljs-number">0</span>\n    }\n  }\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isLive</span>(<span class="hljs-params">num</span>)</span>{\n    <span class="hljs-keyword">if</span>(num===<span class="hljs-number">1</span> || num===<span class="hljs-number">5</span>)<span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>\n    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>\n  }\n};\n</code></pre>\n'],titleSlug:"game-of-life",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u7531\u4e8e\u662f\u539f\u5730\u4fee\u6539\uff0c\u6211\u4eec\u5c06\u672c\u8f6e\u53d8\u5316\u7684<code>0</code>\u4fee\u6539\u6210<code>4</code>\uff0c\u53d8\u5316\u7684<code>1</code>\u4fee\u6539\u6210<code>5</code>\uff0c\u81f3\u4e8e\u539f\u56e0\uff0c\u56e0\u4e3a\u6bcf\u4e00\u8f6e\u6211\u4eec\u5bf9\u6bcf\u4e00\u4e2a<code>0</code>\u548c<code>1</code>\u90fd\u8981\u67e5\u770b\uff0c\n\u5982\u679c\u4fee\u6539\u540e\u8fd8\u662f<code>0</code>\u548c<code>1</code>\uff0c\u5c06\u4f1a\u9700\u8981\u66f4\u52a0\u590d\u6742\u7684\u5206\u8fa8\uff0c\u624d\u80fd\u4e0d\u91cd\u590d\u4fee\u6539\u3002</p>\n<p>\u6bcf\u4e00\u8f6e\u4fee\u6539\u5b8c\u6bd5\u540e\uff0c\u5bf9\u6240\u6709\u7684<code>4</code>\u548c<code>5</code>\u8c03\u56de<code>0</code>\u548c<code>1</code>\u3002</p>\n<p>\u601d\u8def\u4e86\u89e3\u540e\uff0c\u5269\u4e0b\u7684\u5c31\u662f\u7b80\u5355\u7684\u67e5\u8be2\u6bcf\u4e00\u4e2a\u683c\u7684\u5468\u56f4<code>8</code>\u4e2a\u65b9\u5411\u7684\u6570\u636e\uff0c\u5728\u5224\u65ad\u5f53\u524d\u683c\u5b50\u662f<code>live</code>\u8fd8\u662f<code>dead</code>\u3002</p>\n",content:'<p>\u6839\u636e<a href="https://baike.baidu.com/item/%E7%94%9F%E5%91%BD%E6%B8%B8%E6%88%8F/2926434?fr=aladdin" target="_blank">\u767e\u5ea6\u767e\u79d1</a>\uff0c\u751f\u547d\u6e38\u620f\uff0c\u7b80\u79f0\u4e3a\u751f\u547d\uff0c\u662f\u82f1\u56fd\u6570\u5b66\u5bb6\u7ea6\u7ff0&middot;\u4f55\u987f&middot;\u5eb7\u5a01\u57281970\u5e74\u53d1\u660e\u7684\u7ec6\u80de\u81ea\u52a8\u673a\u3002</p>\n\n<p>\u7ed9\u5b9a\u4e00\u4e2a\u5305\u542b m &times; n \u4e2a\u683c\u5b50\u7684\u9762\u677f\uff0c\u6bcf\u4e00\u4e2a\u683c\u5b50\u90fd\u53ef\u4ee5\u770b\u6210\u662f\u4e00\u4e2a\u7ec6\u80de\u3002\u6bcf\u4e2a\u7ec6\u80de\u5177\u6709\u4e00\u4e2a\u521d\u59cb\u72b6\u6001 <em>live</em>\uff081\uff09\u5373\u4e3a\u6d3b\u7ec6\u80de\uff0c \u6216 <em>dead</em>\uff080\uff09\u5373\u4e3a\u6b7b\u7ec6\u80de\u3002\u6bcf\u4e2a\u7ec6\u80de\u4e0e\u5176\u516b\u4e2a\u76f8\u90bb\u4f4d\u7f6e\uff08\u6c34\u5e73\uff0c\u5782\u76f4\uff0c\u5bf9\u89d2\u7ebf\uff09\u7684\u7ec6\u80de\u90fd\u9075\u5faa\u4ee5\u4e0b\u56db\u6761\u751f\u5b58\u5b9a\u5f8b\uff1a</p>\n\n<ol>\n\t<li>\u5982\u679c\u6d3b\u7ec6\u80de\u5468\u56f4\u516b\u4e2a\u4f4d\u7f6e\u7684\u6d3b\u7ec6\u80de\u6570\u5c11\u4e8e\u4e24\u4e2a\uff0c\u5219\u8be5\u4f4d\u7f6e\u6d3b\u7ec6\u80de\u6b7b\u4ea1\uff1b</li>\n\t<li>\u5982\u679c\u6d3b\u7ec6\u80de\u5468\u56f4\u516b\u4e2a\u4f4d\u7f6e\u6709\u4e24\u4e2a\u6216\u4e09\u4e2a\u6d3b\u7ec6\u80de\uff0c\u5219\u8be5\u4f4d\u7f6e\u6d3b\u7ec6\u80de\u4ecd\u7136\u5b58\u6d3b\uff1b</li>\n\t<li>\u5982\u679c\u6d3b\u7ec6\u80de\u5468\u56f4\u516b\u4e2a\u4f4d\u7f6e\u6709\u8d85\u8fc7\u4e09\u4e2a\u6d3b\u7ec6\u80de\uff0c\u5219\u8be5\u4f4d\u7f6e\u6d3b\u7ec6\u80de\u6b7b\u4ea1\uff1b</li>\n\t<li>\u5982\u679c\u6b7b\u7ec6\u80de\u5468\u56f4\u6b63\u597d\u6709\u4e09\u4e2a\u6d3b\u7ec6\u80de\uff0c\u5219\u8be5\u4f4d\u7f6e\u6b7b\u7ec6\u80de\u590d\u6d3b\uff1b</li>\n</ol>\n\n<p>\u6839\u636e\u5f53\u524d\u72b6\u6001\uff0c\u5199\u4e00\u4e2a\u51fd\u6570\u6765\u8ba1\u7b97\u9762\u677f\u4e0a\u7ec6\u80de\u7684\u4e0b\u4e00\u4e2a\uff08\u4e00\u6b21\u66f4\u65b0\u540e\u7684\uff09\u72b6\u6001\u3002\u4e0b\u4e00\u4e2a\u72b6\u6001\u662f\u901a\u8fc7\u5c06\u4e0a\u8ff0\u89c4\u5219\u540c\u65f6\u5e94\u7528\u4e8e\u5f53\u524d\u72b6\u6001\u4e0b\u7684\u6bcf\u4e2a\u7ec6\u80de\u6240\u5f62\u6210\u7684\uff0c\u5176\u4e2d\u7ec6\u80de\u7684\u51fa\u751f\u548c\u6b7b\u4ea1\u662f\u540c\u65f6\u53d1\u751f\u7684\u3002</p>\n\n<p><strong>\u793a\u4f8b:</strong></p>\n\n<pre><strong>\u8f93\u5165: \n</strong>[\n&nbsp; [0,1,0],\n&nbsp; [0,0,1],\n&nbsp; [1,1,1],\n&nbsp; [0,0,0]\n]\n<strong>\u8f93\u51fa: \n</strong>[\n&nbsp; [0,0,0],\n&nbsp; [1,0,1],\n&nbsp; [0,1,1],\n&nbsp; [0,1,0]\n]</pre>\n\n<p><strong>\u8fdb\u9636:</strong></p>\n\n<ul>\n\t<li>\u4f60\u53ef\u4ee5\u4f7f\u7528\u539f\u5730\u7b97\u6cd5\u89e3\u51b3\u672c\u9898\u5417\uff1f\u8bf7\u6ce8\u610f\uff0c\u9762\u677f\u4e0a\u6240\u6709\u683c\u5b50\u9700\u8981\u540c\u65f6\u88ab\u66f4\u65b0\uff1a\u4f60\u4e0d\u80fd\u5148\u66f4\u65b0\u67d0\u4e9b\u683c\u5b50\uff0c\u7136\u540e\u4f7f\u7528\u5b83\u4eec\u7684\u66f4\u65b0\u540e\u7684\u503c\u518d\u66f4\u65b0\u5176\u4ed6\u683c\u5b50\u3002</li>\n\t<li>\u672c\u9898\u4e2d\uff0c\u6211\u4eec\u4f7f\u7528\u4e8c\u7ef4\u6570\u7ec4\u6765\u8868\u793a\u9762\u677f\u3002\u539f\u5219\u4e0a\uff0c\u9762\u677f\u662f\u65e0\u9650\u7684\uff0c\u4f46\u5f53\u6d3b\u7ec6\u80de\u4fb5\u5360\u4e86\u9762\u677f\u8fb9\u754c\u65f6\u4f1a\u9020\u6210\u95ee\u9898\u3002\u4f60\u5c06\u5982\u4f55\u89e3\u51b3\u8fd9\u4e9b\u95ee\u9898\uff1f</li>\n</ul>\n'}}}]);
//# sourceMappingURL=sourceCode-content364.698323d3.chunk.js.map