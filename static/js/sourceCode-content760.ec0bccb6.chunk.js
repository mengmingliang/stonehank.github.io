(window.webpackJsonp=window.webpackJsonp||[]).push([[760],{795:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} row\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> minSwapsCouples = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">row</span>) </span>{\n  <span class="hljs-comment">// union Find</span>\n  <span class="hljs-comment">// \u601d\u8def\uff1a\u5c06\u9700\u8981swap\u7684\u7ec4union\u5e76\u4e14\u8ba1\u6570\uff0c\u4e0b\u6b21\u518d\u9047\u5230\u8fd9\u4e24\u7ec4\u5219\u4e0d\u518d\u8ba1\u6570</span>\n  <span class="hljs-keyword">let</span> connect=<span class="hljs-built_in">Array</span>.from({<span class="hljs-attr">length</span>:row.length/<span class="hljs-number">2</span>},(n,i)=&gt;i)\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">find</span>(<span class="hljs-params">i</span>)</span>{\n    <span class="hljs-keyword">while</span>(i!==connect[i])i=connect[i]\n    <span class="hljs-keyword">return</span> i\n  }\n  <span class="hljs-keyword">let</span> swap=<span class="hljs-number">0</span>\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">union</span>(<span class="hljs-params">a,b</span>)</span>{\n    <span class="hljs-keyword">let</span> i=find(a),j=find(b)\n    <span class="hljs-keyword">if</span>(i!==j){\n      swap++\n      connect[i]=j\n    }\n  }\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;row.length;i=i+<span class="hljs-number">2</span>){\n    <span class="hljs-keyword">let</span> g1=<span class="hljs-built_in">Math</span>.floor(row[i]/<span class="hljs-number">2</span>),\n        g2=<span class="hljs-built_in">Math</span>.floor(row[i+<span class="hljs-number">1</span>]/<span class="hljs-number">2</span>)\n    <span class="hljs-keyword">if</span>(g1!==g2)union(g1,g2)\n  }\n  <span class="hljs-keyword">return</span> swap\n};\n</code></pre>\n'],titleSlug:"couples-holding-hands",hasThinking:!0,thinking:'<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>2\u79cd\u601d\u8def\uff0c\u4e00\u79cd\u662f<code>\u8d2a\u5fc3+\u66b4\u529b\u89e3+\u8bb0\u5fc6</code>\uff0c\u5373\u6bcf\u6b21\u5bf9\u4e8e\u7d22\u5f15<code>2i</code>\uff0c\u53ea\u53bb\u4ea4\u6362<code>2i+1</code>\u7684\u6570\u5b57\uff0c\u4f7f\u5f97<code>2i+1</code>\u7684\u6570\u5b57\u80fd\u5339\u914d<code>2i</code>\u3002</p>\n<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} row\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> minSwapsCouples = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">row</span>) </span>{\n  <span class="hljs-comment">// \u66b4\u529b+mem</span>\n  <span class="hljs-keyword">let</span> memo={}\n  <span class="hljs-keyword">return</span> dfs(row,<span class="hljs-number">0</span>)\n  \n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dfs</span>(<span class="hljs-params">row,idx</span>)</span>{\n    <span class="hljs-keyword">if</span>(idx===row.length)<span class="hljs-keyword">return</span> <span class="hljs-number">0</span>\n    <span class="hljs-keyword">if</span>(memo[idx]!=<span class="hljs-literal">null</span>)<span class="hljs-keyword">return</span> memo[idx]\n    <span class="hljs-keyword">let</span> left=row[idx],left_p=<span class="hljs-literal">null</span>\n    <span class="hljs-keyword">if</span>(left/<span class="hljs-number">2</span>===<span class="hljs-built_in">Math</span>.floor(left/<span class="hljs-number">2</span>)){\n      left_p=left+<span class="hljs-number">1</span>\n    }<span class="hljs-keyword">else</span>{\n      left_p=left<span class="hljs-number">-1</span>\n    }\n    <span class="hljs-keyword">let</span> swapTimes=<span class="hljs-literal">Infinity</span>,\n        swap_idx=row.indexOf(left_p)\n    <span class="hljs-keyword">if</span>(swap_idx===idx+<span class="hljs-number">1</span>){\n      swapTimes=dfs(row,idx+<span class="hljs-number">2</span>)\n    }<span class="hljs-keyword">else</span>{\n      swap(row,swap_idx,idx+<span class="hljs-number">1</span>)\n      swapTimes=<span class="hljs-number">1</span>+dfs(row,idx+<span class="hljs-number">2</span>)\n    }\n    memo[idx]=swapTimes\n    <span class="hljs-keyword">return</span> swapTimes\n  }\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">swap</span>(<span class="hljs-params">arr,i,j</span>)</span>{\n    <span class="hljs-keyword">let</span> t=arr[i]\n    arr[i]=arr[j]\n    arr[j]=t\n  }\n};\n</code></pre>\n<p>\u53e6\u4e00\u79cd\u65b9\u5f0f\u662f<code>union find</code>\uff0c\u5bf9\u4e8e<code>N</code>\u5bf9\u60c5\u4fa3\uff0c\u6700\u591a\u53ea\u9700\u8981\u4ea4\u6362<code>N-1</code>\u6b21\uff0c\u56e0\u6b64\u904d\u5386<code>rows</code>\uff0c\u5bf9\u4e8e\u5f53\u524d<code>2i</code>\u548c<code>2i+1</code>\u4e0d\u5339\u914d\u7684\uff0c\u5c06\u5b83\u4eec<code>union</code>\uff0c\n\u5e76\u4e14\u4ea4\u6362\u6b21\u6570<code>+1</code>\uff0c\u540e\u7eed\u5982\u679c\u8fd8\u80fd\u9047\u5230\u8fd9\u4e24\u7ec4\uff0c\u7531\u4e8e\u4e4b\u524d\u5df2\u7ecf<code>union</code>\u4e86\uff0c\u56e0\u6b64\u4e0d\u4f1a\u91cd\u590d\u8ba1\u7b97\u4ea4\u6362\u6b21\u6570\u3002</p>\n',content:"<p>N \u5bf9\u60c5\u4fa3\u5750\u5728\u8fde\u7eed\u6392\u5217\u7684 2N \u4e2a\u5ea7\u4f4d\u4e0a\uff0c\u60f3\u8981\u7275\u5230\u5bf9\u65b9\u7684\u624b\u3002 \u8ba1\u7b97\u6700\u5c11\u4ea4\u6362\u5ea7\u4f4d\u7684\u6b21\u6570\uff0c\u4ee5\u4fbf\u6bcf\u5bf9\u60c5\u4fa3\u53ef\u4ee5\u5e76\u80a9\u5750\u5728\u4e00\u8d77\u3002 <em>\u4e00</em>\u6b21\u4ea4\u6362\u53ef\u9009\u62e9\u4efb\u610f\u4e24\u4eba\uff0c\u8ba9\u4ed6\u4eec\u7ad9\u8d77\u6765\u4ea4\u6362\u5ea7\u4f4d\u3002</p>\n\n<p>\u4eba\u548c\u5ea7\u4f4d\u7528&nbsp;<code>0</code>&nbsp;\u5230&nbsp;<code>2N-1</code>&nbsp;\u7684\u6574\u6570\u8868\u793a\uff0c\u60c5\u4fa3\u4eec\u6309\u987a\u5e8f\u7f16\u53f7\uff0c\u7b2c\u4e00\u5bf9\u662f&nbsp;<code>(0, 1)</code>\uff0c\u7b2c\u4e8c\u5bf9\u662f&nbsp;<code>(2, 3)</code>\uff0c\u4ee5\u6b64\u7c7b\u63a8\uff0c\u6700\u540e\u4e00\u5bf9\u662f&nbsp;<code>(2N-2, 2N-1)</code>\u3002</p>\n\n<p>\u8fd9\u4e9b\u60c5\u4fa3\u7684\u521d\u59cb\u5ea7\u4f4d&nbsp;&nbsp;<code>row[i]</code>&nbsp;\u662f\u7531\u6700\u521d\u59cb\u5750\u5728\u7b2c i \u4e2a\u5ea7\u4f4d\u4e0a\u7684\u4eba\u51b3\u5b9a\u7684\u3002</p>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> row = [0, 2, 1, 3]\n<strong>\u8f93\u51fa:</strong> 1\n<strong>\u89e3\u91ca:</strong> \u6211\u4eec\u53ea\u9700\u8981\u4ea4\u6362row[1]\u548crow[2]\u7684\u4f4d\u7f6e\u5373\u53ef\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 2:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> row = [3, 2, 0, 1]\n<strong>\u8f93\u51fa:</strong> 0\n<strong>\u89e3\u91ca:</strong> \u65e0\u9700\u4ea4\u6362\u5ea7\u4f4d\uff0c\u6240\u6709\u7684\u60c5\u4fa3\u90fd\u5df2\u7ecf\u53ef\u4ee5\u624b\u7275\u624b\u4e86\u3002\n</pre>\n\n<p><strong>\u8bf4\u660e:</strong></p>\n\n<ol>\n\t<li><code>len(row)</code> \u662f\u5076\u6570\u4e14\u6570\u503c\u5728&nbsp;<code>[4, 60]</code>\u8303\u56f4\u5185\u3002</li>\n\t<li>\u53ef\u4ee5\u4fdd\u8bc1<code>row</code> \u662f\u5e8f\u5217&nbsp;<code>0...len(row)-1</code>&nbsp;\u7684\u4e00\u4e2a\u5168\u6392\u5217\u3002</li>\n</ol>\n"}}}]);
//# sourceMappingURL=sourceCode-content760.ec0bccb6.chunk.js.map