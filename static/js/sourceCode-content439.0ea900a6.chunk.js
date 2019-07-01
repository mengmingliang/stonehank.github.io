(window.webpackJsonp=window.webpackJsonp||[]).push([[403],{474:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {number} n\n * @return {number[]}\n */</span>\n<span class="hljs-keyword">var</span> lexicalOrder = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">n</span>) </span>{\n  <span class="hljs-keyword">let</span> result=[]\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">1</span>;i&lt;<span class="hljs-number">10</span>;i++){\n    dfs(result,i)\n  }\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dfs</span>(<span class="hljs-params">result,cur</span>)</span>{\n    <span class="hljs-keyword">if</span>(cur&gt;n)<span class="hljs-keyword">return</span> \n    result.push(cur)\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-number">10</span>;i++){\n      <span class="hljs-keyword">if</span>((<span class="hljs-number">10</span>*cur+i)&gt;n)<span class="hljs-keyword">return</span>\n      dfs(result,<span class="hljs-number">10</span>*cur+i)\n    }        \n  }\n  <span class="hljs-keyword">return</span> result\n};\n</code></pre>\n'],titleSlug:"lexicographical-numbers",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u6700\u76f4\u89c2\u5c31\u662f\u6392\u5e8f\u3002</p>\n<p>\u65f6\u95f4\u590d\u6742\u5ea6<code>O(N)</code>\u7684\u89e3\u51b3\u65b9\u6848\uff0c\u5bf9\u4e8e\u4ee5<code>1</code>\u5f00\u5934\u7684\uff0c\u5b58\u5728<code>10,11,12...19</code>\uff0c\u5bf9\u4e8e<code>10</code>\u5f00\u5934\u7684\uff0c\u5b58\u5728<code>100,101,102...109</code>\uff1b</p>\n<p>\u56e0\u6b64\u5bf9\u4e8e\u4ece<code>1</code>\u5230<code>9</code>\u6bcf\u4e00\u4e2a\u6570\uff0c\u9012\u5f52\u4ee5\u5b83\u4eec\u5f00\u5934\u7684\u6bcf\u4e00\u4e2a\u6570\u5b57\uff0c\u6dfb\u52a0\u5230\u7ed3\u679c\u3002</p>\n",content:"<p>\u7ed9\u5b9a\u4e00\u4e2a\u6574\u6570&nbsp;<em>n</em>, \u8fd4\u56de\u4ece&nbsp;<em>1&nbsp;</em>\u5230&nbsp;<em>n&nbsp;</em>\u7684\u5b57\u5178\u987a\u5e8f\u3002</p>\n\n<p>\u4f8b\u5982\uff0c</p>\n\n<p>\u7ed9\u5b9a <em>n</em> =1 3\uff0c\u8fd4\u56de [1,10,11,12,13,2,3,4,5,6,7,8,9] \u3002</p>\n\n<p>\u8bf7\u5c3d\u53ef\u80fd\u7684\u4f18\u5316\u7b97\u6cd5\u7684\u65f6\u95f4\u590d\u6742\u5ea6\u548c\u7a7a\u95f4\u590d\u6742\u5ea6\u3002 \u8f93\u5165\u7684\u6570\u636e&nbsp;<em>n&nbsp;</em>\u5c0f\u4e8e\u7b49\u4e8e&nbsp;5,000,000\u3002</p>\n"}}}]);
//# sourceMappingURL=sourceCode-content439.0ea900a6.chunk.js.map