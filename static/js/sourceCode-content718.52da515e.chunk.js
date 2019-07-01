(window.webpackJsonp=window.webpackJsonp||[]).push([[713],{753:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} bits\n * @return {boolean}\n */</span>\n<span class="hljs-keyword">var</span> isOneBitCharacter = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">bits</span>) </span>{\n    <span class="hljs-keyword">let</span> len=bits.length\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;len;i++){\n        <span class="hljs-keyword">if</span>(i===len<span class="hljs-number">-1</span>)<span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>\n        <span class="hljs-keyword">if</span>(bits[i]===<span class="hljs-number">1</span>)i++\n    }\n    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>\n};\n</code></pre>\n'],titleSlug:"1-bit-and-2-bit-characters",hasThinking:!1,content:"<p>\u6709\u4e24\u79cd\u7279\u6b8a\u5b57\u7b26\u3002\u7b2c\u4e00\u79cd\u5b57\u7b26\u53ef\u4ee5\u7528\u4e00\u6bd4\u7279<code>0</code>\u6765\u8868\u793a\u3002\u7b2c\u4e8c\u79cd\u5b57\u7b26\u53ef\u4ee5\u7528\u4e24\u6bd4\u7279(<code>10</code>&nbsp;\u6216&nbsp;<code>11</code>)\u6765\u8868\u793a\u3002</p>\n\n<p>\u73b0\u7ed9\u4e00\u4e2a\u7531\u82e5\u5e72\u6bd4\u7279\u7ec4\u6210\u7684\u5b57\u7b26\u4e32\u3002\u95ee\u6700\u540e\u4e00\u4e2a\u5b57\u7b26\u662f\u5426\u5fc5\u5b9a\u4e3a\u4e00\u4e2a\u4e00\u6bd4\u7279\u5b57\u7b26\u3002\u7ed9\u5b9a\u7684\u5b57\u7b26\u4e32\u603b\u662f\u75310\u7ed3\u675f\u3002</p>\n\n<p><strong>\u793a\u4f8b&nbsp;1:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> \nbits = [1, 0, 0]\n<strong>\u8f93\u51fa:</strong> True\n<strong>\u89e3\u91ca:</strong> \n\u552f\u4e00\u7684\u7f16\u7801\u65b9\u5f0f\u662f\u4e00\u4e2a\u4e24\u6bd4\u7279\u5b57\u7b26\u548c\u4e00\u4e2a\u4e00\u6bd4\u7279\u5b57\u7b26\u3002\u6240\u4ee5\u6700\u540e\u4e00\u4e2a\u5b57\u7b26\u662f\u4e00\u6bd4\u7279\u5b57\u7b26\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b&nbsp;2:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> \nbits = [1, 1, 1, 0]\n<strong>\u8f93\u51fa:</strong> False\n<strong>\u89e3\u91ca:</strong> \n\u552f\u4e00\u7684\u7f16\u7801\u65b9\u5f0f\u662f\u4e24\u6bd4\u7279\u5b57\u7b26\u548c\u4e24\u6bd4\u7279\u5b57\u7b26\u3002\u6240\u4ee5\u6700\u540e\u4e00\u4e2a\u5b57\u7b26\u4e0d\u662f\u4e00\u6bd4\u7279\u5b57\u7b26\u3002\n</pre>\n\n<p><strong>\u6ce8\u610f:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= len(bits) &lt;= 1000</code>.</li>\n\t<li><code>bits[i]</code> \u603b\u662f<code>0</code> \u6216&nbsp;<code>1</code>.</li>\n</ul>\n"}}}]);
//# sourceMappingURL=sourceCode-content718.52da515e.chunk.js.map