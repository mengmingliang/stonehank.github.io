(window.webpackJsonp=window.webpackJsonp||[]).push([[1007],{1019:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number} x\n * @param {number} y\n * @param {number} bound\n * @return {number[]}\n */</span>\n<span class="hljs-keyword">var</span> powerfulIntegers = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x, y, bound</span>) </span>{\n    <span class="hljs-keyword">if</span>(bound===<span class="hljs-number">0</span>)<span class="hljs-keyword">return</span> []\n    <span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>,j=<span class="hljs-number">0</span>\n    <span class="hljs-keyword">if</span>(x===<span class="hljs-number">1</span> &amp;&amp; y===<span class="hljs-number">1</span>){\n        <span class="hljs-keyword">if</span>(bound&gt;=<span class="hljs-number">2</span>)<span class="hljs-keyword">return</span> [<span class="hljs-number">2</span>]\n        <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> []\n    }\n    <span class="hljs-keyword">let</span> res=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>()\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;;i++){\n        <span class="hljs-keyword">let</span> r1=<span class="hljs-built_in">Math</span>.pow(x,i)\n        <span class="hljs-keyword">if</span>(r1&gt;=bound)<span class="hljs-keyword">break</span>\n        <span class="hljs-keyword">if</span>(y===<span class="hljs-number">1</span>){\n            res.add(r1)\n            <span class="hljs-keyword">continue</span>\n        }\n        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;;j++){\n            <span class="hljs-keyword">let</span> r=<span class="hljs-built_in">Math</span>.pow(x,i)+<span class="hljs-built_in">Math</span>.pow(y,j)\n            <span class="hljs-keyword">if</span>(r&lt;=bound)res.add(r)\n            <span class="hljs-keyword">else</span>{\n                <span class="hljs-keyword">break</span>\n            }\n        }\n        <span class="hljs-keyword">if</span>(x===<span class="hljs-number">1</span>)<span class="hljs-keyword">break</span>\n    }\n    <span class="hljs-keyword">let</span> result=[]\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> n <span class="hljs-keyword">of</span> res)result.push(n)\n    <span class="hljs-keyword">return</span> result\n};\n</code></pre>\n'],titleSlug:"powerful-integers",hasThinking:!1,content:"<p>\u7ed9\u5b9a\u4e24\u4e2a\u6b63\u6574\u6570 <code>x</code> \u548c <code>y</code>\uff0c\u5982\u679c\u67d0\u4e00\u6574\u6570\u7b49\u4e8e <code>x^i + y^j</code>\uff0c\u5176\u4e2d\u6574\u6570&nbsp;<code>i &gt;= 0</code> \u4e14&nbsp;<code>j &gt;= 0</code>\uff0c\u90a3\u4e48\u6211\u4eec\u8ba4\u4e3a\u8be5\u6574\u6570\u662f\u4e00\u4e2a<em>\u5f3a\u6574\u6570</em>\u3002</p>\n\n<p>\u8fd4\u56de\u503c\u5c0f\u4e8e\u6216\u7b49\u4e8e&nbsp;<code>bound</code>&nbsp;\u7684\u6240\u6709<em>\u5f3a\u6574\u6570</em>\u7ec4\u6210\u7684\u5217\u8868\u3002</p>\n\n<p>\u4f60\u53ef\u4ee5\u6309\u4efb\u4f55\u987a\u5e8f\u8fd4\u56de\u7b54\u6848\u3002\u5728\u4f60\u7684\u56de\u7b54\u4e2d\uff0c\u6bcf\u4e2a\u503c\u6700\u591a\u51fa\u73b0\u4e00\u6b21\u3002</p>\n\n<p>&nbsp;</p>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>x = 2, y = 3, bound = 10\n<strong>\u8f93\u51fa\uff1a</strong>[2,3,4,5,7,9,10]\n<strong>\u89e3\u91ca\uff1a </strong>\n2 = 2^0 + 3^0\n3 = 2^1 + 3^0\n4 = 2^0 + 3^1\n5 = 2^1 + 3^1\n7 = 2^2 + 3^1\n9 = 2^3 + 3^0\n10 = 2^0 + 3^2\n</pre>\n\n<p><strong>\u793a\u4f8b&nbsp;2\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>x = 3, y = 5, bound = 15\n<strong>\u8f93\u51fa\uff1a</strong>[2,4,6,8,10,14]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= x &lt;= 100</code></li>\n\t<li><code>1 &lt;= y&nbsp;&lt;= 100</code></li>\n\t<li><code>0 &lt;= bound&nbsp;&lt;= 10^6</code></li>\n</ul>\n"}}}]);
//# sourceMappingURL=sourceCode-content984.8beadb6b.chunk.js.map