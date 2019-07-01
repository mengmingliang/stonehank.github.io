(window.webpackJsonp=window.webpackJsonp||[]).push([[226],{1079:function(s){s.exports={content:'<p>\u5185\u5bb9\u5305\u62ec\uff1a<code>tag \u6a21\u677f\u5b57\u7b26\u4e32</code>\uff0c<code>Labelled statements</code>\uff0c<code>React\u670d\u52a1\u7aef\u6e32\u67d3\u4f7f\u7528stream</code>\uff0c<code>jest.fn</code>\uff0c<code>jest.mock</code></p>\n<h3>tag \u6a21\u677f\u5b57\u7b26\u4e32</h3>\n<p>\u4ee5<code>${xx}</code>\u5206\u5272\u5b57\u7b26\u4e32\uff0c\u5206\u522b\u4f20\u51652\u4e2a\u6570\u7ec4\uff0c\u7b2c\u4e00\u4e2a\u662f<code>\u5206\u5272\u540e\u7684\u7ed3\u679c</code>\uff0c\u7b2c\u4e8c\u4e2a\u662f<code>\u5206\u5272\u7684\u53d8\u91cf</code></p>\n<p>\u4f8b\u5982\uff1a</p>\n<pre class="hljs"><code><span class="hljs-comment">// Defining a Tag for template literals</span>\n<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">highlight</span>(<span class="hljs-params">strings, ...values</span>) </span>{\n  <span class="hljs-comment">// here i is the iterator for the strings array</span>\n  <span class="hljs-keyword">let</span> result = <span class="hljs-string">\'\'</span>\n  strings.forEach(<span class="hljs-function">(<span class="hljs-params">str, i</span>) =&gt;</span> {\n    result += str\n    <span class="hljs-keyword">if</span> (values[i]) {\n      result += <span class="hljs-string">`&lt;mark&gt;<span class="hljs-subst">${values[i]}</span>&lt;/mark&gt;`</span>\n    }\n  })\n  <span class="hljs-keyword">return</span> result\n}\n\n<span class="hljs-keyword">const</span> author = <span class="hljs-string">\'Henry Avery\'</span>\n<span class="hljs-keyword">const</span> statement = <span class="hljs-string">`I am a man of fortune &amp; I must seek my fortune`</span>\n<span class="hljs-keyword">const</span> quote = highlight<span class="hljs-string">`<span class="hljs-subst">${author}</span> once said, <span class="hljs-subst">${statement}</span>`</span>\n\n<span class="hljs-comment">// &lt;mark&gt;Henry Avery&lt;/mark&gt; once said, &lt;mark&gt;I am a man of fortune</span>\n<span class="hljs-comment">// &amp; I must seek my fortune&lt;/mark&gt;</span>\n</code></pre>\n<hr>\n<h3>Labelled statements</h3>\n<pre class="hljs"><code>declarationBlock: {\n  <span class="hljs-comment">// can be used to group logical code blocks together</span>\n  <span class="hljs-keyword">var</span> i, j\n}\n\n\nforLoop1: <span class="hljs-comment">//The first for statement is labeled "forLoop1"</span>\n<span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">3</span>; i++) {      \n   <span class="hljs-attr">forLoop2</span>: <span class="hljs-comment">//The second for statement is labeled "forLoop2"</span>\n   <span class="hljs-keyword">for</span> (j = <span class="hljs-number">0</span>; j &lt; <span class="hljs-number">3</span>; j++) {   \n      <span class="hljs-keyword">if</span> (i === <span class="hljs-number">1</span> &amp;&amp; j === <span class="hljs-number">1</span>) {\n         <span class="hljs-keyword">continue</span> forLoop1\n      }\n      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">\'i = \'</span> + i + <span class="hljs-string">\', j = \'</span> + j)\n   }\n}\n\nloopBlock4: {\n  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">\'I will print\'</span>)\n  <span class="hljs-keyword">break</span> loopBlock4\n  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">\'I will not print\'</span>)\n}\n</code></pre>\n<hr>\n<h3>payload \u5b57\u9762\uff1a\u6709\u6548\u8f7d\u8377</h3>\n<p>\u4e00\u822c\u6307\u7684\u662f\u5b9e\u9645\u7684\u5185\u5bb9\uff0c\u4f8b\u5982json:</p>\n<pre class="hljs"><code>js:{\ndata:123\n}\n</code></pre>\n<p>\u8fd9\u91cc<code>123</code>\u5c31\u662f<code>payload</code></p>\n<hr>\n<h3>\u7f51\u7edc\u4fe1\u606f\u67e5\u8be2</h3>\n<p>API:<code>navigation.connection</code></p>\n<hr>\n<h3>React\u670d\u52a1\u7aef\u6e32\u67d3\u4f7f\u7528stream</h3>\n<pre class="hljs"><code>const ReactDOMServer require(\'react-dom/server\')\nconst http = require(\'http\')\nconst fs = require(\'fs\')\nconst app = require(\'./app\')\n\n// bad\nconst server = http.createServer((req, res) =&gt; {\n    const body = ReactDOMServer.renderToString(app)\n    res.end(body)\n});\n\n// good\nconst server = http.createServer(function (req, res) {\n    const stream = ReactDOMServer.renderToNodeStream(app)\n    stream.pipe(res)\n})\n\nserver.listen(8000)\n</code></pre>\n<hr>\n<h3>jest.fn</h3>\n<p>\u6a21\u62df\u4e00\u4e2a\u51fd\u6570\uff0c\u53c2\u6570\u662f<code>(\u51fd\u6570\u7684\u884c\u4e3a)</code></p>\n<p><code>const mockFn=jest.fn(()=&gt;55)</code></p>\n<p>\u53ef\u4ee5\u901a\u8fc7</p>\n<ul>\n<li><code>expect(mockFn).toHaveBeenCalled()</code> \u9a8c\u8bc1\u662f\u5426\u88ab\u8c03\u7528</li>\n<li><code>expect(mockFn).toHaveBeenCalledTimes(num)</code>\u9a8c\u8bc1\u662f\u5426\u88ab\u8c03\u7528num\u6b21</li>\n<li><code>expect(mockFn).toHaveBeenCalledWith(arg1,arg2)</code>\u9a8c\u8bc1\u662f\u5426\u5b58\u5728\u88ab\u8c03\u7528\u7684\u53c2\u6570</li>\n<li><code>expect(mockFn).toHaveBeenLastCalledWith(arg1,arg2)</code>\u9a8c\u8bc1\u6700\u540e\u4e00\u6b21\u88ab\u8c03\u7528\u7684\u53c2\u6570</li>\n<li><code>expect(mockFn).toHaveBeenNthCalledWith(Nth,arg1,arg2)</code>\u9a8c\u8bc1\u7b2cNth\u6b21\u88ab\u8c03\u7528\u7684\u53c2\u6570</li>\n<li><code>expect(mockFn).toHaveBeenNthCalledWith(arg1,arg2)</code>\u9a8c\u8bc1\u6700\u540e\u4e00\u6b21\u88ab\u8c03\u7528\u7684\u53c2\u6570</li>\n<li><code>mockFn.mock.call</code>\u67e5\u770b\u51fd\u6570\u88ab\u8c03\u7528\u7684\u6570\u7ec4</li>\n</ul>\n<hr>\n<h3>jest.mock</h3>\n<p>\u6a21\u62df\u4e00\u4e2a\u6a21\u5757\uff0c\u53c2\u6570\u5206\u522b\u662f<code>(\u6a21\u5757\u8def\u5f84,\u6a21\u5757\u7684\u884c\u4e3a,\u6a21\u5757\u662f\u5426\u865a\u62df\u7684)</code></p>\n<p>\u4f8b\u5982\uff1a\u4e00\u4e2a\u9879\u76ee\u4e0d\u5b58\u5728<code>../abc.js</code>\u8fd9\u4e2a\u6a21\u5757</p>\n<pre class="hljs"><code>jest.mock(\'../abc.js\',() =&gt; {\n  return jest.fn(() =&gt; 42);\n},{virtual:true})\n</code></pre>\n<p>\u7b2c\u4e09\u4e2a\u53c2\u6570\u8868\u793a\u8fd9\u4e2a\u6a21\u5757\u5b9e\u9645\u4e0d\u5b58\u5728</p>\n'}}}]);
//# sourceMappingURL=sourceCode-content28.8f9f74f6.chunk.js.map