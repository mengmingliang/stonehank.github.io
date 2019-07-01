(window.webpackJsonp=window.webpackJsonp||[]).push([[479],{542:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} nums\n * @return {boolean}\n */</span>\n<span class="hljs-keyword">var</span> find132pattern = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nums</span>) </span>{\n  <span class="hljs-keyword">let</span> s3Stack=[]\n  <span class="hljs-keyword">let</span> s2=-<span class="hljs-literal">Infinity</span>,s1=nums[nums.length<span class="hljs-number">-1</span>]\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=nums.length<span class="hljs-number">-1</span>;i&gt;=<span class="hljs-number">0</span>;i--){\n    <span class="hljs-keyword">if</span>(nums[i]&lt;s2)<span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>\n    <span class="hljs-keyword">while</span>(s3Stack.length!==<span class="hljs-number">0</span> &amp;&amp; nums[i]&gt;s3Stack[s3Stack.length<span class="hljs-number">-1</span>]){\n      s2=s3Stack.pop()\n    }\n    s3Stack.push(nums[i])\n  }\n  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>\n};\n</code></pre>\n'],titleSlug:"132-pattern",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u7531\u4e8e\u662f<code>132</code>\u6a21\u5f0f\uff0c\u6211\u4eec\u5012\u5e8f\u904d\u5386\uff0c\u8ba9<code>32</code>\u5c3d\u53ef\u80fd\u7684\u5927\uff0c\u7136\u540e\u4e00\u65e6\u53d1\u73b0<code>1</code>&lt;<code>2</code>\uff0c\u5219\u8fd4\u56de<code>true</code>\u3002</p>\n<p>\u5012\u5e8f\u904d\u5386\u65f6\uff0c\u901a\u8fc7<code>stack</code>\u5b58\u653e<code>3</code>\uff0c\u5982\u679c<code>nums[i]&gt;stack[stack.length-1]</code>\uff0c\u8bf4\u660e\u5b58\u5728\u66f4\u5927\u7684<code>3</code>\uff0c\u56e0\u6b64\u53ef\u4ee5\u8ba9<code>2</code>\u4e3a\u5f53\u524d<code>stack.pop</code>\uff0c\n\u518d\u5c06\u66f4\u5927\u7684<code>3</code>\u6dfb\u52a0\u8fdb<code>stack</code>\u3002</p>\n<p>\u904d\u5386\u8fc7\u7a0b\u4e2d\uff0c\u4e00\u65e6\u53d1\u73b0<code>nums[i]&lt;2</code>\uff0c\u8bf4\u660e<code>nums[i]</code>\u53ef\u4ee5\u4f5c\u4e3a<code>1</code>\uff0c\u8fd4\u56de<code>true</code>\u3002</p>\n",content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u6574\u6570\u5e8f\u5217\uff1aa<sub>1</sub>, a<sub>2</sub>, ..., a<sub>n</sub>\uff0c\u4e00\u4e2a132\u6a21\u5f0f\u7684\u5b50\u5e8f\u5217&nbsp;a<sub><strong>i</strong></sub>, a<sub><strong>j</strong></sub>, a<sub><strong>k</strong></sub>&nbsp;\u88ab\u5b9a\u4e49\u4e3a\uff1a\u5f53 <strong>i</strong> &lt; <strong>j</strong> &lt; <strong>k</strong> \u65f6\uff0ca<sub><strong>i</strong></sub> &lt; a<sub><strong>k</strong></sub> &lt; a<sub><strong>j</strong></sub>\u3002\u8bbe\u8ba1\u4e00\u4e2a\u7b97\u6cd5\uff0c\u5f53\u7ed9\u5b9a\u6709&nbsp;n \u4e2a\u6570\u5b57\u7684\u5e8f\u5217\u65f6\uff0c\u9a8c\u8bc1\u8fd9\u4e2a\u5e8f\u5217\u4e2d\u662f\u5426\u542b\u6709132\u6a21\u5f0f\u7684\u5b50\u5e8f\u5217\u3002</p>\n\n<p><strong>\u6ce8\u610f\uff1a</strong>n \u7684\u503c\u5c0f\u4e8e15000\u3002</p>\n\n<p><strong>\u793a\u4f8b1:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> [1, 2, 3, 4]\n\n<strong>\u8f93\u51fa:</strong> False\n\n<strong>\u89e3\u91ca:</strong> \u5e8f\u5217\u4e2d\u4e0d\u5b58\u5728132\u6a21\u5f0f\u7684\u5b50\u5e8f\u5217\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 2:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> [3, 1, 4, 2]\n\n<strong>\u8f93\u51fa:</strong> True\n\n<strong>\u89e3\u91ca:</strong> \u5e8f\u5217\u4e2d\u6709 1 \u4e2a132\u6a21\u5f0f\u7684\u5b50\u5e8f\u5217\uff1a [1, 4, 2].\n</pre>\n\n<p><strong>\u793a\u4f8b 3:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> [-1, 3, 2, 0]\n\n<strong>\u8f93\u51fa:</strong> True\n\n<strong>\u89e3\u91ca:</strong> \u5e8f\u5217\u4e2d\u6709 3 \u4e2a132\u6a21\u5f0f\u7684\u7684\u5b50\u5e8f\u5217: [-1, 3, 2], [-1, 3, 0] \u548c [-1, 2, 0].\n</pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content507.ae01b53b.chunk.js.map