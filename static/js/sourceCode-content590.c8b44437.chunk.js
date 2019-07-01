(window.webpackJsonp=window.webpackJsonp||[]).push([[571],{625:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} nums\n * @return {boolean}\n */</span>\n<span class="hljs-keyword">var</span> canJump = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nums</span>) </span>{\n  <span class="hljs-keyword">let</span> reach = <span class="hljs-number">0</span>;\n  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>; i&lt;nums.length<span class="hljs-number">-1</span> &amp;&amp; i&lt;=reach;++i){\n    reach=<span class="hljs-built_in">Math</span>.max(i+nums[i], reach);\n  }\n  <span class="hljs-keyword">return</span> reach &gt;= nums.length<span class="hljs-number">-1</span>\n};\n</code></pre>\n'],titleSlug:"jump-game",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u8d2a\u5fc3\uff0c\u5bf9\u4e8e\u6bcf\u4e00\u4e2a\u70b9\uff0c\u627e\u5230\u5b83\u80fd\u8df3\u8dc3\u7684\u6700\u5927\u4f4d\u7f6e\uff0c\u76f4\u5230\u6700\u540e\u4e00\u4e2a\u70b9\uff0c\u6700\u540e\u68c0\u67e5\u6700\u5927\u4f4d\u7f6e\u662f\u5426\u8d85\u8fc7\u6700\u540e\u7684\u70b9\u3002</p>\n",content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u975e\u8d1f\u6574\u6570\u6570\u7ec4\uff0c\u4f60\u6700\u521d\u4f4d\u4e8e\u6570\u7ec4\u7684\u7b2c\u4e00\u4e2a\u4f4d\u7f6e\u3002</p>\n\n<p>\u6570\u7ec4\u4e2d\u7684\u6bcf\u4e2a\u5143\u7d20\u4ee3\u8868\u4f60\u5728\u8be5\u4f4d\u7f6e\u53ef\u4ee5\u8df3\u8dc3\u7684\u6700\u5927\u957f\u5ea6\u3002</p>\n\n<p>\u5224\u65ad\u4f60\u662f\u5426\u80fd\u591f\u5230\u8fbe\u6700\u540e\u4e00\u4e2a\u4f4d\u7f6e\u3002</p>\n\n<p><strong>\u793a\u4f8b&nbsp;1:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> [2,3,1,1,4]\n<strong>\u8f93\u51fa:</strong> true\n<strong>\u89e3\u91ca:</strong> \u4ece\u4f4d\u7f6e 0 \u5230 1 \u8df3 1 \u6b65, \u7136\u540e\u8df3 3 \u6b65\u5230\u8fbe\u6700\u540e\u4e00\u4e2a\u4f4d\u7f6e\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b&nbsp;2:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> [3,2,1,0,4]\n<strong>\u8f93\u51fa:</strong> false\n<strong>\u89e3\u91ca:</strong> \u65e0\u8bba\u600e\u6837\uff0c\u4f60\u603b\u4f1a\u5230\u8fbe\u7d22\u5f15\u4e3a 3 \u7684\u4f4d\u7f6e\u3002\u4f46\u8be5\u4f4d\u7f6e\u7684\u6700\u5927\u8df3\u8dc3\u957f\u5ea6\u662f 0 \uff0c \u6240\u4ee5\u4f60\u6c38\u8fdc\u4e0d\u53ef\u80fd\u5230\u8fbe\u6700\u540e\u4e00\u4e2a\u4f4d\u7f6e\u3002\n</pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content590.c8b44437.chunk.js.map