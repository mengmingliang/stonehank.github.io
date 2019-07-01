(window.webpackJsonp=window.webpackJsonp||[]).push([[401],{472:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} nums\n */</span>\n<span class="hljs-keyword">var</span> Solution = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nums</span>) </span>{\n  <span class="hljs-keyword">this</span>.initNums=nums\n  <span class="hljs-keyword">this</span>.swap=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arr,i,j</span>)</span>{\n    <span class="hljs-keyword">let</span> t=arr[i]\n    arr[i]=arr[j]\n    arr[j]=t\n  }\n};\n\n<span class="hljs-comment">/**\n * Resets the array to its original configuration and return it.\n * @return {number[]}\n */</span>\nSolution.prototype.reset = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{\n  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.initNums\n};\n\n<span class="hljs-comment">/**\n * Returns a random shuffling of the array.\n * @return {number[]}\n */</span>\nSolution.prototype.shuffle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{\n  <span class="hljs-keyword">let</span> nums=<span class="hljs-keyword">this</span>.initNums.slice()\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=nums.length;i&gt;=<span class="hljs-number">1</span>;i--){\n    <span class="hljs-keyword">let</span> rd=<span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random()*i)\n    <span class="hljs-keyword">this</span>.swap(nums,rd,i<span class="hljs-number">-1</span>)\n  }\n  <span class="hljs-keyword">return</span> nums\n};\n\n<span class="hljs-comment">/** \n * Your Solution object will be instantiated and called as such:\n * var obj = new Solution(nums)\n * var param_1 = obj.reset()\n * var param_2 = obj.shuffle()\n */</span>\n</code></pre>\n'],titleSlug:"shuffle-an-array",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p><code>Fisher Yates</code>\u6d17\u724c\u7b97\u6cd5\uff0c\u5bf9\u4e8e\u4e00\u4e2a\u6570\u7ec4\uff0c\u957f\u5ea6\u4e3a<code>N</code>\uff0c\u9996\u5148\u968f\u673a\u4ece<code>N</code>\u4e2d\u62bd\u53d61\u4e2a\uff0c\u5c06\u5b83\u4e0e\u6700\u540e\u4e00\u4e2a\u4ea4\u6362\uff1b\u63a5\u7740\u4ece<code>N-1</code>\u968f\u673a\u62bd\u53d6\u4e00\u4e2a\uff0c\u4e0e\u5012\u6570\u7b2c\u4e8c\u4e2a\u4ea4\u6362....</p>\n",content:"<p>\u6253\u4e71\u4e00\u4e2a\u6ca1\u6709\u91cd\u590d\u5143\u7d20\u7684\u6570\u7ec4\u3002</p>\n\n<p><strong>\u793a\u4f8b:</strong></p>\n\n<pre>\n// \u4ee5\u6570\u5b57\u96c6\u5408 1, 2 \u548c 3 \u521d\u59cb\u5316\u6570\u7ec4\u3002\nint[] nums = {1,2,3};\nSolution solution = new Solution(nums);\n\n// \u6253\u4e71\u6570\u7ec4 [1,2,3] \u5e76\u8fd4\u56de\u7ed3\u679c\u3002\u4efb\u4f55 [1,2,3]\u7684\u6392\u5217\u8fd4\u56de\u7684\u6982\u7387\u5e94\u8be5\u76f8\u540c\u3002\nsolution.shuffle();\n\n// \u91cd\u8bbe\u6570\u7ec4\u5230\u5b83\u7684\u521d\u59cb\u72b6\u6001[1,2,3]\u3002\nsolution.reset();\n\n// \u968f\u673a\u8fd4\u56de\u6570\u7ec4[1,2,3]\u6253\u4e71\u540e\u7684\u7ed3\u679c\u3002\nsolution.shuffle();\n</pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content437.f2695fba.chunk.js.map