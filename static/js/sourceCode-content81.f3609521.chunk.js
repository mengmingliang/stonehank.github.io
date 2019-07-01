(window.webpackJsonp=window.webpackJsonp||[]).push([[814],{1131:function(s){s.exports={content:'<p>Generators\u51fd\u6570\u7684\u53cc\u5411\u4f20\u9012</p>\n<p>\u6bcf\u6b21\u8c03\u7528<code>answer()</code>\uff0c\u76f8\u5f53\u4e8e\u5728<code>generators</code>\u51fd\u6570\u7684next\u65b9\u6cd5\u52a0\u5165\u53c2\u6570\uff0c\u8fd9\u4e2a\u53c2\u6570\u4f1a\u8fd4\u56de\u7ed9<code>yield</code>\u7684\u8fd4\u56de\u503c</p>\n<p>\u5728\u51fd\u6570\u5185\u90e8\u53ef\u4ee5\u5224\u65ad\u8fd9\u4e2a\u8fd4\u56de\u503c\uff0c\u5b9e\u73b0\u53cc\u5411\u4f20\u9012</p>\n<pre class="hljs"><code>  <span class="hljs-keyword">let</span> stepCount=<span class="hljs-number">1</span>\n  <span class="hljs-keyword">let</span> currentPoint=<span class="hljs-number">1</span>\n  <span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">stepToStep</span>(<span class="hljs-params"></span>)</span>{\n    <span class="hljs-keyword">while</span>(stepCount&lt;<span class="hljs-number">4</span>){\n      <span class="hljs-keyword">let</span> choose=<span class="hljs-keyword">yield</span> <span class="hljs-string">\'Choose Left or Right ?Call "answer()" to answer!\'</span>\n      <span class="hljs-keyword">if</span>(choose===<span class="hljs-string">\'left\'</span>)currentPoint+=stepCount++;\n      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (choose===<span class="hljs-string">\'right\'</span>)currentPoint+=<span class="hljs-number">1</span>+stepCount++;\n      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`You have arrived at point <span class="hljs-subst">${currentPoint}</span>`</span>)\n    }\n    <span class="hljs-keyword">if</span>(currentPoint===<span class="hljs-number">9</span>)<span class="hljs-built_in">console</span>.log(<span class="hljs-string">\'Good End\'</span>)\n    <span class="hljs-keyword">else</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">\'Bad End\'</span>)\n  }\n  <span class="hljs-keyword">let</span> start= stepToStep()\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">answer</span>(<span class="hljs-params">answer</span>)</span>{\n    <span class="hljs-built_in">console</span>.log(start.next(answer.toLowerCase()).value)\n  }\n  <span class="hljs-built_in">console</span>.log(start.next().value)\n</code></pre>\n'}}}]);
//# sourceMappingURL=sourceCode-content81.f3609521.chunk.js.map