(window.webpackJsonp=window.webpackJsonp||[]).push([[185],{277:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} nums\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> longestConsecutive = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nums</span>) </span>{\n  <span class="hljs-keyword">let</span> hash={},max=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;nums.length;i++){\n    <span class="hljs-keyword">let</span> cur=nums[i]\n    <span class="hljs-keyword">if</span>(hash[cur]!=<span class="hljs-literal">null</span>)<span class="hljs-keyword">continue</span>\n    <span class="hljs-keyword">let</span> left=hash[cur<span class="hljs-number">-1</span>]?hash[cur<span class="hljs-number">-1</span>]:<span class="hljs-number">0</span>\n    <span class="hljs-keyword">let</span> right=hash[cur+<span class="hljs-number">1</span>]?hash[cur+<span class="hljs-number">1</span>]:<span class="hljs-number">0</span>\n    <span class="hljs-keyword">let</span> sum=left+right+<span class="hljs-number">1</span>\n    hash[cur]=sum\n    max=<span class="hljs-built_in">Math</span>.max(max,sum)\n    hash[cur-left]=sum\n    hash[cur+right]=sum\n  }\n  <span class="hljs-keyword">return</span> max\n};\n</code></pre>\n'],titleSlug:"longest-consecutive-sequence",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u4f7f\u7528<code>hash</code>\u6765\u4fdd\u5b58\u6bcf\u4e00\u4e2a\u6570\u5b57\u7684\u8fde\u7eed\u957f\u5ea6\uff0c\u5bf9\u4e8e\u4e00\u4e2a\u672a\u8bbf\u95ee\u8fc7\u7684\u6570\u5b57<code>n</code>\uff0c\u5b83\u7684\u8fde\u7eed\u957f\u5ea6\u5c31\u662f<code>\u5b83\u5de6\u4fa7\u6570\u5b57(n-1)\u7684\u957f\u5ea6 + \u5b83\u53f3\u4fa7\u6570\u5b57(n+1)\u7684\u957f\u5ea6 + 1</code>\u3002</p>\n<p>\u5e76\u4e14\u4fdd\u5b58\u5f53\u524d\u957f\u5ea6\uff0c\u6700\u540e\u8981\u66f4\u65b0\u5b83\u5de6\u4fa7\u548c\u53f3\u4fa7\u7684\u6700\u65b0\u8fde\u7eed\u957f\u5ea6\u3002</p>\n",content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u672a\u6392\u5e8f\u7684\u6574\u6570\u6570\u7ec4\uff0c\u627e\u51fa\u6700\u957f\u8fde\u7eed\u5e8f\u5217\u7684\u957f\u5ea6\u3002</p>\n\n<p>\u8981\u6c42\u7b97\u6cd5\u7684\u65f6\u95f4\u590d\u6742\u5ea6\u4e3a&nbsp;<em>O(n)</em>\u3002</p>\n\n<p><strong>\u793a\u4f8b:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong>&nbsp;[100, 4, 200, 1, 3, 2]\n<strong>\u8f93\u51fa:</strong> 4\n<strong>\u89e3\u91ca:</strong> \u6700\u957f\u8fde\u7eed\u5e8f\u5217\u662f <code>[1, 2, 3, 4]\u3002\u5b83\u7684\u957f\u5ea6\u4e3a 4\u3002</code></pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content242.130bd538.chunk.js.map