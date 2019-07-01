(window.webpackJsonp=window.webpackJsonp||[]).push([[207],{297:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number} capacity\n */</span>\n<span class="hljs-comment">// \u53e6\uff1a\u76f4\u63a5\u4f7f\u7528Map()\uff0c\u9ed8\u8ba4\u6700\u65b0\u52a0\u5165\u4f1a\u5728\u6700\u540e\uff0c\u6bcf\u6b21\u51b2\u7a81\u53ea\u9700\u5220\u9664\u7b2c\u4e00\u4e2a\u5373\u53ef</span>\n\n<span class="hljs-keyword">var</span> DLink = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key,val</span>)</span>{\n  <span class="hljs-keyword">this</span>.val=val\n  <span class="hljs-keyword">this</span>.key=key\n  <span class="hljs-keyword">this</span>.pre=<span class="hljs-literal">null</span>\n  <span class="hljs-keyword">this</span>.next=<span class="hljs-literal">null</span>\n}\n<span class="hljs-keyword">var</span> LRUCache = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">capacity</span>) </span>{\n  <span class="hljs-keyword">let</span> mockHead=<span class="hljs-keyword">new</span> DLink(<span class="hljs-literal">null</span>,<span class="hljs-literal">null</span>),\n      mockTail=<span class="hljs-keyword">new</span> DLink(<span class="hljs-literal">null</span>,<span class="hljs-literal">null</span>)\n  \n  mockHead.next=mockTail\n  mockTail.pre=mockHead\n  \n  <span class="hljs-keyword">this</span>.removeSelf=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>)</span>{\n    node.pre.next=node.next\n    node.next.pre=node.pre\n    <span class="hljs-keyword">return</span> node\n  }\n  <span class="hljs-keyword">this</span>.addToHead=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>)</span>{\n    node.next=mockHead.next\n    mockHead.next.pre=node\n  \n    mockHead.next=node\n    node.pre=mockHead\n    <span class="hljs-keyword">return</span> node\n  }\n  <span class="hljs-keyword">this</span>.moveToHead=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>)</span>{\n    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.addToHead(<span class="hljs-keyword">this</span>.removeSelf(node))\n  }\n  <span class="hljs-keyword">this</span>.removeTail=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{\n    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.removeSelf(mockTail.pre)\n  }\n\n  <span class="hljs-keyword">this</span>.map=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>()\n  <span class="hljs-keyword">this</span>.capacity=capacity\n  <span class="hljs-keyword">this</span>.curLen=<span class="hljs-number">0</span>\n};\n\n<span class="hljs-comment">/** \n * @param {number} key\n * @return {number}\n */</span>\nLRUCache.prototype.get = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key</span>) </span>{\n  <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.map.has(key))<span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>\n  <span class="hljs-keyword">let</span> node=<span class="hljs-keyword">this</span>.moveToHead(<span class="hljs-keyword">this</span>.map.get(key))\n  <span class="hljs-keyword">this</span>.map.set(key,node)\n  <span class="hljs-keyword">return</span> node.val\n};\n\n<span class="hljs-comment">/** \n * @param {number} key \n * @param {number} value\n * @return {void}\n */</span>\nLRUCache.prototype.put = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key, value</span>) </span>{\n  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.map.has(key)){\n    <span class="hljs-keyword">let</span> oldN=<span class="hljs-keyword">this</span>.map.get(key)\n    <span class="hljs-keyword">let</span> newN=<span class="hljs-keyword">this</span>.moveToHead(oldN)\n    newN.val=value\n    <span class="hljs-keyword">this</span>.map.set(key,newN)\n  }<span class="hljs-keyword">else</span>{\n    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.curLen&gt;=<span class="hljs-keyword">this</span>.capacity){\n      <span class="hljs-keyword">let</span> delNode=<span class="hljs-keyword">this</span>.removeTail()\n      <span class="hljs-keyword">this</span>.map.delete(delNode.key)\n    }\n    <span class="hljs-keyword">let</span> newNode=<span class="hljs-keyword">this</span>.addToHead(<span class="hljs-keyword">new</span> DLink(key,value))\n    <span class="hljs-keyword">this</span>.map.set(key,newNode)\n    <span class="hljs-keyword">this</span>.curLen++\n  }\n};\n\n<span class="hljs-comment">/** \n * Your LRUCache object will be instantiated and called as such:\n * var obj = Object.create(LRUCache).createNew(capacity)\n * var param_1 = obj.get(key)\n * obj.put(key,value)\n */</span>\n</code></pre>\n'],titleSlug:"lru-cache",hasThinking:!0,thinking:'<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>2\u79cd\u65b9\u6cd5\u53ef\u4ee5\u5b9e\u73b0\uff0c\u4f46\u53ea\u662f\u5de5\u5177\u4e0d\u540c\uff0c\u601d\u60f3\u57fa\u672c\u4e00\u81f4\u3002</p>\n<p>\u5728<code>put</code>\u5185\u90e8\uff0c\u5148\u67e5\u627e\u5f53\u524d\u662f\u5426\u5b58\u5728<code>key</code>\uff0c\u5982\u679c\u5b58\u5728\uff0c\u5219\u66f4\u65b0\uff0c\u8fd9\u65f6\u5019\u957f\u5ea6\u4e0d\u4f1a\u53d1\u751f\u53d8\u5316\uff0c\u53ea\u662f\u9700\u8981\u5c06\u521a\u521a\u66f4\u65b0\u7684<code>key-val</code>\uff0c\u653e\u5230\u6700\u65b0\u7684\u4f4d\u7f6e\uff1b</p>\n<p>\u5982\u679c\u4e0d\u5b58\u5728\uff0c\u4e5f\u4e0d\u80fd\u7acb\u523b\u6dfb\u52a0\uff0c\u5148\u8981\u67e5\u770b\u5f53\u524d\u662f\u5426\u6ee1\u4e86\uff0c\u5982\u679c\u6ee1\u4e86\uff0c\u9700\u8981\u5c06\u6700\u65e9\u7684\u90a3\u4e2a\u5220\u9664\u3002</p>\n<p>\u6700\u540e\u518d\u6dfb\u52a0\u65b0\u7684\u952e\u503c\u5bf9\u3002</p>\n<p>\u5728<code>get</code>\u5185\u90e8\uff0c\u9996\u5148\u67e5\u627e\u5f53\u524d<code>key</code>\u662f\u5426\u5b58\u5728\uff0c\u4e0d\u5b58\u5728\u8fd4\u56de<code>-1</code>\uff0c\u5b58\u5728\u9664\u4e86\u8fd4\u56de\u5bf9\u5e94\u7684<code>val</code>\uff0c\u8fd8\u8981\u66f4\u65b0\u4f4d\u7f6e\uff0c\u5c06\u5f53\u524d<code>get</code>\u7684\u952e\u503c\u5bf9\u653e\u5230\u6700\u65b0\u7684\u4f4d\u7f6e\u3002</p>\n<p>\u8fd9\u91cc\u8981\u6c42<code>\u67e5\u627e</code>\uff0c<code>\u589e\u52a0</code>\uff0c<code>\u5220\u9664</code>\u90fd\u8981\u662f<code>O(1)</code>\u3002</p>\n<ol>\n<li>\u4f7f\u7528<code>js</code>\u7684<code>map</code>\u3002</li>\n</ol>\n<p><code>map</code>\u672c\u8eab\u662f\u6309\u7167\u52a0\u5165\u7684\u987a\u5e8f\u6392\u5e8f\u7684\uff0c\u5e76\u4e14\u67e5\u627e\u548c\u589e\u52a0\u5220\u9664\u90fd\u662f<code>O(1)</code>\u3002</p>\n<p>\u5728<code>put</code>\uff0c\u53ea\u9700\u8981\u627e\u5230\u5bf9\u5e94\u7684\u5220\u9664\u662f<code>O(1)</code>\uff0c\u5982\u679c\u53d1\u73b0\u6ee1\u4e86\uff0c\u9700\u8981\u5220\u9664\u6700\u65e9\u7684\uff0c\u90a3\u4e48\u9700\u8981\u7528\u5230<code>map.entries.next().value</code>\uff0c\u5c31\u662f<code>map</code>\u7684\u7b2c\u4e00\u4e2a\u952e\u503c\u5bf9(\u6700\u65e9\u52a0\u5165\u7684)\u3002</p>\n<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number} capacity\n */</span>\n<span class="hljs-keyword">var</span> LRUCache = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">capacity</span>) </span>{\n  <span class="hljs-keyword">this</span>.map=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>()\n  <span class="hljs-keyword">this</span>.capacity=capacity\n};\n\n<span class="hljs-comment">/** \n * @param {number} key\n * @return {number}\n */</span>\nLRUCache.prototype.get = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key</span>) </span>{\n  <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.map.has(key))<span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>\n  <span class="hljs-keyword">let</span> val=<span class="hljs-keyword">this</span>.map.get(key)\n  <span class="hljs-keyword">this</span>.map.delete(key)\n  <span class="hljs-keyword">this</span>.map.set(key,val)\n  <span class="hljs-keyword">return</span> val\n};\n\n<span class="hljs-comment">/** \n * @param {number} key \n * @param {number} value\n * @return {void}\n */</span>\nLRUCache.prototype.put = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key, value</span>) </span>{\n  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.map.has(key)){\n    <span class="hljs-keyword">this</span>.map.delete(key)\n  }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.capacity===<span class="hljs-keyword">this</span>.map.size){\n    <span class="hljs-keyword">let</span> firstKey=<span class="hljs-keyword">this</span>.map.entries().next().value[<span class="hljs-number">0</span>]\n    <span class="hljs-keyword">this</span>.map.delete(firstKey)\n  }\n  <span class="hljs-keyword">this</span>.map.set(key,value)\n};\n\n<span class="hljs-comment">/** \n * Your LRUCache object will be instantiated and called as such:\n * var obj = Object.create(LRUCache).createNew(capacity)\n * var param_1 = obj.get(key)\n * obj.put(key,value)\n */</span>\n</code></pre>\n<ol start="2">\n<li>\u4f7f\u7528<code>DoubleLink</code>\uff0c\u53cc\u5411\u94fe\u8868\u3002</li>\n</ol>\n<p>\u53cc\u5411\u94fe\u8868\u7684\u67e5\u627e\u53ef\u4ee5\u4f7f\u7528<code>hash</code>\u4fdd\u5b58\u6bcf\u4e00\u622a\u94fe\u8868\u7684\u5f15\u7528\uff0c\u952e\u503c\u5c31\u662f<code>key</code>\u3002</p>\n<p>\u53e6\u5916\u53cc\u5411\u94fe\u8868\u7684<code>\u589e\u52a0</code>\u548c<code>\u5220\u9664</code>\u90fd\u662f<code>O(1)</code>\u3002</p>\n',content:'<p>\u8fd0\u7528\u4f60\u6240\u638c\u63e1\u7684\u6570\u636e\u7ed3\u6784\uff0c\u8bbe\u8ba1\u548c\u5b9e\u73b0\u4e00\u4e2a&nbsp; <a href="https://baike.baidu.com/item/LRU" target="_blank">LRU (\u6700\u8fd1\u6700\u5c11\u4f7f\u7528) \u7f13\u5b58\u673a\u5236</a>\u3002\u5b83\u5e94\u8be5\u652f\u6301\u4ee5\u4e0b\u64cd\u4f5c\uff1a \u83b7\u53d6\u6570\u636e <code>get</code> \u548c \u5199\u5165\u6570\u636e <code>put</code> \u3002</p>\n\n<p>\u83b7\u53d6\u6570\u636e <code>get(key)</code> - \u5982\u679c\u5bc6\u94a5 (key) \u5b58\u5728\u4e8e\u7f13\u5b58\u4e2d\uff0c\u5219\u83b7\u53d6\u5bc6\u94a5\u7684\u503c\uff08\u603b\u662f\u6b63\u6570\uff09\uff0c\u5426\u5219\u8fd4\u56de -1\u3002<br>\n\u5199\u5165\u6570\u636e <code>put(key, value)</code> - \u5982\u679c\u5bc6\u94a5\u4e0d\u5b58\u5728\uff0c\u5219\u5199\u5165\u5176\u6570\u636e\u503c\u3002\u5f53\u7f13\u5b58\u5bb9\u91cf\u8fbe\u5230\u4e0a\u9650\u65f6\uff0c\u5b83\u5e94\u8be5\u5728\u5199\u5165\u65b0\u6570\u636e\u4e4b\u524d\u5220\u9664\u6700\u8fd1\u6700\u5c11\u4f7f\u7528\u7684\u6570\u636e\u503c\uff0c\u4ece\u800c\u4e3a\u65b0\u7684\u6570\u636e\u503c\u7559\u51fa\u7a7a\u95f4\u3002</p>\n\n<p><strong>\u8fdb\u9636:</strong></p>\n\n<p>\u4f60\u662f\u5426\u53ef\u4ee5\u5728&nbsp;<strong>O(1)</strong> \u65f6\u95f4\u590d\u6742\u5ea6\u5185\u5b8c\u6210\u8fd9\u4e24\u79cd\u64cd\u4f5c\uff1f</p>\n\n<p><strong>\u793a\u4f8b:</strong></p>\n\n<pre>LRUCache cache = new LRUCache( 2 /* \u7f13\u5b58\u5bb9\u91cf */ );\n\ncache.put(1, 1);\ncache.put(2, 2);\ncache.get(1);       // \u8fd4\u56de  1\ncache.put(3, 3);    // \u8be5\u64cd\u4f5c\u4f1a\u4f7f\u5f97\u5bc6\u94a5 2 \u4f5c\u5e9f\ncache.get(2);       // \u8fd4\u56de -1 (\u672a\u627e\u5230)\ncache.put(4, 4);    // \u8be5\u64cd\u4f5c\u4f1a\u4f7f\u5f97\u5bc6\u94a5 1 \u4f5c\u5e9f\ncache.get(1);       // \u8fd4\u56de -1 (\u672a\u627e\u5230)\ncache.get(3);       // \u8fd4\u56de  3\ncache.get(4);       // \u8fd4\u56de  4\n</pre>\n'}}}]);
//# sourceMappingURL=sourceCode-content262.da61ee9e.chunk.js.map