(window.webpackJsonp=window.webpackJsonp||[]).push([[457],{523:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n *     this.val = val;\n *     this.left = this.right = null;\n * }\n */</span>\n<span class="hljs-comment">/**\n * @param {TreeNode} root\n * @param {number} sum\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> pathSum = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">root, sum</span>) </span>{\n  <span class="hljs-keyword">if</span>(!root)<span class="hljs-keyword">return</span> <span class="hljs-number">0</span>\n  <span class="hljs-keyword">let</span> hash={},res=<span class="hljs-number">0</span>,targ=sum\n  hash[<span class="hljs-number">0</span>]=<span class="hljs-number">1</span>\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hasPath</span>(<span class="hljs-params">root,curSum</span>)</span>{\n    <span class="hljs-keyword">let</span> curV=root.val\n    <span class="hljs-keyword">let</span> newSum=curSum+curV\n    <span class="hljs-keyword">if</span>(hash[newSum-targ]&gt;<span class="hljs-number">0</span>)res+=hash[newSum-targ]\n    <span class="hljs-keyword">if</span>(hash[newSum]==<span class="hljs-literal">null</span>)hash[newSum]=<span class="hljs-number">0</span>\n    hash[newSum]++\n    <span class="hljs-keyword">if</span>(root.left)hasPath(root.left,newSum)\n    <span class="hljs-keyword">if</span>(root.right)hasPath(root.right,newSum)\n    hash[newSum]--\n  }\n  hasPath(root,<span class="hljs-number">0</span>)\n  <span class="hljs-keyword">return</span> res\n};\n</code></pre>\n'],titleSlug:"path-sum-iii",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p><code>O(n^2)</code>\uff1a\u904d\u5386\u6811\uff0c\u5bf9\u6bcf\u4e00\u4e2a\u8282\u70b9\uff0c\u8fdb\u884c\u8ba1\u7b97\u4ece\u8fd9\u4e2a\u8282\u70b9\u5f00\u59cb\u5f80\u4e0b\u7684\u8def\u5f84\u548c\u7684\u5904\u7406\u3002</p>\n<p><code>O(nlogn)</code>\uff1a\u7c7b\u4f3c<code>Two Sum</code>\uff0c\u5b9a\u4e49\u4e00\u4e2a<code>hash</code>\uff0c\u7528\u6765\u4fdd\u5b58\u5f53\u524d<strong>\u4ece\u4e0a\u5f80\u4e0b\u7684\u8def\u5f84</strong>\u4e0a\u7684\u548c\uff0c\u5982\u679c\u53d1\u73b0<code>\u5f53\u524d\u548c-target</code>\u5b58\u5728\uff0c\n\u76f4\u63a5\u6dfb\u52a0\u5230\u7ed3\u679c\u3002</p>\n<p>\u8981\u6ce8\u610f\u7684\u662f\uff1a<code>hash[sum]</code>\u4fdd\u5b58\u7684\u548c\u53ea\u80fd\u7528\u4e8e\u5f53\u524d\u8282\u70b9\u4ee5\u4e0b\u7684\u8def\u5f84\uff0c\u5982\u679c\u5f53\u524d\u8282\u70b9\u4ee5\u4e0b\u90fd\u5904\u7406\u5b8c\u6bd5\uff0c\u9700\u8981\u51cf\u53bb\u8fd9\u6b21\u4fdd\u5b58\u7684\u7ed3\u679c\uff0c<code>hash[sum]--</code>\u3002</p>\n",content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u4e8c\u53c9\u6811\uff0c\u5b83\u7684\u6bcf\u4e2a\u7ed3\u70b9\u90fd\u5b58\u653e\u7740\u4e00\u4e2a\u6574\u6570\u503c\u3002</p>\n\n<p>\u627e\u51fa\u8def\u5f84\u548c\u7b49\u4e8e\u7ed9\u5b9a\u6570\u503c\u7684\u8def\u5f84\u603b\u6570\u3002</p>\n\n<p>\u8def\u5f84\u4e0d\u9700\u8981\u4ece\u6839\u8282\u70b9\u5f00\u59cb\uff0c\u4e5f\u4e0d\u9700\u8981\u5728\u53f6\u5b50\u8282\u70b9\u7ed3\u675f\uff0c\u4f46\u662f\u8def\u5f84\u65b9\u5411\u5fc5\u987b\u662f\u5411\u4e0b\u7684\uff08\u53ea\u80fd\u4ece\u7236\u8282\u70b9\u5230\u5b50\u8282\u70b9\uff09\u3002</p>\n\n<p>\u4e8c\u53c9\u6811\u4e0d\u8d85\u8fc71000\u4e2a\u8282\u70b9\uff0c\u4e14\u8282\u70b9\u6570\u503c\u8303\u56f4\u662f [-1000000,1000000] \u7684\u6574\u6570\u3002</p>\n\n<p><strong>\u793a\u4f8b\uff1a</strong></p>\n\n<pre>root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8\n\n      10\n     /  \\\n    <strong>5</strong>   <strong>-3</strong>\n   <strong>/</strong> <strong>\\</strong>    <strong>\\</strong>\n  <strong>3</strong>   <strong>2</strong>   <strong>11</strong>\n / \\   <strong>\\</strong>\n3  -2   <strong>1</strong>\n\n\u8fd4\u56de 3\u3002\u548c\u7b49\u4e8e 8 \u7684\u8def\u5f84\u6709:\n\n1.  5 -&gt; 3\n2.  5 -&gt; 2 -&gt; 1\n3.  -3 -&gt; 11\n</pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content488.daed49a7.chunk.js.map