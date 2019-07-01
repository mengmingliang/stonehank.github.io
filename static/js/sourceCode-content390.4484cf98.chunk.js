(window.webpackJsonp=window.webpackJsonp||[]).push([[349],{425:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} coins\n * @param {number} amount\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> coinChange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">coins, amount</span>) </span>{\n  <span class="hljs-keyword">if</span>(amount===<span class="hljs-number">0</span>)<span class="hljs-keyword">return</span> <span class="hljs-number">0</span>\n  <span class="hljs-keyword">let</span> dp=<span class="hljs-built_in">Array</span>(amount+<span class="hljs-number">1</span>).fill(<span class="hljs-literal">Infinity</span>)\n  dp[<span class="hljs-number">0</span>]=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;dp.length;i++){\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;j&lt;coins.length;j++){\n      <span class="hljs-keyword">if</span>(i&lt;coins[j])<span class="hljs-keyword">continue</span>\n      dp[i]=<span class="hljs-built_in">Math</span>.min(dp[i-coins[j]]+<span class="hljs-number">1</span>,dp[i])\n    }\n  }\n  <span class="hljs-keyword">return</span> dp[amount]===<span class="hljs-literal">Infinity</span> ? <span class="hljs-number">-1</span> : dp[amount]\n};\n</code></pre>\n'],titleSlug:"coin-change",hasThinking:!1,content:"<p>\u7ed9\u5b9a\u4e0d\u540c\u9762\u989d\u7684\u786c\u5e01 coins \u548c\u4e00\u4e2a\u603b\u91d1\u989d amount\u3002\u7f16\u5199\u4e00\u4e2a\u51fd\u6570\u6765\u8ba1\u7b97\u53ef\u4ee5\u51d1\u6210\u603b\u91d1\u989d\u6240\u9700\u7684\u6700\u5c11\u7684\u786c\u5e01\u4e2a\u6570\u3002\u5982\u679c\u6ca1\u6709\u4efb\u4f55\u4e00\u79cd\u786c\u5e01\u7ec4\u5408\u80fd\u7ec4\u6210\u603b\u91d1\u989d\uff0c\u8fd4\u56de&nbsp;<code>-1</code>\u3002</p>\n\n<p><strong>\u793a\u4f8b&nbsp;1:</strong></p>\n\n<pre><strong>\u8f93\u5165: </strong>coins = <code>[1, 2, 5]</code>, amount = <code>11</code>\n<strong>\u8f93\u51fa: </strong><code>3</code> \n<strong>\u89e3\u91ca:</strong> 11 = 5 + 5 + 1</pre>\n\n<p><strong>\u793a\u4f8b 2:</strong></p>\n\n<pre><strong>\u8f93\u5165: </strong>coins = <code>[2]</code>, amount = <code>3</code>\n<strong>\u8f93\u51fa: </strong>-1</pre>\n\n<p><strong>\u8bf4\u660e</strong>:<br>\n\u4f60\u53ef\u4ee5\u8ba4\u4e3a\u6bcf\u79cd\u786c\u5e01\u7684\u6570\u91cf\u662f\u65e0\u9650\u7684\u3002</p>\n"}}}]);
//# sourceMappingURL=sourceCode-content390.4484cf98.chunk.js.map