(window.webpackJsonp=window.webpackJsonp||[]).push([[672],{716:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * Initialize your data structure here.\n */</span>\n<span class="hljs-keyword">var</span> MapSum = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{\n  <span class="hljs-keyword">this</span>.tire={}\n};\n\n<span class="hljs-comment">/** \n * @param {string} key \n * @param {number} val\n * @return {void}\n */</span>\nMapSum.prototype.insert = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key, val</span>) </span>{\n  <span class="hljs-keyword">let</span> t=<span class="hljs-keyword">this</span>.tire\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;key.length;i++){\n    <span class="hljs-keyword">let</span> l=key[i]\n    <span class="hljs-keyword">if</span>(t[l]==<span class="hljs-literal">null</span>)t[l]={}\n    <span class="hljs-keyword">if</span>(i===key.length<span class="hljs-number">-1</span>)t[l].val=val\n    t=t[l]\n  }\n};\n\n<span class="hljs-comment">/** \n * @param {string} prefix\n * @return {number}\n */</span>\nMapSum.prototype.sum = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">prefix</span>) </span>{\n  <span class="hljs-keyword">let</span> sum=<span class="hljs-number">0</span>,t=<span class="hljs-keyword">this</span>.tire\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;prefix.length;i++){\n    <span class="hljs-keyword">let</span> l=prefix[i]\n    <span class="hljs-keyword">if</span>(t[l]==<span class="hljs-literal">null</span>)<span class="hljs-keyword">return</span> <span class="hljs-number">0</span>\n    t=t[l]\n    <span class="hljs-keyword">if</span>(i===prefix.length<span class="hljs-number">-1</span>){\n      sum+=dfs(t)\n    }\n  }\n  <span class="hljs-keyword">return</span> sum\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dfs</span>(<span class="hljs-params">t</span>)</span>{\n    <span class="hljs-keyword">if</span>(!t)<span class="hljs-keyword">return</span> <span class="hljs-number">0</span>\n    <span class="hljs-keyword">let</span> s=<span class="hljs-number">0</span>\n    <span class="hljs-keyword">if</span>(t.val!=<span class="hljs-literal">null</span>)s+=t.val\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> k <span class="hljs-keyword">in</span> t){\n      s+=dfs(t[k])\n    }\n    <span class="hljs-keyword">return</span> s\n  }\n};\n\n<span class="hljs-comment">/** \n * Your MapSum object will be instantiated and called as such:\n * var obj = new MapSum()\n * obj.insert(key,val)\n * var param_2 = obj.sum(prefix)\n */</span>\n</code></pre>\n'],titleSlug:"map-sum-pairs",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u5efa\u7acb<code>tire</code>\u6811\uff0c\u6bcf\u6b21<code>insert</code>\u7684\u65f6\u5019\uff0c\u5bf9\u5f53\u524d<code>key</code>\u7684\u6bcf\u4e2a\u5b57\u6bcd\u9010\u4e2a\u904d\u5386\uff0c\u5efa\u7acb<code>tire</code>\u7684\u5206\u652f\uff0c\u5230\u6700\u540e\u4e00\u4e2a\u5b57\u6bcd\uff0c\u6dfb\u52a0<code>tire.val=val</code>\u3002</p>\n<p>\u6bcf\u6b21<code>sum</code>\u7684\u65f6\u5019\uff0c\u9010\u4e2a\u904d\u5386<code>tire</code>\uff0c\u5982\u679c\u5f53\u524d\u5206\u652f<code>tire[key[i]]</code>\u4e0d\u5b58\u5728\uff0c\u8bf4\u660e\u65e0\u6cd5\u5339\u914d\u5230\u8fd9\u4e2a\u524d\u7f00\uff0c\u8fd4\u56de<code>0</code>\uff0c\u5f53\u524d\u7f00\u6210\u529f\u5339\u914d\uff0c\u63a5\u7740<code>dfs</code>\n\u627e\u51fa\u524d\u7f00\u4e4b\u540e\u7684\u6240\u6709\u5355\u8bcd\u7684<code>val</code>\u3002</p>\n",content:"<p>\u5b9e\u73b0\u4e00\u4e2a MapSum \u7c7b\u91cc\u7684\u4e24\u4e2a\u65b9\u6cd5\uff0c<code>insert</code>&nbsp;\u548c&nbsp;<code>sum</code>\u3002</p>\n\n<p>\u5bf9\u4e8e\u65b9\u6cd5&nbsp;<code>insert</code>\uff0c\u4f60\u5c06\u5f97\u5230\u4e00\u5bf9\uff08\u5b57\u7b26\u4e32\uff0c\u6574\u6570\uff09\u7684\u952e\u503c\u5bf9\u3002\u5b57\u7b26\u4e32\u8868\u793a\u952e\uff0c\u6574\u6570\u8868\u793a\u503c\u3002\u5982\u679c\u952e\u5df2\u7ecf\u5b58\u5728\uff0c\u90a3\u4e48\u539f\u6765\u7684\u952e\u503c\u5bf9\u5c06\u88ab\u66ff\u4ee3\u6210\u65b0\u7684\u952e\u503c\u5bf9\u3002</p>\n\n<p>\u5bf9\u4e8e\u65b9\u6cd5 <code>sum</code>\uff0c\u4f60\u5c06\u5f97\u5230\u4e00\u4e2a\u8868\u793a\u524d\u7f00\u7684\u5b57\u7b26\u4e32\uff0c\u4f60\u9700\u8981\u8fd4\u56de\u6240\u6709\u4ee5\u8be5\u524d\u7f00\u5f00\u5934\u7684\u952e\u7684\u503c\u7684\u603b\u548c\u3002</p>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<pre>\u8f93\u5165: insert(&quot;apple&quot;, 3), \u8f93\u51fa: Null\n\u8f93\u5165: sum(&quot;ap&quot;), \u8f93\u51fa: 3\n\u8f93\u5165: insert(&quot;app&quot;, 2), \u8f93\u51fa: Null\n\u8f93\u5165: sum(&quot;ap&quot;), \u8f93\u51fa: 5\n</pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content681.d686d583.chunk.js.map