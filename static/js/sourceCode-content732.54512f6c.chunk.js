(window.webpackJsonp=window.webpackJsonp||[]).push([[729],{767:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-keyword">var</span> MyCalendarTwo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{\n  <span class="hljs-keyword">this</span>.calendar = [];\n  <span class="hljs-keyword">this</span>.overlaps = [];\n};\n\n<span class="hljs-comment">/** \n * @param {number} start \n * @param {number} end\n * @return {boolean}\n */</span>\nMyCalendarTwo.prototype.book = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">start, end</span>) </span>{\n  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.overlaps.length; i++) {\n    <span class="hljs-keyword">let</span> s1 = <span class="hljs-keyword">this</span>.overlaps[i][<span class="hljs-number">0</span>];\n    <span class="hljs-keyword">let</span> e1 = <span class="hljs-keyword">this</span>.overlaps[i][<span class="hljs-number">1</span>];\n    <span class="hljs-keyword">if</span> (s1 &lt; end &amp;&amp; start &lt; e1) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;\n  }\n  \n  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.calendar.length; i++) {\n    <span class="hljs-keyword">let</span> s1 = <span class="hljs-keyword">this</span>.calendar[i][<span class="hljs-number">0</span>];\n    <span class="hljs-keyword">let</span> e1 = <span class="hljs-keyword">this</span>.calendar[i][<span class="hljs-number">1</span>];\n    <span class="hljs-keyword">if</span> (s1 &lt; end &amp;&amp; start &lt; e1) {\n      <span class="hljs-keyword">this</span>.overlaps.push([<span class="hljs-built_in">Math</span>.max(s1, start), <span class="hljs-built_in">Math</span>.min(e1, end)]);\n    }\n  }\n  <span class="hljs-keyword">this</span>.calendar.push([start, end]);\n  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;\n};\n\n<span class="hljs-comment">/** \n * Your MyCalendarTwo object will be instantiated and called as such:\n * var obj = Object.create(MyCalendarTwo).createNew()\n * var param_1 = obj.book(start,end)\n */</span>\n</code></pre>\n'],titleSlug:"my-calendar-ii",hasThinking:!1,content:"<p>\u5b9e\u73b0\u4e00\u4e2a <code>MyCalendar</code> \u7c7b\u6765\u5b58\u653e\u4f60\u7684\u65e5\u7a0b\u5b89\u6392\u3002\u5982\u679c\u8981\u6dfb\u52a0\u7684\u65f6\u95f4\u5185\u4e0d\u4f1a\u5bfc\u81f4\u4e09\u91cd\u9884\u8ba2\u65f6\uff0c\u5219\u53ef\u4ee5\u5b58\u50a8\u8fd9\u4e2a\u65b0\u7684\u65e5\u7a0b\u5b89\u6392\u3002</p>\n\n<p><code>MyCalendar</code> \u6709\u4e00\u4e2a <code>book(int start, int end)</code>\u65b9\u6cd5\u3002\u5b83\u610f\u5473\u7740\u5728start\u5230end\u65f6\u95f4\u5185\u589e\u52a0\u4e00\u4e2a\u65e5\u7a0b\u5b89\u6392\uff0c\u6ce8\u610f\uff0c\u8fd9\u91cc\u7684\u65f6\u95f4\u662f\u534a\u5f00\u533a\u95f4\uff0c\u5373 <code>[start, end)</code>, \u5b9e\u6570&nbsp;<code>x</code> \u7684\u8303\u56f4\u4e3a\uff0c &nbsp;<code>start &lt;= x &lt; end</code>\u3002</p>\n\n<p>\u5f53\u4e09\u4e2a\u65e5\u7a0b\u5b89\u6392\u6709\u4e00\u4e9b\u65f6\u95f4\u4e0a\u7684\u4ea4\u53c9\u65f6\uff08\u4f8b\u5982\u4e09\u4e2a\u65e5\u7a0b\u5b89\u6392\u90fd\u5728\u540c\u4e00\u65f6\u95f4\u5185\uff09\uff0c\u5c31\u4f1a\u4ea7\u751f\u4e09\u91cd\u9884\u8ba2\u3002</p>\n\n<p>\u6bcf\u6b21\u8c03\u7528 <code>MyCalendar.book</code>\u65b9\u6cd5\u65f6\uff0c\u5982\u679c\u53ef\u4ee5\u5c06\u65e5\u7a0b\u5b89\u6392\u6210\u529f\u6dfb\u52a0\u5230\u65e5\u5386\u4e2d\u800c\u4e0d\u4f1a\u5bfc\u81f4\u4e09\u91cd\u9884\u8ba2\uff0c\u8fd4\u56de <code>true</code>\u3002\u5426\u5219\uff0c\u8fd4\u56de <code>false</code> \u5e76\u4e14\u4e0d\u8981\u5c06\u8be5\u65e5\u7a0b\u5b89\u6392\u6dfb\u52a0\u5230\u65e5\u5386\u4e2d\u3002</p>\n\n<p>\u8bf7\u6309\u7167\u4ee5\u4e0b\u6b65\u9aa4\u8c03\u7528<code>MyCalendar</code> \u7c7b: <code>MyCalendar cal = new MyCalendar();</code> <code>MyCalendar.book(start, end)</code></p>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<pre>MyCalendar();\nMyCalendar.book(10, 20); // returns true\nMyCalendar.book(50, 60); // returns true\nMyCalendar.book(10, 40); // returns true\nMyCalendar.book(5, 15); // returns false\nMyCalendar.book(5, 10); // returns true\nMyCalendar.book(25, 55); // returns true\n<strong>\u89e3\u91ca:</strong> \n\u524d\u4e24\u4e2a\u65e5\u7a0b\u5b89\u6392\u53ef\u4ee5\u6dfb\u52a0\u81f3\u65e5\u5386\u4e2d\u3002 \u7b2c\u4e09\u4e2a\u65e5\u7a0b\u5b89\u6392\u4f1a\u5bfc\u81f4\u53cc\u91cd\u9884\u8ba2\uff0c\u4f46\u53ef\u4ee5\u6dfb\u52a0\u81f3\u65e5\u5386\u4e2d\u3002\n\u7b2c\u56db\u4e2a\u65e5\u7a0b\u5b89\u6392\u6d3b\u52a8\uff085,15\uff09\u4e0d\u80fd\u6dfb\u52a0\u81f3\u65e5\u5386\u4e2d\uff0c\u56e0\u4e3a\u5b83\u4f1a\u5bfc\u81f4\u4e09\u91cd\u9884\u8ba2\u3002\n\u7b2c\u4e94\u4e2a\u65e5\u7a0b\u5b89\u6392\uff085,10\uff09\u53ef\u4ee5\u6dfb\u52a0\u81f3\u65e5\u5386\u4e2d\uff0c\u56e0\u4e3a\u5b83\u672a\u4f7f\u7528\u5df2\u7ecf\u53cc\u91cd\u9884\u8ba2\u7684\u65f6\u95f410\u3002\n\u7b2c\u516d\u4e2a\u65e5\u7a0b\u5b89\u6392\uff0825,55\uff09\u53ef\u4ee5\u6dfb\u52a0\u81f3\u65e5\u5386\u4e2d\uff0c\u56e0\u4e3a\u65f6\u95f4 [25,40] \u5c06\u548c\u7b2c\u4e09\u4e2a\u65e5\u7a0b\u5b89\u6392\u53cc\u91cd\u9884\u8ba2\uff1b\n\u65f6\u95f4 [40,50] \u5c06\u5355\u72ec\u9884\u8ba2\uff0c\u65f6\u95f4 [50,55\uff09\u5c06\u548c\u7b2c\u4e8c\u4e2a\u65e5\u7a0b\u5b89\u6392\u53cc\u91cd\u9884\u8ba2\u3002\n</pre>\n\n<p><strong>\u8bf4\u660e:</strong></p>\n\n<ul>\n\t<li>\u6bcf\u4e2a\u6d4b\u8bd5\u7528\u4f8b\uff0c\u8c03\u7528&nbsp;<code>MyCalendar.book</code>&nbsp;\u51fd\u6570\u6700\u591a\u4e0d\u8d85\u8fc7&nbsp;<code>100</code>\u6b21\u3002</li>\n\t<li>\u8c03\u7528\u51fd\u6570&nbsp;<code>MyCalendar.book(start, end)</code>\u65f6\uff0c&nbsp;<code>start</code> \u548c&nbsp;<code>end</code> \u7684\u53d6\u503c\u8303\u56f4\u4e3a&nbsp;<code>[0, 10^9]</code>\u3002</li>\n</ul>\n"}}}]);
//# sourceMappingURL=sourceCode-content732.54512f6c.chunk.js.map