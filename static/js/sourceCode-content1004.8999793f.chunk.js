(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{1039:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} A\n * @param {number} K\n * @return {number[]}\n */</span>\n<span class="hljs-keyword">var</span> addToArrayForm = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">A, K</span>) </span>{\n  <span class="hljs-keyword">let</span> kS=(K+<span class="hljs-string">\'\'</span>).split(<span class="hljs-string">\'\'</span>)\n  <span class="hljs-keyword">let</span> res=[]\n  <span class="hljs-keyword">let</span> coe=<span class="hljs-number">1</span>\n  <span class="hljs-keyword">let</span> i=A.length<span class="hljs-number">-1</span>,j=kS.length<span class="hljs-number">-1</span>\n  <span class="hljs-keyword">let</span> carry=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">while</span>(i&gt;=<span class="hljs-number">0</span> || j&gt;=<span class="hljs-number">0</span>){\n    <span class="hljs-keyword">let</span> a=+A[i--],k=+kS[j--]\n    <span class="hljs-keyword">if</span>(i&lt;<span class="hljs-number">-1</span>)a=<span class="hljs-number">0</span>\n    <span class="hljs-keyword">if</span>(j&lt;<span class="hljs-number">-1</span>)k=<span class="hljs-number">0</span>\n    <span class="hljs-comment">// console.log(a,k,carry)</span>\n    <span class="hljs-keyword">let</span> cur=((a+k)%<span class="hljs-number">10</span>+carry)%<span class="hljs-number">10</span>\n    res.unshift(cur)\n    <span class="hljs-keyword">if</span>(a+k+carry&gt;=<span class="hljs-number">10</span>){\n      carry=<span class="hljs-built_in">Math</span>.floor((a+k+carry)/<span class="hljs-number">10</span>)\n    }<span class="hljs-keyword">else</span>{\n      carry=<span class="hljs-number">0</span>\n    }\n  }\n \n  <span class="hljs-keyword">if</span>(carry!=<span class="hljs-number">0</span>)res.unshift(carry)\n  <span class="hljs-keyword">return</span> res\n};\n</code></pre>\n'],titleSlug:"add-to-array-form-of-integer",hasThinking:!1,content:"<p>\u5bf9\u4e8e\u975e\u8d1f\u6574\u6570&nbsp;<code>X</code>&nbsp;\u800c\u8a00\uff0c<em><code>X</code></em>&nbsp;\u7684<em>\u6570\u7ec4\u5f62\u5f0f</em>\u662f\u6bcf\u4f4d\u6570\u5b57\u6309\u4ece\u5de6\u5230\u53f3\u7684\u987a\u5e8f\u5f62\u6210\u7684\u6570\u7ec4\u3002\u4f8b\u5982\uff0c\u5982\u679c&nbsp;<code>X = 1231</code>\uff0c\u90a3\u4e48\u5176\u6570\u7ec4\u5f62\u5f0f\u4e3a&nbsp;<code>[1,2,3,1]</code>\u3002</p>\n\n<p>\u7ed9\u5b9a\u975e\u8d1f\u6574\u6570 <code>X</code> \u7684\u6570\u7ec4\u5f62\u5f0f&nbsp;<code>A</code>\uff0c\u8fd4\u56de\u6574\u6570&nbsp;<code>X+K</code>&nbsp;\u7684\u6570\u7ec4\u5f62\u5f0f\u3002</p>\n\n<p>&nbsp;</p>\n\n<ol>\n</ol>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>A = [1,2,0,0], K = 34\n<strong>\u8f93\u51fa\uff1a</strong>[1,2,3,4]\n<strong>\u89e3\u91ca\uff1a</strong>1200 + 34 = 1234\n</pre>\n\n<p><strong>\u89e3\u91ca 2\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>A = [2,7,4], K = 181\n<strong>\u8f93\u51fa\uff1a</strong>[4,5,5]\n<strong>\u89e3\u91ca\uff1a</strong>274 + 181 = 455\n</pre>\n\n<p><strong>\u793a\u4f8b 3\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>A = [2,1,5], K = 806\n<strong>\u8f93\u51fa\uff1a</strong>[1,0,2,1]\n<strong>\u89e3\u91ca\uff1a</strong>215 + 806 = 1021\n</pre>\n\n<p><strong>\u793a\u4f8b 4\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>A = [9,9,9,9,9,9,9,9,9,9], K = 1\n<strong>\u8f93\u51fa\uff1a</strong>[1,0,0,0,0,0,0,0,0,0,0]\n<strong>\u89e3\u91ca\uff1a</strong>9999999999 + 1 = 10000000000\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ol>\n\t<li><code>1 &lt;= A.length &lt;= 10000</code></li>\n\t<li><code>0 &lt;= A[i] &lt;= 9</code></li>\n\t<li><code>0 &lt;= K &lt;= 10000</code></li>\n\t<li>\u5982\u679c&nbsp;<code>A.length &gt; 1</code>\uff0c\u90a3\u4e48&nbsp;<code>A[0] != 0</code></li>\n</ol>\n"}}}]);
//# sourceMappingURL=sourceCode-content1004.8999793f.chunk.js.map