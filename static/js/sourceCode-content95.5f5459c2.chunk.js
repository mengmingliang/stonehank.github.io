(window.webpackJsonp=window.webpackJsonp||[]).push([[969],{1145:function(s){s.exports={content:'<p>\u7ed9\u51fa\u4e00\u7cfb\u5217\u95f4\u9694\uff0c\u4f8b\u5982<code>[[1,2],[3,5],[1,3],[2,3],[2,4]]</code></p>\n<p>\u6c42\u51fa\u6700\u5927\u7684\u4e0d\u91cd\u590d\u95f4\u9694\u6570\u91cf\u3002</p>\n<p>\u4f8b1:</p>\n<p>input : <code>[[1,2],[3,5],[1,3],[2,3],[2,4]]</code></p>\n<p>output : 3</p>\n<p>\u8fd9\u79cd\u9898\u601d\u8def\u662f\u6309\u95f4\u9694\u7684<code>\u5c3e\u90e8\u6392\u5e8f</code>\u3002</p>\n<pre class="hljs"><code><span class="hljs-comment">/**\n * Definition for an interval.\n * function Interval(start, end) {\n *     this.start = start;\n *     this.end = end;\n * }\n */</span>\n<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getMaxNoOverLapIntervals</span>(<span class="hljs-params">itv</span>)</span>{\n  <span class="hljs-keyword">if</span>(itv.length===<span class="hljs-number">0</span>)<span class="hljs-keyword">return</span> <span class="hljs-number">0</span>\n  <span class="hljs-comment">// \u6392\u5e8f</span>\n  itv.sort(<span class="hljs-function">(<span class="hljs-params">a,b</span>)=&gt;</span>a.end-b.end)\n  <span class="hljs-keyword">let</span> count=<span class="hljs-number">1</span>\n  <span class="hljs-keyword">let</span> prevE=itv[<span class="hljs-number">0</span>].end\n  <span class="hljs-comment">// \u9010\u4e2a\u68c0\u67e5\u662f\u5426\u91cd\u53e0</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">1</span>;i&lt;itv.length;i++){\n    <span class="hljs-keyword">let</span> curS=itv[i].start,curE=itv[i].end\n    <span class="hljs-keyword">if</span>(curS&lt;prevE)<span class="hljs-keyword">continue</span>\n    prevE=curE\n    count++\n  }\n  <span class="hljs-keyword">return</span> count\n}\n\n</code></pre>\n'}}}]);
//# sourceMappingURL=sourceCode-content95.5f5459c2.chunk.js.map