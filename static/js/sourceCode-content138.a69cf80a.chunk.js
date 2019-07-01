(window.webpackJsonp=window.webpackJsonp||[]).push([[69],{173:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} A\n * @param {number[]} B\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> minDominoRotations = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">A, B</span>) </span>{\n  <span class="hljs-keyword">let</span> hash=<span class="hljs-built_in">Array</span>(<span class="hljs-number">7</span>).fill(<span class="hljs-number">0</span>)\n  <span class="hljs-keyword">let</span> valid=<span class="hljs-literal">false</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;A.length;i++){\n    <span class="hljs-keyword">let</span> a=A[i],b=B[i]\n    hash[a]++\n    <span class="hljs-keyword">if</span>(a!==b)hash[b]++\n  }\n  <span class="hljs-keyword">let</span> candi=<span class="hljs-literal">null</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;hash.length;i++){\n    <span class="hljs-keyword">if</span>(hash[i]===A.length)candi=i\n  }\n  <span class="hljs-keyword">if</span>(candi==<span class="hljs-literal">null</span>)<span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>\n\n  <span class="hljs-keyword">let</span> res=<span class="hljs-literal">Infinity</span>\n  <span class="hljs-keyword">let</span> aSwap=<span class="hljs-number">0</span>,bSwap=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;A.length;i++){\n    <span class="hljs-keyword">let</span> a=A[i],b=B[i]\n    <span class="hljs-keyword">if</span>(a===candi &amp;&amp; b===candi)<span class="hljs-keyword">continue</span>\n    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(a===candi){\n      bSwap++\n    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(b===candi){\n      aSwap++\n    }\n    res=<span class="hljs-built_in">Math</span>.min(aSwap,bSwap)\n  }\n\n  <span class="hljs-keyword">return</span> res===<span class="hljs-literal">Infinity</span>?<span class="hljs-number">0</span>:res\n};\n</code></pre>\n'],titleSlug:"minimum-domino-rotations-for-equal-row",hasThinking:!1,content:'<p>\u5728\u4e00\u6392\u591a\u7c73\u8bfa\u9aa8\u724c\u4e2d\uff0c<code>A[i]</code> \u548c <code>B[i]</code>&nbsp;\u5206\u522b\u4ee3\u8868\u7b2c i \u4e2a\u591a\u7c73\u8bfa\u9aa8\u724c\u7684\u4e0a\u534a\u90e8\u5206\u548c\u4e0b\u534a\u90e8\u5206\u3002\uff08\u4e00\u4e2a\u591a\u7c73\u8bfa\u662f\u4e24\u4e2a\u4ece 1 \u5230 6 \u7684\u6570\u5b57\u540c\u5217\u5e73\u94fa\u5f62\u6210\u7684&nbsp;&mdash;&mdash; \u8be5\u5e73\u94fa\u7684\u6bcf\u4e00\u534a\u4e0a\u90fd\u6709\u4e00\u4e2a\u6570\u5b57\u3002\uff09</p>\n\n<p>\u6211\u4eec\u53ef\u4ee5\u65cb\u8f6c\u7b2c&nbsp;<code>i</code>&nbsp;\u5f20\u591a\u7c73\u8bfa\uff0c\u4f7f\u5f97&nbsp;<code>A[i]</code> \u548c&nbsp;<code>B[i]</code>&nbsp;\u7684\u503c\u4ea4\u6362\u3002</p>\n\n<p>\u8fd4\u56de\u80fd\u4f7f <code>A</code> \u4e2d\u6240\u6709\u503c\u6216\u8005 <code>B</code> \u4e2d\u6240\u6709\u503c\u90fd\u76f8\u540c\u7684\u6700\u5c0f\u65cb\u8f6c\u6b21\u6570\u3002</p>\n\n<p>\u5982\u679c\u65e0\u6cd5\u505a\u5230\uff0c\u8fd4\u56de&nbsp;<code>-1</code>.</p>\n\n<p>&nbsp;</p>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/03/08/domino.png" style="height: 161px; width: 200px;"></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>A = [2,1,2,4,2,2], B = [5,2,6,2,3,2]\n<strong>\u8f93\u51fa\uff1a</strong>2\n<strong>\u89e3\u91ca\uff1a</strong>\n\u56fe\u4e00\u8868\u793a\uff1a\u5728\u6211\u4eec\u65cb\u8f6c\u4e4b\u524d\uff0c A \u548c B \u7ed9\u51fa\u7684\u591a\u7c73\u8bfa\u724c\u3002\n\u5982\u679c\u6211\u4eec\u65cb\u8f6c\u7b2c\u4e8c\u4e2a\u548c\u7b2c\u56db\u4e2a\u591a\u7c73\u8bfa\u9aa8\u724c\uff0c\u6211\u4eec\u53ef\u4ee5\u4f7f\u4e0a\u9762\u4e00\u884c\u4e2d\u7684\u6bcf\u4e2a\u503c\u90fd\u7b49\u4e8e 2\uff0c\u5982\u56fe\u4e8c\u6240\u793a\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 2\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>A = [3,5,1,2,3], B = [3,6,3,3,4]\n<strong>\u8f93\u51fa\uff1a</strong>-1\n<strong>\u89e3\u91ca\uff1a</strong>\n\u5728\u8fd9\u79cd\u60c5\u51b5\u4e0b\uff0c\u4e0d\u53ef\u80fd\u65cb\u8f6c\u591a\u7c73\u8bfa\u724c\u4f7f\u4e00\u884c\u7684\u503c\u76f8\u7b49\u3002\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ol>\n\t<li><code>1 &lt;= A[i], B[i] &lt;= 6</code></li>\n\t<li><code>2 &lt;= A.length == B.length &lt;= 20000</code></li>\n</ol>\n'}}}]);
//# sourceMappingURL=sourceCode-content138.a69cf80a.chunk.js.map