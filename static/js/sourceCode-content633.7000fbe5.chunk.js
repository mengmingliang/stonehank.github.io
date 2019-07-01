(window.webpackJsonp=window.webpackJsonp||[]).push([[619],{668:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number} m\n * @param {number} n\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> uniquePaths = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">m, n</span>) </span>{\n  <span class="hljs-keyword">let</span> dp=<span class="hljs-built_in">Array</span>(m).fill().map(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span><span class="hljs-built_in">Array</span>(n).fill(<span class="hljs-number">0</span>))\n  dp[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>]=<span class="hljs-number">1</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;m;i++){\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;j&lt;n;j++){\n      <span class="hljs-keyword">let</span> count=dp[i][j]\n      <span class="hljs-keyword">if</span>(i&lt;m<span class="hljs-number">-1</span>)dp[i+<span class="hljs-number">1</span>][j]+=count\n      <span class="hljs-keyword">if</span>(j&lt;n<span class="hljs-number">-1</span>)dp[i][j+<span class="hljs-number">1</span>]+=count\n    }\n  }\n  <span class="hljs-keyword">return</span> dp[m<span class="hljs-number">-1</span>][n<span class="hljs-number">-1</span>]\n};\n</code></pre>\n'],titleSlug:"unique-paths",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>DP,<code>dp[i][j]</code>\u8868\u793a\u4ece\u5f00\u59cb\u5230\u5f53\u524d<code>[i,j]</code>\u4f4d\u7f6e\uff0c\u603b\u5171\u6709\u591a\u5c11\u79cd\u4e0d\u540c\u7684\u8def\u5f84\uff1b</p>\n<p>\u5bf9\u4e8e\u6bcf\u4e00\u4e2a<code>dp[i][j]</code>\uff0c\u56e0\u4e3a\u673a\u5668\u4eba\u53ea\u80fd<strong>\u5411\u53f3</strong>\u548c<strong>\u5411\u4e0b</strong>\uff1b</p>\n<p>\u90a3\u4e48\u53f3\u4fa7\u540c\u6837\u4e5f\u80fd\u7ee7\u627f\u5f53\u524d<code>[i,j]</code>\u7684\u8def\u5f84\uff0c\u5373<code>dp[i][j+1]+=dp[i][j]</code>\uff0c\u4e0b\u4fa7\u540c\u7406\uff0c<code>dp[i+1][j]+=dp[i][j]</code>\u3002</p>\n",content:'<p>\u4e00\u4e2a\u673a\u5668\u4eba\u4f4d\u4e8e\u4e00\u4e2a <em>m x n </em>\u7f51\u683c\u7684\u5de6\u4e0a\u89d2 \uff08\u8d77\u59cb\u70b9\u5728\u4e0b\u56fe\u4e2d\u6807\u8bb0\u4e3a&ldquo;Start&rdquo; \uff09\u3002</p>\n\n<p>\u673a\u5668\u4eba\u6bcf\u6b21\u53ea\u80fd\u5411\u4e0b\u6216\u8005\u5411\u53f3\u79fb\u52a8\u4e00\u6b65\u3002\u673a\u5668\u4eba\u8bd5\u56fe\u8fbe\u5230\u7f51\u683c\u7684\u53f3\u4e0b\u89d2\uff08\u5728\u4e0b\u56fe\u4e2d\u6807\u8bb0\u4e3a&ldquo;Finish&rdquo;\uff09\u3002</p>\n\n<p>\u95ee\u603b\u5171\u6709\u591a\u5c11\u6761\u4e0d\u540c\u7684\u8def\u5f84\uff1f</p>\n\n<p><img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/robot_maze.png"></p>\n\n<p><small>\u4f8b\u5982\uff0c\u4e0a\u56fe\u662f\u4e00\u4e2a7 x 3 \u7684\u7f51\u683c\u3002\u6709\u591a\u5c11\u53ef\u80fd\u7684\u8def\u5f84\uff1f</small></p>\n\n<p><strong>\u8bf4\u660e\uff1a</strong><em>m</em>&nbsp;\u548c <em>n </em>\u7684\u503c\u5747\u4e0d\u8d85\u8fc7 100\u3002</p>\n\n<p><strong>\u793a\u4f8b&nbsp;1:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> m = 3, n = 2\n<strong>\u8f93\u51fa:</strong> 3\n<strong>\u89e3\u91ca:</strong>\n\u4ece\u5de6\u4e0a\u89d2\u5f00\u59cb\uff0c\u603b\u5171\u6709 3 \u6761\u8def\u5f84\u53ef\u4ee5\u5230\u8fbe\u53f3\u4e0b\u89d2\u3002\n1. \u5411\u53f3 -&gt; \u5411\u53f3 -&gt; \u5411\u4e0b\n2. \u5411\u53f3 -&gt; \u5411\u4e0b -&gt; \u5411\u53f3\n3. \u5411\u4e0b -&gt; \u5411\u53f3 -&gt; \u5411\u53f3\n</pre>\n\n<p><strong>\u793a\u4f8b&nbsp;2:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> m = 7, n = 3\n<strong>\u8f93\u51fa:</strong> 28</pre>\n'}}}]);
//# sourceMappingURL=sourceCode-content633.7000fbe5.chunk.js.map