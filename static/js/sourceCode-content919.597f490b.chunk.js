(window.webpackJsonp=window.webpackJsonp||[]).push([[935],{954:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} persons\n * @param {number[]} times\n */</span>\n<span class="hljs-keyword">var</span> TopVotedCandidate = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">persons, times</span>) </span>{\n    <span class="hljs-keyword">let</span> max=<span class="hljs-number">0</span>,maxP\n    <span class="hljs-keyword">let</span> result=[]\n    <span class="hljs-comment">// let box=Array(persons.length).fill(0)</span>\n    <span class="hljs-keyword">let</span> box=[]\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;times.length;i++){\n        box[persons[i]]= box[persons[i]]||<span class="hljs-number">0</span>\n        box[persons[i]]+=<span class="hljs-number">1</span>\n        <span class="hljs-keyword">if</span>(box[persons[i]]&gt;=max){\n            max=box[persons[i]]\n            maxP=persons[i]\n        }\n        <span class="hljs-comment">// max=box[persons[i]]</span>\n        <span class="hljs-comment">// maxP=persons[i]</span>\n        <span class="hljs-comment">// for(let j=result.length-1;j&gt;=0;j--){</span>\n        <span class="hljs-comment">//     if(box[result[j]]&gt;max){</span>\n        <span class="hljs-comment">//         max=box[result[j]]</span>\n        <span class="hljs-comment">//         maxP=result[j]</span>\n        <span class="hljs-comment">//         break</span>\n        <span class="hljs-comment">//     }</span>\n        <span class="hljs-comment">// }</span>\n        result.push(maxP)\n    }\n    <span class="hljs-comment">// console.log(result)</span>\n    <span class="hljs-keyword">this</span>.q=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t</span>)</span>{\n        <span class="hljs-keyword">let</span> lo=<span class="hljs-number">0</span>,hi=times.length<span class="hljs-number">-1</span>\n        <span class="hljs-keyword">while</span>(lo&lt;hi){\n            <span class="hljs-keyword">let</span> mid=<span class="hljs-built_in">Math</span>.ceil((lo+hi)/<span class="hljs-number">2</span>)\n            <span class="hljs-keyword">if</span>(times[mid]&lt;=t)lo=mid\n            <span class="hljs-keyword">else</span> hi=mid<span class="hljs-number">-1</span>\n        }\n\n        <span class="hljs-keyword">return</span> result[lo]\n    }\n};\n\n<span class="hljs-comment">/** \n * @param {number} t\n * @return {number}\n */</span>\n<span class="hljs-comment">// TopVotedCandidate.prototype.q = function(t) {</span>\n   \n<span class="hljs-comment">// };</span>\n\n<span class="hljs-comment">/** \n * Your TopVotedCandidate object will be instantiated and called as such:\n * var obj = Object.create(TopVotedCandidate).createNew(persons, times)\n * var param_1 = obj.q(t)\n */</span>\n</code></pre>\n'],titleSlug:"online-election",hasThinking:!1,content:"<p>\u5728\u9009\u4e3e\u4e2d\uff0c\u7b2c&nbsp;<code>i</code>&nbsp;\u5f20\u7968\u662f\u5728\u65f6\u95f4\u4e3a&nbsp;<code>times[i]</code>&nbsp;\u65f6\u6295\u7ed9&nbsp;<code>persons[i]</code>&nbsp;\u7684\u3002</p>\n\n<p>\u73b0\u5728\uff0c\u6211\u4eec\u60f3\u8981\u5b9e\u73b0\u4e0b\u9762\u7684\u67e5\u8be2\u51fd\u6570\uff1a <code>TopVotedCandidate.q(int t)</code> \u5c06\u8fd4\u56de\u5728&nbsp;<code>t</code> \u65f6\u523b\u4e3b\u5bfc\u9009\u4e3e\u7684\u5019\u9009\u4eba\u7684\u7f16\u53f7\u3002</p>\n\n<p>\u5728&nbsp;<code>t</code> \u65f6\u523b\u6295\u51fa\u7684\u9009\u7968\u4e5f\u5c06\u88ab\u8ba1\u5165\u6211\u4eec\u7684\u67e5\u8be2\u4e4b\u4e2d\u3002\u5728\u5e73\u5c40\u7684\u60c5\u51b5\u4e0b\uff0c\u6700\u8fd1\u83b7\u5f97\u6295\u7968\u7684\u5019\u9009\u4eba\u5c06\u4f1a\u83b7\u80dc\u3002</p>\n\n<p><strong>\u793a\u4f8b\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a</strong>[&quot;TopVotedCandidate&quot;,&quot;q&quot;,&quot;q&quot;,&quot;q&quot;,&quot;q&quot;,&quot;q&quot;,&quot;q&quot;], [[[0,1,1,0,0,1,0],[0,5,10,15,20,25,30]],[3],[12],[25],[15],[24],[8]]\n<strong>\u8f93\u51fa\uff1a</strong>[null,0,1,1,0,0,1]\n<strong>\u89e3\u91ca\uff1a</strong>\n\u65f6\u95f4\u4e3a 3\uff0c\u7968\u6570\u5206\u5e03\u60c5\u51b5\u662f [0]\uff0c\u7f16\u53f7\u4e3a 0 \u7684\u5019\u9009\u4eba\u9886\u5148\u3002\n\u65f6\u95f4\u4e3a 12\uff0c\u7968\u6570\u5206\u5e03\u60c5\u51b5\u662f [0,1,1]\uff0c\u7f16\u53f7\u4e3a 1 \u7684\u5019\u9009\u4eba\u9886\u5148\u3002\n\u65f6\u95f4\u4e3a 25\uff0c\u7968\u6570\u5206\u5e03\u60c5\u51b5\u662f [0,1,1,0,0,1]\uff0c\u7f16\u53f7\u4e3a 1 \u7684\u5019\u9009\u4eba\u9886\u5148\uff08\u56e0\u4e3a\u6700\u8fd1\u7684\u6295\u7968\u7ed3\u679c\u662f\u5e73\u5c40\uff09\u3002\n\u5728\u65f6\u95f4 15\u300124 \u548c 8 \u5904\u7ee7\u7eed\u6267\u884c 3 \u4e2a\u67e5\u8be2\u3002\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ol>\n\t<li><code>1 &lt;= persons.length = times.length &lt;= 5000</code></li>\n\t<li><code>0 &lt;= persons[i] &lt;= persons.length</code></li>\n\t<li><code>times</code>&nbsp;\u662f\u4e25\u683c\u9012\u589e\u7684\u6570\u7ec4\uff0c\u6240\u6709\u5143\u7d20\u90fd\u5728&nbsp;<code>[0, 10^9]</code>&nbsp;\u8303\u56f4\u4e2d\u3002</li>\n\t<li>\u6bcf\u4e2a\u6d4b\u8bd5\u7528\u4f8b\u6700\u591a\u8c03\u7528&nbsp;<code>10000</code>&nbsp;\u6b21&nbsp;<code>TopVotedCandidate.q</code>\u3002</li>\n\t<li><code>TopVotedCandidate.q(int t)</code>&nbsp;\u88ab\u8c03\u7528\u65f6\u603b\u662f\u6ee1\u8db3&nbsp;<code>t &gt;= times[0]</code>\u3002</li>\n</ol>\n"}}}]);
//# sourceMappingURL=sourceCode-content919.597f490b.chunk.js.map