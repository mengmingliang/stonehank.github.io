(window.webpackJsonp=window.webpackJsonp||[]).push([[132],{230:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[][]} matrix\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> maxEqualRowsAfterFlips = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">matrix</span>) </span>{\n  <span class="hljs-keyword">let</span> m=matrix.length,n=matrix[<span class="hljs-number">0</span>].length\n  <span class="hljs-keyword">let</span> max=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">let</span> hash={}\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;m;i++){\n    <span class="hljs-keyword">if</span>(hash[i])<span class="hljs-keyword">continue</span>\n    <span class="hljs-keyword">let</span> count=<span class="hljs-number">1</span>\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=i+<span class="hljs-number">1</span>;j&lt;m;j++){\n      <span class="hljs-keyword">if</span>(hash[j])<span class="hljs-keyword">continue</span>\n      <span class="hljs-keyword">let</span> isSame=<span class="hljs-literal">true</span>\n      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> k=<span class="hljs-number">1</span>;k&lt;n;k++){\n        <span class="hljs-keyword">if</span>(matrix[i][k] ^ matrix[j][k]!==matrix[i][<span class="hljs-number">0</span>] ^ matrix[j][<span class="hljs-number">0</span>]) {\n          isSame=<span class="hljs-literal">false</span>\n          <span class="hljs-keyword">break</span>\n        }\n      }\n      <span class="hljs-keyword">if</span>(isSame){\n        count++\n        hash[j]=<span class="hljs-literal">true</span>\n      }\n    }\n    max=<span class="hljs-built_in">Math</span>.max(max,count)\n  }\n  <span class="hljs-keyword">return</span> max\n};\n</code></pre>\n'],titleSlug:"flip-columns-for-maximum-number-of-equal-rows",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u904d\u5386\u6bcf\u4e00\u884c\uff0c\u5047\u8bbe\u5f53\u524d\u884c\u5728\u7ed3\u679c\u5f53\u4e2d\uff0c\u610f\u601d\u5c31\u662f\u627e\u51fa\u6240\u6709\u4e0e\u5f53\u524d\u884c\u4e2d\u6bcf\u4e00\u5217\u7684\u5f02\u6216\u503c\u90fd\u76f8\u7b49(\u90fd\u4e3a<code>1</code>\u6216\u8005\u90fd\u4e3a<code>0</code>)\u7684\u6240\u6709\u884c\uff0c</p>\n<p>\u4f8b\u5982\uff0c\u5f53\u524d\u884c\u4e3a<code>[1,0,1,0,1]</code></p>\n<p>\u90a3\u4e48<code>[1,0,1,0,1]</code>\u548c<code>[0,1,0,1,0]</code>\u90fd\u662f\u4e0e\u5b83\u5f02\u6216\u503c\u76f8\u7b49\u7684\u884c\uff0c\u5f02\u6216\u503c\u5206\u522b\u4e3a<code>[0,0,0,0,0]</code>\u548c<code>[1,1,1,1,1]</code>\uff0c</p>\n<p>\u800c<code>[1,1,1,0,1]</code>\u5219\u4e0d\u662f\uff0c\u5f02\u6216\u503c\u4e3a<code>[0,1,0,0,0]</code>\uff1b</p>\n<p>\u5bf9\u4e8e\u6bcf\u4e00\u6b21\u627e\u5230\u5f02\u6216\u503c\u76f8\u7b49\u7684\u884c\uff0c\u4f7f\u7528\u4e00\u4e2a<code>hash</code>\u5c06\u884c\u7684\u7d22\u5f15\u4fdd\u5b58\u8d77\u6765\uff0c\u540e\u9762\u9047\u5230\u76f4\u63a5\u8df3\u8fc7\uff08\u907f\u514d\u91cd\u590d\u8ba1\u7b97\uff09\uff0c\u56e0\u4e3a\u5982\u679c\u4e0d\u8df3\u8fc7\uff0c\u90a3\u4e48\u6b64\u884c\u518d\u6b21\u627e\u5230\u76f8\u540c\u7684\u5f02\u6216\u503c\uff0c\u4e00\u5b9a\u662f\u5df2\u7ecf\u5305\u542b\u5728\u4e4b\u524d\u8ba1\u7b97\u7684\u6700\u5927\u7ed3\u679c\u5185\u3002</p>\n",content:"<p>\u7ed9\u5b9a\u7531\u82e5\u5e72 0 \u548c 1 \u7ec4\u6210\u7684\u77e9\u9635&nbsp;<code>matrix</code>\uff0c\u4ece\u4e2d\u9009\u51fa\u4efb\u610f\u6570\u91cf\u7684\u5217\u5e76\u7ffb\u8f6c\u5176\u4e0a\u7684&nbsp;<strong>\u6bcf\u4e2a&nbsp;</strong>\u5355\u5143\u683c\u3002\u7ffb\u8f6c\u540e\uff0c\u5355\u5143\u683c\u7684\u503c\u4ece 0 \u53d8\u6210 1\uff0c\u6216\u8005\u4ece 1 \u53d8\u4e3a 0 \u3002</p>\n\n<p>\u8fd4\u56de\u7ecf\u8fc7\u4e00\u4e9b\u7ffb\u8f6c\u540e\uff0c\u884c\u4e0a\u6240\u6709\u503c\u90fd\u76f8\u7b49\u7684\u6700\u5927\u884c\u6570\u3002</p>\n\n<p>&nbsp;</p>\n\n<ol>\n</ol>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>[[0,1],[1,1]]\n<strong>\u8f93\u51fa\uff1a</strong>1\n<strong>\u89e3\u91ca\uff1a</strong>\u4e0d\u8fdb\u884c\u7ffb\u8f6c\uff0c\u6709 1 \u884c\u6240\u6709\u503c\u90fd\u76f8\u7b49\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 2\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>[[0,1],[1,0]]\n<strong>\u8f93\u51fa\uff1a</strong>2\n<strong>\u89e3\u91ca\uff1a</strong>\u7ffb\u8f6c\u7b2c\u4e00\u5217\u7684\u503c\u4e4b\u540e\uff0c\u8fd9\u4e24\u884c\u90fd\u7531\u76f8\u7b49\u7684\u503c\u7ec4\u6210\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 3\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>[[0,0,0],[0,0,1],[1,1,0]]\n<strong>\u8f93\u51fa\uff1a</strong>2\n<strong>\u89e3\u91ca\uff1a</strong>\u7ffb\u8f6c\u524d\u4e24\u5217\u7684\u503c\u4e4b\u540e\uff0c\u540e\u4e24\u884c\u7531\u76f8\u7b49\u7684\u503c\u7ec4\u6210\u3002</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ol>\n\t<li><code>1 &lt;= matrix.length &lt;= 300</code></li>\n\t<li><code>1 &lt;= matrix[i].length &lt;= 300</code></li>\n\t<li>\u6240\u6709 <code>matrix[i].length</code>&nbsp;\u90fd\u76f8\u7b49</li>\n\t<li><code>matrix[i][j]</code> \u4e3a&nbsp;<code>0</code> \u6216&nbsp;<code>1</code></li>\n</ol>\n"}}}]);
//# sourceMappingURL=sourceCode-content195.289f7dc1.chunk.js.map