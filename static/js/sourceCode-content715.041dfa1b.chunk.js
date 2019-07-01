(window.webpackJsonp=window.webpackJsonp||[]).push([[710],{750:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} nums\n * @param {number} k\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> numSubarrayProductLessThanK = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nums, k</span>) </span>{\n  <span class="hljs-keyword">let</span> sum=<span class="hljs-number">1</span>,res=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">let</span> left=<span class="hljs-number">0</span>,right=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">while</span>(right&lt;nums.length){\n    <span class="hljs-keyword">let</span> cur=nums[right]\n    sum=sum*cur\n    <span class="hljs-keyword">while</span>(left&lt;=right &amp;&amp; sum&gt;=k){\n      sum=sum/nums[left++]\n    }\n    right++\n    res+=right-left\n  }\n  <span class="hljs-keyword">return</span> res\n};\n</code></pre>\n'],titleSlug:"subarray-product-less-than-k",hasThinking:!1,content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u6b63\u6574\u6570\u6570\u7ec4&nbsp;<code>nums</code>\u3002</p>\n\n<p>\u627e\u51fa\u8be5\u6570\u7ec4\u5185\u4e58\u79ef\u5c0f\u4e8e&nbsp;<code>k</code>&nbsp;\u7684\u8fde\u7eed\u7684\u5b50\u6570\u7ec4\u7684\u4e2a\u6570\u3002</p>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> nums = [10,5,2,6], k = 100\n<strong>\u8f93\u51fa:</strong> 8\n<strong>\u89e3\u91ca:</strong> 8\u4e2a\u4e58\u79ef\u5c0f\u4e8e100\u7684\u5b50\u6570\u7ec4\u5206\u522b\u4e3a: [10], [5], [2], [6], [10,5], [5,2], [2,6], [5,2,6]\u3002\n\u9700\u8981\u6ce8\u610f\u7684\u662f [10,5,2] \u5e76\u4e0d\u662f\u4e58\u79ef\u5c0f\u4e8e100\u7684\u5b50\u6570\u7ec4\u3002\n</pre>\n\n<p><strong>\u8bf4\u660e:</strong></p>\n\n<ul>\n\t<li><code>0 &lt; nums.length &lt;= 50000</code></li>\n\t<li><code>0 &lt; nums[i] &lt; 1000</code></li>\n\t<li><code>0 &lt;= k &lt; 10^6</code></li>\n</ul>\n"}}}]);
//# sourceMappingURL=sourceCode-content715.041dfa1b.chunk.js.map