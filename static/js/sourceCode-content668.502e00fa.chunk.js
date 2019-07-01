(window.webpackJsonp=window.webpackJsonp||[]).push([[657],{703:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {string} s\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> strangePrinter = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">s</span>) </span>{\n  <span class="hljs-keyword">if</span>(s==<span class="hljs-string">\'\'</span>)<span class="hljs-keyword">return</span> <span class="hljs-number">0</span>\n  <span class="hljs-keyword">let</span> N=s.length\n  <span class="hljs-keyword">let</span> dp=<span class="hljs-built_in">Array</span>(N).fill().map(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span><span class="hljs-built_in">Array</span>(N).fill(<span class="hljs-literal">Infinity</span>))\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;N;i++)dp[i][i]=<span class="hljs-number">1</span>\n  \n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">1</span>;i&lt;N;i++){\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;j&lt;N-i;j++){\n      <span class="hljs-keyword">let</span> k=j+i\n      dp[j][k]=<span class="hljs-built_in">Math</span>.min(dp[j+<span class="hljs-number">1</span>][k],dp[j][k<span class="hljs-number">-1</span>])\n      <span class="hljs-keyword">if</span>(s[j]!=s[k]){\n        dp[j][k]++\n        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> m=j+<span class="hljs-number">1</span>;m&lt;k;m++){\n          <span class="hljs-keyword">if</span>(s[m]==s[k]){\n            dp[j][k]=<span class="hljs-built_in">Math</span>.min(dp[j][k],dp[m][k]+dp[j][m<span class="hljs-number">-1</span>])\n          }\n        }\n      }\n    }\n  }\n  <span class="hljs-keyword">return</span> dp[<span class="hljs-number">0</span>][N<span class="hljs-number">-1</span>]\n};\n</code></pre>\n'],titleSlug:"strange-printer",hasThinking:!1,content:"<p>\u6709\u53f0\u5947\u602a\u7684\u6253\u5370\u673a\u6709\u4ee5\u4e0b\u4e24\u4e2a\u7279\u6b8a\u8981\u6c42\uff1a</p>\n\n<ol>\n\t<li>\u6253\u5370\u673a\u6bcf\u6b21\u53ea\u80fd\u6253\u5370\u540c\u4e00\u4e2a\u5b57\u7b26\u5e8f\u5217\u3002</li>\n\t<li>\u6bcf\u6b21\u53ef\u4ee5\u5728\u4efb\u610f\u8d77\u59cb\u548c\u7ed3\u675f\u4f4d\u7f6e\u6253\u5370\u65b0\u5b57\u7b26\uff0c\u5e76\u4e14\u4f1a\u8986\u76d6\u6389\u539f\u6765\u5df2\u6709\u7684\u5b57\u7b26\u3002</li>\n</ol>\n\n<p>\u7ed9\u5b9a\u4e00\u4e2a\u53ea\u5305\u542b\u5c0f\u5199\u82f1\u6587\u5b57\u6bcd\u7684\u5b57\u7b26\u4e32\uff0c\u4f60\u7684\u4efb\u52a1\u662f\u8ba1\u7b97\u8fd9\u4e2a\u6253\u5370\u673a\u6253\u5370\u5b83\u9700\u8981\u7684\u6700\u5c11\u6b21\u6570\u3002</p>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> &quot;aaabbb&quot;\n<strong>\u8f93\u51fa:</strong> 2\n<strong>\u89e3\u91ca:</strong> \u9996\u5148\u6253\u5370 &quot;aaa&quot; \u7136\u540e\u6253\u5370 &quot;bbb&quot;\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 2:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> &quot;aba&quot;\n<strong>\u8f93\u51fa:</strong> 2\n<strong>\u89e3\u91ca:</strong> \u9996\u5148\u6253\u5370 &quot;aaa&quot; \u7136\u540e\u5728\u7b2c\u4e8c\u4e2a\u4f4d\u7f6e\u6253\u5370 &quot;b&quot; \u8986\u76d6\u6389\u539f\u6765\u7684\u5b57\u7b26 &#39;a&#39;\u3002</pre>\n\n<p><strong>\u63d0\u793a</strong>: \u8f93\u5165\u5b57\u7b26\u4e32\u7684\u957f\u5ea6\u4e0d\u4f1a\u8d85\u8fc7 100\u3002</p>\n"}}}]);
//# sourceMappingURL=sourceCode-content668.502e00fa.chunk.js.map