(window.webpackJsonp=window.webpackJsonp||[]).push([[868],{894:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number} p\n * @param {number} q\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> mirrorReflection = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">p, q</span>) </span>{\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">calcGCD</span>(<span class="hljs-params">a,b</span>)</span>{\n    <span class="hljs-keyword">if</span>(b===<span class="hljs-number">0</span>)<span class="hljs-keyword">return</span> a\n    <span class="hljs-keyword">let</span> m=a % b\n    <span class="hljs-keyword">return</span> calcGCD(b,m)\n  }\n  <span class="hljs-keyword">let</span> gcd=calcGCD(p,q)\n  <span class="hljs-keyword">let</span> x=p/gcd,y=q/gcd\n  <span class="hljs-keyword">if</span>(x%<span class="hljs-number">2</span>===<span class="hljs-number">0</span>)<span class="hljs-keyword">return</span> <span class="hljs-number">2</span>\n  <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(y%<span class="hljs-number">2</span>===<span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>\n  <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>\n};\n</code></pre>\n'],titleSlug:"mirror-reflection",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u505a\u8f85\u52a9\u683c\u5b50\u5ef6\u957f\uff0c\u4f8b\u5982 <code>p=7,q=5</code>\uff0c\u90a3\u4e48\u6700\u540e<code>x(\u6a2a\u5411)</code>\u5c31\u662f7\u683c\uff0c<code>y(\u7eb5\u5411)</code>\u5c31\u662f5\u683c\u3002</p>\n<p><code>7</code>\u548c<code>5</code>\u4e4b\u95f4\u6ca1\u6709\u6700\u5927\u516c\u7ea6\u6570\uff0c\u56e0\u4e3a\u8f85\u52a9\u683c\u6ca1\u591a\u4e00\u683c\u5c31\u76f8\u5f53\u4e8e\u7ffb\u8f6c\u4e00\u6b21\uff0c<code>x</code>\u65b9\u5411\u591a\u4e00\u4e2a\u5c31<code>x</code>\u65b9\u5411\u7ffb\u8f6c\u4e00\u6b21\uff0c\n<code>y</code>\u65b9\u5411\u591a\u4e00\u683c\u5c31<code>y</code>\u65b9\u5411\u7ffb\u8f6c\u4e00\u6b21\u3002</p>\n<p>\u6700\u540e\u67e5\u770b<code>p</code>\u548c<code>q</code>\uff0c\u5982\u679c<code>p</code>\u4e3a\u5947\u6570\uff0c\u8bf4\u660e<code>x</code>\u65b9\u5411\u65e0\u7ffb\u8f6c\uff0c\u5982\u679c<code>q</code>\u4e3a\u5076\u6570\uff0c\u8bf4\u660e<code>y</code>\u65b9\u5411\u7ffb\u8f6c\u4e00\u6b21\u3002</p>\n<p>\u6b64\u5904<code>x=7,y=5</code>\uff0c\u4e24\u4e2a\u90fd\u662f\u5947\u6570\uff0c\u56e0\u6b64<code>x</code>\uff0c<code>y</code>\u65e0\u7ffb\u8f6c\uff0c\u53f3\u4e0a\u89d2\u7684\u70b9\u8fd8\u662f<code>1</code>\u3002</p>\n<p>\u5982\u679c<code>x=6,y=5</code>\uff0c\u90a3\u4e48<code>x</code>\u65b9\u5411\u7ffb\u8f6c\uff0c\u53f3\u4e0a\u89d2\u7684\u70b9\u5c31\u662f<code>2</code>\u3002</p>\n<p>\u5982\u679c<code>x=7,y=4</code>\uff0c\u90a3\u4e48<code>y</code>\u65b9\u5411\u7ffb\u8f6c\uff0c\u53f3\u4e0a\u89d2\u7684\u70b9\u5c31\u662f<code>0</code>\u3002</p>\n",content:'<p>\u6709\u4e00\u4e2a\u7279\u6b8a\u7684\u6b63\u65b9\u5f62\u623f\u95f4\uff0c\u6bcf\u9762\u5899\u4e0a\u90fd\u6709\u4e00\u9762\u955c\u5b50\u3002\u9664\u897f\u5357\u89d2\u4ee5\u5916\uff0c\u6bcf\u4e2a\u89d2\u843d\u90fd\u653e\u6709\u4e00\u4e2a\u63a5\u53d7\u5668\uff0c\u7f16\u53f7\u4e3a&nbsp;<code>0</code>\uff0c&nbsp;<code>1</code>\uff0c\u4ee5\u53ca&nbsp;<code>2</code>\u3002</p>\n\n<p>\u6b63\u65b9\u5f62\u623f\u95f4\u7684\u5899\u58c1\u957f\u5ea6\u4e3a&nbsp;<code>p</code>\uff0c\u4e00\u675f\u6fc0\u5149\u4ece\u897f\u5357\u89d2\u5c04\u51fa\uff0c\u9996\u5148\u4f1a\u4e0e\u4e1c\u5899\u76f8\u9047\uff0c\u5165\u5c04\u70b9\u5230\u63a5\u6536\u5668 <code>0</code> \u7684\u8ddd\u79bb\u4e3a <code>q</code> \u3002</p>\n\n<p>\u8fd4\u56de\u5149\u7ebf\u6700\u5148\u9047\u5230\u7684\u63a5\u6536\u5668\u7684\u7f16\u53f7\uff08\u4fdd\u8bc1\u5149\u7ebf\u6700\u7ec8\u4f1a\u9047\u5230\u4e00\u4e2a\u63a5\u6536\u5668\uff09\u3002</p>\n\n<p>&nbsp;</p>\n\n<p><strong>\u793a\u4f8b\uff1a</strong></p>\n\n<pre><strong>\u8f93\u5165\uff1a </strong>p = 2, q = 1\n<strong>\u8f93\u51fa\uff1a </strong>2\n<strong>\u89e3\u91ca\uff1a </strong>\u8fd9\u6761\u5149\u7ebf\u5728\u7b2c\u4e00\u6b21\u88ab\u53cd\u5c04\u56de\u5de6\u8fb9\u7684\u5899\u65f6\u5c31\u9047\u5230\u4e86\u63a5\u6536\u5668 2 \u3002\n<img alt="" src="https://ibb.co/mYSFJT"><img alt="" src="https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/06/22/reflection.png" style="height: 217px; width: 218px;"></pre>\n\n<p>&nbsp;</p>\n\n<p><strong>\u63d0\u793a\uff1a</strong></p>\n\n<ol>\n\t<li><code>1 &lt;= p &lt;= 1000</code></li>\n\t<li><code>0 &lt;= q &lt;= p</code></li>\n</ol>\n'}}}]);
//# sourceMappingURL=sourceCode-content859.3f18e7f4.chunk.js.map