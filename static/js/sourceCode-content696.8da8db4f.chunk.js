(window.webpackJsonp=window.webpackJsonp||[]).push([[688],{731:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number} n\n * @return {boolean}\n */</span>\n<span class="hljs-keyword">var</span> hasAlternatingBits = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">n</span>) </span>{\n  <span class="hljs-keyword">let</span> last;\n  <span class="hljs-keyword">while</span>(n&gt;<span class="hljs-number">0</span>){\n    <span class="hljs-keyword">let</span> cur=n%<span class="hljs-number">2</span>\n    <span class="hljs-keyword">if</span>(last!==cur){\n      last=cur\n    }<span class="hljs-keyword">else</span>{\n      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>\n    }\n    n=n&gt;&gt;<span class="hljs-number">1</span>\n  }\n  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>\n};\n</code></pre>\n'],titleSlug:"binary-number-with-alternating-bits",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u5c06\u6570\u5b57\u8f6c\u6362\u4e3a\u4e8c\u8fdb\u5236\u7684\u8fc7\u7a0b\u4e2d\uff0c\u4e0d\u65ad\u68c0\u67e5\u5f53\u524d\u4f4d\u7684\u6570\u5b57\u662f\u5426\u548c\u4e0a\u4e00\u4f4d\u76f8\u53cd\u3002</p>\n",content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u6b63\u6574\u6570\uff0c\u68c0\u67e5\u4ed6\u662f\u5426\u4e3a\u4ea4\u66ff\u4f4d\u4e8c\u8fdb\u5236\u6570\uff1a\u6362\u53e5\u8bdd\u8bf4\uff0c\u5c31\u662f\u4ed6\u7684\u4e8c\u8fdb\u5236\u6570\u76f8\u90bb\u7684\u4e24\u4e2a\u4f4d\u6570\u6c38\u4e0d\u76f8\u7b49\u3002</p>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> 5\n<strong>\u8f93\u51fa:</strong> True\n<strong>\u89e3\u91ca:</strong>\n5\u7684\u4e8c\u8fdb\u5236\u6570\u662f: 101\n</pre>\n\n<p><strong>\u793a\u4f8b 2:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> 7\n<strong>\u8f93\u51fa:</strong> False\n<strong>\u89e3\u91ca:</strong>\n7\u7684\u4e8c\u8fdb\u5236\u6570\u662f: 111\n</pre>\n\n<p><strong>\u793a\u4f8b&nbsp;3:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> 11\n<strong>\u8f93\u51fa:</strong> False\n<strong>\u89e3\u91ca:</strong>\n11\u7684\u4e8c\u8fdb\u5236\u6570\u662f: 1011\n</pre>\n\n<p><strong>&nbsp;\u793a\u4f8b 4:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> 10\n<strong>\u8f93\u51fa:</strong> True\n<strong>\u89e3\u91ca:</strong>\n10\u7684\u4e8c\u8fdb\u5236\u6570\u662f: 1010\n</pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content696.8da8db4f.chunk.js.map