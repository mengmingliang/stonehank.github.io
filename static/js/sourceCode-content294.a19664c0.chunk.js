(window.webpackJsonp=window.webpackJsonp||[]).push([[242],{329:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number} n - a positive integer\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> hammingWeight = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">n</span>) </span>{\n  <span class="hljs-keyword">let</span> count=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-number">32</span>;i++){\n    count+=n&gt;&gt;i&amp;<span class="hljs-number">1</span>\n  }\n  <span class="hljs-keyword">return</span> count\n};\n</code></pre>\n'],titleSlug:"number-of-1-bits",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u56e0\u4e3a\u662f<code>32</code>\u4f4d\uff0c\u56e0\u6b64\u5bf9<code>n</code>\u53f3\u79fb<code>&gt;&gt;</code>32\u6b21\uff0c\u6bcf\u6b21\u53f3\u79fb\u68c0\u67e5\u5f53\u524d\u6700\u540e\u4e00\u4f4d\u662f\u5426<code>1</code>\u3002</p>\n",content:'<p>\u7f16\u5199\u4e00\u4e2a\u51fd\u6570\uff0c\u8f93\u5165\u662f\u4e00\u4e2a\u65e0\u7b26\u53f7\u6574\u6570\uff0c\u8fd4\u56de\u5176\u4e8c\u8fdb\u5236\u8868\u8fbe\u5f0f\u4e2d\u6570\u5b57\u4f4d\u6570\u4e3a &lsquo;1&rsquo;&nbsp;\u7684\u4e2a\u6570\uff08\u4e5f\u88ab\u79f0\u4e3a<a href="https://baike.baidu.com/item/%E6%B1%89%E6%98%8E%E9%87%8D%E9%87%8F" target="_blank">\u6c49\u660e\u91cd\u91cf</a>\uff09\u3002</p>\n\n<p>&nbsp;</p>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>00000000000000000000000000001011\n<strong>\u8f93\u51fa\uff1a</strong>3\n<strong>\u89e3\u91ca\uff1a</strong>\u8f93\u5165\u7684\u4e8c\u8fdb\u5236\u4e32 <code><strong>00000000000000000000000000001011</strong>&nbsp;\u4e2d\uff0c\u5171\u6709\u4e09\u4f4d\u4e3a &#39;1&#39;\u3002</code>\n</pre>\n\n<p><strong>\u793a\u4f8b 2\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>00000000000000000000000010000000\n<strong>\u8f93\u51fa\uff1a</strong>1\n<strong>\u89e3\u91ca\uff1a</strong>\u8f93\u5165\u7684\u4e8c\u8fdb\u5236\u4e32 <strong>00000000000000000000000010000000</strong>&nbsp;\u4e2d\uff0c\u5171\u6709\u4e00\u4f4d\u4e3a &#39;1&#39;\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 3\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>11111111111111111111111111111101\n<strong>\u8f93\u51fa\uff1a</strong>31\n<strong>\u89e3\u91ca\uff1a</strong>\u8f93\u5165\u7684\u4e8c\u8fdb\u5236\u4e32 <strong>11111111111111111111111111111101</strong> \u4e2d\uff0c\u5171\u6709 31 \u4f4d\u4e3a &#39;1&#39;\u3002</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ul>\n\t<li>\u8bf7\u6ce8\u610f\uff0c\u5728\u67d0\u4e9b\u8bed\u8a00\uff08\u5982 Java\uff09\u4e2d\uff0c\u6ca1\u6709\u65e0\u7b26\u53f7\u6574\u6570\u7c7b\u578b\u3002\u5728\u8fd9\u79cd\u60c5\u51b5\u4e0b\uff0c\u8f93\u5165\u548c\u8f93\u51fa\u90fd\u5c06\u88ab\u6307\u5b9a\u4e3a\u6709\u7b26\u53f7\u6574\u6570\u7c7b\u578b\uff0c\u5e76\u4e14\u4e0d\u5e94\u5f71\u54cd\u60a8\u7684\u5b9e\u73b0\uff0c\u56e0\u4e3a\u65e0\u8bba\u6574\u6570\u662f\u6709\u7b26\u53f7\u7684\u8fd8\u662f\u65e0\u7b26\u53f7\u7684\uff0c\u5176\u5185\u90e8\u7684\u4e8c\u8fdb\u5236\u8868\u793a\u5f62\u5f0f\u90fd\u662f\u76f8\u540c\u7684\u3002</li>\n\t<li>\u5728 Java \u4e2d\uff0c\u7f16\u8bd1\u5668\u4f7f\u7528<a href="https://baike.baidu.com/item/\u4e8c\u8fdb\u5236\u8865\u7801/5295284" target="_blank">\u4e8c\u8fdb\u5236\u8865\u7801</a>\u8bb0\u6cd5\u6765\u8868\u793a\u6709\u7b26\u53f7\u6574\u6570\u3002\u56e0\u6b64\uff0c\u5728\u4e0a\u9762\u7684&nbsp;<strong>\u793a\u4f8b 3</strong>&nbsp;\u4e2d\uff0c\u8f93\u5165\u8868\u793a\u6709\u7b26\u53f7\u6574\u6570 <code>-3</code>\u3002</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>\u8fdb\u9636</strong>:<br>\n\u5982\u679c\u591a\u6b21\u8c03\u7528\u8fd9\u4e2a\u51fd\u6570\uff0c\u4f60\u5c06\u5982\u4f55\u4f18\u5316\u4f60\u7684\u7b97\u6cd5\uff1f</p>\n'}}}]);
//# sourceMappingURL=sourceCode-content294.a19664c0.chunk.js.map