(window.webpackJsonp=window.webpackJsonp||[]).push([[603],{654:function(n){n.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {string} expression\n * @return {string}\n */</span>\n<span class="hljs-keyword">var</span> fractionAddition = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">expression</span>) </span>{\n  <span class="hljs-keyword">let</span> denominator=<span class="hljs-number">1</span> , numerator =<span class="hljs-number">0</span>\n  <span class="hljs-keyword">let</span> splitExp=expression.match(<span class="hljs-regexp">/([-+]*\\d*)\\/([-+]*\\d*)/g</span>)\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;splitExp.length;i++){\n      <span class="hljs-keyword">let</span> curExp=splitExp[i].split(<span class="hljs-string">\'/\'</span>)\n      <span class="hljs-keyword">let</span> curNumerator=curExp[<span class="hljs-number">0</span>],curDenominator=curExp[<span class="hljs-number">1</span>]\n      numerator=numerator*curDenominator+curNumerator*denominator\n      denominator*=curDenominator\n  }\n  <span class="hljs-keyword">let</span> gcd=getGCD(numerator,denominator)\n  <span class="hljs-keyword">return</span> (numerator/gcd)+<span class="hljs-string">"/"</span>+(denominator/gcd)\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getGCD</span>(<span class="hljs-params">a,b</span>)</span>{\n      a=<span class="hljs-built_in">Math</span>.abs(a); b=<span class="hljs-built_in">Math</span>.abs(b)\n      <span class="hljs-keyword">let</span> mod=a%b\n      <span class="hljs-keyword">while</span>(mod&gt;<span class="hljs-number">0</span>){a=b;b=mod;mod=a%b}\n      <span class="hljs-keyword">return</span> b\n  }\n};\n</code></pre>\n'],titleSlug:"fraction-addition-and-subtraction",hasThinking:!1,content:'<p>\u7ed9\u5b9a\u4e00\u4e2a\u8868\u793a\u5206\u6570\u52a0\u51cf\u8fd0\u7b97\u8868\u8fbe\u5f0f\u7684\u5b57\u7b26\u4e32\uff0c\u4f60\u9700\u8981\u8fd4\u56de\u4e00\u4e2a\u5b57\u7b26\u4e32\u5f62\u5f0f\u7684\u8ba1\u7b97\u7ed3\u679c\u3002&nbsp;\u8fd9\u4e2a\u7ed3\u679c\u5e94\u8be5\u662f\u4e0d\u53ef\u7ea6\u5206\u7684\u5206\u6570\uff0c\u5373<a href="https://baike.baidu.com/item/%E6%9C%80%E7%AE%80%E5%88%86%E6%95%B0" target="_blank">\u6700\u7b80\u5206\u6570</a>\u3002&nbsp;\u5982\u679c\u6700\u7ec8\u7ed3\u679c\u662f\u4e00\u4e2a\u6574\u6570\uff0c\u4f8b\u5982&nbsp;<code>2</code>\uff0c\u4f60\u9700\u8981\u5c06\u5b83\u8f6c\u6362\u6210\u5206\u6570\u5f62\u5f0f\uff0c\u5176\u5206\u6bcd\u4e3a&nbsp;<code>1</code>\u3002\u6240\u4ee5\u5728\u4e0a\u8ff0\u4f8b\u5b50\u4e2d, <code>2</code>&nbsp;\u5e94\u8be5\u88ab\u8f6c\u6362\u4e3a&nbsp;<code>2/1</code>\u3002</p>\n\n<p><strong>\u793a\u4f8b&nbsp;1:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong>&quot;-1/2+1/2&quot;\n<strong>\u8f93\u51fa:</strong> &quot;0/1&quot;\n</pre>\n\n<p><strong>&nbsp;\u793a\u4f8b 2:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong>&quot;-1/2+1/2+1/3&quot;\n<strong>\u8f93\u51fa:</strong> &quot;1/3&quot;\n</pre>\n\n<p><strong>\u793a\u4f8b 3:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong>&quot;1/3-1/2&quot;\n<strong>\u8f93\u51fa:</strong> &quot;-1/6&quot;\n</pre>\n\n<p><strong>\u793a\u4f8b 4:</strong></p>\n\n<pre>\n<strong>\u8f93\u5165:</strong>&quot;5/3+1/3&quot;\n<strong>\u8f93\u51fa:</strong> &quot;2/1&quot;\n</pre>\n\n<p><strong>\u8bf4\u660e:</strong></p>\n\n<ol>\n\t<li>\u8f93\u5165\u548c\u8f93\u51fa\u5b57\u7b26\u4e32\u53ea\u5305\u542b&nbsp;<code>&#39;0&#39;</code> \u5230&nbsp;<code>&#39;9&#39;</code>&nbsp;\u7684\u6570\u5b57\uff0c\u4ee5\u53ca&nbsp;<code>&#39;/&#39;</code>, <code>&#39;+&#39;</code> \u548c&nbsp;<code>&#39;-&#39;</code>\u3002&nbsp;</li>\n\t<li>\u8f93\u5165\u548c\u8f93\u51fa\u5206\u6570\u683c\u5f0f\u5747\u4e3a&nbsp;<code>&plusmn;\u5206\u5b50/\u5206\u6bcd</code>\u3002\u5982\u679c\u8f93\u5165\u7684\u7b2c\u4e00\u4e2a\u5206\u6570\u6216\u8005\u8f93\u51fa\u7684\u5206\u6570\u662f\u6b63\u6570\uff0c\u5219&nbsp;<code>&#39;+&#39;</code>&nbsp;\u4f1a\u88ab\u7701\u7565\u6389\u3002</li>\n\t<li>\u8f93\u5165\u53ea\u5305\u542b\u5408\u6cd5\u7684<strong>\u6700\u7b80\u5206\u6570</strong>\uff0c\u6bcf\u4e2a\u5206\u6570\u7684<strong>\u5206\u5b50</strong>\u4e0e<strong>\u5206\u6bcd</strong>\u7684\u8303\u56f4\u662f&nbsp;&nbsp;[1,10]\u3002&nbsp;\u5982\u679c\u5206\u6bcd\u662f1\uff0c\u610f\u5473\u7740\u8fd9\u4e2a\u5206\u6570\u5b9e\u9645\u4e0a\u662f\u4e00\u4e2a\u6574\u6570\u3002</li>\n\t<li>\u8f93\u5165\u7684\u5206\u6570\u4e2a\u6570\u8303\u56f4\u662f [1,10]\u3002</li>\n\t<li><strong>\u6700\u7ec8\u7ed3\u679c</strong>\u7684\u5206\u5b50\u4e0e\u5206\u6bcd\u4fdd\u8bc1\u662f 32 \u4f4d\u6574\u6570\u8303\u56f4\u5185\u7684\u6709\u6548\u6574\u6570\u3002</li>\n</ol>\n'}}}]);
//# sourceMappingURL=sourceCode-content619.3a9962db.chunk.js.map