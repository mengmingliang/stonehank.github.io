(window.webpackJsonp=window.webpackJsonp||[]).push([[875],{900:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n *     this.val = val;\n *     this.left = this.right = null;\n * }\n */</span>\n<span class="hljs-comment">/**\n * @param {TreeNode} root\n * @param {TreeNode} target\n * @param {number} K\n * @return {number[]}\n */</span>\n<span class="hljs-keyword">var</span> distanceK = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">root, target, K</span>) </span>{\n    <span class="hljs-keyword">let</span> cache={};\n    <span class="hljs-keyword">let</span> res=[]\n    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">check</span>(<span class="hljs-params">obj,n</span>)</span>{\n        <span class="hljs-keyword">if</span>(!obj[n])obj[n]=[]\n    }\n    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">DFS</span>(<span class="hljs-params">node</span>)</span>{\n        check(cache,node.val)\n        <span class="hljs-keyword">if</span>(node.left){\n            check(cache,node.left.val)\n            cache[node.val].push(node.left.val)\n            cache[node.left.val].push(node.val)\n            DFS(node.left)\n        }\n        <span class="hljs-keyword">if</span>(node.right){\n            check(cache,node.right.val)\n            cache[node.val].push(node.right.val)\n            cache[node.right.val].push(node.val)\n            DFS(node.right)\n        }\n    }\n    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">recur</span>(<span class="hljs-params">arr,n,k</span>)</span>{\n        <span class="hljs-keyword">if</span>(k===<span class="hljs-number">0</span>)<span class="hljs-keyword">return</span> [n]\n        <span class="hljs-keyword">if</span>(k===<span class="hljs-number">1</span>){<span class="hljs-keyword">return</span> arr}\n        <span class="hljs-keyword">let</span> res=[]\n        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;arr.length;i++){\n            <span class="hljs-keyword">let</span> cur=cache[arr[i]];\n            <span class="hljs-keyword">let</span> curRes=[]\n            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;j&lt;cur.length;j++){\n                <span class="hljs-keyword">if</span>(cur[j]!==n){\n                    curRes.push(cur[j])\n                }\n            }\n            res=res.concat(recur(curRes,arr[i],k<span class="hljs-number">-1</span>))\n        }\n        <span class="hljs-keyword">return</span> res\n    }\n    DFS(root)\n    res=recur(cache[target.val],target.val,K)\n    <span class="hljs-keyword">return</span> res\n   \n};\n</code></pre>\n'],titleSlug:"all-nodes-distance-k-in-binary-tree",hasThinking:!1,content:'<p>\u7ed9\u5b9a\u4e00\u4e2a\u4e8c\u53c9\u6811\uff08\u5177\u6709\u6839\u7ed3\u70b9&nbsp;<code>root</code>\uff09\uff0c&nbsp;\u4e00\u4e2a\u76ee\u6807\u7ed3\u70b9&nbsp;<code>target</code>&nbsp;\uff0c\u548c\u4e00\u4e2a\u6574\u6570\u503c <code>K</code> \u3002</p>\n\n<p>\u8fd4\u56de\u5230\u76ee\u6807\u7ed3\u70b9 <code>target</code> \u8ddd\u79bb\u4e3a <code>K</code> \u7684\u6240\u6709\u7ed3\u70b9\u7684\u503c\u7684\u5217\u8868\u3002 \u7b54\u6848\u53ef\u4ee5\u4ee5\u4efb\u4f55\u987a\u5e8f\u8fd4\u56de\u3002</p>\n\n<p>&nbsp;</p>\n\n<ol>\n</ol>\n\n<p><strong>\u793a\u4f8b 1\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, K = 2\n\n<strong>\u8f93\u51fa\uff1a</strong>[7,4,1]\n\n<strong>\u89e3\u91ca\uff1a</strong>\n\u6240\u6c42\u7ed3\u70b9\u4e3a\u4e0e\u76ee\u6807\u7ed3\u70b9\uff08\u503c\u4e3a 5\uff09\u8ddd\u79bb\u4e3a 2 \u7684\u7ed3\u70b9\uff0c\n\u503c\u5206\u522b\u4e3a 7\uff0c4\uff0c\u4ee5\u53ca 1\n\n<img alt="" src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/06/28/sketch0.png" style="height: 240px; width: 280px;">\n\n\u6ce8\u610f\uff0c\u8f93\u5165\u7684 &quot;root&quot; \u548c &quot;target&quot; \u5b9e\u9645\u4e0a\u662f\u6811\u4e0a\u7684\u7ed3\u70b9\u3002\n\u4e0a\u9762\u7684\u8f93\u5165\u4ec5\u4ec5\u662f\u5bf9\u8fd9\u4e9b\u5bf9\u8c61\u8fdb\u884c\u4e86\u5e8f\u5217\u5316\u63cf\u8ff0\u3002\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ol>\n\t<li>\u7ed9\u5b9a\u7684\u6811\u662f\u975e\u7a7a\u7684\uff0c\u4e14\u6700\u591a\u6709&nbsp;<code>K</code>&nbsp;\u4e2a\u7ed3\u70b9\u3002</li>\n\t<li>\u6811\u4e0a\u7684\u6bcf\u4e2a\u7ed3\u70b9\u90fd\u5177\u6709\u552f\u4e00\u7684\u503c&nbsp;<code>0 &lt;= node.val &lt;= 500</code>&nbsp;\u3002</li>\n\t<li>\u76ee\u6807\u7ed3\u70b9&nbsp;<code>target</code>&nbsp;\u662f\u6811\u4e0a\u7684\u7ed3\u70b9\u3002</li>\n\t<li><code>0 &lt;= K &lt;= 1000</code>.</li>\n</ol>\n'}}}]);
//# sourceMappingURL=sourceCode-content865.67f12ab7.chunk.js.map