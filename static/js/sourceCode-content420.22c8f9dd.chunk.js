(window.webpackJsonp=window.webpackJsonp||[]).push([[383],{455:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[][]} matrix\n * @param {number} k\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> maxSumSubmatrix = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">matrix, target</span>) </span>{\n  <span class="hljs-keyword">if</span> (matrix.length===<span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;\n  <span class="hljs-keyword">let</span> row=matrix.length,col=matrix[<span class="hljs-number">0</span>].length,res=-<span class="hljs-literal">Infinity</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> left=<span class="hljs-number">0</span>;left&lt;col;left++){\n    <span class="hljs-keyword">let</span> sum=<span class="hljs-built_in">Array</span>(row).fill(<span class="hljs-number">0</span>)\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> right=left;right&lt;col;right++){\n      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> r=<span class="hljs-number">0</span>;r&lt;row;r++){\n        sum[r]+=matrix[r][right]\n      }\n      <span class="hljs-keyword">let</span> curSums=[<span class="hljs-number">0</span>]\n      <span class="hljs-keyword">let</span> curMax=-<span class="hljs-literal">Infinity</span>, cum=<span class="hljs-number">0</span>;\n      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> s <span class="hljs-keyword">of</span> sum){\n        cum+=s;\n        <span class="hljs-keyword">if</span>(cum===target)<span class="hljs-keyword">return</span> target\n        <span class="hljs-keyword">let</span> tar=cum-target\n          <span class="hljs-comment">// search</span>\n          <span class="hljs-keyword">if</span>(curSums[curSums.length<span class="hljs-number">-1</span>]&gt;=tar){\n            <span class="hljs-keyword">let</span> idx=bsEnd(curSums,tar)\n            curMax=<span class="hljs-built_in">Math</span>.max(curMax,cum-curSums[idx]);\n          }\n          <span class="hljs-comment">// insert \u6210\u4e3a\u4e00\u4e2a\u5347\u5e8f\u6570\u7ec4</span>\n          <span class="hljs-keyword">if</span>(curSums[curSums.length<span class="hljs-number">-1</span>]&lt;cum){\n            curSums.push(cum)\n          }<span class="hljs-keyword">else</span>{\n            <span class="hljs-keyword">let</span> insertIdx=bsEnd(curSums,cum)\n            curSums.splice(insertIdx,<span class="hljs-number">0</span>,cum) \n          }\n      }\n      res=<span class="hljs-built_in">Math</span>.max(res,curMax);      \n    }\n  }\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bsEnd</span>(<span class="hljs-params">arr,n</span>)</span>{\n    <span class="hljs-keyword">let</span> lo=<span class="hljs-number">0</span>,hi=arr.length<span class="hljs-number">-1</span>\n    <span class="hljs-keyword">while</span>(lo&lt;hi){\n      <span class="hljs-keyword">let</span> mid=<span class="hljs-built_in">Math</span>.floor((lo+hi)/<span class="hljs-number">2</span>)\n      <span class="hljs-keyword">if</span>(arr[mid]&lt;n)lo=mid+<span class="hljs-number">1</span>\n      <span class="hljs-keyword">else</span> hi=mid\n    }\n    <span class="hljs-keyword">return</span> hi\n  }\n  <span class="hljs-keyword">return</span> res;\n};\n</code></pre>\n'],titleSlug:"max-sum-of-rectangle-no-larger-than-k",hasThinking:!1,content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u975e\u7a7a\u4e8c\u7ef4\u77e9\u9635&nbsp;<em>matrix&nbsp;</em>\u548c\u4e00\u4e2a\u6574\u6570<em> k</em>\uff0c\u627e\u5230\u8fd9\u4e2a\u77e9\u9635\u5185\u90e8\u4e0d\u5927\u4e8e <em>k</em> \u7684\u6700\u5927\u77e9\u5f62\u548c\u3002</p>\n\n<p><strong>\u793a\u4f8b:</strong></p>\n\n<pre><strong>\u8f93\u5165: </strong>matrix = [[1,0,1],[0,-2,3]], k = 2\n<strong>\u8f93\u51fa: </strong>2 \n<strong>\u89e3\u91ca:</strong>&nbsp;\u77e9\u5f62\u533a\u57df&nbsp;<code>[[0, 1], [-2, 3]]</code>&nbsp;\u7684\u6570\u503c\u548c\u662f 2\uff0c\u4e14 2 \u662f\u4e0d\u8d85\u8fc7 k \u7684\u6700\u5927\u6570\u5b57\uff08k = 2\uff09\u3002\n</pre>\n\n<p><strong>\u8bf4\u660e\uff1a</strong></p>\n\n<ol>\n\t<li>\u77e9\u9635\u5185\u7684\u77e9\u5f62\u533a\u57df\u9762\u79ef\u5fc5\u987b\u5927\u4e8e 0\u3002</li>\n\t<li>\u5982\u679c\u884c\u6570\u8fdc\u5927\u4e8e\u5217\u6570\uff0c\u4f60\u5c06\u5982\u4f55\u89e3\u7b54\u5462\uff1f</li>\n</ol>\n"}}}]);
//# sourceMappingURL=sourceCode-content420.22c8f9dd.chunk.js.map