(window.webpackJsonp=window.webpackJsonp||[]).push([[477],{540:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} A\n * @param {number[]} B\n * @param {number[]} C\n * @param {number[]} D\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> fourSumCount = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">A, B, C, D</span>) </span>{\n    <span class="hljs-keyword">let</span> count=<span class="hljs-number">0</span>\n    <span class="hljs-keyword">let</span> c=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>()\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;A.length;i++){\n        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;j&lt;B.length;j++){\n            <span class="hljs-keyword">let</span> m=<span class="hljs-number">0</span>-(A[i]+B[j])\n            <span class="hljs-keyword">if</span>(!c.has(m))c.set(m,<span class="hljs-number">1</span>)\n            <span class="hljs-keyword">else</span> c.set(m,c.get(m)+<span class="hljs-number">1</span>)\n        }\n    }\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;C.length;i++){\n        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;j&lt;D.length;j++){\n            <span class="hljs-keyword">let</span> m=C[i]+D[j]\n            <span class="hljs-keyword">if</span>(c.has(m)){\n                count+=c.get(m)\n            }\n        }\n    }    \n    <span class="hljs-keyword">return</span> count\n};\n</code></pre>\n'],titleSlug:"4sum-ii",hasThinking:!1,content:"<p>\u7ed9\u5b9a\u56db\u4e2a\u5305\u542b\u6574\u6570\u7684\u6570\u7ec4\u5217\u8868&nbsp;A , B , C , D ,\u8ba1\u7b97\u6709\u591a\u5c11\u4e2a\u5143\u7ec4 <code>(i, j, k, l)</code>&nbsp;\uff0c\u4f7f\u5f97&nbsp;<code>A[i] + B[j] + C[k] + D[l] = 0</code>\u3002</p>\n\n<p>\u4e3a\u4e86\u4f7f\u95ee\u9898\u7b80\u5355\u5316\uff0c\u6240\u6709\u7684 A, B, C, D \u5177\u6709\u76f8\u540c\u7684\u957f\u5ea6&nbsp;N\uff0c\u4e14 0 &le; N &le; 500 \u3002\u6240\u6709\u6574\u6570\u7684\u8303\u56f4\u5728 -2<sup>28</sup> \u5230 2<sup>28</sup> - 1 \u4e4b\u95f4\uff0c\u6700\u7ec8\u7ed3\u679c\u4e0d\u4f1a\u8d85\u8fc7&nbsp;2<sup>31</sup> - 1 \u3002</p>\n\n<p><strong>\u4f8b\u5982:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong>\nA = [ 1, 2]\nB = [-2,-1]\nC = [-1, 2]\nD = [ 0, 2]\n\n<strong>\u8f93\u51fa:</strong>\n2\n\n<strong>\u89e3\u91ca:</strong>\n\u4e24\u4e2a\u5143\u7ec4\u5982\u4e0b:\n1. (0, 0, 0, 1) -&gt; A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0\n2. (1, 1, 0, 0) -&gt; A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0\n</pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content505.d4ac8c48.chunk.js.map