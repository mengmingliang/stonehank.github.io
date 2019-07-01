(window.webpackJsonp=window.webpackJsonp||[]).push([[309],{389:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} nums\n * @param {number} val\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> removeElement = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nums, val</span>) </span>{\n  <span class="hljs-keyword">let</span> k=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;nums.length;i++){\n    <span class="hljs-keyword">if</span>(nums[i]!==val)\n      nums[k++]=nums[i]\n  }\n  <span class="hljs-keyword">return</span> k\n};\n</code></pre>\n'],titleSlug:"remove-element",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u548c<code>NO.26</code>\u57fa\u672c\u4e00\u81f4\uff0c\u68c0\u67e5\u6761\u4ef6\u6539\u53d8\u4e3a\u53ea\u8981\u5f53\u524d<code>nums[i]!==val</code>\uff0c\u90a3\u4e48\u5c31\u53ef\u4ee5\u6dfb\u52a0\u5230<code>k</code>\u5bf9\u5e94\u7684\u7d22\u5f15\u4e2d\u3002</p>\n",content:'<p>\u7ed9\u5b9a\u4e00\u4e2a\u6570\u7ec4 <em>nums&nbsp;</em>\u548c\u4e00\u4e2a\u503c <em>val</em>\uff0c\u4f60\u9700\u8981<strong><a href="https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95" target="_blank">\u539f\u5730</a></strong>\u79fb\u9664\u6240\u6709\u6570\u503c\u7b49\u4e8e&nbsp;<em>val&nbsp;</em>\u7684\u5143\u7d20\uff0c\u8fd4\u56de\u79fb\u9664\u540e\u6570\u7ec4\u7684\u65b0\u957f\u5ea6\u3002</p>\n\n<p>\u4e0d\u8981\u4f7f\u7528\u989d\u5916\u7684\u6570\u7ec4\u7a7a\u95f4\uff0c\u4f60\u5fc5\u987b\u5728<strong><a href="https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95" target="_blank">\u539f\u5730</a>\u4fee\u6539\u8f93\u5165\u6570\u7ec4</strong>\u5e76\u5728\u4f7f\u7528 O(1) \u989d\u5916\u7a7a\u95f4\u7684\u6761\u4ef6\u4e0b\u5b8c\u6210\u3002</p>\n\n<p>\u5143\u7d20\u7684\u987a\u5e8f\u53ef\u4ee5\u6539\u53d8\u3002\u4f60\u4e0d\u9700\u8981\u8003\u8651\u6570\u7ec4\u4e2d\u8d85\u51fa\u65b0\u957f\u5ea6\u540e\u9762\u7684\u5143\u7d20\u3002</p>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<pre>\u7ed9\u5b9a <em>nums</em> = <strong>[3,2,2,3]</strong>, <em>val</em> = <strong>3</strong>,\n\n\u51fd\u6570\u5e94\u8be5\u8fd4\u56de\u65b0\u7684\u957f\u5ea6 <strong>2</strong>, \u5e76\u4e14 <em>nums </em>\u4e2d\u7684\u524d\u4e24\u4e2a\u5143\u7d20\u5747\u4e3a <strong>2</strong>\u3002\n\n\u4f60\u4e0d\u9700\u8981\u8003\u8651\u6570\u7ec4\u4e2d\u8d85\u51fa\u65b0\u957f\u5ea6\u540e\u9762\u7684\u5143\u7d20\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b&nbsp;2:</strong></p>\n\n<pre>\u7ed9\u5b9a <em>nums</em> = <strong>[0,1,2,2,3,0,4,2]</strong>, <em>val</em> = <strong>2</strong>,\n\n\u51fd\u6570\u5e94\u8be5\u8fd4\u56de\u65b0\u7684\u957f\u5ea6 <strong><code>5</code></strong>, \u5e76\u4e14 <em>nums </em>\u4e2d\u7684\u524d\u4e94\u4e2a\u5143\u7d20\u4e3a <strong><code>0</code></strong>, <strong><code>1</code></strong>, <strong><code>3</code></strong>, <strong><code>0</code></strong>, <strong>4</strong>\u3002\n\n\u6ce8\u610f\u8fd9\u4e94\u4e2a\u5143\u7d20\u53ef\u4e3a\u4efb\u610f\u987a\u5e8f\u3002\n\n\u4f60\u4e0d\u9700\u8981\u8003\u8651\u6570\u7ec4\u4e2d\u8d85\u51fa\u65b0\u957f\u5ea6\u540e\u9762\u7684\u5143\u7d20\u3002\n</pre>\n\n<p><strong>\u8bf4\u660e:</strong></p>\n\n<p>\u4e3a\u4ec0\u4e48\u8fd4\u56de\u6570\u503c\u662f\u6574\u6570\uff0c\u4f46\u8f93\u51fa\u7684\u7b54\u6848\u662f\u6570\u7ec4\u5462?</p>\n\n<p>\u8bf7\u6ce8\u610f\uff0c\u8f93\u5165\u6570\u7ec4\u662f\u4ee5<strong>&ldquo;\u5f15\u7528&rdquo;</strong>\u65b9\u5f0f\u4f20\u9012\u7684\uff0c\u8fd9\u610f\u5473\u7740\u5728\u51fd\u6570\u91cc\u4fee\u6539\u8f93\u5165\u6570\u7ec4\u5bf9\u4e8e\u8c03\u7528\u8005\u662f\u53ef\u89c1\u7684\u3002</p>\n\n<p>\u4f60\u53ef\u4ee5\u60f3\u8c61\u5185\u90e8\u64cd\u4f5c\u5982\u4e0b:</p>\n\n<pre>// <strong>nums</strong> \u662f\u4ee5&ldquo;\u5f15\u7528&rdquo;\u65b9\u5f0f\u4f20\u9012\u7684\u3002\u4e5f\u5c31\u662f\u8bf4\uff0c\u4e0d\u5bf9\u5b9e\u53c2\u4f5c\u4efb\u4f55\u62f7\u8d1d\nint len = removeElement(nums, val);\n\n// \u5728\u51fd\u6570\u91cc\u4fee\u6539\u8f93\u5165\u6570\u7ec4\u5bf9\u4e8e\u8c03\u7528\u8005\u662f\u53ef\u89c1\u7684\u3002\n// \u6839\u636e\u4f60\u7684\u51fd\u6570\u8fd4\u56de\u7684\u957f\u5ea6, \u5b83\u4f1a\u6253\u5370\u51fa\u6570\u7ec4\u4e2d<strong>\u8be5\u957f\u5ea6\u8303\u56f4\u5185</strong>\u7684\u6240\u6709\u5143\u7d20\u3002\nfor (int i = 0; i &lt; len; i++) {\n&nbsp; &nbsp; print(nums[i]);\n}\n</pre>\n'}}}]);
//# sourceMappingURL=sourceCode-content354.d6e7a519.chunk.js.map