(window.webpackJsonp=window.webpackJsonp||[]).push([[474],{537:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {string} s\n * @return {string}\n */</span>\n<span class="hljs-keyword">var</span> frequencySort = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">s</span>) </span>{\n  <span class="hljs-keyword">let</span> cache={}\n  <span class="hljs-keyword">let</span> str=<span class="hljs-string">\'\'</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;s.length;i++){\n    <span class="hljs-keyword">if</span>(!cache[s[i]]){\n      cache[s[i]]=<span class="hljs-number">1</span>\n    }<span class="hljs-keyword">else</span>{\n      cache[s[i]]++;\n    }\n  }\n\n  <span class="hljs-keyword">let</span> arr=<span class="hljs-built_in">Object</span>.keys(cache).sort(<span class="hljs-function">(<span class="hljs-params">a,b</span>)=&gt;</span>cache[b]-cache[a])\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;arr.length;i++){\n    str+=arr[i].repeat(cache[arr[i]])\n  }\n  <span class="hljs-keyword">return</span> str\n    \n};\n</code></pre>\n'],titleSlug:"sort-characters-by-frequency",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u5148\u7528<code>hash</code>\u627e\u51fa\u6bcf\u4e2a\u5b57\u6bcd\u7684\u9891\u7387\uff0c\u518d\u5bf9\u5176\u8fdb\u884c\u6392\u5e8f\uff0c\u53ef\u4ee5\u4f7f\u7528<code>\u6876\u6392\u5e8f</code>\uff0c\u6216\u8005\u76f4\u63a5<code>sort</code>\u3002</p>\n<p>\u5bf9\u6392\u597d\u5e8f\u7684\u9891\u7387\u6784\u5efa\u5b57\u7b26\u4e32\u3002</p>\n",content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u5b57\u7b26\u4e32\uff0c\u8bf7\u5c06\u5b57\u7b26\u4e32\u91cc\u7684\u5b57\u7b26\u6309\u7167\u51fa\u73b0\u7684\u9891\u7387\u964d\u5e8f\u6392\u5217\u3002</p>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong>\n&quot;tree&quot;\n\n<strong>\u8f93\u51fa:</strong>\n&quot;eert&quot;\n\n<strong>\u89e3\u91ca:\n</strong>&#39;e&#39;\u51fa\u73b0\u4e24\u6b21\uff0c&#39;r&#39;\u548c&#39;t&#39;\u90fd\u53ea\u51fa\u73b0\u4e00\u6b21\u3002\n\u56e0\u6b64&#39;e&#39;\u5fc5\u987b\u51fa\u73b0\u5728&#39;r&#39;\u548c&#39;t&#39;\u4e4b\u524d\u3002\u6b64\u5916\uff0c&quot;eetr&quot;\u4e5f\u662f\u4e00\u4e2a\u6709\u6548\u7684\u7b54\u6848\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 2:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong>\n&quot;cccaaa&quot;\n\n<strong>\u8f93\u51fa:</strong>\n&quot;cccaaa&quot;\n\n<strong>\u89e3\u91ca:\n</strong>&#39;c&#39;\u548c&#39;a&#39;\u90fd\u51fa\u73b0\u4e09\u6b21\u3002\u6b64\u5916\uff0c&quot;aaaccc&quot;\u4e5f\u662f\u6709\u6548\u7684\u7b54\u6848\u3002\n\u6ce8\u610f&quot;cacaca&quot;\u662f\u4e0d\u6b63\u786e\u7684\uff0c\u56e0\u4e3a\u76f8\u540c\u7684\u5b57\u6bcd\u5fc5\u987b\u653e\u5728\u4e00\u8d77\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 3:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong>\n&quot;Aabb&quot;\n\n<strong>\u8f93\u51fa:</strong>\n&quot;bbAa&quot;\n\n<strong>\u89e3\u91ca:\n</strong>\u6b64\u5916\uff0c&quot;bbaA&quot;\u4e5f\u662f\u4e00\u4e2a\u6709\u6548\u7684\u7b54\u6848\uff0c\u4f46&quot;Aabb&quot;\u662f\u4e0d\u6b63\u786e\u7684\u3002\n\u6ce8\u610f&#39;A&#39;\u548c&#39;a&#39;\u88ab\u8ba4\u4e3a\u662f\u4e24\u79cd\u4e0d\u540c\u7684\u5b57\u7b26\u3002\n</pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content502.65e28ad7.chunk.js.map