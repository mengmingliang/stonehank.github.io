(window.webpackJsonp=window.webpackJsonp||[]).push([[268],{352:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} nums\n * @return {boolean}\n */</span>\n<span class="hljs-keyword">var</span> containsDuplicate = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nums</span>) </span>{\n    <span class="hljs-keyword">let</span> res=[]\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;nums.length;i++){\n        <span class="hljs-keyword">let</span> cur=nums[i]\n        <span class="hljs-keyword">if</span>(res[cur])<span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>\n        <span class="hljs-keyword">else</span> res[cur]=<span class="hljs-number">1</span>\n    }\n    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>\n};\n</code></pre>\n'],titleSlug:"contains-duplicate",hasThinking:!1,content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u6574\u6570\u6570\u7ec4\uff0c\u5224\u65ad\u662f\u5426\u5b58\u5728\u91cd\u590d\u5143\u7d20\u3002</p>\n\n<p>\u5982\u679c\u4efb\u4f55\u503c\u5728\u6570\u7ec4\u4e2d\u51fa\u73b0\u81f3\u5c11\u4e24\u6b21\uff0c\u51fd\u6570\u8fd4\u56de true\u3002\u5982\u679c\u6570\u7ec4\u4e2d\u6bcf\u4e2a\u5143\u7d20\u90fd\u4e0d\u76f8\u540c\uff0c\u5219\u8fd4\u56de false\u3002</p>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> [1,2,3,1]\n<strong>\u8f93\u51fa:</strong> true</pre>\n\n<p><strong>\u793a\u4f8b 2:</strong></p>\n\n<pre><strong>\u8f93\u5165: </strong>[1,2,3,4]\n<strong>\u8f93\u51fa:</strong> false</pre>\n\n<p><strong>\u793a\u4f8b&nbsp;3:</strong></p>\n\n<pre><strong>\u8f93\u5165: </strong>[1,1,1,3,3,4,3,2,4,2]\n<strong>\u8f93\u51fa:</strong> true</pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content317.964b8a8f.chunk.js.map