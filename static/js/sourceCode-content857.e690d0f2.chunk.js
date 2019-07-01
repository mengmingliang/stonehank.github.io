(window.webpackJsonp=window.webpackJsonp||[]).push([[866],{892:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {string} S\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> scoreOfParentheses = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">S</span>) </span>{\n  <span class="hljs-keyword">if</span>(S===<span class="hljs-string">""</span>)<span class="hljs-keyword">return</span> <span class="hljs-number">0.5</span>\n  <span class="hljs-keyword">let</span> res=<span class="hljs-number">0</span>,c=<span class="hljs-number">0</span>,s=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;S.length;i++){\n    <span class="hljs-keyword">if</span>(S[i]===<span class="hljs-string">"("</span>)c++\n    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(S[i]===<span class="hljs-string">")"</span>)c--\n    <span class="hljs-keyword">if</span>(c===<span class="hljs-number">0</span>){\n      res+=scoreOfParentheses(S.substring(s+<span class="hljs-number">1</span>,i))*<span class="hljs-number">2</span>\n      s=i+<span class="hljs-number">1</span>\n    }\n  }\n  <span class="hljs-keyword">return</span> res\n};\n</code></pre>\n'],titleSlug:"score-of-parentheses",hasThinking:!1,content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u5e73\u8861\u62ec\u53f7\u5b57\u7b26\u4e32&nbsp;<code>S</code>\uff0c\u6309\u4e0b\u8ff0\u89c4\u5219\u8ba1\u7b97\u8be5\u5b57\u7b26\u4e32\u7684\u5206\u6570\uff1a</p>\n\n<ul>\n\t<li><code>()</code> \u5f97 1 \u5206\u3002</li>\n\t<li><code>AB</code> \u5f97&nbsp;<code>A + B</code>&nbsp;\u5206\uff0c\u5176\u4e2d A \u548c B \u662f\u5e73\u8861\u62ec\u53f7\u5b57\u7b26\u4e32\u3002</li>\n\t<li><code>(A)</code> \u5f97&nbsp;<code>2 * A</code>&nbsp;\u5206\uff0c\u5176\u4e2d A \u662f\u5e73\u8861\u62ec\u53f7\u5b57\u7b26\u4e32\u3002</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a </strong>&quot;()&quot;\n<strong>\u8f93\u51fa\uff1a </strong>1\n</pre>\n\n<p><strong>\u793a\u4f8b 2\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a </strong>&quot;(())&quot;\n<strong>\u8f93\u51fa\uff1a </strong>2\n</pre>\n\n<p><strong>\u793a\u4f8b&nbsp;3\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a </strong>&quot;()()&quot;\n<strong>\u8f93\u51fa\uff1a </strong>2\n</pre>\n\n<p><strong>\u793a\u4f8b&nbsp;4\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a </strong>&quot;(()(()))&quot;\n<strong>\u8f93\u51fa\uff1a </strong>6\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ol>\n\t<li><code>S</code>&nbsp;\u662f\u5e73\u8861\u62ec\u53f7\u5b57\u7b26\u4e32\uff0c\u4e14\u53ea\u542b\u6709&nbsp;<code>(</code>&nbsp;\u548c&nbsp;<code>)</code>&nbsp;\u3002</li>\n\t<li><code>2 &lt;= S.length &lt;= 50</code></li>\n</ol>\n"}}}]);
//# sourceMappingURL=sourceCode-content857.e690d0f2.chunk.js.map