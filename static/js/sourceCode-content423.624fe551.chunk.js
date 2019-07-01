(window.webpackJsonp=window.webpackJsonp||[]).push([[386],{458:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} nums\n * @return {number[]}\n */</span>\n<span class="hljs-keyword">var</span> largestDivisibleSubset = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nums</span>) </span>{\n  nums.sort(<span class="hljs-function">(<span class="hljs-params">a,b</span>)=&gt;</span>a-b)\n  <span class="hljs-keyword">if</span>(nums.length===<span class="hljs-number">0</span>)<span class="hljs-keyword">return</span> []\n  <span class="hljs-keyword">let</span> dp=[]\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;nums.length;i++){\n    dp[i]=[<span class="hljs-number">0</span>,<span class="hljs-string">\'\'</span>+nums[i]]\n  }\n  dp[<span class="hljs-number">0</span>]=[<span class="hljs-number">0</span>,<span class="hljs-string">\'\'</span>+nums[<span class="hljs-number">0</span>]]\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">1</span>;i&lt;nums.length;i++){\n    <span class="hljs-keyword">let</span> cur=nums[i]\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;j&lt;i;j++){\n      <span class="hljs-keyword">if</span>(cur % nums[j]===<span class="hljs-number">0</span> || nums[j] % cur===<span class="hljs-number">0</span>){\n        <span class="hljs-keyword">if</span>(dp[i][<span class="hljs-number">0</span>]&lt;dp[j][<span class="hljs-number">0</span>]+<span class="hljs-number">1</span>){\n          dp[i][<span class="hljs-number">0</span>]=dp[j][<span class="hljs-number">0</span>]+<span class="hljs-number">1</span>\n          dp[i][<span class="hljs-number">1</span>]=dp[j][<span class="hljs-number">1</span>]+<span class="hljs-string">\'-\'</span>+cur\n        }\n      }\n    }\n  }\n  <span class="hljs-comment">// console.log(dp)</span>\n  <span class="hljs-keyword">let</span> max=<span class="hljs-number">0</span>,maxV=nums[<span class="hljs-number">0</span>]+<span class="hljs-string">\'\'</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;dp.length;i++){\n    <span class="hljs-keyword">if</span>(dp[i][<span class="hljs-number">0</span>]&gt;max){\n      max=dp[i][<span class="hljs-number">0</span>]\n      maxV=dp[i][<span class="hljs-number">1</span>]\n    }\n  }\n  <span class="hljs-keyword">return</span> maxV.split(<span class="hljs-string">\'-\'</span>)\n};\n</code></pre>\n'],titleSlug:"largest-divisible-subset",hasThinking:!1,content:"<p>\u7ed9\u51fa\u4e00\u4e2a\u7531<strong>\u65e0\u91cd\u590d\u7684</strong>\u6b63\u6574\u6570\u7ec4\u6210\u7684\u96c6\u5408\uff0c\u627e\u51fa\u5176\u4e2d\u6700\u5927\u7684\u6574\u9664\u5b50\u96c6\uff0c\u5b50\u96c6\u4e2d\u4efb\u610f\u4e00\u5bf9 (S<sub>i\uff0c</sub>S<sub>j</sub>) \u90fd\u8981\u6ee1\u8db3\uff1aS<sub>i</sub> % S<sub>j</sub> = 0 \u6216 S<sub>j</sub> % S<sub>i</sub> = 0\u3002</p>\n\n<p>\u5982\u679c\u6709\u591a\u4e2a\u76ee\u6807\u5b50\u96c6\uff0c\u8fd4\u56de\u5176\u4e2d\u4efb\u4f55\u4e00\u4e2a\u5747\u53ef\u3002</p>\n\n<p>&nbsp;</p>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> [1,2,3]\n<strong>\u8f93\u51fa:</strong> [1,2] (\u5f53\u7136, [1,3] \u4e5f\u6b63\u786e)\n</pre>\n\n<p><strong>\u793a\u4f8b 2:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> [1,2,4,8]\n<strong>\u8f93\u51fa:</strong> [1,2,4,8]\n</pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content423.624fe551.chunk.js.map