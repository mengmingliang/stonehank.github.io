(window.webpackJsonp=window.webpackJsonp||[]).push([[416],{485:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} A\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> maxRotateFunction = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">A</span>) </span>{\n  <span class="hljs-keyword">let</span> sum=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> a <span class="hljs-keyword">of</span> A)sum+=a\n  \n  <span class="hljs-keyword">let</span> curValue=<span class="hljs-number">0</span>,n=A.length\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;n;i++)curValue+=i*A[i]\n  <span class="hljs-keyword">let</span> maxN=curValue\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=n<span class="hljs-number">-1</span>;i&gt;=<span class="hljs-number">1</span>;i--){\n    curValue-=(n<span class="hljs-number">-1</span>)*A[i]\n    curValue+=sum-A[i]\n    maxN=<span class="hljs-built_in">Math</span>.max(maxN,curValue)\n  }\n  <span class="hljs-keyword">return</span> maxN\n};\n</code></pre>\n'],titleSlug:"rotate-function",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u627e\u51fa\u6bcf\u4e00\u6b21\u65cb\u8f6c\u7684\u89c4\u5f8b\uff0c\u6700\u540e\u4e00\u4e2a\u6570\u7684\u500d\u6570\u4ece<code>len-1</code>\u53d8\u4e3a<code>0</code>\uff0c\u56e0\u6b64\u8981\u51cf\u53bb<code>(len-1)*\u6700\u540e\u4e00\u4e2a\u6570</code>\uff0c</p>\n<p>\u7136\u540e\u524d\u9762\u6bcf\u4e00\u4e2a\u6570\u7684\u500d\u6570\u90fd<code>+1</code>\uff0c\u56e0\u6b64\u6700\u540e\u5b9e\u9645\u589e\u52a0\u4e86\u6574\u4e2a\u6570\u7ec4\u7684\u548c<code>sum</code>\u518d\u51cf\u53bb<code>\u6700\u540e\u4e00\u4e2a\u6570</code>\u3002</p>\n<p>\u6211\u4eec\u53ea\u9700\u8981\u627e\u51fa\u6bcf\u4e00\u6b21\u65cb\u8f6c\u7684\u6700\u540e\u4e00\u4e2a\u6570\uff0c\u56e0\u4e3a\u662f\u5faa\u73af\u65cb\u8f6c\uff0c\u6700\u540e\u4e00\u4e2a\u6570\u90fd\u662f\u8f6e\u6d41\u7684\uff0c\u56e0\u6b64\u53ef\u4ee5\u4ece\u540e\u5411\u524d\u904d\u5386\u6574\u4e2a\u6570\u7ec4\uff0c\n\u5bf9\u6bcf\u4e00\u4e2a\u6570\u4f5c\u4e3a\u6700\u540e\u4e00\u4e2a\u6570\u8fdb\u884c\u6bd4\u8f83\u3002</p>\n<p>\u6700\u540e\u65f6\u95f4\u590d\u6742\u5ea6\u662f<code>O(n)</code>\u3002</p>\n",content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u957f\u5ea6\u4e3a <em>n</em> \u7684\u6574\u6570\u6570\u7ec4&nbsp;<code>A</code>&nbsp;\u3002</p>\n\n<p>\u5047\u8bbe&nbsp;<code>B<sub>k</sub></code>&nbsp;\u662f\u6570\u7ec4&nbsp;<code>A</code>&nbsp;\u987a\u65f6\u9488\u65cb\u8f6c <em>k</em> \u4e2a\u4f4d\u7f6e\u540e\u7684\u6570\u7ec4\uff0c\u6211\u4eec\u5b9a\u4e49&nbsp;<code>A</code>&nbsp;\u7684&ldquo;\u65cb\u8f6c\u51fd\u6570&rdquo;&nbsp;<code>F</code>&nbsp;\u4e3a\uff1a</p>\n\n<p><code>F(k) = 0 * B<sub>k</sub>[0] + 1 * B<sub>k</sub>[1] + ... + (n-1) * B<sub>k</sub>[n-1]</code>\u3002</p>\n\n<p>\u8ba1\u7b97<code>F(0), F(1), ..., F(n-1)</code>\u4e2d\u7684\u6700\u5927\u503c\u3002</p>\n\n<p><strong>\u6ce8\u610f:</strong><br />\n\u53ef\u4ee5\u8ba4\u4e3a<em> n</em> \u7684\u503c\u5c0f\u4e8e 10<sup>5</sup>\u3002</p>\n\n<p><strong>\u793a\u4f8b:</strong></p>\n\n<pre>\nA = [4, 3, 2, 6]\n\nF(0) = (0 * 4) + (1 * 3) + (2 * 2) + (3 * 6) = 0 + 3 + 4 + 18 = 25\nF(1) = (0 * 6) + (1 * 4) + (2 * 3) + (3 * 2) = 0 + 4 + 6 + 6 = 16\nF(2) = (0 * 2) + (1 * 6) + (2 * 4) + (3 * 3) = 0 + 6 + 8 + 9 = 23\nF(3) = (0 * 3) + (1 * 2) + (2 * 6) + (3 * 4) = 0 + 2 + 12 + 12 = 26\n\n\u6240\u4ee5 F(0), F(1), F(2), F(3) \u4e2d\u7684\u6700\u5927\u503c\u662f F(3) = 26 \u3002\n</pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content450.c18fbfcd.chunk.js.map