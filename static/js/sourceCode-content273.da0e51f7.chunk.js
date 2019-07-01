(window.webpackJsonp=window.webpackJsonp||[]).push([[219],{308:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> threeSumClosest = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nums, target</span>) </span>{\n  nums.sort(<span class="hljs-function">(<span class="hljs-params">a,b</span>)=&gt;</span>a-b)\n  <span class="hljs-keyword">let</span> result=<span class="hljs-literal">null</span>\n  <span class="hljs-keyword">let</span> min=<span class="hljs-literal">Infinity</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> fix=<span class="hljs-number">0</span>;fix&lt;nums.length<span class="hljs-number">-2</span>;fix++){\n    <span class="hljs-keyword">let</span> left=fix+<span class="hljs-number">1</span>,right=nums.length<span class="hljs-number">-1</span>\n    <span class="hljs-keyword">let</span> sum\n    <span class="hljs-keyword">while</span>(left&lt;right){\n      sum=nums[fix]+nums[left]+nums[right]\n      <span class="hljs-keyword">if</span>(<span class="hljs-built_in">Math</span>.abs(sum-target)&lt;min){\n        min=<span class="hljs-built_in">Math</span>.abs(sum-target)\n        <span class="hljs-keyword">if</span>(min===<span class="hljs-number">0</span>)<span class="hljs-keyword">return</span> target\n        result=sum\n      }\n      <span class="hljs-keyword">if</span>(sum&gt;target)right--\n      <span class="hljs-keyword">else</span> left++\n    }\n  }\n  <span class="hljs-keyword">return</span> result\n};\n</code></pre>\n'],titleSlug:"3sum-closest",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u548c<code>NO.15</code>\u57fa\u672c\u4e00\u6837\u7684\u65b9\u5f0f\uff0c\u76f8\u5dee\u5728\u4e8e\uff1a</p>\n<ol>\n<li>\u4e0d\u9700\u8981\u53bb\u91cd\u3002</li>\n<li>\u4e0d\u9700\u8981\u5b8c\u5168\u76f8\u7b49\uff0c\u800c\u662f\u6bd4\u8f83\u5f53\u524d<code>sum</code>\u548c<code>target</code>\u7684\u7edd\u5bf9\u503c\u7684\u5dee\u3002</li>\n</ol>\n",content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u5305\u62ec&nbsp;<em>n</em> \u4e2a\u6574\u6570\u7684\u6570\u7ec4&nbsp;<code>nums</code><em>&nbsp;</em>\u548c \u4e00\u4e2a\u76ee\u6807\u503c&nbsp;<code>target</code>\u3002\u627e\u51fa&nbsp;<code>nums</code><em>&nbsp;</em>\u4e2d\u7684\u4e09\u4e2a\u6574\u6570\uff0c\u4f7f\u5f97\u5b83\u4eec\u7684\u548c\u4e0e&nbsp;<code>target</code>&nbsp;\u6700\u63a5\u8fd1\u3002\u8fd4\u56de\u8fd9\u4e09\u4e2a\u6570\u7684\u548c\u3002\u5047\u5b9a\u6bcf\u7ec4\u8f93\u5165\u53ea\u5b58\u5728\u552f\u4e00\u7b54\u6848\u3002</p>\n\n<pre>\u4f8b\u5982\uff0c\u7ed9\u5b9a\u6570\u7ec4 nums = [-1\uff0c2\uff0c1\uff0c-4], \u548c target = 1.\n\n\u4e0e target \u6700\u63a5\u8fd1\u7684\u4e09\u4e2a\u6570\u7684\u548c\u4e3a 2. (-1 + 2 + 1 = 2).\n</pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content273.da0e51f7.chunk.js.map