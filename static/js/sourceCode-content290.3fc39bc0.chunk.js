(window.webpackJsonp=window.webpackJsonp||[]).push([[238],{325:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number} k\n * @param {number[]} prices\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> maxProfit = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">k, prices</span>) </span>{\n  <span class="hljs-keyword">if</span>(prices.length===<span class="hljs-number">0</span>)<span class="hljs-keyword">return</span> <span class="hljs-number">0</span>\n  <span class="hljs-keyword">if</span>(k&gt;<span class="hljs-built_in">Math</span>.ceil(prices.length/<span class="hljs-number">2</span>)){\n    <span class="hljs-keyword">return</span> nolimitK(prices)\n  }\n  <span class="hljs-keyword">let</span> dp=[]\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;k+<span class="hljs-number">1</span>;i++){\n    dp[i]=[]\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;j&lt;prices.length;j++){\n      dp[i][j]=<span class="hljs-number">0</span>\n    }\n  }\n  \n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">1</span>;i&lt;dp.length;i++){\n    <span class="hljs-keyword">let</span> prefix=-prices[<span class="hljs-number">0</span>]\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">1</span>;j&lt;dp[i].length;j++){\n      dp[i][j]=<span class="hljs-built_in">Math</span>.max(dp[i][j<span class="hljs-number">-1</span>],prices[j]+prefix)\n      prefix=<span class="hljs-built_in">Math</span>.max(dp[i<span class="hljs-number">-1</span>][j<span class="hljs-number">-1</span>]-prices[j],prefix)\n    }\n  }\n  <span class="hljs-comment">// console.log(dp)</span>\n  <span class="hljs-keyword">return</span> dp[dp.length<span class="hljs-number">-1</span>][dp[<span class="hljs-number">0</span>].length<span class="hljs-number">-1</span>]\n  \n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">nolimitK</span>(<span class="hljs-params">prices</span>)</span>{\n    <span class="hljs-keyword">let</span> profit=<span class="hljs-number">0</span>\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">1</span>;i&lt;prices.length;i++){\n      <span class="hljs-keyword">if</span>(prices[i]-prices[i<span class="hljs-number">-1</span>]&gt;<span class="hljs-number">0</span>)profit+=prices[i]-prices[i<span class="hljs-number">-1</span>]\n    }\n    <span class="hljs-keyword">return</span> profit\n  }\n};\n</code></pre>\n'],titleSlug:"best-time-to-buy-and-sell-stock-iv",hasThinking:!1,content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u6570\u7ec4\uff0c\u5b83\u7684\u7b2c<em> i</em> \u4e2a\u5143\u7d20\u662f\u4e00\u652f\u7ed9\u5b9a\u7684\u80a1\u7968\u5728\u7b2c <em>i </em>\u5929\u7684\u4ef7\u683c\u3002</p>\n\n<p>\u8bbe\u8ba1\u4e00\u4e2a\u7b97\u6cd5\u6765\u8ba1\u7b97\u4f60\u6240\u80fd\u83b7\u53d6\u7684\u6700\u5927\u5229\u6da6\u3002\u4f60\u6700\u591a\u53ef\u4ee5\u5b8c\u6210 <strong>k</strong> \u7b14\u4ea4\u6613\u3002</p>\n\n<p><strong>\u6ce8\u610f:</strong>&nbsp;\u4f60\u4e0d\u80fd\u540c\u65f6\u53c2\u4e0e\u591a\u7b14\u4ea4\u6613\uff08\u4f60\u5fc5\u987b\u5728\u518d\u6b21\u8d2d\u4e70\u524d\u51fa\u552e\u6389\u4e4b\u524d\u7684\u80a1\u7968\uff09\u3002</p>\n\n<p><strong>\u793a\u4f8b&nbsp;1:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> [2,4,1], k = 2\n<strong>\u8f93\u51fa:</strong> 2\n<strong>\u89e3\u91ca:</strong> \u5728\u7b2c 1 \u5929 (\u80a1\u7968\u4ef7\u683c = 2) \u7684\u65f6\u5019\u4e70\u5165\uff0c\u5728\u7b2c 2 \u5929 (\u80a1\u7968\u4ef7\u683c = 4) \u7684\u65f6\u5019\u5356\u51fa\uff0c\u8fd9\u7b14\u4ea4\u6613\u6240\u80fd\u83b7\u5f97\u5229\u6da6 = 4-2 = 2 \u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 2:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> [3,2,6,5,0,3], k = 2\n<strong>\u8f93\u51fa:</strong> 7\n<strong>\u89e3\u91ca:</strong> \u5728\u7b2c 2 \u5929 (\u80a1\u7968\u4ef7\u683c = 2) \u7684\u65f6\u5019\u4e70\u5165\uff0c\u5728\u7b2c 3 \u5929 (\u80a1\u7968\u4ef7\u683c = 6) \u7684\u65f6\u5019\u5356\u51fa, \u8fd9\u7b14\u4ea4\u6613\u6240\u80fd\u83b7\u5f97\u5229\u6da6 = 6-2 = 4 \u3002\n&nbsp;    \u968f\u540e\uff0c\u5728\u7b2c 5 \u5929 (\u80a1\u7968\u4ef7\u683c = 0) \u7684\u65f6\u5019\u4e70\u5165\uff0c\u5728\u7b2c 6 \u5929 (\u80a1\u7968\u4ef7\u683c = 3) \u7684\u65f6\u5019\u5356\u51fa, \u8fd9\u7b14\u4ea4\u6613\u6240\u80fd\u83b7\u5f97\u5229\u6da6 = 3-0 = 3 \u3002\n</pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content290.3fc39bc0.chunk.js.map