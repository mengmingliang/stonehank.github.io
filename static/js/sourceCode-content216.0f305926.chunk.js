(window.webpackJsonp=window.webpackJsonp||[]).push([[156],{251:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n *     this.val = val;\n *     this.left = this.right = null;\n * }\n */</span>\n<span class="hljs-comment">/**\n * @param {TreeNode} root\n * @return {boolean}\n */</span>\n<span class="hljs-keyword">var</span> isBalanced = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">root</span>) </span>{\n  <span class="hljs-keyword">let</span> isBal=<span class="hljs-literal">true</span>\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getHeight</span>(<span class="hljs-params">root</span>)</span>{\n    <span class="hljs-keyword">if</span>(!isBal)<span class="hljs-keyword">return</span> <span class="hljs-number">0</span>\n    <span class="hljs-keyword">if</span>(!root)<span class="hljs-keyword">return</span> <span class="hljs-number">0</span>\n    <span class="hljs-keyword">let</span> leftH=getHeight(root.left)+<span class="hljs-number">1</span>,\n        rightH=getHeight(root.right)+<span class="hljs-number">1</span>\n    <span class="hljs-keyword">if</span>(<span class="hljs-built_in">Math</span>.abs(leftH-rightH)&gt;<span class="hljs-number">1</span>){\n      isBal=<span class="hljs-literal">false</span> \n    } \n    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.max(leftH,rightH)\n  }\n  getHeight(root)\n  <span class="hljs-keyword">return</span> isBal\n}\n</code></pre>\n'],titleSlug:"balanced-binary-tree",hasThinking:!0,thinking:'<hr>\n<p>\u601d\u8def\uff1a</p>\n<ul>\n<li>\u81ea\u9876\u800c\u4e0b<code>O(n^2)</code></li>\n</ul>\n<p>\u5bf9\u4e8e\u6bcf\u4e00\u4e2a\u8282\u70b9\uff0c\u8ba1\u7b97\u5b83\u5de6\u5b50\u6811\u7684\u9ad8\u5ea6\u548c\u53f3\u5b50\u6811\u7684\u9ad8\u5ea6\uff0c\u5982\u679c\u5b83\u4eec\u76f8\u5dee\u8d85\u8fc7<code>1</code>\uff0c\u5219\u4e0d\u5e73\u8861\u3002</p>\n<pre class="hljs"><code><span class="hljs-keyword">var</span> isBalanced = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">root</span>) </span>{\n  <span class="hljs-keyword">if</span>(!root)<span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>\n  <span class="hljs-keyword">let</span> leftH=getHeight(root.left),\n      rightH=getHeight(root.right)\n  <span class="hljs-keyword">if</span>(<span class="hljs-built_in">Math</span>.abs(leftH-rightH)&gt;<span class="hljs-number">1</span>)<span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>\n  <span class="hljs-keyword">return</span> isBalanced(root.left) &amp;&amp; isBalanced(root.right)\n};\n\n<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getHeight</span>(<span class="hljs-params">root</span>)</span>{\n  <span class="hljs-keyword">if</span>(!root)<span class="hljs-keyword">return</span> <span class="hljs-number">0</span>\n  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.max(getHeight(root.left),getHeight(root.right))+<span class="hljs-number">1</span>\n}\n</code></pre>\n<ul>\n<li>\u81ea\u5e95\u800c\u4e0a<code>O(n)</code></li>\n</ul>\n<p>\u540e\u7eed\u904d\u5386\uff0c\u5bf9\u4e8e\u6bcf\u4e00\u4e2a\u8282\u70b9\uff0c\u6bd4\u8f83\u5de6\u5b50\u6811\u548c\u53f3\u5b50\u6811\u7684\u9ad8\u5ea6\u3002</p>\n<p>\u81ea\u5e95\u800c\u4e0a\u66f4\u9ad8\u6548\u7684\u539f\u56e0\u662f\u540e\u5e8f\u904d\u5386\u662f\u4ece\u6700\u5e95\u7aef\u8282\u70b9\u5f00\u59cb\uff0c\u4e4b\u540e\u6bcf\u4e00\u4e2a\u7236\u8282\u70b9\u8ba1\u7b97\u9ad8\u5ea6\u90fd\u65e0\u987b\u91cd\u590d\u8ba1\u7b97\u5b50\u8282\u70b9\u7684\u9ad8\u5ea6\u3002</p>\n',content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u4e8c\u53c9\u6811\uff0c\u5224\u65ad\u5b83\u662f\u5426\u662f\u9ad8\u5ea6\u5e73\u8861\u7684\u4e8c\u53c9\u6811\u3002</p>\n\n<p>\u672c\u9898\u4e2d\uff0c\u4e00\u68f5\u9ad8\u5ea6\u5e73\u8861\u4e8c\u53c9\u6811\u5b9a\u4e49\u4e3a\uff1a</p>\n\n<blockquote>\n<p>\u4e00\u4e2a\u4e8c\u53c9\u6811<em>\u6bcf\u4e2a\u8282\u70b9&nbsp;</em>\u7684\u5de6\u53f3\u4e24\u4e2a\u5b50\u6811\u7684\u9ad8\u5ea6\u5dee\u7684\u7edd\u5bf9\u503c\u4e0d\u8d85\u8fc71\u3002</p>\n</blockquote>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<p>\u7ed9\u5b9a\u4e8c\u53c9\u6811 <code>[3,9,20,null,null,15,7]</code></p>\n\n<pre>    3\n   / \\\n  9  20\n    /  \\\n   15   7</pre>\n\n<p>\u8fd4\u56de <code>true</code> \u3002<br>\n<br>\n<strong>\u793a\u4f8b 2:</strong></p>\n\n<p>\u7ed9\u5b9a\u4e8c\u53c9\u6811 <code>[1,2,2,3,3,null,null,4,4]</code></p>\n\n<pre>       1\n      / \\\n     2   2\n    / \\\n   3   3\n  / \\\n 4   4\n</pre>\n\n<p>\u8fd4\u56de&nbsp;<code>false</code> \u3002</p>\n"}}}]);
//# sourceMappingURL=sourceCode-content216.0f305926.chunk.js.map