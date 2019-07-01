(window.webpackJsonp=window.webpackJsonp||[]).push([[180],{273:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n *     this.val = val;\n *     this.left = this.right = null;\n * }\n */</span>\n<span class="hljs-comment">/**\n * @param {TreeNode} root\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> maxPathSum = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">root</span>) </span>{\n  <span class="hljs-keyword">let</span> res=-<span class="hljs-literal">Infinity</span>\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_maxPathSum</span>(<span class="hljs-params">root</span>) </span>{\n    <span class="hljs-keyword">if</span>(!root)<span class="hljs-keyword">return</span> -<span class="hljs-literal">Infinity</span>\n\n    <span class="hljs-keyword">let</span> leftV=_maxPathSum(root.left),\n        rightV=_maxPathSum(root.right),\n        cV=root.val\n\n    <span class="hljs-comment">// \u4e0e\u7236\u8282\u70b9\u8fde\u63a5\u4e2d\u65ad\u7684path\u7684\u6570\u503c</span>\n    res=<span class="hljs-built_in">Math</span>.max(res,leftV,rightV,cV+leftV+rightV)\n    <span class="hljs-comment">// \u4e0e\u7236\u8282\u70b9\u8fde\u63a5\u7ee7\u7eed\u7684path\u7684\u6570\u503c</span>\n    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.max(cV+leftV,cV+rightV,cV)\n  }\n  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.max(_maxPathSum(root),res)\n};\n\n</code></pre>\n'],titleSlug:"binary-tree-maximum-path-sum",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u5bf9\u4e8e\u67d0\u4e00\u4e2a\u8282\u70b9root\uff0c\u5b83\u53ef\u4ee5\u67092\u79cd\u9009\u62e9\uff1a</p>\n<ul>\n<li>\n<p>\u4e0d\u4e0e\u7236\u8282\u70b9\u8fde\u63a5\uff0c\u90a3\u4e48\u5b83\u7684\u8fde\u63a5\u8def\u5f84\u6700\u5927\u503c\u5c31\u662f</p>\n<p><code>Math.max(\u5de6\u8282\u70b9\u503c+\u5f53\u524d\u503c+\u53f3\u8282\u70b9\u503c\uff0c\u5de6\u8282\u70b9\u503c+\u5f53\u524d\u503c\uff0c\u53f3\u8282\u70b9\u503c+\u5f53\u524d\u503c\uff0c\u5de6\u8282\u70b9\u503c\uff0c\u53f3\u8282\u70b9\u503c\uff0c\u5f53\u524d\u503c)</code></p>\n<p>\u8fd9\u4e2a\u503c\u4e0d\u9700\u8981\u8fd4\u56de\u7ed9\u7236\u8282\u70b9\uff0c\u76f4\u63a5\u8bb0\u5f55\u4e3a<code>res</code>\u3002</p>\n</li>\n<li>\n<p>\u5982\u679c\u4e0e\u7236\u8282\u70b9\u8fde\u63a5\uff0c\u90a3\u4e48\u5b83\u7684\u8fde\u63a5\u8def\u5f84\u6700\u5927\u503c\u5c31\u662f</p>\n<p><code>Math.max(\u5de6\u8282\u70b9\u503c+\u5f53\u524d\u503c\uff0c\u53f3\u8282\u70b9\u503c+\u5f53\u524d\u503c\uff0c\u5f53\u524d\u503c)</code></p>\n<p>\u8fd9\u4e2a\u503c\u9700\u8981\u8fd4\u56de\uff0c\u8fde\u63a5\u5b83\u7684\u7236\u8282\u70b9\u503c\u3002</p>\n</li>\n</ul>\n<p>\u53ef\u4ee5\u770b\u5230\uff0c<code>1</code>\u548c<code>2</code>\u5185\u90e8\u5b58\u5728\u91cd\u590d\uff0c\u56e0\u6b64\u51cf\u5c11\u91cd\u590d\u540e\uff0c\u4e0d\u4e0e\u7236\u8282\u70b9\u8fde\u63a5\u7684\u5b9e\u9645\u5c31\u662f\uff1a</p>\n<p><code>Math.max(\u5de6\u8282\u70b9\u503c+\u5f53\u524d\u503c+\u53f3\u8282\u70b9\u503c\uff0c\u5de6\u8282\u70b9\u503c\uff0c\u53f3\u8282\u70b9\u503c)</code></p>\n<p>\u6700\u7ec8\u4ece<code>1</code>\u548c<code>2</code>\u4e2d\u9009\u53d6\u51fa\u6700\u5927\u7684\u503c\u3002</p>\n",content:"<p>\u7ed9\u5b9a\u4e00\u4e2a<strong>\u975e\u7a7a</strong>\u4e8c\u53c9\u6811\uff0c\u8fd4\u56de\u5176\u6700\u5927\u8def\u5f84\u548c\u3002</p>\n\n<p>\u672c\u9898\u4e2d\uff0c\u8def\u5f84\u88ab\u5b9a\u4e49\u4e3a\u4e00\u6761\u4ece\u6811\u4e2d\u4efb\u610f\u8282\u70b9\u51fa\u53d1\uff0c\u8fbe\u5230\u4efb\u610f\u8282\u70b9\u7684\u5e8f\u5217\u3002\u8be5\u8def\u5f84<strong>\u81f3\u5c11\u5305\u542b\u4e00\u4e2a</strong>\u8282\u70b9\uff0c\u4e14\u4e0d\u4e00\u5b9a\u7ecf\u8fc7\u6839\u8282\u70b9\u3002</p>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> [1,2,3]\n\n       <strong>1</strong>\n      <strong>/ \\</strong>\n     <strong>2</strong>   <strong>3</strong>\n\n<strong>\u8f93\u51fa:</strong> 6\n</pre>\n\n<p><strong>\u793a\u4f8b&nbsp;2:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> [-10,9,20,null,null,15,7]\n\n&nbsp;  -10\n&nbsp; &nbsp;/ \\\n&nbsp; 9 &nbsp;<strong>20</strong>\n&nbsp; &nbsp; <strong>/ &nbsp;\\</strong>\n&nbsp; &nbsp;<strong>15 &nbsp; 7</strong>\n\n<strong>\u8f93\u51fa:</strong> 42</pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content238.74f3968d.chunk.js.map