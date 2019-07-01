(window.webpackJsonp=window.webpackJsonp||[]).push([[215],{1078:function(s){s.exports={content:'<h3>\u89e6\u53d1\u901f\u5ea6\u6392\u5e8f</h3>\n<p><code>nextTick</code> \u2192 <code>Promise</code> \u2192 <code>setTimeout</code> \u2192 <code>setImmediate</code></p>\n<h3>\u5173\u4e8e<code>\u5fae\u4efb\u52a1\u961f\u5217</code></h3>\n<p>\u6bcf\u5f53JS\u6267\u884c\u6808\u4e3a\u7a7a\uff0c\u4f1a\u7acb\u523b\u68c0\u67e5<code>\u5fae\u4efb\u52a1\u961f\u5217</code>\uff0c\u5f53\u53d1\u73b0\u961f\u5217\u5b58\u5728\u4efb\u52a1\uff0c\u7acb\u5373\u6267\u884c\uff0c\u6267\u884c\u5b8c\u6bd5\uff0c\u6808\u4e3a\u7a7a\uff0c\u7ee7\u7eed\u68c0\u6d4b...</p>\n<h3>\u5173\u4e8e<code>nextTick\u961f\u5217</code></h3>\n<p>\u5728<code>node v11.0.0</code>\u4e4b\u524d\uff0c<code>nextTick</code>\u4f1a\u7b49\u5f85\u961f\u5217\u4e2d\u4efb\u52a1\u5168\u90e8\u5b8c\u6210\uff0c\u91c7\u53d6\u6267\u884c\uff0c</p>\n<p>\u4f8b\u5982\uff1a</p>\n<pre class="hljs"><code>process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{\n  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)\n  setImmediate(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{\n    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>)\n  })\n})\n\nsetImmediate(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{\n  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>)\n  process.nextTick(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{\n    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>)\n  })\n})\n</code></pre>\n<p>\u5728\u65e7\u7248<code>node</code>\u4e2d\uff0c\u7ed3\u679c\u662f<code>1324</code>\uff0c\u8fd9\u662f\u56e0\u4e3a\u5f53\u6267\u884c\u5b8c<code>3</code>\uff0c<code>Immediate\u961f\u5217</code>\u8fd8\u6709\u4efb\u52a1\uff0c\u56e0\u6b64<code>nextTick</code>\u4f1a\u7b49\u5f85\u4efb\u52a1\u5b8c\u6210\u624d\u6267\u884c\u3002</p>\n<p>\u800c\u5728\u65b0\u7248<code>node</code>\u4e2d\uff0c\u7ed3\u679c\u662f<code>1342</code>\uff0c\u56e0\u4e3a<code>nextTick</code>\u4e0d\u5fc5\u7b49\u5f85\u6240\u6709\u4efb\u52a1\u6267\u884c\u5b8c\u6bd5\uff0c\u800c\u53ea\u662f\u7b49\u5f85\u5355\u4e2a<code>Immediate</code>\u6216\u8005<code>Timer</code>\u5b8c\u6210\uff0c\u4fbf\u4f1a\u68c0\u67e5\u89e6\u53d1\u3002</p>\n<blockquote>\n<p>In order to better match browser behaviour, run nextTicks (and subsequently the microtask queue) after each individual Timer and Immediate, rather than after the whole list is processed. The current behaviour is somewhat of a performance micro-optimization and also partly dictated by how timer handles were implemented.</p>\n</blockquote>\n<p>\u6765\u81ea\uff1a<a href="https://github.com/nodejs/node/pull/22842#issue-215309787">https://github.com/nodejs/node/pull/22842#issue-215309787</a></p>\n<h3>\u5173\u4e8esetTimeout</h3>\n<p>\u5f53\u8c03\u7528\u591a\u4e2a<code>setTimeout</code>\u5728\u65f6\u95f4\u5230\u8fbe\u5e76\u4e14\u8981\u56de\u5230\u6808\u6267\u884c\u7684\u65f6\u5019,\u5b83\u4eec\u662f\u6267\u884c\u4e00\u4e2a\uff0c\u6e05\u7a7a\u6808\uff0c\u518d\u6267\u884c\u4e0b\u4e00\u4e2a\uff0c\u6bcf\u6b21\u6267\u884c\u5b8c\u4e00\u6b21\uff0c\u90fd\u4f1a\u68c0\u67e5\u4e00\u6b21<code>\u5fae\u4efb\u52a1\u961f\u5217</code></p>\n<p>\u4f8b\u5982\uff08\u6d4b\u8bd5\u5728\u6d4f\u89c8\u5668\u4e2d\uff09\uff1a</p>\n<pre class="hljs"><code> <span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {\n   <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);\n   setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {\n     <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);\n   });\n });\n\nsetTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {\n  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);\n  <span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {\n    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>);\n  });\n});\n</code></pre>\n<p>\u8fd9\u91cc\u7684\u6267\u884c\u987a\u5e8f\u662f<code>1342</code>\uff0c<code>Promise</code>\u4f1a\u5728\u6bcf\u6b21\u5355\u4e2a<code>setTimeout</code>\u6267\u884c\u540e\uff0c\u68c0\u67e5<code>\u5fae\u4efb\u52a1\u961f\u5217</code>\u3002</p>\n<h3>\u5173\u4e8e<code>setImmediate</code></h3>\n<p>\u89e6\u53d1\u901f\u5ea6\u5728\u8fd94\u4e2a\u4e2d\u6700\u6162\u7684\u4e00\u4e2a\uff0c\u540c\u6837\u8ddf<code>setTimeout</code>\u52a0\u5165\u961f\u5217\u4e2d\u7b49\u5f85\u89e6\u53d1\uff0c\u4ed6\u4eec\u7684\u884c\u4e3a\u6bd4\u8f83\u602a\u5f02\uff0c\u5728\u6d4f\u89c8\u5668\u548c\u5728<code>node</code>\u5404\u4e0d\u76f8\u540c\uff0c\u6bd4\u8f83\u5c11\u8054\u5408\u4f7f\u7528\u3002</p>\n'}}}]);
//# sourceMappingURL=sourceCode-content27.de15acf0.chunk.js.map