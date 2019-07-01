(window.webpackJsonp=window.webpackJsonp||[]).push([[146],{242:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * Definition for singly-linked list.\n * function ListNode(val) {\n *     this.val = val;\n *     this.next = null;\n * }\n */</span>\n<span class="hljs-comment">/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n *     this.val = val;\n *     this.left = this.right = null;\n * }\n */</span>\n<span class="hljs-comment">/**\n * @param {ListNode} head\n * @return {TreeNode}\n */</span>\n<span class="hljs-keyword">var</span> sortedListToBST = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">head</span>) </span>{\n  <span class="hljs-keyword">let</span> arr=[]\n  <span class="hljs-keyword">let</span> listNode=head\n  <span class="hljs-keyword">while</span>(listNode){\n    arr.push(listNode.val)\n    listNode=listNode.next\n  }\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createTree</span>(<span class="hljs-params">arr,lo,hi</span>)</span>{\n    <span class="hljs-keyword">if</span>(lo&gt;hi)<span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>\n    <span class="hljs-keyword">let</span> mid=<span class="hljs-built_in">Math</span>.floor((lo+hi)/<span class="hljs-number">2</span>)\n    <span class="hljs-keyword">let</span> node=<span class="hljs-keyword">new</span> TreeNode(arr[mid])\n    node.left=createTree(arr,lo,mid<span class="hljs-number">-1</span>)\n    node.right=createTree(arr,mid+<span class="hljs-number">1</span>,hi)\n    <span class="hljs-keyword">return</span> node\n  }\n  <span class="hljs-keyword">return</span> createTree(arr,<span class="hljs-number">0</span>,arr.length<span class="hljs-number">-1</span>)\n};\n</code></pre>\n'],titleSlug:"convert-sorted-list-to-binary-search-tree",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u4e3a\u4e86\u8fbe\u5230<code>\u5e73\u8861\u6811</code>\uff0c\u6bcf\u6b21\u90fd\u8981\u63d2\u5165<code>\u4e2d\u95f4\u503c</code>\uff0c\u5de6\u5b50\u6811\u518d\u63d2\u5165\u5de6\u4fa7\u7684\u4e2d\u95f4\u503c\uff0c\u53f3\u5b50\u6811\u63d2\u5165\u53f3\u4fa7\u7684\u4e2d\u95f4\u503c\uff0c\u7136\u540e\u9012\u5f52\u3002</p>\n<p>\u53ef\u4ee5\u5c06\u94fe\u8868\u8f6c\u5316\u4e3a\u6570\u7ec4\uff0c\u7136\u540e\u901a\u8fc7<code>mid=Math.floor((lo+hi)/2)</code>\u53bb\u67e5\u627e\u4e2d\u95f4\u503c\uff1b</p>\n<p>\u4e5f\u53ef\u4ee5\u76f4\u63a5\u901a\u8fc7\u94fe\u8868\u7684<code>slow=slow.next;fast=fast.next.next</code>\u627e\u4e2d\u95f4\u503c\u3002</p>\n",content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u5355\u94fe\u8868\uff0c\u5176\u4e2d\u7684\u5143\u7d20\u6309\u5347\u5e8f\u6392\u5e8f\uff0c\u5c06\u5176\u8f6c\u6362\u4e3a\u9ad8\u5ea6\u5e73\u8861\u7684\u4e8c\u53c9\u641c\u7d22\u6811\u3002</p>\n\n<p>\u672c\u9898\u4e2d\uff0c\u4e00\u4e2a\u9ad8\u5ea6\u5e73\u8861\u4e8c\u53c9\u6811\u662f\u6307\u4e00\u4e2a\u4e8c\u53c9\u6811<em>\u6bcf\u4e2a\u8282\u70b9&nbsp;</em>\u7684\u5de6\u53f3\u4e24\u4e2a\u5b50\u6811\u7684\u9ad8\u5ea6\u5dee\u7684\u7edd\u5bf9\u503c\u4e0d\u8d85\u8fc7 1\u3002</p>\n\n<p><strong>\u793a\u4f8b:</strong></p>\n\n<pre>\u7ed9\u5b9a\u7684\u6709\u5e8f\u94fe\u8868\uff1a [-10, -3, 0, 5, 9],\n\n\u4e00\u4e2a\u53ef\u80fd\u7684\u7b54\u6848\u662f\uff1a[0, -3, 9, -10, null, 5], \u5b83\u53ef\u4ee5\u8868\u793a\u4e0b\u9762\u8fd9\u4e2a\u9ad8\u5ea6\u5e73\u8861\u4e8c\u53c9\u641c\u7d22\u6811\uff1a\n\n      0\n     / \\\n   -3   9\n   /   /\n -10  5\n</pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content207.98032cc4.chunk.js.map