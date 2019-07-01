(window.webpackJsonp=window.webpackJsonp||[]).push([[179],{272:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} prices\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> maxProfit = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">prices</span>) </span>{\n  <span class="hljs-keyword">let</span> sell1=<span class="hljs-number">0</span>,buy1=-prices[<span class="hljs-number">0</span>],sell2=<span class="hljs-number">0</span>,buy2=-prices[<span class="hljs-number">0</span>]\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;prices.length;i++){\n    sell1=<span class="hljs-built_in">Math</span>.max(buy1+prices[i],sell1)\n    buy1=<span class="hljs-built_in">Math</span>.max(buy1,-prices[i])\n    sell2=<span class="hljs-built_in">Math</span>.max(buy2+prices[i],sell2)\n    buy2=<span class="hljs-built_in">Math</span>.max(-prices[i]+sell1,buy2)\n  }\n  <span class="hljs-keyword">return</span> sell2\n};\n</code></pre>\n'],titleSlug:"best-time-to-buy-and-sell-stock-iii",hasThinking:!0,thinking:'<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>DP</p>\n<p>\u65b9\u6cd5\u4e00\uff1a\u7a7a\u95f4\u590d\u6742\u5ea6<code>O(N)</code></p>\n<p><code>dp[i][j]</code>\u8868\u793a\u5728\u7b2c<code>i</code>\u6b21\u4ea4\u6613\u548c\u7b2c<code>j</code>\u5929\u80fd\u83b7\u5f97\u7684\u6700\u5927\u6536\u76ca\u3002</p>\n<p>\u72b6\u6001\u8f6c\u79fb\u65b9\u7a0b\uff1a</p>\n<p><code>dp[i][j]=Math.max(dp[i][j-1],min+p)</code></p>\n<p><code>min=Math.max(min,dp[i-1][j-1]-p)</code></p>\n<p>\u8fd9\u91cc<code>min</code>\u4ee3\u8868\u8d2d\u4e70\u80a1\u7968\u6240\u82b1\u8d39\u7684\u6700\u5927\u503c\uff0c<code>Math.max(min,dp[i-1][j-1]-p)</code>\u610f\u601d\u662f\uff0c\u5bf9\u4e8e\u5f53\u5929\u7684\u80a1\u7968\u4ef7\u683c\uff0c\u8981\u4e48\u4e0d\u8d2d\u4e70\uff0c\u8981\u4e48\u4f7f\u7528\u4e0a\u4e00\u6b21\u7684\u6536\u76ca\u53bb\u8d2d\u4e70\uff0c\u9009\u6700\u5927\u503c\u3002</p>\n<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} prices\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> maxProfit = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">prices</span>) </span>{\n  <span class="hljs-keyword">let</span> N=prices.length\n  <span class="hljs-keyword">let</span> dp=<span class="hljs-built_in">Array</span>(<span class="hljs-number">3</span>).fill().map(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span><span class="hljs-built_in">Array</span>(N+<span class="hljs-number">1</span>).fill(<span class="hljs-number">0</span>))\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">1</span>;i&lt;<span class="hljs-number">3</span>;i++){\n    <span class="hljs-keyword">let</span> min=-<span class="hljs-literal">Infinity</span>\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">1</span>;j&lt;N+<span class="hljs-number">1</span>;j++){\n      <span class="hljs-keyword">let</span> p=prices[j<span class="hljs-number">-1</span>]\n      dp[i][j]=<span class="hljs-built_in">Math</span>.max(dp[i][j<span class="hljs-number">-1</span>],min+p)\n      min=<span class="hljs-built_in">Math</span>.max(min,dp[i<span class="hljs-number">-1</span>][j<span class="hljs-number">-1</span>]-p)\n    }\n  }\n  <span class="hljs-keyword">return</span> dp[<span class="hljs-number">2</span>][N]\n};\n</code></pre>\n<p>\u65b9\u6cd5\u4e8c\uff1a\u7a7a\u95f4\u590d\u6742\u5ea6<code>O(1)</code></p>\n<p><code>buy1</code>\u4ee3\u8868\u7b2c\u4e00\u6b21\u7684\u8d2d\u4e70\u6536\u76ca\uff0c<code>sell1</code>\u4ee3\u8868\u7b2c\u4e00\u6b21\u7684\u5356\u51fa\u6536\u76ca\uff1b</p>\n<p><code>buy2</code>\u4ee3\u8868\u7b2c\u4e8c\u6b21\u7684\u8d2d\u4e70\u6536\u76ca\uff0c<code>sell2</code>\u4ee3\u8868\u7b2c\u4e8c\u6b21\u7684\u5356\u51fa\u6536\u76ca\u3002</p>\n',content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u6570\u7ec4\uff0c\u5b83\u7684\u7b2c<em> i</em> \u4e2a\u5143\u7d20\u662f\u4e00\u652f\u7ed9\u5b9a\u7684\u80a1\u7968\u5728\u7b2c <em>i </em>\u5929\u7684\u4ef7\u683c\u3002</p>\n\n<p>\u8bbe\u8ba1\u4e00\u4e2a\u7b97\u6cd5\u6765\u8ba1\u7b97\u4f60\u6240\u80fd\u83b7\u53d6\u7684\u6700\u5927\u5229\u6da6\u3002\u4f60\u6700\u591a\u53ef\u4ee5\u5b8c\u6210&nbsp;<em>\u4e24\u7b14&nbsp;</em>\u4ea4\u6613\u3002</p>\n\n<p><strong>\u6ce8\u610f:</strong>&nbsp;\u4f60\u4e0d\u80fd\u540c\u65f6\u53c2\u4e0e\u591a\u7b14\u4ea4\u6613\uff08\u4f60\u5fc5\u987b\u5728\u518d\u6b21\u8d2d\u4e70\u524d\u51fa\u552e\u6389\u4e4b\u524d\u7684\u80a1\u7968\uff09\u3002</p>\n\n<p><strong>\u793a\u4f8b&nbsp;1:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> [3,3,5,0,0,3,1,4]\n<strong>\u8f93\u51fa:</strong> 6\n<strong>\u89e3\u91ca:</strong> \u5728\u7b2c 4 \u5929\uff08\u80a1\u7968\u4ef7\u683c = 0\uff09\u7684\u65f6\u5019\u4e70\u5165\uff0c\u5728\u7b2c 6 \u5929\uff08\u80a1\u7968\u4ef7\u683c = 3\uff09\u7684\u65f6\u5019\u5356\u51fa\uff0c\u8fd9\u7b14\u4ea4\u6613\u6240\u80fd\u83b7\u5f97\u5229\u6da6 = 3-0 = 3 \u3002\n&nbsp;    \u968f\u540e\uff0c\u5728\u7b2c 7 \u5929\uff08\u80a1\u7968\u4ef7\u683c = 1\uff09\u7684\u65f6\u5019\u4e70\u5165\uff0c\u5728\u7b2c 8 \u5929 \uff08\u80a1\u7968\u4ef7\u683c = 4\uff09\u7684\u65f6\u5019\u5356\u51fa\uff0c\u8fd9\u7b14\u4ea4\u6613\u6240\u80fd\u83b7\u5f97\u5229\u6da6 = 4-1 = 3 \u3002</pre>\n\n<p><strong>\u793a\u4f8b 2:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> [1,2,3,4,5]\n<strong>\u8f93\u51fa:</strong> 4\n<strong>\u89e3\u91ca:</strong> \u5728\u7b2c 1 \u5929\uff08\u80a1\u7968\u4ef7\u683c = 1\uff09\u7684\u65f6\u5019\u4e70\u5165\uff0c\u5728\u7b2c 5 \u5929 \uff08\u80a1\u7968\u4ef7\u683c = 5\uff09\u7684\u65f6\u5019\u5356\u51fa, \u8fd9\u7b14\u4ea4\u6613\u6240\u80fd\u83b7\u5f97\u5229\u6da6 = 5-1 = 4 \u3002 &nbsp; \n&nbsp;    \u6ce8\u610f\u4f60\u4e0d\u80fd\u5728\u7b2c 1 \u5929\u548c\u7b2c 2 \u5929\u63a5\u8fde\u8d2d\u4e70\u80a1\u7968\uff0c\u4e4b\u540e\u518d\u5c06\u5b83\u4eec\u5356\u51fa\u3002 &nbsp; \n&nbsp;    \u56e0\u4e3a\u8fd9\u6837\u5c5e\u4e8e\u540c\u65f6\u53c2\u4e0e\u4e86\u591a\u7b14\u4ea4\u6613\uff0c\u4f60\u5fc5\u987b\u5728\u518d\u6b21\u8d2d\u4e70\u524d\u51fa\u552e\u6389\u4e4b\u524d\u7684\u80a1\u7968\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 3:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> [7,6,4,3,1] \n<strong>\u8f93\u51fa:</strong> 0 \n<strong>\u89e3\u91ca:</strong> \u5728\u8fd9\u4e2a\u60c5\u51b5\u4e0b, \u6ca1\u6709\u4ea4\u6613\u5b8c\u6210, \u6240\u4ee5\u6700\u5927\u5229\u6da6\u4e3a 0\u3002</pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content237.8d1127f6.chunk.js.map