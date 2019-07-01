(window.webpackJsonp=window.webpackJsonp||[]).push([[354],{430:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[][]} matrix\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> longestIncreasingPath = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">matrix</span>) </span>{\n  <span class="hljs-keyword">if</span>(matrix.length===<span class="hljs-number">0</span>)<span class="hljs-keyword">return</span> <span class="hljs-number">0</span>\n  <span class="hljs-keyword">let</span> m=matrix.length,n=matrix[<span class="hljs-number">0</span>].length\n  <span class="hljs-keyword">let</span> count=<span class="hljs-built_in">Array</span>(m).fill().map(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span><span class="hljs-built_in">Array</span>(n).fill(<span class="hljs-number">0</span>))\n  <span class="hljs-keyword">let</span> moves=[[<span class="hljs-number">-1</span>,<span class="hljs-number">0</span>],[<span class="hljs-number">1</span>,<span class="hljs-number">0</span>],[<span class="hljs-number">0</span>,<span class="hljs-number">-1</span>],[<span class="hljs-number">0</span>,<span class="hljs-number">1</span>]]\n  <span class="hljs-keyword">let</span> maxLen=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;m;i++){\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;j&lt;n;j++){\n      dfs([i,j])\n      maxLen=<span class="hljs-built_in">Math</span>.max(maxLen,count[i][j])\n    }\n  }\n  <span class="hljs-keyword">return</span> maxLen\n  \n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dfs</span>(<span class="hljs-params">[x,y]</span>)</span>{\n    <span class="hljs-keyword">if</span>(count[x][y]!==<span class="hljs-number">0</span>)<span class="hljs-keyword">return</span> count[x][y]\n    <span class="hljs-keyword">let</span> steps=<span class="hljs-number">1</span>,maxStep=<span class="hljs-number">0</span>\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> [dx,dy] <span class="hljs-keyword">of</span> moves){\n      <span class="hljs-keyword">let</span> nx=dx+x,ny=dy+y\n      <span class="hljs-keyword">if</span>(nx&lt;<span class="hljs-number">0</span> || ny&lt;<span class="hljs-number">0</span> || nx&gt;=m || ny&gt;=n)<span class="hljs-keyword">continue</span>\n      <span class="hljs-keyword">if</span>(matrix[nx][ny]&gt;matrix[x][y]){\n        maxStep=<span class="hljs-built_in">Math</span>.max(maxStep,dfs([nx,ny]))\n      }\n    }\n    count[x][y]=steps+maxStep\n    <span class="hljs-keyword">return</span> steps+maxStep\n  }\n};\n</code></pre>\n'],titleSlug:"longest-increasing-path-in-a-matrix",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u53ea\u9700\u8981\u904d\u5386<code>matrix</code>\uff0c\u7136\u540e\u5bf9\u6bcf\u4e00\u4e2a\u70b9\u6267\u884c<code>dfs</code>\u627e\u5230\u5b83\u7684\u6700\u5927\u9012\u589e\u8def\u5f84\uff0c\u518d\u4f7f\u7528<code>count</code>\u4fdd\u5b58\u7ed3\u679c\uff0c\u5982\u679c\u53d1\u73b0\u5df2\u7ecf\u627e\u5230\u7684\u5219\u76f4\u63a5\u8fd4\u56de\u7ed3\u679c\uff0c\u6700\u540e\u8fd4\u56de<code>count</code>\u91cc\u6700\u5927\u7684\u503c\u3002</p>\n",content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u6574\u6570\u77e9\u9635\uff0c\u627e\u51fa\u6700\u957f\u9012\u589e\u8def\u5f84\u7684\u957f\u5ea6\u3002</p>\n\n<p>\u5bf9\u4e8e\u6bcf\u4e2a\u5355\u5143\u683c\uff0c\u4f60\u53ef\u4ee5\u5f80\u4e0a\uff0c\u4e0b\uff0c\u5de6\uff0c\u53f3\u56db\u4e2a\u65b9\u5411\u79fb\u52a8\u3002 \u4f60\u4e0d\u80fd\u5728\u5bf9\u89d2\u7ebf\u65b9\u5411\u4e0a\u79fb\u52a8\u6216\u79fb\u52a8\u5230\u8fb9\u754c\u5916\uff08\u5373\u4e0d\u5141\u8bb8\u73af\u7ed5\uff09\u3002</p>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<pre><strong>\u8f93\u5165: </strong>nums = \n[\n  [<strong>9</strong>,9,4],\n  [<strong>6</strong>,6,8],\n  [<strong>2</strong>,<strong>1</strong>,1]\n] \n<strong>\u8f93\u51fa:</strong> 4 \n<strong>\u89e3\u91ca:</strong> \u6700\u957f\u9012\u589e\u8def\u5f84\u4e3a&nbsp;<code>[1, 2, 6, 9]</code>\u3002</pre>\n\n<p><strong>\u793a\u4f8b 2:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> nums = \n[\n  [<strong>3</strong>,<strong>4</strong>,<strong>5</strong>],\n  [3,2,<strong>6</strong>],\n  [2,2,1]\n] \n<strong>\u8f93\u51fa: </strong>4 \n<strong>\u89e3\u91ca: </strong>\u6700\u957f\u9012\u589e\u8def\u5f84\u662f&nbsp;<code>[3, 4, 5, 6]</code>\u3002\u6ce8\u610f\u4e0d\u5141\u8bb8\u5728\u5bf9\u89d2\u7ebf\u65b9\u5411\u4e0a\u79fb\u52a8\u3002\n</pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content395.96bbe383.chunk.js.map