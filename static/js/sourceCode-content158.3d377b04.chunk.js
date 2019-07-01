(window.webpackJsonp=window.webpackJsonp||[]).push([[91],{193:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number} N\n * @return {boolean}\n */</span>\n<span class="hljs-keyword">var</span> hash={}\n<span class="hljs-keyword">var</span> divisorGame = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">N</span>) </span>{\n  <span class="hljs-keyword">if</span>(hash[N]!=<span class="hljs-literal">null</span>)<span class="hljs-keyword">return</span> hash[N]\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getD</span>(<span class="hljs-params">N</span>)</span>{\n    <span class="hljs-keyword">let</span> res=[]\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">1</span>;i&lt;N;i++){\n      <span class="hljs-keyword">if</span>(N % i===<span class="hljs-number">0</span>)res.push(i)\n    }\n    <span class="hljs-keyword">return</span> res\n  }\n  <span class="hljs-keyword">let</span> d=getD(N)\n  <span class="hljs-keyword">let</span> result=<span class="hljs-literal">false</span>\n  <span class="hljs-keyword">if</span>(d.length===<span class="hljs-number">0</span>){\n    hash[N]=<span class="hljs-literal">false</span>\n    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>\n  }\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;d.length;i++){\n    <span class="hljs-keyword">let</span> next=divisorGame(N-d[i])\n    <span class="hljs-keyword">if</span>(!next){\n      result=<span class="hljs-literal">true</span>\n      <span class="hljs-keyword">break</span>\n    }\n  }\n  hash[N]=result\n  <span class="hljs-keyword">return</span> result\n  \n};\n</code></pre>\n'],titleSlug:"divisor-game",hasThinking:!1,content:"<p>\u7231\u4e3d\u4e1d\u548c\u9c8d\u52c3\u4e00\u8d77\u73a9\u6e38\u620f\uff0c\u4ed6\u4eec\u8f6e\u6d41\u884c\u52a8\u3002\u7231\u4e3d\u4e1d\u5148\u624b\u5f00\u5c40\u3002</p>\n\n<p>\u6700\u521d\uff0c\u9ed1\u677f\u4e0a\u6709\u4e00\u4e2a\u6570\u5b57&nbsp;<code>N</code>&nbsp;\u3002\u5728\u6bcf\u4e2a\u73a9\u5bb6\u7684\u56de\u5408\uff0c\u73a9\u5bb6\u9700\u8981\u6267\u884c\u4ee5\u4e0b\u64cd\u4f5c\uff1a</p>\n\n<ul>\n\t<li>\u9009\u51fa\u4efb\u4e00&nbsp;<code>x</code>\uff0c\u6ee1\u8db3&nbsp;<code>0 &lt; x &lt; N</code> \u4e14&nbsp;<code>N % x == 0</code>&nbsp;\u3002</li>\n\t<li>\u7528 <code>N - x</code>&nbsp;\u66ff\u6362\u9ed1\u677f\u4e0a\u7684\u6570\u5b57 <code>N</code> \u3002</li>\n</ul>\n\n<p>\u5982\u679c\u73a9\u5bb6\u65e0\u6cd5\u6267\u884c\u8fd9\u4e9b\u64cd\u4f5c\uff0c\u5c31\u4f1a\u8f93\u6389\u6e38\u620f\u3002</p>\n\n<p>\u53ea\u6709\u5728\u7231\u4e3d\u4e1d\u5728\u6e38\u620f\u4e2d\u53d6\u5f97\u80dc\u5229\u65f6\u624d\u8fd4\u56de&nbsp;<code>True</code>\uff0c\u5426\u5219\u8fd4\u56de <code>false</code>\u3002\u5047\u8bbe\u4e24\u4e2a\u73a9\u5bb6\u90fd\u4ee5\u6700\u4f73\u72b6\u6001\u53c2\u4e0e\u6e38\u620f\u3002</p>\n\n<p>&nbsp;</p>\n\n<ol>\n</ol>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>2\n<strong>\u8f93\u51fa\uff1a</strong>true\n<strong>\u89e3\u91ca\uff1a</strong>\u7231\u4e3d\u4e1d\u9009\u62e9 1\uff0c\u9c8d\u52c3\u65e0\u6cd5\u8fdb\u884c\u64cd\u4f5c\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 2\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>3\n<strong>\u8f93\u51fa\uff1a</strong>false\n<strong>\u89e3\u91ca\uff1a</strong>\u7231\u4e3d\u4e1d\u9009\u62e9 1\uff0c\u9c8d\u52c3\u4e5f\u9009\u62e9 1\uff0c\u7136\u540e\u7231\u4e3d\u4e1d\u65e0\u6cd5\u8fdb\u884c\u64cd\u4f5c\u3002\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ol>\n\t<li><code>1 &lt;= N &lt;= 1000</code></li>\n</ol>\n"}}}]);
//# sourceMappingURL=sourceCode-content158.3d377b04.chunk.js.map