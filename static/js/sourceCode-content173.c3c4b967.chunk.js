(window.webpackJsonp=window.webpackJsonp||[]).push([[108],{208:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} A\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> minScoreTriangulation = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">A</span>) </span>{\n  <span class="hljs-keyword">let</span> dp=<span class="hljs-built_in">Array</span>(<span class="hljs-number">51</span>).fill().map(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span><span class="hljs-built_in">Array</span>(<span class="hljs-number">51</span>).fill(<span class="hljs-literal">null</span>))\n  <span class="hljs-keyword">return</span> dfs(<span class="hljs-number">0</span>,A.length<span class="hljs-number">-1</span>)\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dfs</span>(<span class="hljs-params">l,r</span>)</span>{\n    <span class="hljs-keyword">if</span>(r-l===<span class="hljs-number">1</span>)<span class="hljs-keyword">return</span> <span class="hljs-number">0</span>\n    <span class="hljs-keyword">if</span>(dp[l][r]!=<span class="hljs-literal">null</span>)<span class="hljs-keyword">return</span> dp[l][r]\n    <span class="hljs-keyword">let</span> area=<span class="hljs-literal">Infinity</span>\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> k=l+<span class="hljs-number">1</span>;k&lt;r;k++){\n      area=<span class="hljs-built_in">Math</span>.min(area,dfs(l,k)+dfs(k,r)+A[l]*A[k]*A[r])\n    }\n    dp[l][r]=area\n    <span class="hljs-keyword">return</span> area\n  }\n};\n</code></pre>\n'],titleSlug:"minimum-score-triangulation-of-polygon",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u5173\u952e\u662f\u5bf9\u591a\u8fb9\u5f62\u7684\u6b63\u786e\u5212\u5206\uff0c\u81ea\u5df1\u505a\u7684\u65f6\u5019\u6ca1\u6709\u5212\u5206\u597d\uff0c\u5bfc\u81f4\u4e00\u76f4<code>TLE</code>\uff1b</p>\n<p>\u4f8b\u5982\uff1a\u591a\u8fb9\u5f62<code>[1,2,3,4,5,6]</code>\uff0c\u9996\u5148\u53ef\u4ee5\u5212\u5206\u4e3a<code>[1,2,3]</code>\u548c<code>[3,4,5,6,1]</code>\uff0c\u8fd9\u6837\u53e6\u4e00\u4e2a\u591a\u8fb9\u5f62<code>[3,4,5,6,1]</code>\u662f\u8fde\u7eed\u7684\uff1b</p>\n<p>\u63a5\u7740\uff0c<code>[3,4,5,6,1]</code>\u5212\u5206\u4e3a<code>[3,4,5]</code>\u548c<code>[5,6,1,3]</code>\uff0c\u8fd9\u65f6<code>[5,6,1,3]</code>\u5c31\u662f\u4e00\u4e2a\u7d22\u5f15<strong>\u4e0d\u8fde\u7eed</strong>\u7684\u591a\u8fb9\u5f62\uff0c\u56e0\u4e3a\u4e2d\u95f4\u8fd8\u6709\u4e00\u4e2a\u7d22\u5f15<code>2</code>\u88ab\u8df3\u8fc7\u4e86\uff0c\n\u8fd9\u5c31\u5bfc\u81f4\u72b6\u6001\u5f88\u96be\u88ab\u4fdd\u5b58\uff1b</p>\n<p>\u6b63\u786e\u5bf9<code>[1,2,3,4,5,6]</code>\u7684\u5212\u5206\u5e94\u8be5\u662f</p>\n<ul>\n<li><code>[1~2]</code>\u548c<code>[2~6]</code>\u548c<code>[1,2,6]</code></li>\n<li><code>[1~3]</code>\u548c<code>[3~6]</code>\u548c<code>[1,3,6]</code></li>\n<li><code>[1~4]</code>\u548c<code>[4~6]</code>\u548c<code>[1,4,6]</code></li>\n</ul>\n<p>\u5982\u4e0a\u5212\u5206\uff0c\u901a\u8fc7\u5c06\u5934\u5c3e\u4f5c\u4e3a\u4e00\u4e2a\u4e09\u89d2\u5f62\uff0c\u5c31\u53ef\u4ee5\u4fdd\u8bc1\u591a\u8fb9\u5f62\u7684\u7d22\u5f15\u59cb\u7ec8\u662f\u8fde\u7eed\u7684\uff0c\u72b6\u6001\u4fdd\u5b58\u53ef\u4ee5\u53ea\u4fdd\u5b58\u8fde\u7eed\u7d22\u5f15\u533a\u95f4\u7684\u5934\u548c\u5c3e\uff0c\u81f3\u4e8e<code>3</code>\u4e2a\u6570\u7684\u533a\u95f4\uff0c\u76f4\u63a5\u8ba1\u7b97\u4e58\u79ef\uff0c\u5e76\u4e0d\u9700\u8981\u8fde\u7eed\u9650\u5236\u3002</p>\n",content:'<p>\u7ed9\u5b9a&nbsp;<code>N</code>\uff0c\u60f3\u8c61\u4e00\u4e2a\u51f8&nbsp;<code>N</code>&nbsp;\u8fb9\u591a\u8fb9\u5f62\uff0c\u5176\u9876\u70b9\u6309\u987a\u65f6\u9488\u987a\u5e8f\u4f9d\u6b21\u6807\u8bb0\u4e3a&nbsp;<code>A[0], A[i], ..., A[N-1]</code>\u3002</p>\n\n<p>\u5047\u8bbe\u60a8\u5c06\u591a\u8fb9\u5f62\u5256\u5206\u4e3a <code>N-2</code> \u4e2a\u4e09\u89d2\u5f62\u3002\u5bf9\u4e8e\u6bcf\u4e2a\u4e09\u89d2\u5f62\uff0c\u8be5\u4e09\u89d2\u5f62\u7684\u503c\u662f\u9876\u70b9\u6807\u8bb0\u7684<strong>\u4e58\u79ef</strong>\uff0c\u4e09\u89d2\u5256\u5206\u7684\u5206\u6570\u662f\u8fdb\u884c\u4e09\u89d2\u5256\u5206\u540e\u6240\u6709 <code>N-2</code> \u4e2a\u4e09\u89d2\u5f62\u7684\u503c\u4e4b\u548c\u3002</p>\n\n<p>\u8fd4\u56de\u591a\u8fb9\u5f62\u8fdb\u884c\u4e09\u89d2\u5256\u5206\u540e\u53ef\u4ee5\u5f97\u5230\u7684\u6700\u4f4e\u5206\u3002<br>\n&nbsp;</p>\n\n<ol>\n</ol>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>[1,2,3]\n<strong>\u8f93\u51fa\uff1a</strong>6\n<strong>\u89e3\u91ca\uff1a</strong>\u591a\u8fb9\u5f62\u5df2\u7ecf\u4e09\u89d2\u5316\uff0c\u552f\u4e00\u4e09\u89d2\u5f62\u7684\u5206\u6570\u4e3a 6\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 2\uff1a</strong></p>\n\n<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/05/03/minimum-score-triangulation-of-polygon-1.png" style="height: 150px; width: 253px;"></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>[3,7,4,5]\n<strong>\u8f93\u51fa\uff1a</strong>144\n<strong>\u89e3\u91ca\uff1a</strong>\u6709\u4e24\u79cd\u4e09\u89d2\u5256\u5206\uff0c\u53ef\u80fd\u5f97\u5206\u5206\u522b\u4e3a\uff1a3*7*5 + 4*5*7 = 245\uff0c\u6216 3*4*5 + 3*4*7 = 144\u3002\u6700\u4f4e\u5206\u6570\u4e3a 144\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 3\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>[1,3,1,4,1,5]\n<strong>\u8f93\u51fa\uff1a</strong>13\n<strong>\u89e3\u91ca\uff1a</strong>\u6700\u4f4e\u5206\u6570\u4e09\u89d2\u5256\u5206\u7684\u5f97\u5206\u60c5\u51b5\u4e3a 1*1*3 + 1*1*4 + 1*1*5 + 1*1*1 = 13\u3002\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ol>\n\t<li><code>3 &lt;= A.length &lt;= 50</code></li>\n\t<li><code>1 &lt;= A[i] &lt;= 100</code></li>\n</ol>\n'}}}]);
//# sourceMappingURL=sourceCode-content173.c3c4b967.chunk.js.map