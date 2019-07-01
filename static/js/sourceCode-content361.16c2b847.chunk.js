(window.webpackJsonp=window.webpackJsonp||[]).push([[317],{396:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {string} num\n * @param {number} target\n * @return {string[]}\n */</span>\n<span class="hljs-keyword">var</span> addOperators = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">num, target</span>) </span>{\n  <span class="hljs-keyword">if</span>(num===<span class="hljs-string">\'\'</span>)<span class="hljs-keyword">return</span> []\n  <span class="hljs-keyword">let</span> result=[]\n  backtrack(<span class="hljs-number">0</span>,<span class="hljs-string">\'\'</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>)\n  <span class="hljs-keyword">return</span> result\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">backtrack</span>(<span class="hljs-params">idx,express,last,sum</span>)</span>{\n    <span class="hljs-keyword">if</span>(idx===num.length){\n      <span class="hljs-keyword">if</span>(sum===target)result.push(express)\n      <span class="hljs-keyword">return</span>\n    }\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=idx;i&lt;num.length;i++){\n      <span class="hljs-comment">// \u53d1\u73b0\u524d\u5bfc0\uff0c\u76f4\u63a5break</span>\n      <span class="hljs-keyword">if</span>(i&gt;idx &amp;&amp; num[idx]===<span class="hljs-string">"0"</span>)<span class="hljs-keyword">break</span>\n      <span class="hljs-comment">// \u901a\u8fc7i\u7684\u4e0d\u65ad\u9012\u589e\uff0cs\u4e5f\u9010\u6e10\u53d8\u4e3a\u591a\u4f4d\u6570\u5b57</span>\n      <span class="hljs-keyword">let</span> s=num.slice(idx,i+<span class="hljs-number">1</span>),n=+s\n      <span class="hljs-keyword">if</span>(idx===<span class="hljs-number">0</span>){\n        <span class="hljs-comment">// \u7b2c\u4e00\u4e2a\u6570\u5b57\u7684\u524d\u9762\u4e0d\u9700\u8981\u6dfb\u52a0\u7b26\u53f7</span>\n        backtrack(i+<span class="hljs-number">1</span>,s,n,n)\n      }<span class="hljs-keyword">else</span>{\n        backtrack(i+<span class="hljs-number">1</span>,express+<span class="hljs-string">\'+\'</span>+s,n,sum+n)\n        backtrack(i+<span class="hljs-number">1</span>,express+<span class="hljs-string">\'-\'</span>+s,-n,sum-n)\n        backtrack(i+<span class="hljs-number">1</span>,express+<span class="hljs-string">\'*\'</span>+s,last*n,sum-last+last*n)           \n      }\n    }\n  }\n};\n</code></pre>\n'],titleSlug:"expression-add-operators",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p><code>\u56de\u6eaf</code>\uff0c\u56de\u6eaf\u51fd\u6570\u5b9a\u4e49\u51e0\u4e2a\u53c2\u6570\uff0c</p>\n<p><code>idx</code>\uff1a\u5f53\u524d\u7684\u7d22\u5f15</p>\n<p><code>express</code>\uff1a\u5f53\u524d\u8868\u8fbe\u5f0f</p>\n<p><code>last</code>\uff1a\u6700\u540e\u4e00\u4e2a\u6570\u5b57(\u65b9\u4fbf\u4e58\u6cd5\u5904\u7406)</p>\n<p><code>sum</code>\uff1a\u5f53\u524d\u7684\u548c</p>\n<p>\u7531\u4e8e\u6570\u5b57\u4e4b\u95f4\u4e0d\u4ec5\u53ef\u4ee5\u901a\u8fc7\u8fd0\u7b97\u7b26\u8054\u7cfb\u5728\u4e00\u8d77\uff0c\u8fd8\u53ef\u4ee5\u76f4\u63a5\u5b57\u7b26\u4e32\u76f8\u52a0\uff0c\u4f8b\u5982<code>1</code>\u548c<code>5</code>\uff0c\u65e2\u53ef\u4ee5<code>1+5</code>\uff0c\u4e5f\u53ef\u4ee5<code>15</code>\u3002</p>\n<p>\u56e0\u6b64\u6bcf\u6b21\u6267\u884c\u9700\u8981\u4ece<code>idx</code>\u904d\u5386\uff0c\u5e76\u4e14\u622a\u53d6\u4ece<code>idx</code>\u5230<code>i</code>\u7684\u6570\u5b57\u4f5c\u4e3a\u5f53\u524d\u5019\u9009\u6570\u5b57\uff0c\u968f\u7740<code>i</code>\u7684\u4e0d\u65ad\u589e\u52a0\uff0c\u5f53\u524d\u5019\u9009\u6570\u5b57\u4e5f\u9010\u6e10\u53d8\u5f97\u66f4\u591a\u4f4d\u3002</p>\n<p>\u540c\u65f6\uff0c\u5982\u679c\u53d1\u73b0\u5b58\u5728\u524d\u5bfc<code>0</code>\uff0c\u76f4\u63a5\u8df3\u51fa\u5faa\u73af\u3002</p>\n<p>\u4f46\u662f\u7b2c\u4e00\u4f4d\u524d\u9762\u4e0d\u80fd\u6709\u7b26\u53f7(\u9898\u76ee\u8bf4\u660e\u4e0d\u5141\u8bb8\u4e00\u5143\u8fd0\u7b97\u7b26)\uff0c\u56e0\u6b64\u5bf9\u4e8e\u7b2c\u4e00\u4f4d\uff0c\u4e5f\u5c31\u662f<code>idx===0</code>\uff0c\u6211\u4eec\u53ea\u662f\u5c06\u5f53\u524d\u5019\u9009\u6570\u5b57\u9012\u5f52\u7ed9\u540e\u9762\u5904\u7406\u3002</p>\n<p>\u9664\u4e86\u7b2c\u4e00\u4f4d\uff0c\u90fd\u9700\u8981\u5bf9\u524d\u9762\u589e\u52a0<code>+</code>\uff0c<code>-</code>\uff0c<code>*</code>3\u79cd\u7b26\u53f7\u5206\u522b\u8fdb\u884c\u9012\u5f52\u5904\u7406\u3002</p>\n<p>\u6700\u540e\u5982\u679c<code>idx</code>\u5230\u8fbe<code>num</code>\u7684\u6700\u540e\u5e76\u4e14<code>sum===target</code>\uff0c\u8bf4\u660e\u8fd9\u4e2a\u8868\u8fbe\u5f0f\u7b26\u5408\u8981\u6c42\uff0c\u6dfb\u52a0\u5230\u7ed3\u679c\u3002</p>\n",content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u4ec5\u5305\u542b\u6570\u5b57&nbsp;<code>0-9</code>&nbsp;\u7684\u5b57\u7b26\u4e32\u548c\u4e00\u4e2a\u76ee\u6807\u503c\uff0c\u5728\u6570\u5b57\u4e4b\u95f4\u6dfb\u52a0<strong>\u4e8c\u5143</strong>\u8fd0\u7b97\u7b26\uff08\u4e0d\u662f\u4e00\u5143\uff09<code>+</code>\u3001<code>-</code>&nbsp;\u6216&nbsp;<code>*</code>&nbsp;\uff0c\u8fd4\u56de\u6240\u6709\u80fd\u591f\u5f97\u5230\u76ee\u6807\u503c\u7684\u8868\u8fbe\u5f0f\u3002</p>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> <code><em>num</em> = </code>&quot;123&quot;, <em>target</em> = 6\n<strong>\u8f93\u51fa: </strong>[&quot;1+2+3&quot;, &quot;1*2*3&quot;] \n</pre>\n\n<p><strong>\u793a\u4f8b&nbsp;2:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> <code><em>num</em> = </code>&quot;232&quot;, <em>target</em> = 8\n<strong>\u8f93\u51fa: </strong>[&quot;2*3+2&quot;, &quot;2+3*2&quot;]</pre>\n\n<p><strong>\u793a\u4f8b 3:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> <code><em>num</em> = </code>&quot;105&quot;, <em>target</em> = 5\n<strong>\u8f93\u51fa: </strong>[&quot;1*0+5&quot;,&quot;10-5&quot;]</pre>\n\n<p><strong>\u793a\u4f8b&nbsp;4:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> <code><em>num</em> = </code>&quot;00&quot;, <em>target</em> = 0\n<strong>\u8f93\u51fa: </strong>[&quot;0+0&quot;, &quot;0-0&quot;, &quot;0*0&quot;]\n</pre>\n\n<p><strong>\u793a\u4f8b 5:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong> <code><em>num</em> = </code>&quot;3456237490&quot;, <em>target</em> = 9191\n<strong>\u8f93\u51fa: </strong>[]\n</pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content361.16c2b847.chunk.js.map