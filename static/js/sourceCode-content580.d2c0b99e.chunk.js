(window.webpackJsonp=window.webpackJsonp||[]).push([[560],{615:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {string} a\n * @param {string} b\n * @return {string}\n */</span>\n<span class="hljs-keyword">var</span> complexNumberMultiply = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parse</span>(<span class="hljs-params">str</span>)</span>{\n    <span class="hljs-keyword">let</span> arr=str.split(<span class="hljs-string">\'+\'</span>)\n    <span class="hljs-keyword">let</span> a=<span class="hljs-built_in">parseInt</span>(arr[<span class="hljs-number">0</span>],<span class="hljs-number">10</span>),\n        b=<span class="hljs-built_in">parseInt</span>(arr[<span class="hljs-number">1</span>],<span class="hljs-number">10</span>)\n    <span class="hljs-keyword">return</span> [a,b]\n  }\n  <span class="hljs-keyword">let</span> [x1,y1]=parse(a),[x2,y2]=parse(b)\n  \n  <span class="hljs-keyword">let</span> intNum=x1*x2-y1*y2\n  <span class="hljs-keyword">let</span> complexNum=x1*y2+x2*y1\n  \n  <span class="hljs-keyword">return</span> intNum+<span class="hljs-string">"+"</span>+complexNum+<span class="hljs-string">"i"</span>\n};\n</code></pre>\n'],titleSlug:"complex-number-multiplication",hasThinking:!1,content:'<p>\u7ed9\u5b9a\u4e24\u4e2a\u8868\u793a<a href="https://baike.baidu.com/item/%E5%A4%8D%E6%95%B0/254365?fr=aladdin">\u590d\u6570</a>\u7684\u5b57\u7b26\u4e32\u3002</p>\n\n<p>\u8fd4\u56de\u8868\u793a\u5b83\u4eec\u4e58\u79ef\u7684\u5b57\u7b26\u4e32\u3002\u6ce8\u610f\uff0c\u6839\u636e\u5b9a\u4e49 i<sup>2</sup> = -1 \u3002</p>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> &quot;1+1i&quot;, &quot;1+1i&quot;\n<strong>\u8f93\u51fa:</strong> &quot;0+2i&quot;\n<strong>\u89e3\u91ca:</strong> (1 + i) * (1 + i) = 1 + i<sup>2</sup> + 2 * i = 2i \uff0c\u4f60\u9700\u8981\u5c06\u5b83\u8f6c\u6362\u4e3a 0+2i \u7684\u5f62\u5f0f\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 2:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> &quot;1+-1i&quot;, &quot;1+-1i&quot;\n<strong>\u8f93\u51fa:</strong> &quot;0+-2i&quot;\n<strong>\u89e3\u91ca:</strong> (1 - i) * (1 - i) = 1 + i<sup>2</sup> - 2 * i = -2i \uff0c\u4f60\u9700\u8981\u5c06\u5b83\u8f6c\u6362\u4e3a 0+-2i \u7684\u5f62\u5f0f\u3002 \n</pre>\n\n<p><strong>\u6ce8\u610f:</strong></p>\n\n<ol>\n\t<li>\u8f93\u5165\u5b57\u7b26\u4e32\u4e0d\u5305\u542b\u989d\u5916\u7684\u7a7a\u683c\u3002</li>\n\t<li>\u8f93\u5165\u5b57\u7b26\u4e32\u5c06\u4ee5&nbsp;<strong>a+bi</strong> \u7684\u5f62\u5f0f\u7ed9\u51fa\uff0c\u5176\u4e2d\u6574\u6570 <strong>a</strong> \u548c <strong>b</strong> \u7684\u8303\u56f4\u5747\u5728 [-100, 100] \u4e4b\u95f4\u3002<strong>\u8f93\u51fa\u4e5f\u5e94\u5f53\u7b26\u5408\u8fd9\u79cd\u5f62\u5f0f</strong>\u3002</li>\n</ol>\n'}}}]);
//# sourceMappingURL=sourceCode-content580.d2c0b99e.chunk.js.map