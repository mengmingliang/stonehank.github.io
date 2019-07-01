(window.webpackJsonp=window.webpackJsonp||[]).push([[499],{560:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} houses\n * @param {number[]} heaters\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> findRadius = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">houses, heaters</span>) </span>{\n  houses.sort(<span class="hljs-function">(<span class="hljs-params">a,b</span>)=&gt;</span>a-b)\n  heaters.sort(<span class="hljs-function">(<span class="hljs-params">a,b</span>)=&gt;</span>a-b)\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bsFront</span>(<span class="hljs-params">arr,n</span>)</span>{\n    <span class="hljs-keyword">let</span> lo=<span class="hljs-number">0</span>,hi=arr.length<span class="hljs-number">-1</span>\n    <span class="hljs-keyword">while</span>(lo&lt;hi){\n      <span class="hljs-keyword">let</span> mid=<span class="hljs-built_in">Math</span>.ceil((lo+hi)/<span class="hljs-number">2</span>)\n      <span class="hljs-keyword">if</span>(arr[mid]&gt;n)hi=mid<span class="hljs-number">-1</span>\n      <span class="hljs-keyword">else</span> lo=mid\n    }\n    <span class="hljs-keyword">return</span> lo\n  }\n\n  <span class="hljs-keyword">let</span> aux=[]\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;houses.length;i++){\n    <span class="hljs-keyword">let</span> idx=bsFront(heaters,houses[i])\n    <span class="hljs-keyword">let</span> leftHeater=heaters[idx],\n        rightHeater=heaters[idx+<span class="hljs-number">1</span>] || <span class="hljs-literal">Infinity</span>\n    aux[i]=<span class="hljs-built_in">Math</span>.min(<span class="hljs-built_in">Math</span>.abs(leftHeater-houses[i]),<span class="hljs-built_in">Math</span>.abs(rightHeater-houses[i]))\n  }\n  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.max.apply(<span class="hljs-built_in">Math</span>,aux)\n};\n</code></pre>\n'],titleSlug:"heaters",hasThinking:!1,content:"<p>\u51ac\u5b63\u5df2\u7ecf\u6765\u4e34\u3002&nbsp;\u4f60\u7684\u4efb\u52a1\u662f\u8bbe\u8ba1\u4e00\u4e2a\u6709\u56fa\u5b9a\u52a0\u70ed\u534a\u5f84\u7684\u4f9b\u6696\u5668\u5411\u6240\u6709\u623f\u5c4b\u4f9b\u6696\u3002</p>\n\n<p>\u73b0\u5728\uff0c\u7ed9\u51fa\u4f4d\u4e8e\u4e00\u6761\u6c34\u5e73\u7ebf\u4e0a\u7684\u623f\u5c4b\u548c\u4f9b\u6696\u5668\u7684\u4f4d\u7f6e\uff0c\u627e\u5230\u53ef\u4ee5\u8986\u76d6\u6240\u6709\u623f\u5c4b\u7684\u6700\u5c0f\u52a0\u70ed\u534a\u5f84\u3002</p>\n\n<p>\u6240\u4ee5\uff0c\u4f60\u7684\u8f93\u5165\u5c06\u4f1a\u662f\u623f\u5c4b\u548c\u4f9b\u6696\u5668\u7684\u4f4d\u7f6e\u3002\u4f60\u5c06\u8f93\u51fa\u4f9b\u6696\u5668\u7684\u6700\u5c0f\u52a0\u70ed\u534a\u5f84\u3002</p>\n\n<p><strong>\u8bf4\u660e:</strong></p>\n\n<ol>\n\t<li>\u7ed9\u51fa\u7684\u623f\u5c4b\u548c\u4f9b\u6696\u5668\u7684\u6570\u76ee\u662f\u975e\u8d1f\u6570\u4e14\u4e0d\u4f1a\u8d85\u8fc7 25000\u3002</li>\n\t<li>\u7ed9\u51fa\u7684\u623f\u5c4b\u548c\u4f9b\u6696\u5668\u7684\u4f4d\u7f6e\u5747\u662f\u975e\u8d1f\u6570\u4e14\u4e0d\u4f1a\u8d85\u8fc710^9\u3002</li>\n\t<li>\u53ea\u8981\u623f\u5c4b\u4f4d\u4e8e\u4f9b\u6696\u5668\u7684\u534a\u5f84\u5185(\u5305\u62ec\u5728\u8fb9\u7f18\u4e0a)\uff0c\u5b83\u5c31\u53ef\u4ee5\u5f97\u5230\u4f9b\u6696\u3002</li>\n\t<li>\u6240\u6709\u4f9b\u6696\u5668\u90fd\u9075\u5faa\u4f60\u7684\u534a\u5f84\u6807\u51c6\uff0c\u52a0\u70ed\u7684\u534a\u5f84\u4e5f\u4e00\u6837\u3002</li>\n</ol>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> [1,2,3],[2]\n<strong>\u8f93\u51fa:</strong> 1\n<strong>\u89e3\u91ca:</strong> \u4ec5\u5728\u4f4d\u7f6e2\u4e0a\u6709\u4e00\u4e2a\u4f9b\u6696\u5668\u3002\u5982\u679c\u6211\u4eec\u5c06\u52a0\u70ed\u534a\u5f84\u8bbe\u4e3a1\uff0c\u90a3\u4e48\u6240\u6709\u623f\u5c4b\u5c31\u90fd\u80fd\u5f97\u5230\u4f9b\u6696\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 2:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> [1,2,3,4],[1,4]\n<strong>\u8f93\u51fa:</strong> 1\n<strong>\u89e3\u91ca:</strong> \u5728\u4f4d\u7f6e1, 4\u4e0a\u6709\u4e24\u4e2a\u4f9b\u6696\u5668\u3002\u6211\u4eec\u9700\u8981\u5c06\u52a0\u70ed\u534a\u5f84\u8bbe\u4e3a1\uff0c\u8fd9\u6837\u6240\u6709\u623f\u5c4b\u5c31\u90fd\u80fd\u5f97\u5230\u4f9b\u6696\u3002\n</pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content525.b38e366a.chunk.js.map