(window.webpackJsonp=window.webpackJsonp||[]).push([[677],{721:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {string[]} ops\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> calPoints = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ops</span>) </span>{\n  <span class="hljs-keyword">let</span> stack=[];\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;ops.length;i++){\n    <span class="hljs-keyword">if</span>(ops[i]===<span class="hljs-string">\'C\'</span>){\n      stack.pop()\n    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(ops[i]===<span class="hljs-string">\'D\'</span>){\n      stack.push(stack[stack.length<span class="hljs-number">-1</span>]*<span class="hljs-number">2</span>)\n    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(ops[i]===<span class="hljs-string">\'+\'</span>){\n      stack.push(stack[stack.length<span class="hljs-number">-1</span>]+stack[stack.length<span class="hljs-number">-2</span>])\n    }<span class="hljs-keyword">else</span>{\n      stack.push(+ops[i])\n    }\n  }\n  <span class="hljs-keyword">return</span> stack.reduce(<span class="hljs-function">(<span class="hljs-params">a,b</span>)=&gt;</span>a+b)\n};\n</code></pre>\n'],titleSlug:"baseball-game",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u8fd9\u91cc\u5e76\u4e0d\u4f1a\u7ed9\u51fa\u65e0\u6548\u7684\u8f93\u5165\uff0c\u56e0\u6b64\u65e0\u9700\u5224\u65ad\u5176\u4ed6\u60c5\u51b5\uff0c\u76f4\u63a5\u901a\u8fc7<code>stack</code>\u5904\u7406\u5373\u53ef\u3002</p>\n",content:"<p>\u4f60\u73b0\u5728\u662f\u68d2\u7403\u6bd4\u8d5b\u8bb0\u5f55\u5458\u3002<br>\n\u7ed9\u5b9a\u4e00\u4e2a\u5b57\u7b26\u4e32\u5217\u8868\uff0c\u6bcf\u4e2a\u5b57\u7b26\u4e32\u53ef\u4ee5\u662f\u4ee5\u4e0b\u56db\u79cd\u7c7b\u578b\u4e4b\u4e00\uff1a<br>\n1.<code>\u6574\u6570</code>\uff08\u4e00\u8f6e\u7684\u5f97\u5206\uff09\uff1a\u76f4\u63a5\u8868\u793a\u60a8\u5728\u672c\u8f6e\u4e2d\u83b7\u5f97\u7684\u79ef\u5206\u6570\u3002<br>\n2. <code>&quot;+&quot;</code>\uff08\u4e00\u8f6e\u7684\u5f97\u5206\uff09\uff1a\u8868\u793a\u672c\u8f6e\u83b7\u5f97\u7684\u5f97\u5206\u662f\u524d\u4e24\u8f6e<code>\u6709\u6548</code>&nbsp;\u56de\u5408\u5f97\u5206\u7684\u603b\u548c\u3002<br>\n3. <code>&quot;D&quot;</code>\uff08\u4e00\u8f6e\u7684\u5f97\u5206\uff09\uff1a\u8868\u793a\u672c\u8f6e\u83b7\u5f97\u7684\u5f97\u5206\u662f\u524d\u4e00\u8f6e<code>\u6709\u6548</code>&nbsp;\u56de\u5408\u5f97\u5206\u7684\u4e24\u500d\u3002<br>\n4. <code>&quot;C&quot;</code>\uff08\u4e00\u4e2a\u64cd\u4f5c\uff0c\u8fd9\u4e0d\u662f\u4e00\u4e2a\u56de\u5408\u7684\u5206\u6570\uff09\uff1a\u8868\u793a\u60a8\u83b7\u5f97\u7684\u6700\u540e\u4e00\u4e2a<code>\u6709\u6548</code>&nbsp;\u56de\u5408\u7684\u5206\u6570\u662f\u65e0\u6548\u7684\uff0c\u5e94\u8be5\u88ab\u79fb\u9664\u3002<br>\n<br>\n\u6bcf\u4e00\u8f6e\u7684\u64cd\u4f5c\u90fd\u662f\u6c38\u4e45\u6027\u7684\uff0c\u53ef\u80fd\u4f1a\u5bf9\u524d\u4e00\u8f6e\u548c\u540e\u4e00\u8f6e\u4ea7\u751f\u5f71\u54cd\u3002<br>\n\u4f60\u9700\u8981\u8fd4\u56de\u4f60\u5728\u6240\u6709\u56de\u5408\u4e2d\u5f97\u5206\u7684\u603b\u548c\u3002</p>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> [&quot;5&quot;,&quot;2&quot;,&quot;C&quot;,&quot;D&quot;,&quot;+&quot;]\n<strong>\u8f93\u51fa:</strong> 30\n<strong>\u89e3\u91ca:</strong> \n\u7b2c1\u8f6e\uff1a\u4f60\u53ef\u4ee5\u5f97\u52305\u5206\u3002\u603b\u548c\u662f\uff1a5\u3002\n\u7b2c2\u8f6e\uff1a\u4f60\u53ef\u4ee5\u5f97\u52302\u5206\u3002\u603b\u548c\u662f\uff1a7\u3002\n\u64cd\u4f5c1\uff1a\u7b2c2\u8f6e\u7684\u6570\u636e\u65e0\u6548\u3002\u603b\u548c\u662f\uff1a5\u3002\n\u7b2c3\u8f6e\uff1a\u4f60\u53ef\u4ee5\u5f97\u523010\u5206\uff08\u7b2c2\u8f6e\u7684\u6570\u636e\u5df2\u88ab\u5220\u9664\uff09\u3002\u603b\u6570\u662f\uff1a15\u3002\n\u7b2c4\u8f6e\uff1a\u4f60\u53ef\u4ee5\u5f97\u52305 + 10 = 15\u5206\u3002\u603b\u6570\u662f\uff1a30\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 2:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> [&quot;5&quot;,&quot;-2&quot;,&quot;4&quot;,&quot;C&quot;,&quot;D&quot;,&quot;9&quot;,&quot;+&quot;,&quot;+&quot;]\n<strong>\u8f93\u51fa:</strong> 27\n<strong>\u89e3\u91ca:</strong> \n\u7b2c1\u8f6e\uff1a\u4f60\u53ef\u4ee5\u5f97\u52305\u5206\u3002\u603b\u548c\u662f\uff1a5\u3002\n\u7b2c2\u8f6e\uff1a\u4f60\u53ef\u4ee5\u5f97\u5230-2\u5206\u3002\u603b\u6570\u662f\uff1a3\u3002\n\u7b2c3\u8f6e\uff1a\u4f60\u53ef\u4ee5\u5f97\u52304\u5206\u3002\u603b\u548c\u662f\uff1a7\u3002\n\u64cd\u4f5c1\uff1a\u7b2c3\u8f6e\u7684\u6570\u636e\u65e0\u6548\u3002\u603b\u6570\u662f\uff1a3\u3002\n\u7b2c4\u8f6e\uff1a\u4f60\u53ef\u4ee5\u5f97\u5230-4\u5206\uff08\u7b2c\u4e09\u8f6e\u7684\u6570\u636e\u5df2\u88ab\u5220\u9664\uff09\u3002\u603b\u548c\u662f\uff1a-1\u3002\n\u7b2c5\u8f6e\uff1a\u4f60\u53ef\u4ee5\u5f97\u52309\u5206\u3002\u603b\u6570\u662f\uff1a8\u3002\n\u7b2c6\u8f6e\uff1a\u4f60\u53ef\u4ee5\u5f97\u5230-4 + 9 = 5\u5206\u3002\u603b\u6570\u662f13\u3002\n\u7b2c7\u8f6e\uff1a\u4f60\u53ef\u4ee5\u5f97\u52309 + 5 = 14\u5206\u3002\u603b\u6570\u662f27\u3002\n</pre>\n\n<p><strong>\u6ce8\u610f\uff1a</strong></p>\n\n<ul>\n\t<li>\u8f93\u5165\u5217\u8868\u7684\u5927\u5c0f\u5c06\u4ecb\u4e8e1\u548c1000\u4e4b\u95f4\u3002</li>\n\t<li>\u5217\u8868\u4e2d\u7684\u6bcf\u4e2a\u6574\u6570\u90fd\u5c06\u4ecb\u4e8e-30000\u548c30000\u4e4b\u95f4\u3002</li>\n</ul>\n"}}}]);
//# sourceMappingURL=sourceCode-content686.1e5ab462.chunk.js.map