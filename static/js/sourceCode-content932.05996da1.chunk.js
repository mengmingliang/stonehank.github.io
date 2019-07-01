(window.webpackJsonp=window.webpackJsonp||[]).push([[950],{967:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} A\n * @param {number} target\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> threeSumMulti = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">A, target</span>) </span>{\n  <span class="hljs-comment">// A.sort((a,b)=&gt;a-b)</span>\n  <span class="hljs-keyword">let</span> unique=[], hash={}, MOD=<span class="hljs-number">1000000007</span>\n  <span class="hljs-comment">// \u5b9a\u4e49\u72ec\u7acb\u6570\u7ec4</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;A.length;i++){\n    <span class="hljs-keyword">if</span>(hash[A[i]]==<span class="hljs-literal">null</span>){\n      hash[A[i]]=<span class="hljs-number">1</span>\n      unique.push(A[i])\n    }<span class="hljs-keyword">else</span> hash[A[i]]++\n  }\n  <span class="hljs-comment">// \u5b9a\u4e49\u91cd\u590d\u6570\u7ec4</span>\n  <span class="hljs-keyword">let</span> dupli=<span class="hljs-built_in">Array</span>(unique.length).fill(<span class="hljs-literal">Infinity</span>)\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;dupli.length;i++){\n    <span class="hljs-keyword">if</span>(hash[unique[i]]&gt;<span class="hljs-number">1</span>){\n      dupli[i]=unique[i]*<span class="hljs-number">2</span>\n    }\n  }\n  <span class="hljs-comment">// console.log(dupli,unique)</span>\n  <span class="hljs-keyword">let</span> sum=<span class="hljs-number">0</span>\n  <span class="hljs-comment">// \u8ba1\u7b97\u72ec\u7acb\u6570\u7ec4</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;unique.length;i++){\n    <span class="hljs-keyword">let</span> t=target-unique[i]\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=i+<span class="hljs-number">1</span>,k=unique.length<span class="hljs-number">-1</span>;j&lt;k;){\n      <span class="hljs-keyword">let</span> l=unique[j],r=unique[k]\n      <span class="hljs-keyword">if</span>(l+r===t){ sum+=hash[unique[i]]*hash[l]*hash[r] % MOD; j++ }\n      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(l+r&lt;t) j++\n      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(l+r&gt;t) k--\n    }\n  }\n  <span class="hljs-comment">// console.log(sum)</span>\n  <span class="hljs-comment">// \u8ba1\u7b97\u91cd\u590d\u6570\u7ec4</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;unique.length;i++){\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;j&lt;dupli.length;j++){\n      <span class="hljs-keyword">let</span> u=unique[i],d=dupli[j]\n      <span class="hljs-keyword">if</span>(u+d===target){\n        <span class="hljs-keyword">if</span>(i===j) sum+=((hash[d/<span class="hljs-number">2</span>]<span class="hljs-number">-2</span>)*(hash[d/<span class="hljs-number">2</span>]<span class="hljs-number">-1</span>)*hash[u]/<span class="hljs-number">6</span>) % MOD\n        <span class="hljs-keyword">else</span> sum+=(hash[d/<span class="hljs-number">2</span>]*(hash[d/<span class="hljs-number">2</span>]<span class="hljs-number">-1</span>)*hash[u] /<span class="hljs-number">2</span>) % MOD  \n      }\n    }\n  }\n  <span class="hljs-keyword">return</span> sum  % MOD\n};\n</code></pre>\n'],titleSlug:"3sum-with-multiplicity",hasThinking:!1,content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u6574\u6570\u6570\u7ec4&nbsp;<code>A</code>\uff0c\u4ee5\u53ca\u4e00\u4e2a\u6574\u6570&nbsp;<code>target</code>&nbsp;\u4f5c\u4e3a\u76ee\u6807\u503c\uff0c\u8fd4\u56de\u6ee1\u8db3 <code>i &lt; j &lt; k</code> \u4e14&nbsp;<code>A[i] + A[j] + A[k] == target</code>&nbsp;\u7684\u5143\u7ec4&nbsp;<code>i, j, k</code>&nbsp;\u7684\u6570\u91cf\u3002</p>\n\n<p>\u7531\u4e8e\u7ed3\u679c\u4f1a\u975e\u5e38\u5927\uff0c\u8bf7\u8fd4\u56de <code>\u7ed3\u679c\u9664\u4ee5 10^9 + 7 \u7684\u4f59\u6570</code>\u3002</p>\n\n<p>&nbsp;</p>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>A = [1,1,2,2,3,3,4,4,5,5], target = 8\n<strong>\u8f93\u51fa\uff1a</strong>20\n<strong>\u89e3\u91ca\uff1a</strong>\n\u6309\u503c\u679a\u4e3e\uff08A[i]\uff0cA[j]\uff0cA[k]\uff09\uff1a\n(1, 2, 5) \u51fa\u73b0 8 \u6b21\uff1b\n(1, 3, 4) \u51fa\u73b0 8 \u6b21\uff1b\n(2, 2, 4) \u51fa\u73b0 2 \u6b21\uff1b\n(2, 3, 3) \u51fa\u73b0 2 \u6b21\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 2\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>A = [1,1,2,2,2,2], target = 5\n<strong>\u8f93\u51fa\uff1a</strong>12\n<strong>\u89e3\u91ca\uff1a</strong>\nA[i] = 1\uff0cA[j] = A[k] = 2 \u51fa\u73b0 12 \u6b21\uff1a\n\u6211\u4eec\u4ece [1,1] \u4e2d\u9009\u62e9\u4e00\u4e2a 1\uff0c\u6709 2 \u79cd\u60c5\u51b5\uff0c\n\u4ece [2,2,2,2] \u4e2d\u9009\u51fa\u4e24\u4e2a 2\uff0c\u6709 6 \u79cd\u60c5\u51b5\u3002\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ol>\n\t<li><code>3 &lt;= A.length &lt;= 3000</code></li>\n\t<li><code>0 &lt;= A[i] &lt;= 100</code></li>\n\t<li><code>0 &lt;= target &lt;= 300</code></li>\n</ol>\n"}}}]);
//# sourceMappingURL=sourceCode-content932.05996da1.chunk.js.map