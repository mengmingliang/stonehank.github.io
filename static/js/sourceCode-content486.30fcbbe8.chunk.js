(window.webpackJsonp=window.webpackJsonp||[]).push([[455],{521:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * Definition for an interval.\n * function Interval(start, end) {\n *     this.start = start;\n *     this.end = end;\n * }\n */</span>\n<span class="hljs-comment">/**\n * @param {Interval[]} intervals\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> eraseOverlapIntervals = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">itv</span>) </span>{\n  itv.sort(<span class="hljs-function">(<span class="hljs-params">a,b</span>)=&gt;</span>a.end-b.end)\n  <span class="hljs-keyword">if</span>(itv.length===<span class="hljs-number">0</span>)<span class="hljs-keyword">return</span> <span class="hljs-number">0</span>\n  <span class="hljs-keyword">let</span> prevE=itv[<span class="hljs-number">0</span>].end\n  <span class="hljs-keyword">let</span> res=<span class="hljs-number">1</span>\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">1</span>;i&lt;itv.length;i++){\n    <span class="hljs-keyword">let</span> curS=itv[i].start,curE=itv[i].end\n    <span class="hljs-keyword">if</span>(curS&lt;prevE)<span class="hljs-keyword">continue</span>\n    prevE=curE\n    res++\n  }\n  <span class="hljs-keyword">return</span> itv.length-res\n};\n</code></pre>\n'],titleSlug:"non-overlapping-intervals",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u9996\u5148\u5bf9<code>end</code>\u5347\u5e8f\u6392\u5e8f\u3002</p>\n<p>\u4e4b\u6240\u4ee5\u53ea\u5bf9<code>end</code>\u6392\u5e8f\uff0c\u56e0\u4e3a<code>start</code>\u4e00\u5b9a\u5c0f\u4e8e<code>end</code>\uff0c\u56e0\u6b64\u4e00\u4e2a<code>intervals[i].end</code>\u51b3\u5b9a\u4e86\u5b83\u524d\u9762\u6240\u6709\u533a\u95f4\u7684\u6700\u53f3\u7aef\u3002</p>\n<p>\u904d\u5386<code>intervals</code>\uff0c\u5982\u679c\u53d1\u73b0\u5f53\u524d\u548c\u4e4b\u524d\u4e00\u4e2a\u91cd\u53e0\u4e86(\u5373\u5f53\u524d\u7684<code>start</code>\u5c0f\u4e8e\u4e4b\u524d\u533a\u95f4\u7684<code>end</code>)\uff0c\u90a3\u4e48\u76f4\u63a5\u8df3\u8fc7\u5f53\u524d\u533a\u95f4\u5373\u53ef\uff0c\u4e5f\u5c31\u662f\u5220\u9664\u5f53\u524d\u533a\u95f4\uff0c\u56e0\u4e3a2\u4e2a\u533a\u95f4\u7559\u4e00\u4e2a\uff0c\u80af\u5b9a\u7559<code>end</code>\u66f4\u5c0f\u7684\u533a\u95f4\u3002</p>\n",content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u533a\u95f4\u7684\u96c6\u5408\uff0c\u627e\u5230\u9700\u8981\u79fb\u9664\u533a\u95f4\u7684\u6700\u5c0f\u6570\u91cf\uff0c\u4f7f\u5269\u4f59\u533a\u95f4\u4e92\u4e0d\u91cd\u53e0\u3002</p>\n\n<p><strong>\u6ce8\u610f:</strong></p>\n\n<ol>\n\t<li>\u53ef\u4ee5\u8ba4\u4e3a\u533a\u95f4\u7684\u7ec8\u70b9\u603b\u662f\u5927\u4e8e\u5b83\u7684\u8d77\u70b9\u3002</li>\n\t<li>\u533a\u95f4 [1,2] \u548c [2,3] \u7684\u8fb9\u754c\u76f8\u4e92&ldquo;\u63a5\u89e6&rdquo;\uff0c\u4f46\u6ca1\u6709\u76f8\u4e92\u91cd\u53e0\u3002</li>\n</ol>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> [ [1,2], [2,3], [3,4], [1,3] ]\n\n<strong>\u8f93\u51fa:</strong> 1\n\n<strong>\u89e3\u91ca:</strong> \u79fb\u9664 [1,3] \u540e\uff0c\u5269\u4e0b\u7684\u533a\u95f4\u6ca1\u6709\u91cd\u53e0\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 2:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> [ [1,2], [1,2], [1,2] ]\n\n<strong>\u8f93\u51fa:</strong> 2\n\n<strong>\u89e3\u91ca:</strong> \u4f60\u9700\u8981\u79fb\u9664\u4e24\u4e2a [1,2] \u6765\u4f7f\u5269\u4e0b\u7684\u533a\u95f4\u6ca1\u6709\u91cd\u53e0\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 3:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> [ [1,2], [2,3] ]\n\n<strong>\u8f93\u51fa:</strong> 0\n\n<strong>\u89e3\u91ca:</strong> \u4f60\u4e0d\u9700\u8981\u79fb\u9664\u4efb\u4f55\u533a\u95f4\uff0c\u56e0\u4e3a\u5b83\u4eec\u5df2\u7ecf\u662f\u65e0\u91cd\u53e0\u7684\u4e86\u3002\n</pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content486.30fcbbe8.chunk.js.map