(window.webpackJsonp=window.webpackJsonp||[]).push([[202],{293:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * Definition for singly-linked list.\n * function ListNode(val) {\n *     this.val = val;\n *     this.next = null;\n * }\n */</span>\n\n<span class="hljs-comment">/**\n * @param {ListNode} head\n * @return {ListNode}\n */</span>\n<span class="hljs-keyword">var</span> detectCycle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">head</span>) </span>{\n  <span class="hljs-keyword">let</span> fast=head,slow=head\n  <span class="hljs-keyword">let</span> cycle=<span class="hljs-literal">false</span>,node=<span class="hljs-literal">null</span>,loopLength=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">while</span>(fast &amp;&amp; fast.next){\n    fast=fast.next.next\n    slow=slow.next\n    loopLength++\n    <span class="hljs-keyword">if</span>(fast===slow){\n      cycle=<span class="hljs-literal">true</span>\n      <span class="hljs-keyword">break</span>\n    }\n  }\n  <span class="hljs-keyword">if</span>(!cycle)<span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>\n  fast=head\n  <span class="hljs-keyword">while</span>(fast!==slow){\n    slow=slow.next\n    fast=fast.next\n  }\n  <span class="hljs-keyword">return</span> fast\n};\n</code></pre>\n'],titleSlug:"linked-list-cycle-ii",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u9996\u5148\u901a\u8fc7\u5feb\u6162<code>\u53cc\u6307\u9488</code>\u8ba1\u7b97\u51fa\u662f\u5426\u5b58\u5728\u73af\uff0c\u548c\u73af\u7684\u8282\u70b9\u6570\u3002</p>\n<p>\u77e5\u9053\u4e86\u73af\u7684\u8282\u70b9\u6570\uff0c\u7ee7\u7eed<code>\u53cc\u6307\u9488</code>\u4e00\u524d\u4e00\u540e\u76f8\u9694\u73af\u7684\u957f\u5ea6\uff0c\u5f53\u5b83\u4eec\u76f8\u9047\u7684\u65f6\u5019\uff0c\u5fc5\u5b9a\u5728\u73af\u7684\u8d77\u70b9\u3002</p>\n",content:'<p>\u7ed9\u5b9a\u4e00\u4e2a\u94fe\u8868\uff0c\u8fd4\u56de\u94fe\u8868\u5f00\u59cb\u5165\u73af\u7684\u7b2c\u4e00\u4e2a\u8282\u70b9\u3002&nbsp;\u5982\u679c\u94fe\u8868\u65e0\u73af\uff0c\u5219\u8fd4\u56de&nbsp;<code>null</code>\u3002</p>\n\n<p>\u4e3a\u4e86\u8868\u793a\u7ed9\u5b9a\u94fe\u8868\u4e2d\u7684\u73af\uff0c\u6211\u4eec\u4f7f\u7528\u6574\u6570 <code>pos</code> \u6765\u8868\u793a\u94fe\u8868\u5c3e\u8fde\u63a5\u5230\u94fe\u8868\u4e2d\u7684\u4f4d\u7f6e\uff08\u7d22\u5f15\u4ece 0 \u5f00\u59cb\uff09\u3002 \u5982\u679c <code>pos</code> \u662f <code>-1</code>\uff0c\u5219\u5728\u8be5\u94fe\u8868\u4e2d\u6ca1\u6709\u73af\u3002</p>\n\n<p><strong>\u8bf4\u660e\uff1a</strong>\u4e0d\u5141\u8bb8\u4fee\u6539\u7ed9\u5b9a\u7684\u94fe\u8868\u3002</p>\n\n<p>&nbsp;</p>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>head = [3,2,0,-4], pos = 1\n<strong>\u8f93\u51fa\uff1a</strong>tail connects to node index 1\n<strong>\u89e3\u91ca\uff1a</strong>\u94fe\u8868\u4e2d\u6709\u4e00\u4e2a\u73af\uff0c\u5176\u5c3e\u90e8\u8fde\u63a5\u5230\u7b2c\u4e8c\u4e2a\u8282\u70b9\u3002\n</pre>\n\n<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist.png" style="height: 97px; width: 300px;"></p>\n\n<p><strong>\u793a\u4f8b&nbsp;2\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>head = [1,2], pos = 0\n<strong>\u8f93\u51fa\uff1a</strong>tail connects to node index 0\n<strong>\u89e3\u91ca\uff1a</strong>\u94fe\u8868\u4e2d\u6709\u4e00\u4e2a\u73af\uff0c\u5176\u5c3e\u90e8\u8fde\u63a5\u5230\u7b2c\u4e00\u4e2a\u8282\u70b9\u3002\n</pre>\n\n<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test2.png" style="height: 74px; width: 141px;"></p>\n\n<p><strong>\u793a\u4f8b 3\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>head = [1], pos = -1\n<strong>\u8f93\u51fa\uff1a</strong>no cycle\n<strong>\u89e3\u91ca\uff1a</strong>\u94fe\u8868\u4e2d\u6ca1\u6709\u73af\u3002\n</pre>\n\n<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test3.png" style="height: 45px; width: 45px;"></p>\n\n<p>&nbsp;</p>\n\n<p><strong>\u8fdb\u9636\uff1a</strong><br>\n\u4f60\u662f\u5426\u53ef\u4ee5\u4e0d\u7528\u989d\u5916\u7a7a\u95f4\u89e3\u51b3\u6b64\u9898\uff1f</p>\n'}}}]);
//# sourceMappingURL=sourceCode-content258.9c4e75b5.chunk.js.map