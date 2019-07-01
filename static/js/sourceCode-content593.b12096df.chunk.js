(window.webpackJsonp=window.webpackJsonp||[]).push([[574],{628:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number[]} nums\n * @return {string}\n */</span>\n<span class="hljs-keyword">var</span> optimalDivision = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nums</span>) </span>{\n    <span class="hljs-keyword">let</span> s=nums.join(<span class="hljs-string">\'/\'</span>);\n    <span class="hljs-keyword">if</span>(nums.length&lt;=<span class="hljs-number">1</span>)<span class="hljs-keyword">return</span> s\n    <span class="hljs-keyword">let</span> firstSlash=s.indexOf(<span class="hljs-string">\'/\'</span>)\n    <span class="hljs-keyword">let</span> partS1=s.substring(<span class="hljs-number">0</span>,firstSlash+<span class="hljs-number">1</span>)\n    <span class="hljs-keyword">let</span> partS2=s.substring(firstSlash+<span class="hljs-number">1</span>,s.length)\n    <span class="hljs-keyword">if</span>(partS2.indexOf(<span class="hljs-string">\'/\'</span>)!==<span class="hljs-number">-1</span>){\n        partS2=<span class="hljs-string">"("</span>+partS2+<span class="hljs-string">")"</span>\n    }\n    <span class="hljs-comment">// s.replace(/^(.\\/)(.*)/,\'$1\\($2\\)\')</span>\n    <span class="hljs-keyword">return</span> partS1+partS2\n};\n</code></pre>\n'],titleSlug:"optimal-division",hasThinking:!1,content:"<p>\u7ed9\u5b9a\u4e00\u7ec4<strong>\u6b63\u6574\u6570\uff0c</strong>\u76f8\u90bb\u7684\u6574\u6570\u4e4b\u95f4\u5c06\u4f1a\u8fdb\u884c\u6d6e\u70b9\u9664\u6cd5\u64cd\u4f5c\u3002\u4f8b\u5982\uff0c&nbsp;[2,3,4] -&gt; 2 / 3 / 4 \u3002</p>\n\n<p>\u4f46\u662f\uff0c\u4f60\u53ef\u4ee5\u5728\u4efb\u610f\u4f4d\u7f6e\u6dfb\u52a0\u4efb\u610f\u6570\u76ee\u7684\u62ec\u53f7\uff0c\u6765\u6539\u53d8\u7b97\u6570\u7684\u4f18\u5148\u7ea7\u3002\u4f60\u9700\u8981\u627e\u51fa\u600e\u4e48\u6dfb\u52a0\u62ec\u53f7\uff0c\u624d\u80fd\u5f97\u5230<strong>\u6700\u5927\u7684</strong>\u7ed3\u679c\uff0c\u5e76\u4e14\u8fd4\u56de\u76f8\u5e94\u7684\u5b57\u7b26\u4e32\u683c\u5f0f\u7684\u8868\u8fbe\u5f0f\u3002<strong>\u4f60\u7684\u8868\u8fbe\u5f0f\u4e0d\u5e94\u8be5\u542b\u6709\u5197\u4f59\u7684\u62ec\u53f7\u3002</strong></p>\n\n<p><strong>\u793a\u4f8b\uff1a</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong> [1000,100,10,2]\n<strong>\u8f93\u51fa:</strong> &quot;1000/(100/10/2)&quot;\n<strong>\u89e3\u91ca:</strong>\n1000/(100/10/2) = 1000/((100/10)/2) = 200\n\u4f46\u662f\uff0c\u4ee5\u4e0b\u52a0\u7c97\u7684\u62ec\u53f7 &quot;1000/(<strong>(</strong>100/10<strong>)</strong>/2)&quot; \u662f\u5197\u4f59\u7684\uff0c\n\u56e0\u4e3a\u4ed6\u4eec\u5e76\u4e0d\u5f71\u54cd\u64cd\u4f5c\u7684\u4f18\u5148\u7ea7\uff0c\u6240\u4ee5\u4f60\u9700\u8981\u8fd4\u56de &quot;1000/(100/10/2)&quot;\u3002\n\n\u5176\u4ed6\u7528\u4f8b:\n1000/(100/10)/2 = 50\n1000/(100/(10/2)) = 50\n1000/100/10/2 = 0.5\n1000/100/(10/2) = 2\n</pre>\n\n<p><strong>\u8bf4\u660e:</strong></p>\n\n<ol>\n\t<li>\u8f93\u5165\u6570\u7ec4\u7684\u957f\u5ea6\u5728 [1, 10] \u4e4b\u95f4\u3002</li>\n\t<li>\u6570\u7ec4\u4e2d\u6bcf\u4e2a\u5143\u7d20\u7684\u5927\u5c0f\u90fd\u5728 [2, 1000] \u4e4b\u95f4\u3002</li>\n\t<li>\u6bcf\u4e2a\u6d4b\u8bd5\u7528\u4f8b\u53ea\u6709\u4e00\u4e2a\u6700\u4f18\u9664\u6cd5\u89e3\u3002</li>\n</ol>\n"}}}]);
//# sourceMappingURL=sourceCode-content593.b12096df.chunk.js.map