(window.webpackJsonp=window.webpackJsonp||[]).push([[975],{990:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {string[]} A\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> minDeletionSize = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">A</span>) </span>{\n  <span class="hljs-keyword">let</span> res=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;A[<span class="hljs-number">0</span>].length;i++){\n    <span class="hljs-keyword">let</span> needDel=<span class="hljs-literal">false</span>\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">1</span>;j&lt;A.length;j++){\n      <span class="hljs-keyword">if</span>(A[j][i]&lt;A[j<span class="hljs-number">-1</span>][i]){\n        <span class="hljs-comment">// console.log(A[j],i)</span>\n        res++\n        <span class="hljs-keyword">break</span>\n      }\n    }\n  }\n  <span class="hljs-keyword">return</span> res\n};\n</code></pre>\n'],titleSlug:"delete-columns-to-make-sorted",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u9010\u5217\u68c0\u67e5\uff0c\u53d1\u73b0\u4e0d\u7b26\u5408<code>res++</code>\u3002</p>\n",content:"<p>\u7ed9\u5b9a\u7531&nbsp;<code>N</code>&nbsp;\u4e2a\u5c0f\u5199\u5b57\u6bcd\u5b57\u7b26\u4e32\u7ec4\u6210\u7684\u6570\u7ec4 <code>A</code>\uff0c\u5176\u4e2d\u6bcf\u4e2a\u5b57\u7b26\u4e32\u957f\u5ea6\u76f8\u7b49\u3002</p>\n\n<p>\u9009\u53d6\u4e00\u4e2a\u5220\u9664\u7d22\u5f15\u5e8f\u5217\uff0c\u5bf9\u4e8e <code>A</code> \u4e2d\u7684\u6bcf\u4e2a\u5b57\u7b26\u4e32\uff0c\u5220\u9664\u5bf9\u5e94\u6bcf\u4e2a\u7d22\u5f15\u5904\u7684\u5b57\u7b26\u3002 \u6240\u4f59\u4e0b\u7684\u5b57\u7b26\u4e32\u884c\u4ece\u4e0a\u5f80\u4e0b\u8bfb\u5f62\u6210\u5217\u3002</p>\n\n<p>\u6bd4\u5982\uff0c\u6709&nbsp;<code>A = [&quot;abcdef&quot;, &quot;uvwxyz&quot;]</code>\uff0c\u5220\u9664\u7d22\u5f15\u5e8f\u5217&nbsp;<code>{0, 2, 3}</code>\uff0c\u5220\u9664\u540e <code>A</code>&nbsp;\u4e3a<code>[&quot;bef&quot;, &quot;vyz&quot;]</code>\uff0c <code>A</code>&nbsp;\u7684\u5217\u5206\u522b\u4e3a<code>[&quot;b&quot;,&quot;v&quot;], [&quot;e&quot;,&quot;y&quot;], [&quot;f&quot;,&quot;z&quot;]</code>\u3002\uff08\u5f62\u5f0f\u4e0a\uff0c\u7b2c n&nbsp;\u5217\u4e3a&nbsp;<code>[A[0][n], A[1][n], ..., A[A.length-1][n]]</code>\uff09\u3002</p>\n\n<p>\u5047\u8bbe\uff0c\u6211\u4eec\u9009\u62e9\u4e86\u4e00\u7ec4\u5220\u9664\u7d22\u5f15&nbsp;<code>D</code>\uff0c\u90a3\u4e48\u5728\u6267\u884c\u5220\u9664\u64cd\u4f5c\u4e4b\u540e\uff0c<code>A</code> \u4e2d\u6240\u5269\u4f59\u7684\u6bcf\u4e00\u5217\u90fd\u5fc5\u987b\u662f <strong>\u975e\u964d\u5e8f</strong>&nbsp;\u6392\u5217\u7684\uff0c\u7136\u540e\u8bf7\u4f60\u8fd4\u56de&nbsp;<code>D.length</code>&nbsp;\u7684\u6700\u5c0f\u53ef\u80fd\u503c\u3002</p>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>[&quot;cba&quot;, &quot;daf&quot;, &quot;ghi&quot;]\n<strong>\u8f93\u51fa\uff1a</strong>1\n<strong>\u89e3\u91ca\uff1a</strong>\n\u5f53\u9009\u62e9 D = {1}\uff0c\u5220\u9664\u540e A \u7684\u5217\u4e3a\uff1a[&quot;c&quot;,&quot;d&quot;,&quot;g&quot;] \u548c [&quot;a&quot;,&quot;f&quot;,&quot;i&quot;]\uff0c\u5747\u4e3a\u975e\u964d\u5e8f\u6392\u5217\u3002\n\u82e5\u9009\u62e9 D = {}\uff0c\u90a3\u4e48 A \u7684\u5217 [&quot;b&quot;,&quot;a&quot;,&quot;h&quot;] \u5c31\u4e0d\u662f\u975e\u964d\u5e8f\u6392\u5217\u4e86\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 2\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>[&quot;a&quot;, &quot;b&quot;]\n<strong>\u8f93\u51fa\uff1a</strong>0\n<strong>\u89e3\u91ca\uff1a</strong>D = {}\n</pre>\n\n<p><strong>\u793a\u4f8b 3\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>[&quot;zyx&quot;, &quot;wvu&quot;, &quot;tsr&quot;]\n<strong>\u8f93\u51fa\uff1a</strong>3\n<strong>\u89e3\u91ca\uff1a</strong>D = {0, 1, 2}\n</pre>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ol>\n\t<li><code>1 &lt;= A.length &lt;= 100</code></li>\n\t<li><code>1 &lt;= A[i].length &lt;= 1000</code></li>\n</ol>\n"}}}]);
//# sourceMappingURL=sourceCode-content955.583f28d1.chunk.js.map