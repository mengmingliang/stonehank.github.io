(window.webpackJsonp=window.webpackJsonp||[]).push([[427],{495:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n *     this.val = val;\n *     this.left = this.right = null;\n * }\n */</span>\n<span class="hljs-comment">/**\n * @param {TreeNode} root\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> sumOfLeftLeaves = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">root</span>) </span>{\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">calcLeftSum</span>(<span class="hljs-params">root,left</span>)</span>{\n    <span class="hljs-keyword">if</span>(!root)<span class="hljs-keyword">return</span> <span class="hljs-number">0</span>\n    <span class="hljs-keyword">let</span> sum=<span class="hljs-number">0</span>\n    <span class="hljs-keyword">if</span>(root.left)sum+=calcLeftSum(root.left,<span class="hljs-literal">true</span>)\n    <span class="hljs-keyword">if</span>(root.right)sum+=calcLeftSum(root.right,<span class="hljs-literal">false</span>)\n    <span class="hljs-keyword">if</span>(!root.left &amp;&amp; !root.right){\n      <span class="hljs-keyword">if</span>(left)<span class="hljs-keyword">return</span> root.val\n      <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>\n    }\n    <span class="hljs-keyword">return</span> sum\n  }\n  <span class="hljs-keyword">return</span> calcLeftSum(root,<span class="hljs-literal">false</span>)\n};\n</code></pre>\n'],titleSlug:"sum-of-left-leaves",hasThinking:!1,content:"<p>\u8ba1\u7b97\u7ed9\u5b9a\u4e8c\u53c9\u6811\u7684\u6240\u6709\u5de6\u53f6\u5b50\u4e4b\u548c\u3002</p>\n\n<p><strong>\u793a\u4f8b\uff1a</strong></p>\n\n<pre>\n    3\n   / \\\n  9  20\n    /  \\\n   15   7\n\n\u5728\u8fd9\u4e2a\u4e8c\u53c9\u6811\u4e2d\uff0c\u6709\u4e24\u4e2a\u5de6\u53f6\u5b50\uff0c\u5206\u522b\u662f 9 \u548c 15\uff0c\u6240\u4ee5\u8fd4\u56de 24</pre>\n\n<p>&nbsp;</p>\n"}}}]);
//# sourceMappingURL=sourceCode-content460.d42d6081.chunk.js.map