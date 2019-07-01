(window.webpackJsonp=window.webpackJsonp||[]).push([[527],{585:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n *     this.val = val;\n *     this.left = this.right = null;\n * }\n */</span>\n<span class="hljs-comment">/**\n * @param {TreeNode} root\n * @return {number[]}\n */</span>\n<span class="hljs-keyword">var</span> findMode = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">root</span>) </span>{\n    <span class="hljs-keyword">if</span>(!root)<span class="hljs-keyword">return</span> []\n    <span class="hljs-keyword">let</span> last=<span class="hljs-literal">null</span>,lastCount=<span class="hljs-number">0</span>,count=<span class="hljs-number">0</span>,dupli=[]\n    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inOrder</span>(<span class="hljs-params">node</span>)</span>{\n        <span class="hljs-keyword">if</span>(!node)<span class="hljs-keyword">return</span>\n        <span class="hljs-keyword">if</span>(node.left)inOrder(node.left)\n        <span class="hljs-keyword">if</span>(node.val!==last){\n            <span class="hljs-keyword">if</span>(lastCount&lt;count)dupli=[last]\n            <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(lastCount===count)dupli.push(last)\n            lastCount=<span class="hljs-built_in">Math</span>.max(lastCount,count)\n            count=<span class="hljs-number">1</span>\n            last=node.val\n        }<span class="hljs-keyword">else</span> count++\n        <span class="hljs-keyword">if</span>(node.right)inOrder(node.right)\n    }\n    inOrder(root)\n    <span class="hljs-keyword">if</span>(lastCount&lt;count)dupli=[last]\n    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(lastCount===count)dupli.push(last)\n    <span class="hljs-keyword">return</span> dupli\n};\n</code></pre>\n'],titleSlug:"find-mode-in-binary-search-tree",hasThinking:!1,content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u6709\u76f8\u540c\u503c\u7684\u4e8c\u53c9\u641c\u7d22\u6811\uff08BST\uff09\uff0c\u627e\u51fa BST \u4e2d\u7684\u6240\u6709\u4f17\u6570\uff08\u51fa\u73b0\u9891\u7387\u6700\u9ad8\u7684\u5143\u7d20\uff09\u3002</p>\n\n<p>\u5047\u5b9a BST \u6709\u5982\u4e0b\u5b9a\u4e49\uff1a</p>\n\n<ul>\n\t<li>\u7ed3\u70b9\u5de6\u5b50\u6811\u4e2d\u6240\u542b\u7ed3\u70b9\u7684\u503c\u5c0f\u4e8e\u7b49\u4e8e\u5f53\u524d\u7ed3\u70b9\u7684\u503c</li>\n\t<li>\u7ed3\u70b9\u53f3\u5b50\u6811\u4e2d\u6240\u542b\u7ed3\u70b9\u7684\u503c\u5927\u4e8e\u7b49\u4e8e\u5f53\u524d\u7ed3\u70b9\u7684\u503c</li>\n\t<li>\u5de6\u5b50\u6811\u548c\u53f3\u5b50\u6811\u90fd\u662f\u4e8c\u53c9\u641c\u7d22\u6811</li>\n</ul>\n\n<p>\u4f8b\u5982\uff1a<br>\n\u7ed9\u5b9a BST <code>[1,null,2,2]</code>,</p>\n\n<pre>   1\n    \\\n     2\n    /\n   2\n</pre>\n\n<p><code>\u8fd4\u56de[2]</code>.</p>\n\n<p><strong>\u63d0\u793a</strong>\uff1a\u5982\u679c\u4f17\u6570\u8d85\u8fc71\u4e2a\uff0c\u4e0d\u9700\u8003\u8651\u8f93\u51fa\u987a\u5e8f</p>\n\n<p><strong>\u8fdb\u9636\uff1a</strong>\u4f60\u53ef\u4ee5\u4e0d\u4f7f\u7528\u989d\u5916\u7684\u7a7a\u95f4\u5417\uff1f\uff08\u5047\u8bbe\u7531\u9012\u5f52\u4ea7\u751f\u7684\u9690\u5f0f\u8c03\u7528\u6808\u7684\u5f00\u9500\u4e0d\u88ab\u8ba1\u7b97\u5728\u5185\uff09</p>\n"}}}]);
//# sourceMappingURL=sourceCode-content550.8e87bbc5.chunk.js.map