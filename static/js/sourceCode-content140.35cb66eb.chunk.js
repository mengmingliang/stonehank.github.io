(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{175:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number} N\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> bitwiseComplement = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">N</span>) </span>{\n  <span class="hljs-keyword">let</span> str=N.toString(<span class="hljs-number">2</span>)\n  <span class="hljs-keyword">let</span> len=str.length\n  <span class="hljs-keyword">let</span> candi=<span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>,len)<span class="hljs-number">-1</span>\n  <span class="hljs-keyword">return</span> N^candi\n};\n</code></pre>\n'],titleSlug:"complement-of-base-10-integer",hasThinking:!1,content:"<p>\u6bcf\u4e2a\u975e\u8d1f\u6574\u6570&nbsp;<code>N</code>&nbsp;\u90fd\u6709\u5176\u4e8c\u8fdb\u5236\u8868\u793a\u3002\u4f8b\u5982\uff0c&nbsp;<code>5</code>&nbsp;\u53ef\u4ee5\u88ab\u8868\u793a\u4e3a\u4e8c\u8fdb\u5236&nbsp;<code>&quot;101&quot;</code>\uff0c<code>11</code> \u53ef\u4ee5\u7528\u4e8c\u8fdb\u5236&nbsp;<code>&quot;1011&quot;</code>&nbsp;\u8868\u793a\uff0c\u4f9d\u6b64\u7c7b\u63a8\u3002\u6ce8\u610f\uff0c\u9664&nbsp;<code>N = 0</code>&nbsp;\u5916\uff0c\u4efb\u4f55\u4e8c\u8fdb\u5236\u8868\u793a\u4e2d\u90fd\u4e0d\u542b\u524d\u5bfc\u96f6\u3002</p>\n\n<p>\u4e8c\u8fdb\u5236\u7684\u53cd\u7801\u8868\u793a\u662f\u5c06\u6bcf\u4e2a&nbsp;<code>1</code>&nbsp;\u6539\u4e3a&nbsp;<code>0</code>&nbsp;\u4e14\u6bcf\u4e2a&nbsp;<code>0</code>&nbsp;\u53d8\u4e3a&nbsp;<code>1</code>\u3002\u4f8b\u5982\uff0c\u4e8c\u8fdb\u5236\u6570&nbsp;<code>&quot;101&quot;</code>&nbsp;\u7684\u4e8c\u8fdb\u5236\u53cd\u7801\u4e3a&nbsp;<code>&quot;010&quot;</code>\u3002</p>\n\n<p>\u7ed9\u5b9a\u5341\u8fdb\u5236\u6570&nbsp;<code>N</code>\uff0c\u8fd4\u56de\u5176\u4e8c\u8fdb\u5236\u8868\u793a\u7684\u53cd\u7801\u6240\u5bf9\u5e94\u7684\u5341\u8fdb\u5236\u6574\u6570\u3002</p>\n\n<p>&nbsp;</p>\n\n<ol>\n</ol>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>5\n<strong>\u8f93\u51fa\uff1a</strong>2\n<strong>\u89e3\u91ca\uff1a</strong>5 \u7684\u4e8c\u8fdb\u5236\u8868\u793a\u4e3a &quot;101&quot;\uff0c\u5176\u4e8c\u8fdb\u5236\u53cd\u7801\u4e3a &quot;010&quot;\uff0c\u4e5f\u5c31\u662f\u5341\u8fdb\u5236\u4e2d\u7684 2 \u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 2\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>7\n<strong>\u8f93\u51fa\uff1a</strong>0\n<strong>\u89e3\u91ca\uff1a</strong>7 \u7684\u4e8c\u8fdb\u5236\u8868\u793a\u4e3a &quot;111&quot;\uff0c\u5176\u4e8c\u8fdb\u5236\u53cd\u7801\u4e3a &quot;000&quot;\uff0c\u4e5f\u5c31\u662f\u5341\u8fdb\u5236\u4e2d\u7684 0 \u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 3\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>10\n<strong>\u8f93\u51fa\uff1a</strong>5\n<strong>\u89e3\u91ca\uff1a</strong>10 \u7684\u4e8c\u8fdb\u5236\u8868\u793a\u4e3a &quot;1010&quot;\uff0c\u5176\u4e8c\u8fdb\u5236\u53cd\u7801\u4e3a &quot;0101&quot;\uff0c\u4e5f\u5c31\u662f\u5341\u8fdb\u5236\u4e2d\u7684 5 \u3002\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ol>\n\t<li><code>0 &lt;= N &lt; 10^9</code></li>\n</ol>\n"}}}]);
//# sourceMappingURL=sourceCode-content140.35cb66eb.chunk.js.map