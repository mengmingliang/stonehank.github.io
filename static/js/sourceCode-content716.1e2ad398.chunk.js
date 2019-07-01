(window.webpackJsonp=window.webpackJsonp||[]).push([[711],{751:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} prices\n * @param {number} fee\n * @return {number}\n */</span>\n<span class="hljs-comment">// var maxProfit = function(prices, fee) {</span>\n<span class="hljs-comment">//     // if(prices.length&lt;2)return 0</span>\n<span class="hljs-comment">//     // let buy=[0-prices[0]],sell=[0]</span>\n<span class="hljs-comment">//     // let days=prices.length</span>\n<span class="hljs-comment">//     // for(let i=1;i&lt;days;i++){</span>\n<span class="hljs-comment">//     //     buy[i]=Math.max(buy[i-1],sell[i-1]-prices[i])</span>\n<span class="hljs-comment">//     //     sell[i]=Math.max(sell[i-1],buy[i-1]+prices[i]-fee)</span>\n<span class="hljs-comment">//     // }</span>\n<span class="hljs-comment">//     // return sell[sell.length-1]</span>\n    \n<span class="hljs-comment">//     let buy=-prices[0],sell=0,rest=0,</span>\n<span class="hljs-comment">//         prev_buy,prev_sell,prev_rest</span>\n<span class="hljs-comment">//     for(let i=0;i&lt;prices.length;i++){</span>\n<span class="hljs-comment">//         prev_buy=buy;prev_sell=sell;prev_rest=rest</span>\n<span class="hljs-comment">//         buy=Math.max(prev_buy,prev_sell-prices[i],prev_rest-prices[i])</span>\n<span class="hljs-comment">//         sell=prev_buy+prices[i]-fee</span>\n<span class="hljs-comment">//         rest=Math.max(prev_rest,prev_sell)</span>\n<span class="hljs-comment">//     }</span>\n<span class="hljs-comment">//     return Math.max(sell,rest)</span>\n<span class="hljs-comment">// };</span>\n\n<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">maxProfit</span>(<span class="hljs-params">prices,fee</span>)</span>{\n  <span class="hljs-keyword">let</span> prev_sell,prev_buy,prev_rest,\n      sell=<span class="hljs-number">0</span>,buy=-prices[<span class="hljs-number">0</span>],rest=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;prices.length;i++){\n      prev_buy=buy;prev_rest=rest;prev_sell=sell\n      sell=prev_buy+prices[i]-fee\n      buy=<span class="hljs-built_in">Math</span>.max(prev_rest-prices[i],prev_buy,prev_sell-prices[i])\n      rest=<span class="hljs-built_in">Math</span>.max(prev_rest,prev_sell)\n  }\n  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.max(sell,rest)\n}\n</code></pre>\n'],titleSlug:"best-time-to-buy-and-sell-stock-with-transaction-fee",hasThinking:!1,content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u6574\u6570\u6570\u7ec4&nbsp;<code>prices</code>\uff0c\u5176\u4e2d\u7b2c&nbsp;<code>i</code>&nbsp;\u4e2a\u5143\u7d20\u4ee3\u8868\u4e86\u7b2c&nbsp;<code>i</code>&nbsp;\u5929\u7684\u80a1\u7968\u4ef7\u683c \uff1b\u975e\u8d1f\u6574\u6570&nbsp;<code>fee</code> \u4ee3\u8868\u4e86\u4ea4\u6613\u80a1\u7968\u7684\u624b\u7eed\u8d39\u7528\u3002</p>\n\n<p>\u4f60\u53ef\u4ee5\u65e0\u9650\u6b21\u5730\u5b8c\u6210\u4ea4\u6613\uff0c\u4f46\u662f\u4f60\u6bcf\u6b21\u4ea4\u6613\u90fd\u9700\u8981\u4ed8\u624b\u7eed\u8d39\u3002\u5982\u679c\u4f60\u5df2\u7ecf\u8d2d\u4e70\u4e86\u4e00\u4e2a\u80a1\u7968\uff0c\u5728\u5356\u51fa\u5b83\u4e4b\u524d\u4f60\u5c31\u4e0d\u80fd\u518d\u7ee7\u7eed\u8d2d\u4e70\u80a1\u7968\u4e86\u3002</p>\n\n<p>\u8fd4\u56de\u83b7\u5f97\u5229\u6da6\u7684\u6700\u5927\u503c\u3002</p>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> prices = [1, 3, 2, 8, 4, 9], fee = 2\n<strong>\u8f93\u51fa:</strong> 8\n<strong>\u89e3\u91ca:</strong> \u80fd\u591f\u8fbe\u5230\u7684\u6700\u5927\u5229\u6da6:  \n\u5728\u6b64\u5904\u4e70\u5165&nbsp;prices[0] = 1\n\u5728\u6b64\u5904\u5356\u51fa prices[3] = 8\n\u5728\u6b64\u5904\u4e70\u5165 prices[4] = 4\n\u5728\u6b64\u5904\u5356\u51fa prices[5] = 9\n\u603b\u5229\u6da6:&nbsp;((8 - 1) - 2) + ((9 - 4) - 2) = 8.</pre>\n\n<p><strong>\u6ce8\u610f:</strong></p>\n\n<ul>\n\t<li><code>0 &lt; prices.length &lt;= 50000</code>.</li>\n\t<li><code>0 &lt; prices[i] &lt; 50000</code>.</li>\n\t<li><code>0 &lt;= fee &lt; 50000</code>.</li>\n</ul>\n"}}}]);
//# sourceMappingURL=sourceCode-content716.1e2ad398.chunk.js.map