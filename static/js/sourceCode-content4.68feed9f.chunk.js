(window.webpackJsonp=window.webpackJsonp||[]).push([[359],{1055:function(s){s.exports={content:'<p>###3 Redux\u7684\u590d\u7528</p>\n<p>\u56e0\u4e3a\u6bcf\u4e00\u6b21dispatch\u90fd\u662f\u904d\u5386\u6240\u6709reducer\u5bfb\u627etype\uff0c\u56e0\u6b64\u6bcf\u4e00\u4e2aaction\u7684type\u4e0d\u80fd\u4e00\u81f4\uff0c\n\u5f53\u9700\u8981\u590d\u7528reducer\u65f6\uff0c\u53ef\u4ee5\u4f7f\u7528prefix</p>\n<pre class="hljs"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generateReducer</span>(<span class="hljs-params">prefix,state</span>)</span>{\n  <span class="hljs-keyword">const</span> SOMETYPE=prefix+<span class="hljs-string">\'SOMETYPE\'</span>;\n  <span class="hljs-keyword">const</span> initialState={...state}\n  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reducer</span>(<span class="hljs-params">state=initialState,action</span>)</span>{\n    <span class="hljs-comment">//...</span>\n  }\n}\n</code></pre>\n<p>###3 Redux\u7684\u589e\u5f3a</p>\n<p>\u589e\u5f3aredux\u901a\u8fc73\u70b9\u8fdb\u884c</p>\n<ul>\n<li>\u5904\u7406\u989d\u5916\u7684action</li>\n<li>\u7ef4\u62a4\u66f4\u591astate</li>\n<li>action\u80fd\u4f20\u9012\u7ed9\u539f\u59cbreducer\u5904\u7406</li>\n</ul>\n<pre class="hljs"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">HOCReducer</span>(<span class="hljs-params">reducer</span>)</span>{\n  <span class="hljs-comment">// \u6b64\u5904\u53ef\u4ee5\u914d\u7f6e\u66f4\u591astate</span>\n  <span class="hljs-keyword">const</span> initialState={}\n  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">state=initialState,action</span>)</span>{\n    <span class="hljs-comment">// \u6b64\u5904\u5904\u7406\u989d\u5916\u7684action</span>\n    <span class="hljs-keyword">switch</span>(action.type){\n      <span class="hljs-keyword">case</span> <span class="hljs-string">\'additionalType\'</span>:\n        <span class="hljs-comment">/*do something*/</span>\n        <span class="hljs-keyword">return</span>  <span class="hljs-comment">/*{...}*/</span>;\n      <span class="hljs-keyword">default</span>:\n        <span class="hljs-comment">// \u9047\u5230\u65e0\u5339\u914d\u7684action\uff0c\u8fd4\u56de\u7ed9\u539f\u59cbreducer\u5904\u7406</span>\n        <span class="hljs-keyword">const</span> newState=reducer(initialState,action)\n        <span class="hljs-keyword">return</span> <span class="hljs-comment">/*{...}*/</span>\n    }\n  }\n}\n</code></pre>\n<p>\u8c03\u7528\uff1a</p>\n<pre class="hljs"><code><span class="hljs-keyword">import</span> {createStroe} <span class="hljs-keyword">from</span> <span class="hljs-string">\'redux\'</span>;\n\n<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reducer</span>(<span class="hljs-params">state={},action</span>)</span>{\n  <span class="hljs-keyword">switch</span>(action.type){\n    <span class="hljs-comment">/* \u521d\u59cb\u7684reducer*/</span>\n  }\n}\n<span class="hljs-keyword">const</span> hocReducer=HOCReducer(reducer);\n<span class="hljs-keyword">const</span> store=createStroe(hocReducer);\n\n<span class="hljs-comment">/* dispatch\u540e\u5c31\u4f1a\u4ecehocReducer\u5f00\u59cb\u6267\u884c\u904d\u5386*/</span>\n</code></pre>\n'}}}]);
//# sourceMappingURL=sourceCode-content4.68feed9f.chunk.js.map