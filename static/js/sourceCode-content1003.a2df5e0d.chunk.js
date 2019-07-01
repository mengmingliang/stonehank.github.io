(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{1038:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n *     this.val = val;\n *     this.left = this.right = null;\n * }\n */</span>\n<span class="hljs-comment">/**\n * @param {TreeNode} root\n * @return {string}\n */</span>\n<span class="hljs-keyword">var</span> smallestFromLeaf = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">root</span>) </span>{\n  <span class="hljs-keyword">let</span> acode=<span class="hljs-string">\'a\'</span>.charCodeAt(<span class="hljs-number">0</span>)\n  <span class="hljs-keyword">return</span> findSmall(root)\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findSmall</span>(<span class="hljs-params">root</span>)</span>{\n    <span class="hljs-keyword">if</span>(!root)<span class="hljs-keyword">return</span> <span class="hljs-string">\'\'</span>\n    <span class="hljs-keyword">let</span> strLeft=findSmall(root.left)\n    <span class="hljs-keyword">let</span> strRight=findSmall(root.right)\n    <span class="hljs-keyword">let</span> nodeStr=<span class="hljs-built_in">String</span>.fromCharCode(+root.val + acode)\n    <span class="hljs-keyword">if</span>(strLeft===<span class="hljs-string">\'\'</span> &amp;&amp; strRight===<span class="hljs-string">\'\'</span>)<span class="hljs-keyword">return</span> nodeStr\n    <span class="hljs-comment">// if(strLeft===\'\')return strRight+nodeStr</span>\n    <span class="hljs-comment">// if(strRight===\'\')return strLeft+nodeStr</span>\n    <span class="hljs-keyword">if</span>(strRight&lt;strLeft)<span class="hljs-keyword">return</span> strRight+nodeStr\n    <span class="hljs-keyword">if</span>(strLeft&lt;strRight)<span class="hljs-keyword">return</span> strLeft+nodeStr\n    <span class="hljs-keyword">return</span> strRight+nodeStr\n  }\n};\n</code></pre>\n'],titleSlug:"smallest-string-starting-from-leaf",hasThinking:!1,content:'<p>\u7ed9\u5b9a\u4e00\u9897\u6839\u7ed3\u70b9\u4e3a&nbsp;<code>root</code>&nbsp;\u7684\u4e8c\u53c9\u6811\uff0c\u4e66\u4e2d\u7684\u6bcf\u4e2a\u7ed3\u70b9\u90fd\u6709\u4e00\u4e2a\u4ece&nbsp;<code>0</code> \u5230&nbsp;<code>25</code>&nbsp;\u7684\u503c\uff0c\u5206\u522b\u4ee3\u8868\u5b57\u6bcd&nbsp;<code>&#39;a&#39;</code> \u5230&nbsp;<code>&#39;z&#39;</code>\uff1a\u503c&nbsp;<code>0</code> \u4ee3\u8868&nbsp;<code>&#39;a&#39;</code>\uff0c\u503c&nbsp;<code>1</code>&nbsp;\u4ee3\u8868&nbsp;<code>&#39;b&#39;</code>\uff0c\u4f9d\u6b64\u7c7b\u63a8\u3002</p>\n\n<p>\u627e\u51fa\u6309\u5b57\u5178\u5e8f\u6700\u5c0f\u7684\u5b57\u7b26\u4e32\uff0c\u8be5\u5b57\u7b26\u4e32\u4ece\u8fd9\u68f5\u6811\u7684\u4e00\u4e2a\u53f6\u7ed3\u70b9\u5f00\u59cb\uff0c\u5230\u6839\u7ed3\u70b9\u7ed3\u675f\u3002</p>\n\n<p><em>\uff08\u5c0f\u8d34\u58eb\uff1a\u5b57\u7b26\u4e32\u4e2d\u4efb\u4f55\u8f83\u77ed\u7684\u524d\u7f00\u5728\u5b57\u5178\u5e8f\u4e0a\u90fd\u662f\u8f83\u5c0f\u7684\uff1a\u4f8b\u5982\uff0c\u5728\u5b57\u5178\u5e8f\u4e0a&nbsp;<code>&quot;ab&quot;</code> \u6bd4&nbsp;<code>&quot;aba&quot;</code>&nbsp;\u8981\u5c0f\u3002\u53f6\u7ed3\u70b9\u662f\u6307\u6ca1\u6709\u5b50\u7ed3\u70b9\u7684\u7ed3\u70b9\u3002\uff09</em></p>\n\n<p>&nbsp;</p>\n\n<ol>\n</ol>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/02/02/tree1.png" style="height: 107px; width: 160px;"></strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>[0,1,2,3,4,3,4]\n<strong>\u8f93\u51fa\uff1a</strong>&quot;dba&quot;\n</pre>\n\n<p><strong>\u793a\u4f8b 2\uff1a</strong></p>\n\n<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/02/02/tree2.png" style="height: 107px; width: 160px;"></strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>[25,1,3,1,3,0,2]\n<strong>\u8f93\u51fa\uff1a</strong>&quot;adz&quot;\n</pre>\n\n<p><strong>\u793a\u4f8b 3\uff1a</strong></p>\n\n<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/02/02/tree3.png" style="height: 180px; width: 172px;"></strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>[2,2,1,null,1,0,null,0]\n<strong>\u8f93\u51fa\uff1a</strong>&quot;abc&quot;\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ol>\n\t<li>\u7ed9\u5b9a\u6811\u7684\u7ed3\u70b9\u6570\u4ecb\u4e8e&nbsp;<code>1</code> \u548c&nbsp;<code>8500</code>&nbsp;\u4e4b\u95f4\u3002</li>\n\t<li>\u6811\u4e2d\u7684\u6bcf\u4e2a\u7ed3\u70b9\u90fd\u6709\u4e00\u4e2a\u4ecb\u4e8e&nbsp;<code>0</code>&nbsp;\u548c&nbsp;<code>25</code>&nbsp;\u4e4b\u95f4\u7684\u503c\u3002</li>\n</ol>\n'}}}]);
//# sourceMappingURL=sourceCode-content1003.a2df5e0d.chunk.js.map