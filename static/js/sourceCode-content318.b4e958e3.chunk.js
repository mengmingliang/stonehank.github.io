(window.webpackJsonp=window.webpackJsonp||[]).push([[269],{353:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[][]} buildings\n * @return {number[][]}\n */</span>\n<span class="hljs-keyword">var</span> getSkyline = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">buildings</span>) </span>{\n  <span class="hljs-keyword">let</span> vertexes=[]\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;buildings.length;i++){\n    <span class="hljs-keyword">let</span> [s,e,h]=buildings[i]\n    vertexes.push([s,h,<span class="hljs-number">0</span>],[e,h,<span class="hljs-number">1</span>])\n  }\n  vertexes.sort(<span class="hljs-function">(<span class="hljs-params">a,b</span>)=&gt;</span>{\n    <span class="hljs-comment">// \u9ed8\u8ba4\u6309\u4ece\u5c0f\u5230\u5927\u6392\u5e8f</span>\n    <span class="hljs-keyword">if</span>(a[<span class="hljs-number">0</span>]&lt;b[<span class="hljs-number">0</span>])<span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>\n    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(a[<span class="hljs-number">0</span>]&gt;b[<span class="hljs-number">0</span>])<span class="hljs-keyword">return</span> <span class="hljs-number">1</span>\n    <span class="hljs-keyword">else</span>{\n      <span class="hljs-comment">// \u90fd\u662fS\uff0c\u4ece\u5927\u5230\u5c0f</span>\n      <span class="hljs-keyword">if</span>(a[<span class="hljs-number">2</span>]===<span class="hljs-number">0</span> &amp;&amp; b[<span class="hljs-number">2</span>]===<span class="hljs-number">0</span>)<span class="hljs-keyword">return</span> b[<span class="hljs-number">1</span>]-a[<span class="hljs-number">1</span>]\n      <span class="hljs-comment">// \u90fd\u662fE\uff0c\u4ece\u5c0f\u5230\u5927</span>\n      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(a[<span class="hljs-number">2</span>]===<span class="hljs-number">1</span> &amp;&amp; b[<span class="hljs-number">2</span>]===<span class="hljs-number">1</span>)<span class="hljs-keyword">return</span> a[<span class="hljs-number">1</span>]-b[<span class="hljs-number">1</span>]\n      <span class="hljs-comment">// \u4e00\u4e2aS\u4e00\u4e2aE\uff0c\u5148S\u540eE</span>\n      <span class="hljs-keyword">else</span>{\n        <span class="hljs-keyword">if</span>(a[<span class="hljs-number">2</span>]===<span class="hljs-number">0</span>)<span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>\n        <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>\n      }\n    }\n  })\n  <span class="hljs-keyword">let</span> pq=[],max=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">let</span> result=[]\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bsEnd</span>(<span class="hljs-params">arr,n</span>)</span>{\n    <span class="hljs-keyword">let</span> lo=<span class="hljs-number">0</span>,hi=arr.length<span class="hljs-number">-1</span>\n    <span class="hljs-keyword">while</span>(lo&lt;hi){\n      <span class="hljs-keyword">let</span> mid=<span class="hljs-built_in">Math</span>.floor((lo+hi)/<span class="hljs-number">2</span>)\n      <span class="hljs-keyword">if</span>(arr[mid]&lt;n)lo=mid+<span class="hljs-number">1</span>\n      <span class="hljs-keyword">else</span> hi=mid\n    }\n    <span class="hljs-keyword">return</span> hi\n  }  \n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">insert</span>(<span class="hljs-params">n</span>)</span>{\n    <span class="hljs-keyword">if</span>(pq.length===<span class="hljs-number">0</span> || n&gt;=pq[pq.length<span class="hljs-number">-1</span>]){\n      pq.push(n)\n    }<span class="hljs-keyword">else</span>{\n      pq.splice(bsEnd(pq,n),<span class="hljs-number">0</span>,n)\n    }\n  }\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">remove</span>(<span class="hljs-params">n</span>)</span>{\n    pq.splice(bsEnd(pq,n),<span class="hljs-number">1</span>)\n  }\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getMax</span>(<span class="hljs-params"></span>)</span>{\n    <span class="hljs-keyword">if</span>(pq.length===<span class="hljs-number">0</span>)<span class="hljs-keyword">return</span> <span class="hljs-number">0</span>\n    <span class="hljs-keyword">return</span> pq[pq.length<span class="hljs-number">-1</span>]\n  }\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;vertexes.length;i++){\n    <span class="hljs-keyword">let</span> [x,y,state]=vertexes[i]\n    <span class="hljs-keyword">if</span>(state===<span class="hljs-number">0</span>){\n      insert(y)\n      <span class="hljs-keyword">if</span>(y&gt;max){\n        max=y\n        result.push([x,y])\n      }\n    }<span class="hljs-keyword">else</span>{\n      remove(y)\n      <span class="hljs-keyword">let</span> curMax=getMax()\n      <span class="hljs-keyword">if</span>(y===max &amp;&amp; curMax!==max){\n        max=curMax\n        result.push([x,max])\n      }\n    }\n  }\n  <span class="hljs-keyword">return</span> result\n};\n</code></pre>\n'],titleSlug:"the-skyline-problem",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u91cd\u65b0\u6784\u5efa\u5efa\u7b51\u9876\u70b9\u6570\u7ec4\uff0c\u5185\u90e8\u683c\u5f0f\u4e3a<code>[x,y,state]</code>\uff0c<code>x</code>\u4ee3\u8868\u6a2a\u5750\u6807\uff0c<code>y</code>\u4ee3\u8868\u7eb5\u5750\u6807\uff0c<code>state</code>\u4ee3\u8868\u5f53\u524d\u662f\u4e0a\u5347\u8fd8\u662f\u4e0b\u964d\u3002</p>\n<p>\u6309<code>x</code>\u4ece\u5c0f\u5230\u5927\u6392\u5e8f\u3002</p>\n<p>\u4f7f\u7528<code>\u4f18\u5148\u961f\u5217</code>\uff0c\u6dfb\u52a0\u6bcf\u4e00\u4e2a\u7684\u9ad8\u5ea6<code>y</code>\uff0c\u5e76\u4e14\u7ef4\u62a4\u4e00\u4e2a\u53d8\u91cf<code>max</code>\uff0c\u7528\u6765\u4fdd\u5b58\u5f53\u524d\u9876\u70b9\u7684\u6700\u9ad8\u7684<code>y</code>\u3002</p>\n<p>\u5f53<code>state</code>\u8868\u793a\u4e0a\u5347\u65f6\uff0c\u9996\u5148\u6dfb\u52a0<code>y</code>\u5230\u4f18\u5148\u961f\u5217<code>pq</code>\uff0c</p>\n<p>\u5982\u679c\u5f53\u524d\u7684<code>y&gt;max</code>\uff0c\u8bf4\u660e\u6709\u4e00\u5e62\u623f\u5b50\u8d85\u8fc7\u539f\u6765\u6700\u9ad8\u7684\uff0c\u9700\u8981\u6dfb\u52a0\u5f53\u524d\u7684<code>[x,y]</code>\uff1b</p>\n<p>\u5982\u679c\u5f53\u524d<code>y&lt;=max</code>\uff0c\u8bf4\u660e\u8fd9\u5e62\u623f\u5b50\u548c\u539f\u6765\u6700\u9ad8\u7684\u53e0\u52a0\u4e86\uff1b</p>\n<p>\u5f53<code>state</code>\u8868\u793a\u4e0b\u964d\u65f6\uff0c\u9996\u5148\u4ece<code>pq</code>\u4e2d\u5220\u9664\u5339\u914d\u7684<code>y</code>\u3002</p>\n<p>\u5982\u679c\u5f53\u524d<code>y===max</code>\uff0c\u8bf4\u660e\u6700\u9ad8\u7684\u623f\u5b50\u5c31\u5230\u8fd9\u4e2a<code>x</code>\u4e3a\u6b62\uff0c\u68c0\u67e5<code>pq</code>\u4e2d\u7684\u4e0b\u4e00\u4e2a\u6700\u5927\u7684<code>y</code>\uff0c\u5e76\u4e14\u66f4\u65b0<code>max</code>\uff0c\u6dfb\u52a0\u7ed3\u679c\uff0c\u5982\u679c\u4e0d\u5b58\u5728\uff0c\u5219\u4e3a0\u3002</p>\n<p>\u5982\u679c\u5f53\u524d<code>y&lt;max</code>\uff0c\u8bf4\u660e\u8fd9\u4e2a\u88ab\u6700\u9ad8\u7684\u623f\u5b50\u906e\u6321\u4f4f\u7684\u4e00\u5e62\u623f\u5b50\u5c31\u5230\u6b64<code>x</code>\uff0c\u4e0d\u5fc5\u518d\u505a\u4efb\u4f55\u4e8b\u60c5\u3002</p>\n<p>\u6392\u5e8f\u65f6\u67093\u4e2a\u8fb9\u754c\u60c5\u51b5\uff1a</p>\n<ol>\n<li>\n<p>\u5f53<code>x</code>\u76f8\u540c\uff0c\u5e76\u4e14\u540c\u4e3a<code>\u4e0a\u5347</code>\u72b6\u6001\uff0c<code>y</code>\u66f4\u5927\u7684\u6392\u524d\u9762\uff0c\u4f18\u5148\u5904\u7406\u5b83\u90a3\u4e48<code>y</code>\u66f4\u5c0f\u7684\u5c31\u4f1a\u88ab\u5ffd\u7565\u3002</p>\n</li>\n<li>\n<p>\u5f53<code>x</code>\u76f8\u540c\uff0c\u5e76\u4e14\u540c\u4e3a<code>\u4e0b\u964d</code>\u72b6\u6001\uff0c<code>y</code>\u66f4\u5c0f\u7684\u6392\u524d\u9762\u3002</p>\n</li>\n<li>\n<p>\u5f53<code>x</code>\u76f8\u540c\uff0c\u4e00\u4e2a<code>\u4e0a\u5347</code>\uff0c\u4e00\u4e2a<code>\u4e0b\u964d</code>\uff0c\u90a3\u4e48\u5148\u5904\u7406<code>\u4e0a\u5347</code>\u72b6\u6001\u7684\u623f\u5b50\uff0c\u56e0\u4e3a\u8fd9\u79cd\u60c5\u51b5\u5c31\u662f2\u5e62\u623f\u5b50\u5408\u5e76\u5728\u4e00\u8d77\uff0c\u4e0b\u964d\u7684\u70b9\u53ef\u4ee5\u5ffd\u7565\u3002</p>\n</li>\n</ol>\n",content:'<p>\u57ce\u5e02\u7684\u5929\u9645\u7ebf\u662f\u4ece\u8fdc\u5904\u89c2\u770b\u8be5\u57ce\u5e02\u4e2d\u6240\u6709\u5efa\u7b51\u7269\u5f62\u6210\u7684\u8f6e\u5ed3\u7684\u5916\u90e8\u8f6e\u5ed3\u3002\u73b0\u5728\uff0c\u5047\u8bbe\u60a8\u83b7\u5f97\u4e86\u57ce\u5e02\u98ce\u5149\u7167\u7247\uff08\u56feA\uff09\u4e0a<strong>\u663e\u793a\u7684\u6240\u6709\u5efa\u7b51\u7269\u7684\u4f4d\u7f6e\u548c\u9ad8\u5ea6</strong>\uff0c\u8bf7\u7f16\u5199\u4e00\u4e2a\u7a0b\u5e8f\u4ee5\u8f93\u51fa\u7531\u8fd9\u4e9b\u5efa\u7b51\u7269<strong>\u5f62\u6210\u7684\u5929\u9645\u7ebf</strong>\uff08\u56feB\uff09\u3002</p>\n\n<p><a href="/static/images/problemset/skyline1.jpg" target="_blank"><img alt="Buildings" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/skyline1.png" style="width: 300px;"> </a> <a href="/static/images/problemset/skyline2.jpg" target="_blank"> <img alt="Skyline Contour" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/skyline2.png" style="width: 300px;"> </a></p>\n\n<p>\u6bcf\u4e2a\u5efa\u7b51\u7269\u7684\u51e0\u4f55\u4fe1\u606f\u7528\u4e09\u5143\u7ec4&nbsp;<code>[Li\uff0cRi\uff0cHi]</code> \u8868\u793a\uff0c\u5176\u4e2d <code>Li</code> \u548c <code>Ri</code> \u5206\u522b\u662f\u7b2c i \u5ea7\u5efa\u7b51\u7269\u5de6\u53f3\u8fb9\u7f18\u7684 x \u5750\u6807\uff0c<code>Hi</code> \u662f\u5176\u9ad8\u5ea6\u3002\u53ef\u4ee5\u4fdd\u8bc1&nbsp;<code>0 &le; Li, Ri &le; INT_MAX</code>,&nbsp;<code>0 &lt; Hi &le; INT_MAX</code> \u548c <code>Ri - Li &gt; 0</code>\u3002\u60a8\u53ef\u4ee5\u5047\u8bbe\u6240\u6709\u5efa\u7b51\u7269\u90fd\u662f\u5728\u7edd\u5bf9\u5e73\u5766\u4e14\u9ad8\u5ea6\u4e3a 0 \u7684\u8868\u9762\u4e0a\u7684\u5b8c\u7f8e\u77e9\u5f62\u3002</p>\n\n<p>\u4f8b\u5982\uff0c\u56feA\u4e2d\u6240\u6709\u5efa\u7b51\u7269\u7684\u5c3a\u5bf8\u8bb0\u5f55\u4e3a\uff1a<code>[ [2 9 10], [3 7 15], [5 12 12], [15 20 10], [19 24 8] ] </code>\u3002</p>\n\n<p>\u8f93\u51fa\u662f\u4ee5&nbsp;<code>[ [x1,y1], [x2, y2], [x3, y3], ... ]</code> \u683c\u5f0f\u7684&ldquo;<strong>\u5173\u952e\u70b9</strong>&rdquo;\uff08\u56feB\u4e2d\u7684\u7ea2\u70b9\uff09\u7684\u5217\u8868\uff0c\u5b83\u4eec\u552f\u4e00\u5730\u5b9a\u4e49\u4e86\u5929\u9645\u7ebf\u3002<strong>\u5173\u952e\u70b9\u662f\u6c34\u5e73\u7ebf\u6bb5\u7684\u5de6\u7aef\u70b9</strong>\u3002\u8bf7\u6ce8\u610f\uff0c\u6700\u53f3\u4fa7\u5efa\u7b51\u7269\u7684\u6700\u540e\u4e00\u4e2a\u5173\u952e\u70b9\u4ec5\u7528\u4e8e\u6807\u8bb0\u5929\u9645\u7ebf\u7684\u7ec8\u70b9\uff0c\u5e76\u59cb\u7ec8\u4e3a\u96f6\u9ad8\u5ea6\u3002\u6b64\u5916\uff0c\u4efb\u4f55\u4e24\u4e2a\u76f8\u90bb\u5efa\u7b51\u7269\u4e4b\u95f4\u7684\u5730\u9762\u90fd\u5e94\u88ab\u89c6\u4e3a\u5929\u9645\u7ebf\u8f6e\u5ed3\u7684\u4e00\u90e8\u5206\u3002</p>\n\n<p>\u4f8b\u5982\uff0c\u56feB\u4e2d\u7684\u5929\u9645\u7ebf\u5e94\u8be5\u8868\u793a\u4e3a\uff1a<code>[ [2 10], [3 15], [7 12], [12 0], [15 10], [20 8], [24, 0] ]</code>\u3002</p>\n\n<p><strong>\u8bf4\u660e:</strong></p>\n\n<ul>\n\t<li>\u4efb\u4f55\u8f93\u5165\u5217\u8868\u4e2d\u7684\u5efa\u7b51\u7269\u6570\u91cf\u4fdd\u8bc1\u5728 <code>[0, 10000]</code>&nbsp;\u8303\u56f4\u5185\u3002</li>\n\t<li>\u8f93\u5165\u5217\u8868\u5df2\u7ecf\u6309\u5de6&nbsp;<code>x</code> \u5750\u6807&nbsp;<code>Li</code>&nbsp; \u8fdb\u884c\u5347\u5e8f\u6392\u5217\u3002</li>\n\t<li>\u8f93\u51fa\u5217\u8868\u5fc5\u987b\u6309 x \u4f4d\u6392\u5e8f\u3002</li>\n\t<li>\u8f93\u51fa\u5929\u9645\u7ebf\u4e2d\u4e0d\u5f97\u6709\u8fde\u7eed\u7684\u76f8\u540c\u9ad8\u5ea6\u7684\u6c34\u5e73\u7ebf\u3002\u4f8b\u5982 <code>[...[2 3], [4 5], [7 5], [11 5], [12 7]...]</code> \u662f\u4e0d\u6b63\u786e\u7684\u7b54\u6848\uff1b\u4e09\u6761\u9ad8\u5ea6\u4e3a 5 \u7684\u7ebf\u5e94\u8be5\u5728\u6700\u7ec8\u8f93\u51fa\u4e2d\u5408\u5e76\u4e3a\u4e00\u4e2a\uff1a<code>[...[2 3], [4 5], [12 7], ...]</code></li>\n</ul>\n'}}}]);
//# sourceMappingURL=sourceCode-content318.b4e958e3.chunk.js.map