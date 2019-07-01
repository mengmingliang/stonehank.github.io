(window.webpackJsonp=window.webpackJsonp||[]).push([[909],{931:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} A\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> sumSubseqWidths = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">A</span>) </span>{\n  <span class="hljs-keyword">let</span> MOD=<span class="hljs-number">1e9</span>+<span class="hljs-number">7</span>\n  A.sort(<span class="hljs-function">(<span class="hljs-params">a,b</span>)=&gt;</span>a-b)\n  <span class="hljs-keyword">let</span> leftPow=<span class="hljs-built_in">Array</span>(A.length).fill(<span class="hljs-number">1</span>),\n      rightPow=<span class="hljs-built_in">Array</span>(A.length).fill(<span class="hljs-number">1</span>)\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">1</span>;i&lt;A.length;i++){\n    leftPow[i]=(leftPow[i<span class="hljs-number">-1</span>]*<span class="hljs-number">2</span>)%MOD\n  }\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=A.length<span class="hljs-number">-2</span>;i&gt;=<span class="hljs-number">0</span>;i--){\n    rightPow[i]=(rightPow[i+<span class="hljs-number">1</span>]*<span class="hljs-number">2</span>)%MOD\n  }\n  <span class="hljs-keyword">let</span> res=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>,p=<span class="hljs-number">1</span>;i&lt;A.length;i++,p=(p&lt;&lt;<span class="hljs-number">1</span>) % MOD){\n    res=(res + A[i]*leftPow[i]-A[i]*rightPow[i]) % MOD\n  }\n  <span class="hljs-keyword">return</span> res\n};\n</code></pre>\n'],titleSlug:"sum-of-subsequence-widths",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u56e0\u4e3a\u8fd9\u91cc\u53ea\u662f\u8981\u6c42\u5b50\u5e8f\u5217\u5185\u90e8\u7684\u6700\u5927\u6700\u5c0f\u503c\uff0c\u56e0\u6b64\u5b50\u5e8f\u5217\u7684\u987a\u5e8f\u662f\u6ca1\u6709\u5f71\u54cd\u7684\uff0c\u53ef\u4ee5\u5148\u6267\u884c\u6392\u5e8f\u3002</p>\n<p>\u6700\u521d\u7684\u60f3\u6cd5\u662f\uff0c\u5bf9\u6bcf\u4e00\u9879<code>A[i]</code>\uff0c\u627e\u51fa\u5f53\u5b83\u4f5c\u4e3a\u6700\u5c0f\u503c\u65f6\uff0c\u80fd\u8d21\u732e\u7684\u5bbd\u5ea6\u548c\uff0c\u4f46\u8fd9\u4e48\u505a\u5185\u90e8\u4e5f\u8981\u904d\u5386\u4e00\u904d\u5269\u4e0b\u7684\u6570\u3002\n\u6700\u7ec8\u65f6\u95f4\u590d\u6742\u5ea6\u662f<code>O(N^2)</code>\uff0c\u4e0d\u7b26\u5408\u8981\u6c42\u3002</p>\n<p>\u5176\u5b9e\u5bf9\u4e8e\u6bcf\u4e00\u9879<code>A[i]</code>\uff0c\u6211\u4eec\u4e0d\u9700\u8981\u518d\u53bb\u904d\u5386\u5b83\u4e4b\u540e\u7684\u6570\u5b57\u3002</p>\n<p>\u56e0\u4e3a\u8fd9\u4e2a\u6570\u7ec4\u5df2\u7ecf\u6392\u597d\u5e8f\uff0c\u8fd9\u4e2a\u6570<code>A[i]</code>\u540e\u9762\u7684\u6240\u6709\u6570\u7ec4\u6210\u7684\u5e8f\u5217\uff0c\u4e00\u5b9a\u5b58\u5728<code>2^len-i-1</code>\u4e2a\u5b50\u5e8f\u5217\u4ee5<code>A[i]</code>\u4e3a\u6700\u5c0f\u503c\uff1b</p>\n<p>\u540c\u6837\uff0c\u8fd9\u4e2a\u6570<code>A[i]</code>\u524d\u9762\u7684\u6240\u6709\u6570\u7ec4\u6210\u7684\u5e8f\u5217\uff0c\u4e5f\u4e00\u5b9a\u5b58\u5728<code>2^i</code>\u4e2a\u5b50\u5e8f\u5217\u4ee5<code>A[i]</code>\u4e3a\u6700\u5927\u503c\uff1b</p>\n<p>\u627e\u51fa\u5b83\u4f5c\u4e3a\u6700\u5c0f\u503c\u65f6\u7684\u5e8f\u5217\u6570\uff0c\u548c\u5b83\u4f5c\u4e3a\u6700\u5927\u503c\u7684\u5e8f\u5217\u6570\uff0c\u8fd9\u4e24\u4e2a\u6570\u5206\u522b\u4e58\u4e0a<code>A[i]</code>\uff0c\u4e5f\u5c31\u662f<code>A[i]</code>\u80fd\u8d21\u732e\u7684\u4f5c\u4e3a\u6700\u5927\u503c\u548c\u6700\u5c0f\u503c\u7684\u603b\u548c\u3002</p>\n<p>\u56e0\u6b64<code>res+=A[i]* (2^i) - A[i]*(2^(len-i-1))</code></p>\n<p>\u4f46\u8fd8\u6709\u4e00\u4e2a\u8981\u6ce8\u610f\uff0c\u6211\u4eec\u4e0d\u80fd\u76f4\u63a5\u4f7f\u7528<code>Math.pow</code>\uff0c\u56e0\u4e3a\u957f\u5ea6\u548c<code>A[i]</code>\u6700\u591a\u6709<code>20000</code>\uff0c<code>Math.pow(20000,20000)</code>\u662f\u4f1a\u6ea2\u51fa\u7684\u3002</p>\n<p>\u56e0\u6b64\u9700\u89812\u4e2a\u6570\u7ec4\u4fdd\u5b58<code>pow</code>\uff0c\u89c1\u4ee3\u7801\u3002</p>\n",content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u6574\u6570\u6570\u7ec4 <code>A</code> \uff0c\u8003\u8651 <code>A</code> \u7684\u6240\u6709\u975e\u7a7a\u5b50\u5e8f\u5217\u3002</p>\n\n<p>\u5bf9\u4e8e\u4efb\u610f\u5e8f\u5217 S \uff0c\u8bbe S \u7684\u5bbd\u5ea6\u662f S \u7684\u6700\u5927\u5143\u7d20\u548c\u6700\u5c0f\u5143\u7d20\u7684\u5dee\u3002</p>\n\n<p>\u8fd4\u56de A \u7684\u6240\u6709\u5b50\u5e8f\u5217\u7684\u5bbd\u5ea6\u4e4b\u548c\u3002</p>\n\n<p>\u7531\u4e8e\u7b54\u6848\u53ef\u80fd\u975e\u5e38\u5927\uff0c\u8bf7<strong>\u8fd4\u56de\u7b54\u6848\u6a21 10^9+7</strong>\u3002</p>\n\n<p>&nbsp;</p>\n\n<p><strong>\u793a\u4f8b\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>[2,1,3]\n<strong>\u8f93\u51fa\uff1a</strong>6\n<strong>\u89e3\u91ca\uff1a\n</strong>\u5b50\u5e8f\u5217\u4e3a [1]\uff0c[2]\uff0c[3]\uff0c[2,1]\uff0c[2,3]\uff0c[1,3]\uff0c[2,1,3] \u3002\n\u76f8\u5e94\u7684\u5bbd\u5ea6\u662f 0\uff0c0\uff0c0\uff0c1\uff0c1\uff0c2\uff0c2 \u3002\n\u8fd9\u4e9b\u5bbd\u5ea6\u4e4b\u548c\u662f 6 \u3002\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= A.length &lt;= 20000</code></li>\n\t<li><code>1 &lt;= A[i] &lt;= 20000</code></li>\n</ul>\n"}}}]);
//# sourceMappingURL=sourceCode-content896.726adc00.chunk.js.map