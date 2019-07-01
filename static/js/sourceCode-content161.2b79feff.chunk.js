(window.webpackJsonp=window.webpackJsonp||[]).push([[95],{196:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n *     this.val = val;\n *     this.left = this.right = null;\n * }\n */</span>\n<span class="hljs-comment">/**\n * @param {string} S\n * @return {TreeNode}\n */</span>\n<span class="hljs-keyword">var</span> recoverFromPreorder = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">S</span>) </span>{\n  <span class="hljs-keyword">let</span> stack=[]\n  <span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">while</span>(i&lt;S.length){\n    <span class="hljs-keyword">let</span> deep=<span class="hljs-number">0</span>,val=<span class="hljs-string">\'\'</span>\n    <span class="hljs-keyword">while</span>(S[i]===<span class="hljs-string">\'-\'</span>){\n      deep++\n      i++\n    }\n    <span class="hljs-keyword">while</span>(<span class="hljs-regexp">/\\d/</span>.test(S[i])){\n      val+=S[i]\n      i++\n    }\n    <span class="hljs-keyword">while</span>(stack.length&gt;deep){\n      stack.pop()\n    }\n    <span class="hljs-keyword">let</span> node=<span class="hljs-keyword">new</span> TreeNode(+val)\n    <span class="hljs-keyword">if</span>(stack.length&gt;<span class="hljs-number">0</span>){\n      <span class="hljs-keyword">if</span>(stack[stack.length<span class="hljs-number">-1</span>].left==<span class="hljs-literal">null</span>)stack[stack.length<span class="hljs-number">-1</span>].left=node\n      <span class="hljs-keyword">else</span> stack[stack.length<span class="hljs-number">-1</span>].right=node\n    }\n    stack.push(node)\n  }\n  <span class="hljs-keyword">return</span> stack[<span class="hljs-number">0</span>]\n};\n</code></pre>\n'],titleSlug:"recover-a-tree-from-preorder-traversal",hasThinking:!0,thinking:'<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u81ea\u5df1\u7684\u601d\u8def\u662f\u8fd9\u6837\u7684\uff0c\u9996\u5148\u627e\u51fa\u6700\u6df1\u7684\u6df1\u5ea6<code>maxDeep</code>\uff0c\u7136\u540e\u5c06\u5b57\u7b26\u4e32<code>S</code>\u7684<code>-</code>\u6570\u91cf\u53cd\u8f6c\uff0c</p>\n<p>\u4f8b\u5982\uff1a<code>1-2--3--4-6--7</code>\u5c31\u53d8\u6210<code>###1##2#3#4##5#6</code>\uff0c\u4e3a\u4ec0\u4e48\u8981\u505a\u8fd9\u4e00\u6b65\uff0c\u56e0\u4e3a\u4ece\u591a\u5230\u5c11\uff0c\u6211\u4eec\u53ef\u4ee5\u6bcf\u6b21\u76f4\u63a5<code>split</code>\u5206\u5272\u3002</p>\n<p>\u5bf9\u4e8e\u5206\u5272\u540e\u7684<code>sArr</code>\uff0c\u627e\u51fa\u6bcf\u4e00\u4e2a\u5143\u7d20\u7684\u5f00\u5934\u7684\u6570\u5b57\uff0c\u8fd9\u4e2a\u6570\u5b57\u5c31\u662f\u5f53\u524d<code>root</code>\u7684<code>val</code>\uff0c\u7136\u540e\u5269\u4f59\u7684\u5b57\u7b26\u5219\u4e3a\u5b83\u7684<code>left</code>\u6216\u8005<code>right</code>\uff0c\u9012\u5f52\u5904\u7406\u5373\u53ef\u3002</p>\n<pre class="hljs"><code><span class="hljs-comment">/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n *     this.val = val;\n *     this.left = this.right = null;\n * }\n */</span>\n<span class="hljs-comment">/**\n * @param {string} S\n * @return {TreeNode}\n */</span>\n<span class="hljs-keyword">var</span> recoverFromPreorder = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">S</span>) </span>{\n  <span class="hljs-keyword">let</span> maxDeep=<span class="hljs-number">0</span>,curDeep=<span class="hljs-number">0</span>\n  <span class="hljs-comment">// \u91cd\u65b0\u6784\u5efaS</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;S.length;i++){\n    <span class="hljs-keyword">if</span>(S[i]===<span class="hljs-string">"-"</span>)curDeep++\n    <span class="hljs-keyword">else</span>{\n      maxDeep=<span class="hljs-built_in">Math</span>.max(maxDeep,curDeep)\n      curDeep=<span class="hljs-number">0</span>\n    }\n  }\n  <span class="hljs-keyword">let</span> newMax=maxDeep+<span class="hljs-number">1</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=maxDeep;i&gt;=<span class="hljs-number">1</span>;i--){\n    <span class="hljs-keyword">let</span> r=<span class="hljs-string">\'-\'</span>.repeat(i)\n    S=S.replace(<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(r,<span class="hljs-string">\'g\'</span>),<span class="hljs-string">\'#\'</span>.repeat(newMax-i))\n  }\n  S=<span class="hljs-string">"#"</span>.repeat(newMax)+S\n  \n  <span class="hljs-keyword">let</span> root=<span class="hljs-keyword">new</span> TreeNode(<span class="hljs-literal">null</span>)\n  <span class="hljs-comment">// \u9012\u5f52\u5904\u7406</span>\n  resolve(S,<span class="hljs-number">0</span>,root)\n  <span class="hljs-keyword">return</span> root.left\n  \n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">S,deep,root</span>)</span>{\n    <span class="hljs-keyword">let</span> deepStr=<span class="hljs-string">"#"</span>.repeat(newMax-deep)\n    <span class="hljs-keyword">let</span> sArr=S.split(deepStr)\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;sArr.length;i++){\n      <span class="hljs-keyword">if</span>(sArr[i]===<span class="hljs-string">\'\'</span>)<span class="hljs-keyword">continue</span>\n      <span class="hljs-keyword">let</span> val=<span class="hljs-string">\'\'</span>\n      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;j&lt;=sArr[i].length;j++){\n        <span class="hljs-comment">// \u5bf9\u6bcf\u4e2a\u5206\u5272\u540e\u7684\u5143\u7d20\u904d\u5386</span>\n        <span class="hljs-comment">// \u627e\u51fa\u6700\u5934\u4e0a\u7684\u6570\u5b57\uff0c\u7136\u540e\u5269\u4f59\u90e8\u5206\u7ee7\u7eed\u9012\u5f52\u5904\u7406</span>\n        <span class="hljs-keyword">if</span>(j===sArr[i].length || !<span class="hljs-regexp">/\\d/</span>.test(sArr[i][j])){\n          <span class="hljs-keyword">if</span>(root.left==<span class="hljs-literal">null</span>){\n            root.left=<span class="hljs-keyword">new</span> TreeNode(+val)\n            resolve(sArr[i].substring(j),deep+<span class="hljs-number">1</span>,root.left)\n          }<span class="hljs-keyword">else</span>{\n            root.right=<span class="hljs-keyword">new</span> TreeNode(+val)\n            resolve(sArr[i].substring(j),deep+<span class="hljs-number">1</span>,root.right)      \n          }\n          <span class="hljs-keyword">break</span>\n        }<span class="hljs-keyword">else</span>{\n           val+=sArr[i][j]\n        }\n      }\n    }\n  }\n};\n</code></pre>\n<p>\u66f4\u7b80\u6d01\u7684\u4ee3\u7801\u662f\u770b<code>POST</code>\u7684\uff0c\u5229\u7528\u4e00\u4e2a<code>stack</code>\u4e0d\u65ad\u5c06\u5f53\u524d\u6570\u5b57\u7684\u8282\u70b9\u538b\u5165\u6808\uff0c\u5e76\u4e14\u5c06\u5f53\u524d\u8282\u70b9\u4f5c\u4e3a<code>stack</code>\u6700\u540e\u4e00\u4e2a\u8282\u70b9\u7684\u5b50\u8282\u70b9\uff0c\n\u5982\u679c\u53d1\u73b0\u5f53\u524d<code>deep</code>\u5927\u4e8e<code>stack.length</code>\uff0c\u8bf4\u660e\u5f53\u524d\u8282\u70b9\u4e0d\u518d\u662f<code>stack[stack.length-1]</code>\u8fd9\u4e2a\u8282\u70b9\u7684\u5b50\u8282\u70b9\uff0c\u56e0\u6b64<code>stack.pop</code>\uff0c\n\u76f4\u5230<code>deep</code>\u4e0d\u5927\u4e8e<code>stack.length</code>\u3002</p>\n',content:'<p>\u6211\u4eec\u4ece\u4e8c\u53c9\u6811\u7684\u6839\u8282\u70b9 <code>root</code>&nbsp;\u5f00\u59cb\u8fdb\u884c\u6df1\u5ea6\u4f18\u5148\u641c\u7d22\u3002</p>\n\n<p>\u5728\u904d\u5386\u4e2d\u7684\u6bcf\u4e2a\u8282\u70b9\u5904\uff0c\u6211\u4eec\u8f93\u51fa&nbsp;<code>D</code>&nbsp;\u6761\u77ed\u5212\u7ebf\uff08\u5176\u4e2d&nbsp;<code>D</code>&nbsp;\u662f\u8be5\u8282\u70b9\u7684\u6df1\u5ea6\uff09\uff0c\u7136\u540e\u8f93\u51fa\u8be5\u8282\u70b9\u7684\u503c\u3002\uff08<em>\u5982\u679c\u8282\u70b9\u7684\u6df1\u5ea6\u4e3a <code>D</code>\uff0c\u5219\u5176\u76f4\u63a5\u5b50\u8282\u70b9\u7684\u6df1\u5ea6\u4e3a <code>D + 1</code>\u3002\u6839\u8282\u70b9\u7684\u6df1\u5ea6\u4e3a <code>0</code>\uff09\u3002</em></p>\n\n<p>\u5982\u679c\u8282\u70b9\u53ea\u6709\u4e00\u4e2a\u5b50\u8282\u70b9\uff0c\u90a3\u4e48\u4fdd\u8bc1\u8be5\u5b50\u8282\u70b9\u4e3a\u5de6\u5b50\u8282\u70b9\u3002</p>\n\n<p>\u7ed9\u51fa\u904d\u5386\u8f93\u51fa&nbsp;<code>S</code>\uff0c\u8fd8\u539f\u6811\u5e76\u8fd4\u56de\u5176\u6839\u8282\u70b9&nbsp;<code>root</code>\u3002</p>\n\n<p>&nbsp;</p>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/04/12/recover-a-tree-from-preorder-traversal.png" style="height: 200px; width: 320px;"></strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>&quot;1-2--3--4-5--6--7&quot;\n<strong>\u8f93\u51fa\uff1a</strong>[1,2,5,3,4,6,7]\n</pre>\n\n<p><strong>\u793a\u4f8b 2\uff1a</strong></p>\n\n<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/04/12/screen-shot-2019-04-10-at-114101-pm.png" style="height: 250px; width: 256px;"></strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>&quot;1-2--3---4-5--6---7&quot;\n<strong>\u8f93\u51fa\uff1a</strong>[1,2,5,3,null,6,null,4,null,7]\n</pre>\n\n<p><strong>\u793a\u4f8b 3\uff1a</strong></p>\n\n<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/04/12/screen-shot-2019-04-10-at-114955-pm.png" style="height: 250px; width: 276px;"></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>&quot;1-401--349---90--88&quot;\n<strong>\u8f93\u51fa\uff1a</strong>[1,401,null,349,88,90]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ul>\n\t<li>\u539f\u59cb\u6811\u4e2d\u7684\u8282\u70b9\u6570\u4ecb\u4e8e <code>1</code> \u548c <code>1000</code> \u4e4b\u95f4\u3002</li>\n\t<li>\u6bcf\u4e2a\u8282\u70b9\u7684\u503c\u4ecb\u4e8e <code>1</code> \u548c <code>10 ^ 9</code> \u4e4b\u95f4\u3002</li>\n</ul>\n'}}}]);
//# sourceMappingURL=sourceCode-content161.2b79feff.chunk.js.map