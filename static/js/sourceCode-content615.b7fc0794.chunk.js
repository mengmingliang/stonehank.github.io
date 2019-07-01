(window.webpackJsonp=window.webpackJsonp||[]).push([[599],{650:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * // Definition for a Node.\n * function Node(val,children) {\n *    this.val = val;\n *    this.children = children;\n * };\n */</span>\n<span class="hljs-comment">/**\n * @param {Node} root\n * @return {number[]}\n */</span>\n<span class="hljs-keyword">var</span> preorder = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">root</span>) </span>{\n  <span class="hljs-keyword">if</span>(!root)<span class="hljs-keyword">return</span> []\n  <span class="hljs-keyword">let</span> stack=[root],res=[]\n  <span class="hljs-keyword">while</span>(stack.length&gt;<span class="hljs-number">0</span> ){\n    <span class="hljs-keyword">let</span> node=stack.pop()\n    res.push(node.val)\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=node.children.length<span class="hljs-number">-1</span>;i&gt;=<span class="hljs-number">0</span>;i--){\n      stack.push(node.children[i])\n    }\n  }\n  <span class="hljs-keyword">return</span> res\n};\n</code></pre>\n'],titleSlug:"n-ary-tree-preorder-traversal",hasThinking:!1,content:'<p>\u7ed9\u5b9a\u4e00\u4e2a N \u53c9\u6811\uff0c\u8fd4\u56de\u5176\u8282\u70b9\u503c\u7684<em>\u524d\u5e8f\u904d\u5386</em>\u3002</p>\r\n\r\n<p>\u4f8b\u5982\uff0c\u7ed9\u5b9a\u4e00\u4e2a&nbsp;<code>3\u53c9\u6811</code>&nbsp;:</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/narytreeexample.png" style="width: 100%; max-width: 300px;"></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>\u8fd4\u56de\u5176\u524d\u5e8f\u904d\u5386: <code>[1,3,5,6,2,4]</code>\u3002</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>\u8bf4\u660e:&nbsp;</strong>\u9012\u5f52\u6cd5\u5f88\u7b80\u5355\uff0c\u4f60\u53ef\u4ee5\u4f7f\u7528\u8fed\u4ee3\u6cd5\u5b8c\u6210\u6b64\u9898\u5417?</p>'}}}]);
//# sourceMappingURL=sourceCode-content615.b7fc0794.chunk.js.map