(window.webpackJsonp=window.webpackJsonp||[]).push([[506],{566:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} nums\n * @param {number} k\n * @return {number[]}\n */</span>\n<span class="hljs-keyword">var</span> medianSlidingWindow = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nums, k</span>) </span>{\n  <span class="hljs-keyword">let</span> pq=[]\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findMid</span>(<span class="hljs-params"></span>)</span>{\n    <span class="hljs-keyword">let</span> mid=(pq.length<span class="hljs-number">-1</span>)/<span class="hljs-number">2</span>\n    <span class="hljs-keyword">return</span> (pq[<span class="hljs-built_in">Math</span>.ceil(mid)]+pq[<span class="hljs-built_in">Math</span>.floor(mid)])/<span class="hljs-number">2</span>\n  }\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">insert</span>(<span class="hljs-params">n</span>)</span>{\n    <span class="hljs-keyword">if</span>(pq.length===<span class="hljs-number">0</span> || pq[pq.length<span class="hljs-number">-1</span>]&lt;=n){\n      pq.push(n)\n    }<span class="hljs-keyword">else</span>{\n      <span class="hljs-keyword">let</span> idx=bsEnd(pq,n)\n      pq.splice(idx,<span class="hljs-number">0</span>,n)\n    }\n  }\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bsEnd</span>(<span class="hljs-params">arr,n</span>)</span>{\n    <span class="hljs-keyword">let</span> lo=<span class="hljs-number">0</span>,hi=arr.length<span class="hljs-number">-1</span>\n    <span class="hljs-keyword">while</span>(lo&lt;hi){\n      <span class="hljs-keyword">let</span> mid=<span class="hljs-built_in">Math</span>.floor((lo+hi)/<span class="hljs-number">2</span>)\n      <span class="hljs-keyword">if</span>(arr[mid]&lt;n)lo=mid+<span class="hljs-number">1</span>\n      <span class="hljs-keyword">else</span> hi=mid\n    }\n    <span class="hljs-keyword">return</span> hi\n  }\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">remove</span>(<span class="hljs-params">n</span>)</span>{\n    <span class="hljs-keyword">let</span> idx=bsEnd(pq,n)\n    pq.splice(idx,<span class="hljs-number">1</span>)\n  }\n  \n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;k;i++){\n    insert(nums[i])\n  }\n  <span class="hljs-keyword">let</span> res=[]\n  res.push(findMid())\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=k;i&lt;nums.length;i++){\n    remove(nums[i-k])\n    insert(nums[i])\n    res.push(findMid())\n  }\n  <span class="hljs-keyword">return</span> res\n};\n</code></pre>\n'],titleSlug:"sliding-window-median",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u901a\u8fc7<code>\u4e8c\u5206\u6cd5</code>\u8fdb\u884c\u6dfb\u52a0\u548c\u5220\u9664\uff0c\u6784\u9020\u4e00\u4e2a\u957f\u5ea6\u4e3a<code>k</code>\u6709\u5e8f\u6570\u7ec4\uff0c\u6700\u7ec8\u65f6\u95f4\u590d\u6742\u5ea6\u662f<code>O(nk)</code>\u3002</p>\n",content:"<p>\u4e2d\u4f4d\u6570\u662f\u6709\u5e8f\u5e8f\u5217\u6700\u4e2d\u95f4\u7684\u90a3\u4e2a\u6570\u3002\u5982\u679c\u5e8f\u5217\u7684\u5927\u5c0f\u662f\u5076\u6570\uff0c\u5219\u6ca1\u6709\u6700\u4e2d\u95f4\u7684\u6570\uff1b\u6b64\u65f6\u4e2d\u4f4d\u6570\u662f\u6700\u4e2d\u95f4\u7684\u4e24\u4e2a\u6570\u7684\u5e73\u5747\u6570\u3002</p>\n\n<p>\u4f8b\u5982\uff1a</p>\n\n<p><code>[2,3,4]</code>\uff0c\u4e2d\u4f4d\u6570\u662f&nbsp;<code>3</code></p>\n\n<p><code>[2,3]</code>\uff0c\u4e2d\u4f4d\u6570\u662f <code>(2 + 3) / 2 = 2.5</code></p>\n\n<p>\u7ed9\u51fa\u4e00\u4e2a\u6570\u7ec4 nums\uff0c\u6709\u4e00\u4e2a\u5927\u5c0f\u4e3a <em>k</em> \u7684\u7a97\u53e3\u4ece\u6700\u5de6\u7aef\u6ed1\u52a8\u5230\u6700\u53f3\u7aef\u3002\u7a97\u53e3\u4e2d\u6709 k \u4e2a\u6570\uff0c\u6bcf\u6b21\u7a97\u53e3\u79fb\u52a8 1 \u4f4d\u3002\u4f60\u7684\u4efb\u52a1\u662f\u627e\u51fa\u6bcf\u6b21\u7a97\u53e3\u79fb\u52a8\u540e\u5f97\u5230\u7684\u65b0\u7a97\u53e3\u4e2d\u5143\u7d20\u7684\u4e2d\u4f4d\u6570\uff0c\u5e76\u8f93\u51fa\u7531\u5b83\u4eec\u7ec4\u6210\u7684\u6570\u7ec4\u3002</p>\n\n<p>\u4f8b\u5982\uff1a</p>\n\n<p>\u7ed9\u51fa&nbsp;<em>nums</em> = <code>[1,3,-1,-3,5,3,6,7]</code>\uff0c\u4ee5\u53ca&nbsp;<em>k</em> = 3\u3002</p>\n\n<pre>\n\u7a97\u53e3\u4f4d\u7f6e                      \u4e2d\u4f4d\u6570\n---------------               -----\n[1  3  -1] -3  5  3  6  7       1\n 1 [3  -1  -3] 5  3  6  7       -1\n 1  3 [-1  -3  5] 3  6  7       -1\n 1  3  -1 [-3  5  3] 6  7       3\n 1  3  -1  -3 [5  3  6] 7       5\n 1  3  -1  -3  5 [3  6  7]      6\n</pre>\n\n<p>&nbsp;\u56e0\u6b64\uff0c\u8fd4\u56de\u8be5\u6ed1\u52a8\u7a97\u53e3\u7684\u4e2d\u4f4d\u6570\u6570\u7ec4&nbsp;<code>[1,-1,-1,3,5,6]</code>\u3002</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong><br />\n\u5047\u8bbe<code>k</code>\u662f\u5408\u6cd5\u7684\uff0c\u5373\uff1a<code>k</code> \u59cb\u7ec8\u5c0f\u4e8e\u8f93\u5165\u7684\u975e\u7a7a\u6570\u7ec4\u7684\u5143\u7d20\u4e2a\u6570.</p>\n"}}}]);
//# sourceMappingURL=sourceCode-content531.08928a3f.chunk.js.map