(window.webpackJsonp=window.webpackJsonp||[]).push([[145],{241:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} arr\n * @return {void} Do not return anything, modify arr in-place instead.\n */</span>\n<span class="hljs-keyword">var</span> duplicateZeros = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arr</span>) </span>{\n  <span class="hljs-keyword">let</span> len=arr.length\n  <span class="hljs-keyword">let</span> aux=arr.slice()\n  <span class="hljs-keyword">let</span> id=<span class="hljs-number">0</span>,dup=<span class="hljs-literal">false</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;len;i++){\n    <span class="hljs-keyword">if</span>(dup){\n      arr[i]=<span class="hljs-number">0</span>\n      dup=<span class="hljs-literal">false</span>\n      <span class="hljs-keyword">continue</span>\n    }\n    <span class="hljs-keyword">if</span>(aux[id]===<span class="hljs-number">0</span>){\n      arr[i]=<span class="hljs-number">0</span>\n      dup=<span class="hljs-literal">true</span>\n    }<span class="hljs-keyword">else</span>{\n      arr[i]=aux[id]\n    }\n    id++\n  }\n};\n</code></pre>\n'],titleSlug:"duplicate-zeros",hasThinking:!1,content:"<p>\u7ed9\u4f60\u4e00\u4e2a\u957f\u5ea6\u56fa\u5b9a\u7684\u6574\u6570\u6570\u7ec4&nbsp;<code>arr</code>\uff0c\u8bf7\u4f60\u5c06\u8be5\u6570\u7ec4\u4e2d\u51fa\u73b0\u7684\u6bcf\u4e2a\u96f6\u90fd\u590d\u5199\u4e00\u904d\uff0c\u5e76\u5c06\u5176\u4f59\u7684\u5143\u7d20\u5411\u53f3\u5e73\u79fb\u3002</p>\n\n<p>\u6ce8\u610f\uff1a\u8bf7\u4e0d\u8981\u5728\u8d85\u8fc7\u8be5\u6570\u7ec4\u957f\u5ea6\u7684\u4f4d\u7f6e\u5199\u5165\u5143\u7d20\u3002</p>\n\n<p>\u8981\u6c42\uff1a\u8bf7\u5bf9\u8f93\u5165\u7684\u6570\u7ec4&nbsp;<strong>\u5c31\u5730&nbsp;</strong>\u8fdb\u884c\u4e0a\u8ff0\u4fee\u6539\uff0c\u4e0d\u8981\u4ece\u51fd\u6570\u8fd4\u56de\u4efb\u4f55\u4e1c\u897f\u3002</p>\n\n<p>&nbsp;</p>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>[1,0,2,3,0,4,5,0]\n<strong>\u8f93\u51fa\uff1a</strong>null\n<strong>\u89e3\u91ca\uff1a</strong>\u8c03\u7528\u51fd\u6570\u540e\uff0c<strong>\u8f93\u5165</strong>\u7684\u6570\u7ec4\u5c06\u88ab\u4fee\u6539\u4e3a\uff1a[1,0,0,2,3,0,0,4]\n</pre>\n\n<p><strong>\u793a\u4f8b 2\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>[1,2,3]\n<strong>\u8f93\u51fa\uff1a</strong>null\n<strong>\u89e3\u91ca\uff1a</strong>\u8c03\u7528\u51fd\u6570\u540e\uff0c<strong>\u8f93\u5165</strong>\u7684\u6570\u7ec4\u5c06\u88ab\u4fee\u6539\u4e3a\uff1a[1,2,3]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ol>\n\t<li><code>1 &lt;= arr.length &lt;= 10000</code></li>\n\t<li><code>0 &lt;= arr[i] &lt;= 9</code></li>\n</ol>\n"}}}]);
//# sourceMappingURL=sourceCode-content206.4691b9a5.chunk.js.map