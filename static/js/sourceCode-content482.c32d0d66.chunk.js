(window.webpackJsonp=window.webpackJsonp||[]).push([[451],{517:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * // Definition for a Node.\n * function Node(val,prev,next,child) {\n *    this.val = val;\n *    this.prev = prev;\n *    this.next = next;\n *    this.child = child;\n * };\n */</span>\n<span class="hljs-comment">/**\n * @param {Node} head\n * @return {Node}\n */</span>\n<span class="hljs-keyword">var</span> flatten = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">head</span>) </span>{\n  <span class="hljs-keyword">return</span> _flatten(head)[<span class="hljs-number">0</span>]\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_flatten</span>(<span class="hljs-params">head</span>)</span>{\n    <span class="hljs-keyword">let</span> root=head,tail=<span class="hljs-literal">null</span>\n    <span class="hljs-keyword">while</span>(root){\n      <span class="hljs-keyword">let</span> nxt=root.next\n      <span class="hljs-keyword">if</span>(root.child){\n        <span class="hljs-keyword">let</span> [subHead,subTail]=_flatten(root.child)\n        root.child=<span class="hljs-literal">null</span>\n        root.next=subHead\n        subHead.prev=root\n        subTail.next=nxt\n        <span class="hljs-keyword">if</span>(nxt)nxt.prev=subTail\n        <span class="hljs-keyword">else</span> tail=subTail\n      }\n      <span class="hljs-keyword">if</span>(!nxt &amp;&amp; !tail)tail=root\n      root=nxt\n    }    \n    <span class="hljs-keyword">return</span> [head,tail]\n  }\n\n};\n</code></pre>\n'],titleSlug:"flatten-a-multilevel-doubly-linked-list",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u904d\u5386<code>root</code>\uff0c\u53d1\u73b0\u5b58\u5728<code>child</code>\uff0c\u5219\u9012\u5f52<code>child</code>\uff0c2\u4e2a\u6ce8\u610f\u7684\u5730\u65b9\uff1a</p>\n<ol>\n<li>\u6bcf\u6b21\u9012\u5f52\u5904\u7406\u5b8c<code>child</code>\uff0c\u9700\u8981\u5c06<code>root.child</code>\u8bbe\u7f6e\u4e3a<code>null</code>\u3002</li>\n<li>\u6bcf\u6b21\u9012\u5f52\u5904\u7406\u5b8c<code>child</code>\u7684\u8fd4\u56de\u503c\u9700\u8981\u4e00\u4e2a\u5934\uff0c\u4e00\u4e2a\u5c3e\uff0c\u5206\u522b**\u53cc\u5411\u8fde\u63a5*\u5904\u7406<code>child</code>\u4e4b\u524d\u7684<code>root</code>\u548c<code>root.next</code>\u3002</li>\n</ol>\n",content:'<p>\u60a8\u5c06\u83b7\u5f97\u4e00\u4e2a\u53cc\u5411\u94fe\u8868\uff0c\u9664\u4e86\u4e0b\u4e00\u4e2a\u548c\u524d\u4e00\u4e2a\u6307\u9488\u4e4b\u5916\uff0c\u5b83\u8fd8\u6709\u4e00\u4e2a\u5b50\u6307\u9488\uff0c\u53ef\u80fd\u6307\u5411\u5355\u72ec\u7684\u53cc\u5411\u94fe\u8868\u3002\u8fd9\u4e9b\u5b50\u5217\u8868\u53ef\u80fd\u6709\u4e00\u4e2a\u6216\u591a\u4e2a\u81ea\u5df1\u7684\u5b50\u9879\uff0c\u4f9d\u6b64\u7c7b\u63a8\uff0c\u751f\u6210\u591a\u7ea7\u6570\u636e\u7ed3\u6784\uff0c\u5982\u4e0b\u9762\u7684\u793a\u4f8b\u6240\u793a\u3002</p>\n\n<p>\u6241\u5e73\u5316\u5217\u8868\uff0c\u4f7f\u6240\u6709\u7ed3\u70b9\u51fa\u73b0\u5728\u5355\u7ea7\u53cc\u94fe\u8868\u4e2d\u3002\u60a8\u5c06\u83b7\u5f97\u5217\u8868\u7b2c\u4e00\u7ea7\u7684\u5934\u90e8\u3002</p>\n\n<p>&nbsp;</p>\n\n<p><strong>\u793a\u4f8b:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong>\n 1---2---3---4---5---6--NULL\n         |\n         7---8---9---10--NULL\n             |\n             11--12--NULL\n\n<strong>\u8f93\u51fa:</strong>\n1-2-3-7-8-11-12-9-10-4-5-6-NULL\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u4ee5\u4e0a\u793a\u4f8b\u7684\u8bf4\u660e:</strong></p>\n\n<p>\u7ed9\u51fa\u4ee5\u4e0b\u591a\u7ea7\u53cc\u5411\u94fe\u8868:</p>\n\n<pre><img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/multilevellinkedlist.png" style="width: 640px;"></pre>\n\n<p>&nbsp;</p>\n\n<p>\u6211\u4eec\u5e94\u8be5\u8fd4\u56de\u5982\u4e0b\u6240\u793a\u7684\u6241\u5e73\u53cc\u5411\u94fe\u8868:</p>\n\n<pre><img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/multilevellinkedlistflattened.png" style="width: 1100px;"></pre>\n'}}}]);
//# sourceMappingURL=sourceCode-content482.c32d0d66.chunk.js.map