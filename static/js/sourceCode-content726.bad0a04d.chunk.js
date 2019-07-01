(window.webpackJsonp=window.webpackJsonp||[]).push([[722],{761:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * Definition for singly-linked list.\n * function ListNode(val) {\n *     this.val = val;\n *     this.next = null;\n * }\n */</span>\n<span class="hljs-comment">/**\n * @param {ListNode} root\n * @param {number} k\n * @return {ListNode[]}\n */</span>\n<span class="hljs-keyword">var</span> splitListToParts = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">root, k</span>) </span>{\n  <span class="hljs-keyword">let</span> len=<span class="hljs-number">0</span>,node=root\n  <span class="hljs-keyword">while</span>(node){\n    node=node.next\n    len++\n  }\n  node=root\n  <span class="hljs-keyword">let</span> res=<span class="hljs-built_in">Array</span>(k).fill(<span class="hljs-literal">null</span>),id=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">while</span>(len&gt;<span class="hljs-number">0</span>){\n    <span class="hljs-keyword">let</span> nxtLens=<span class="hljs-built_in">Math</span>.ceil(len/k)    \n    len-=nxtLens\n    k-=<span class="hljs-number">1</span>\n    <span class="hljs-keyword">let</span> n=node\n    <span class="hljs-keyword">while</span>(nxtLens--&gt;<span class="hljs-number">1</span>){\n      n=n.next\n    }\n    res[id++]=node\n    node=n.next\n    n.next=<span class="hljs-literal">null</span>\n  }\n  <span class="hljs-keyword">return</span> res\n  \n};\n</code></pre>\n'],titleSlug:"split-linked-list-in-parts",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u5148\u627e\u51fa<code>root</code>\u7684\u957f\u5ea6<code>len</code>\uff0c\u7136\u540e\u53ef\u4ee5\u4e0d\u65ad\u5206\u5272\uff0c\u5206\u5272\u4f9d\u636e\u662f<code>Math.ceil(len/k)</code>\uff0c\u6bcf\u6b21\u5206\u5272\u5b8c\u540e\uff0c<code>len</code>\u9700\u8981\u51cf\u53bb\u5206\u5272\u7684\u957f\u5ea6\uff0c<code>k</code>\u9700\u8981\u51cf<code>1</code>\u3002</p>\n<p>\u5177\u4f53\u5206\u5272\u6b65\u9aa4\u5c31\u662f\u6839\u636e\u5206\u5272\u957f\u5ea6\uff0c\u66f4\u65b0<code>node</code>(\u540e\u7eed\u63a5\u7740\u4ece\u4e0b\u4e00\u4e2a\u8282\u70b9\u5f00\u59cb)\uff0c\u5e76\u4e14\u5c06\u8fd9\u4e00\u6bb5\u7684\u94fe\u8868\u6700\u540e\u4e00\u4e2a\u8282\u70b9\u7684<code>next</code>\u8bbe\u7f6e\u4e3a<code>null</code>\u3002</p>\n",content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u5934\u7ed3\u70b9\u4e3a <code>root</code> \u7684\u94fe\u8868, \u7f16\u5199\u4e00\u4e2a\u51fd\u6570\u4ee5\u5c06\u94fe\u8868\u5206\u9694\u4e3a <code>k</code> \u4e2a\u8fde\u7eed\u7684\u90e8\u5206\u3002</p>\n\n<p>\u6bcf\u90e8\u5206\u7684\u957f\u5ea6\u5e94\u8be5\u5c3d\u53ef\u80fd\u7684\u76f8\u7b49: \u4efb\u610f\u4e24\u90e8\u5206\u7684\u957f\u5ea6\u5dee\u8ddd\u4e0d\u80fd\u8d85\u8fc7 1\uff0c\u4e5f\u5c31\u662f\u8bf4\u53ef\u80fd\u6709\u4e9b\u90e8\u5206\u4e3a null\u3002</p>\n\n<p>\u8fd9k\u4e2a\u90e8\u5206\u5e94\u8be5\u6309\u7167\u5728\u94fe\u8868\u4e2d\u51fa\u73b0\u7684\u987a\u5e8f\u8fdb\u884c\u8f93\u51fa\uff0c\u5e76\u4e14\u6392\u5728\u524d\u9762\u7684\u90e8\u5206\u7684\u957f\u5ea6\u5e94\u8be5\u5927\u4e8e\u6216\u7b49\u4e8e\u540e\u9762\u7684\u957f\u5ea6\u3002</p>\n\n<p>\u8fd4\u56de\u4e00\u4e2a\u7b26\u5408\u4e0a\u8ff0\u89c4\u5219\u7684\u94fe\u8868\u7684\u5217\u8868\u3002</p>\n\n<p>\u4e3e\u4f8b\uff1a 1-&gt;2-&gt;3-&gt;4, k = 5 // 5 \u7ed3\u679c [ [1], [2], [3], [4], null ]</p>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> \nroot = [1, 2, 3], k = 5\n<strong>\u8f93\u51fa:</strong> [[1],[2],[3],[],[]]\n<strong>\u89e3\u91ca:</strong>\n\u8f93\u5165\u8f93\u51fa\u5404\u90e8\u5206\u90fd\u5e94\u8be5\u662f\u94fe\u8868\uff0c\u800c\u4e0d\u662f\u6570\u7ec4\u3002\n\u4f8b\u5982, \u8f93\u5165\u7684\u7ed3\u70b9 root \u7684 val= 1, root.next.val = 2, \\root.next.next.val = 3, \u4e14 root.next.next.next = null\u3002\n\u7b2c\u4e00\u4e2a\u8f93\u51fa output[0] \u662f output[0].val = 1, output[0].next = null\u3002\n\u6700\u540e\u4e00\u4e2a\u5143\u7d20 output[4] \u4e3a null, \u5b83\u4ee3\u8868\u4e86\u6700\u540e\u4e00\u4e2a\u90e8\u5206\u4e3a\u7a7a\u94fe\u8868\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 2\uff1a</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> \nroot = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], k = 3\n<strong>\u8f93\u51fa:</strong> [[1, 2, 3, 4], [5, 6, 7], [8, 9, 10]]\n<strong>\u89e3\u91ca:</strong>\n\u8f93\u5165\u88ab\u5206\u6210\u4e86\u51e0\u4e2a\u8fde\u7eed\u7684\u90e8\u5206\uff0c\u5e76\u4e14\u6bcf\u90e8\u5206\u7684\u957f\u5ea6\u76f8\u5dee\u4e0d\u8d85\u8fc71.\u524d\u9762\u90e8\u5206\u7684\u957f\u5ea6\u5927\u4e8e\u7b49\u4e8e\u540e\u9762\u90e8\u5206\u7684\u957f\u5ea6\u3002\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a:</strong></p>\n\n<ul>\n\t<li><code>root</code> \u7684\u957f\u5ea6\u8303\u56f4\uff1a&nbsp;<code>[0, 1000]</code>.</li>\n\t<li>\u8f93\u5165\u7684\u6bcf\u4e2a\u8282\u70b9\u7684\u5927\u5c0f\u8303\u56f4\uff1a<code>[0, 999]</code>.</li>\n\t<li><code>k</code>&nbsp;\u7684\u53d6\u503c\u8303\u56f4\uff1a&nbsp;<code>[1, 50]</code>.</li>\n</ul>\n\n<p>&nbsp;</p>\n"}}}]);
//# sourceMappingURL=sourceCode-content726.bad0a04d.chunk.js.map