(window.webpackJsonp=window.webpackJsonp||[]).push([[188],{280:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {character[][]} board\n * @return {void} Do not return anything, modify board in-place instead.\n */</span>\n<span class="hljs-keyword">var</span> solve = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">board</span>) </span>{\n  <span class="hljs-keyword">if</span>(board.length===<span class="hljs-number">0</span>)<span class="hljs-keyword">return</span>\n  <span class="hljs-keyword">let</span> m=board.length,n=board[<span class="hljs-number">0</span>].length\n  <span class="hljs-keyword">let</span> moves=[[<span class="hljs-number">-1</span>,<span class="hljs-number">0</span>],[<span class="hljs-number">1</span>,<span class="hljs-number">0</span>],[<span class="hljs-number">0</span>,<span class="hljs-number">-1</span>],[<span class="hljs-number">0</span>,<span class="hljs-number">1</span>]]\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dfs</span>(<span class="hljs-params">[x,y]</span>)</span>{\n    board[x][y]=<span class="hljs-string">"S"</span>\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> [dx,dy] <span class="hljs-keyword">of</span> moves){\n      <span class="hljs-keyword">let</span> nx=x+dx,ny=y+dy\n      <span class="hljs-keyword">if</span>(nx&lt;<span class="hljs-number">0</span> || ny&lt;<span class="hljs-number">0</span> || nx&gt;=m || ny&gt;=n)<span class="hljs-keyword">continue</span>\n      <span class="hljs-keyword">if</span>(board[nx][ny]!==<span class="hljs-string">"O"</span>)<span class="hljs-keyword">continue</span>\n      dfs([nx,ny])\n    }\n  }\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;m;i++){\n    <span class="hljs-keyword">if</span>(board[i][<span class="hljs-number">0</span>]===<span class="hljs-string">"O"</span>)dfs([i,<span class="hljs-number">0</span>])\n    <span class="hljs-keyword">if</span>(board[i][n<span class="hljs-number">-1</span>]===<span class="hljs-string">"O"</span>)dfs([i,n<span class="hljs-number">-1</span>])\n  }\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">1</span>;i&lt;n<span class="hljs-number">-1</span>;i++){\n    <span class="hljs-keyword">if</span>(board[<span class="hljs-number">0</span>][i]===<span class="hljs-string">"O"</span>)dfs([<span class="hljs-number">0</span>,i])\n    <span class="hljs-keyword">if</span>(board[m<span class="hljs-number">-1</span>][i]===<span class="hljs-string">"O"</span>)dfs([m<span class="hljs-number">-1</span>,i])    \n  }\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;m;i++){\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;j&lt;n;j++){\n      <span class="hljs-keyword">if</span>(board[i][j]===<span class="hljs-string">"O"</span>)board[i][j]=<span class="hljs-string">"X"</span>\n      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(board[i][j]===<span class="hljs-string">"S"</span>)board[i][j]=<span class="hljs-string">"O"</span>\n    }\n  }\n};\n</code></pre>\n'],titleSlug:"surrounded-regions",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u9898\u76ee\u4e5f\u7ed9\u4e86\u63d0\u793a\uff0c\u53ea\u9700\u8981\u5bf9\u8fb9\u4e0a\u7684<code>O</code>\u8fdb\u884c<code>dfs</code>\u904d\u5386\uff0c\u627e\u51fa\u6240\u6709\u548c\u5b83\u76f8\u8fde\u7684<code>O</code>\uff0c\u6539\u53d8\u4e3a<code>S</code>\u3002</p>\n<p>\u6700\u540e\u518d\u5c06\u6240\u6709\u7684<code>O</code>\u6539\u53d8\u4e3a<code>X</code>\uff0c\u5c06\u6240\u6709\u7684<code>S</code>\u6539\u53d8\u4e3a<code>O</code>\u3002</p>\n",content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u4e8c\u7ef4\u7684\u77e9\u9635\uff0c\u5305\u542b&nbsp;<code>&#39;X&#39;</code>&nbsp;\u548c&nbsp;<code>&#39;O&#39;</code>\uff08<strong>\u5b57\u6bcd O</strong>\uff09\u3002</p>\n\n<p>\u627e\u5230\u6240\u6709\u88ab <code>&#39;X&#39;</code> \u56f4\u7ed5\u7684\u533a\u57df\uff0c\u5e76\u5c06\u8fd9\u4e9b\u533a\u57df\u91cc\u6240\u6709\u7684&nbsp;<code>&#39;O&#39;</code> \u7528 <code>&#39;X&#39;</code> \u586b\u5145\u3002</p>\n\n<p><strong>\u793a\u4f8b:</strong></p>\n\n<pre>X X X X\nX O O X\nX X O X\nX O X X\n</pre>\n\n<p>\u8fd0\u884c\u4f60\u7684\u51fd\u6570\u540e\uff0c\u77e9\u9635\u53d8\u4e3a\uff1a</p>\n\n<pre>X X X X\nX X X X\nX X X X\nX O X X\n</pre>\n\n<p><strong>\u89e3\u91ca:</strong></p>\n\n<p>\u88ab\u56f4\u7ed5\u7684\u533a\u95f4\u4e0d\u4f1a\u5b58\u5728\u4e8e\u8fb9\u754c\u4e0a\uff0c\u6362\u53e5\u8bdd\u8bf4\uff0c\u4efb\u4f55\u8fb9\u754c\u4e0a\u7684&nbsp;<code>&#39;O&#39;</code>&nbsp;\u90fd\u4e0d\u4f1a\u88ab\u586b\u5145\u4e3a&nbsp;<code>&#39;X&#39;</code>\u3002 \u4efb\u4f55\u4e0d\u5728\u8fb9\u754c\u4e0a\uff0c\u6216\u4e0d\u4e0e\u8fb9\u754c\u4e0a\u7684&nbsp;<code>&#39;O&#39;</code>&nbsp;\u76f8\u8fde\u7684&nbsp;<code>&#39;O&#39;</code>&nbsp;\u6700\u7ec8\u90fd\u4f1a\u88ab\u586b\u5145\u4e3a&nbsp;<code>&#39;X&#39;</code>\u3002\u5982\u679c\u4e24\u4e2a\u5143\u7d20\u5728\u6c34\u5e73\u6216\u5782\u76f4\u65b9\u5411\u76f8\u90bb\uff0c\u5219\u79f0\u5b83\u4eec\u662f&ldquo;\u76f8\u8fde&rdquo;\u7684\u3002</p>\n"}}}]);
//# sourceMappingURL=sourceCode-content245.cbbd1b39.chunk.js.map