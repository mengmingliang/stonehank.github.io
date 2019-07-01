(window.webpackJsonp=window.webpackJsonp||[]).push([[897],{920:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} people\n * @param {number} limit\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> numRescueBoats = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">people, limit</span>) </span>{\n  people.sort(<span class="hljs-function">(<span class="hljs-params">a,b</span>)=&gt;</span>a-b)\n  <span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>,j=people.length<span class="hljs-number">-1</span>\n  <span class="hljs-keyword">let</span> boats=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">while</span>(i&lt;j){\n    <span class="hljs-keyword">let</span> head=people[i],\n        tail=people[j]\n    <span class="hljs-keyword">if</span>(head+tail&lt;=limit){\n      i++\n      j--\n    }<span class="hljs-keyword">else</span>{\n      j--\n    }\n    boats++\n  }\n  <span class="hljs-keyword">if</span>(i===j)boats++\n  <span class="hljs-keyword">return</span> boats\n};\n</code></pre>\n'],titleSlug:"boats-to-save-people",hasThinking:!1,content:"<p>\u7b2c&nbsp;<code>i</code>&nbsp;\u4e2a\u4eba\u7684\u4f53\u91cd\u4e3a&nbsp;<code>people[i]</code>\uff0c\u6bcf\u8258\u8239\u53ef\u4ee5\u627f\u8f7d\u7684\u6700\u5927\u91cd\u91cf\u4e3a&nbsp;<code>limit</code>\u3002</p>\n\n<p>\u6bcf\u8258\u8239\u6700\u591a\u53ef\u540c\u65f6\u8f7d\u4e24\u4eba\uff0c\u4f46\u6761\u4ef6\u662f\u8fd9\u4e9b\u4eba\u7684\u91cd\u91cf\u4e4b\u548c\u6700\u591a\u4e3a&nbsp;<code>limit</code>\u3002</p>\n\n<p>\u8fd4\u56de\u8f7d\u5230\u6bcf\u4e00\u4e2a\u4eba\u6240\u9700\u7684\u6700\u5c0f\u8239\u6570\u3002(\u4fdd\u8bc1\u6bcf\u4e2a\u4eba\u90fd\u80fd\u88ab\u8239\u8f7d)\u3002</p>\n\n<p>&nbsp;</p>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>people = [1,2], limit = 3\n<strong>\u8f93\u51fa\uff1a</strong>1\n<strong>\u89e3\u91ca\uff1a</strong>1 \u8258\u8239\u8f7d (1, 2)\n</pre>\n\n<p><strong>\u793a\u4f8b 2\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>people = [3,2,2,1], limit = 3\n<strong>\u8f93\u51fa\uff1a</strong>3\n<strong>\u89e3\u91ca\uff1a</strong>3 \u8258\u8239\u5206\u522b\u8f7d (1, 2), (2) \u548c (3)\n</pre>\n\n<p><strong>\u793a\u4f8b 3\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>people = [3,5,3,4], limit = 5\n<strong>\u8f93\u51fa\uff1a</strong>4\n<strong>\u89e3\u91ca\uff1a</strong>4 \u8258\u8239\u5206\u522b\u8f7d (3), (3), (4), (5)</pre>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ul>\n\t<li><code>1 &lt;=&nbsp;people.length &lt;= 50000</code></li>\n\t<li><code>1 &lt;= people[i] &lt;=&nbsp;limit &lt;= 30000</code></li>\n</ul>\n"}}}]);
//# sourceMappingURL=sourceCode-content885.f014d71d.chunk.js.map