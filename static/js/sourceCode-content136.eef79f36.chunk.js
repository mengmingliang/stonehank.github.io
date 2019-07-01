(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{171:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} A\n * @param {number} K\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> largestSumAfterKNegations = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">A, K</span>) </span>{\n  A.sort(<span class="hljs-function">(<span class="hljs-params">a,b</span>)=&gt;</span>a-b)\n  <span class="hljs-comment">// console.log(A,K)</span>\n  <span class="hljs-keyword">let</span> lessThenZ=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> n <span class="hljs-keyword">of</span> A){\n    <span class="hljs-keyword">if</span>(n&lt;<span class="hljs-number">0</span>)lessThenZ++\n  }\n  <span class="hljs-keyword">if</span>(lessThenZ&gt;<span class="hljs-number">0</span>){\n    <span class="hljs-keyword">let</span> change=<span class="hljs-built_in">Math</span>.min(lessThenZ,K)\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;change;i++){\n      A[i]=-A[i]\n    }    \n  }<span class="hljs-keyword">else</span>{\n    <span class="hljs-keyword">let</span> realK=K%<span class="hljs-number">2</span>\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;realK;i++){\n      A[i]=-A[i]\n    }\n  }\n\n  <span class="hljs-keyword">let</span> sum=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> n <span class="hljs-keyword">of</span> A)sum+=n\n  <span class="hljs-keyword">if</span>(lessThenZ===<span class="hljs-number">0</span>)<span class="hljs-keyword">return</span> sum\n  <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(lessThenZ&gt;=K){\n    <span class="hljs-keyword">return</span> sum\n  }<span class="hljs-keyword">else</span>{\n    <span class="hljs-keyword">return</span> largestSumAfterKNegations(A,K-lessThenZ)\n  }\n};\n</code></pre>\n'],titleSlug:"maximize-sum-of-array-after-k-negations",hasThinking:!1,content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u6574\u6570\u6570\u7ec4 A\uff0c\u6211\u4eec<strong>\u53ea\u80fd</strong>\u7528\u4ee5\u4e0b\u65b9\u6cd5\u4fee\u6539\u8be5\u6570\u7ec4\uff1a\u6211\u4eec\u9009\u62e9\u67d0\u4e2a\u4e2a\u7d22\u5f15 <code>i</code>&nbsp;\u5e76\u5c06 <code>A[i]</code> \u66ff\u6362\u4e3a <code>-A[i]</code>\uff0c\u7136\u540e\u603b\u5171\u91cd\u590d\u8fd9\u4e2a\u8fc7\u7a0b <code>K</code> \u6b21\u3002\uff08\u6211\u4eec\u53ef\u4ee5\u591a\u6b21\u9009\u62e9\u540c\u4e00\u4e2a\u7d22\u5f15 <code>i</code>\u3002\uff09</p>\n\n<p>\u4ee5\u8fd9\u79cd\u65b9\u5f0f\u4fee\u6539\u6570\u7ec4\u540e\uff0c\u8fd4\u56de\u6570\u7ec4\u53ef\u80fd\u7684\u6700\u5927\u548c\u3002</p>\n\n<p>&nbsp;</p>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>A = [4,2,3], K = 1\n<strong>\u8f93\u51fa\uff1a</strong>5\n<strong>\u89e3\u91ca\uff1a</strong>\u9009\u62e9\u7d22\u5f15 (1,) \uff0c\u7136\u540e A \u53d8\u4e3a [4,-2,3]\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 2\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>A = [3,-1,0,2], K = 3\n<strong>\u8f93\u51fa\uff1a</strong>6\n<strong>\u89e3\u91ca\uff1a</strong>\u9009\u62e9\u7d22\u5f15 (1, 2, 2) \uff0c\u7136\u540e A \u53d8\u4e3a [3,1,0,2]\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 3\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>A = [2,-3,-1,5,-4], K = 2\n<strong>\u8f93\u51fa\uff1a</strong>13\n<strong>\u89e3\u91ca\uff1a</strong>\u9009\u62e9\u7d22\u5f15 (1, 4) \uff0c\u7136\u540e A \u53d8\u4e3a [2,3,-1,5,4]\u3002\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ol>\n\t<li><code>1 &lt;= A.length &lt;= 10000</code></li>\n\t<li><code>1 &lt;= K &lt;= 10000</code></li>\n\t<li><code>-100 &lt;= A[i] &lt;= 100</code></li>\n</ol>\n"}}}]);
//# sourceMappingURL=sourceCode-content136.eef79f36.chunk.js.map