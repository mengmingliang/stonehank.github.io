(window.webpackJsonp=window.webpackJsonp||[]).push([[812],{843:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {string[]} cpdomains\n * @return {string[]}\n */</span>\n<span class="hljs-keyword">var</span> subdomainVisits = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cpdomains</span>) </span>{\n  <span class="hljs-keyword">let</span> hash={}\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;cpdomains.length;i++){\n    <span class="hljs-keyword">let</span> arr=cpdomains[i].split(<span class="hljs-string">\' \'</span>)\n    <span class="hljs-keyword">let</span> count=+arr[<span class="hljs-number">0</span>], str=arr[<span class="hljs-number">1</span>], temp=<span class="hljs-string">\'\'</span>\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=str.length<span class="hljs-number">-1</span>;j&gt;=<span class="hljs-number">-1</span>;j--){\n      <span class="hljs-keyword">if</span>(j===<span class="hljs-number">-1</span> || str[j]===<span class="hljs-string">\'.\'</span>){\n        <span class="hljs-keyword">if</span>(hash[temp]==<span class="hljs-literal">null</span>)hash[temp]=count\n        <span class="hljs-keyword">else</span> hash[temp]+=count\n        <span class="hljs-keyword">if</span>(j===<span class="hljs-number">-1</span>)<span class="hljs-keyword">break</span>\n      }\n      temp=str[j]+temp\n    }\n  }\n  <span class="hljs-keyword">let</span> res=[]\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> k <span class="hljs-keyword">in</span> hash){\n    res.push(hash[k]+<span class="hljs-string">\' \'</span>+k)\n  }\n  <span class="hljs-keyword">return</span> res\n};\n</code></pre>\n'],titleSlug:"subdomain-visit-count",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p>\u5bf9\u6bcf\u4e2a\u57df\u540d\uff0c\u4ece\u9876\u7ea7\u57df\u540d\u5f00\u59cb\u904d\u5386\uff0c\u6bcf\u6b21\u9047\u5230<code>.</code>\uff0c\u5c06\u5f53\u524d\u57df\u540d\u7684\u8bbf\u95ee\u6b21\u6570\u8bb0\u5f55\u5230<code>hash</code>\uff0c\u6700\u540e\u518d\u8fd4\u56de<code>hash</code>\u3002</p>\n",content:"<p>\u4e00\u4e2a\u7f51\u7ad9\u57df\u540d\uff0c\u5982&quot;discuss.leetcode.com&quot;\uff0c\u5305\u542b\u4e86\u591a\u4e2a\u5b50\u57df\u540d\u3002\u4f5c\u4e3a\u9876\u7ea7\u57df\u540d\uff0c\u5e38\u7528\u7684\u6709&quot;com&quot;\uff0c\u4e0b\u4e00\u7ea7\u5219\u6709&quot;leetcode.com&quot;\uff0c\u6700\u4f4e\u7684\u4e00\u7ea7\u4e3a&quot;discuss.leetcode.com&quot;\u3002\u5f53\u6211\u4eec\u8bbf\u95ee\u57df\u540d&quot;discuss.leetcode.com&quot;\u65f6\uff0c\u4e5f\u540c\u65f6\u8bbf\u95ee\u4e86\u5176\u7236\u57df\u540d&quot;leetcode.com&quot;\u4ee5\u53ca\u9876\u7ea7\u57df\u540d&nbsp;&quot;com&quot;\u3002</p>\n\n<p>\u7ed9\u5b9a\u4e00\u4e2a\u5e26\u8bbf\u95ee\u6b21\u6570\u548c\u57df\u540d\u7684\u7ec4\u5408\uff0c\u8981\u6c42\u5206\u522b\u8ba1\u7b97\u6bcf\u4e2a\u57df\u540d\u88ab\u8bbf\u95ee\u7684\u6b21\u6570\u3002\u5176\u683c\u5f0f\u4e3a\u8bbf\u95ee\u6b21\u6570+\u7a7a\u683c+\u5730\u5740\uff0c\u4f8b\u5982\uff1a&quot;9001 discuss.leetcode.com&quot;\u3002</p>\n\n<p>\u63a5\u4e0b\u6765\u4f1a\u7ed9\u51fa\u4e00\u7ec4\u8bbf\u95ee\u6b21\u6570\u548c\u57df\u540d\u7ec4\u5408\u7684\u5217\u8868<code>cpdomains</code>&nbsp;\u3002\u8981\u6c42\u89e3\u6790\u51fa\u6240\u6709\u57df\u540d\u7684\u8bbf\u95ee\u6b21\u6570\uff0c\u8f93\u51fa\u683c\u5f0f\u548c\u8f93\u5165\u683c\u5f0f\u76f8\u540c\uff0c\u4e0d\u9650\u5b9a\u5148\u540e\u987a\u5e8f\u3002</p>\n\n<pre>\n<strong>\u793a\u4f8b 1:</strong>\n<strong>\u8f93\u5165:</strong> \n[&quot;9001 discuss.leetcode.com&quot;]\n<strong>\u8f93\u51fa:</strong> \n[&quot;9001 discuss.leetcode.com&quot;, &quot;9001 leetcode.com&quot;, &quot;9001 com&quot;]\n<strong>\u8bf4\u660e:</strong> \n\u4f8b\u5b50\u4e2d\u4ec5\u5305\u542b\u4e00\u4e2a\u7f51\u7ad9\u57df\u540d\uff1a&quot;discuss.leetcode.com&quot;\u3002\u6309\u7167\u524d\u6587\u5047\u8bbe\uff0c\u5b50\u57df\u540d&quot;leetcode.com&quot;\u548c&quot;com&quot;\u90fd\u4f1a\u88ab\u8bbf\u95ee\uff0c\u6240\u4ee5\u5b83\u4eec\u90fd\u88ab\u8bbf\u95ee\u4e869001\u6b21\u3002\n</pre>\n\n<pre>\n<strong>\u793a\u4f8b 2\n\u8f93\u5165:</strong> \n[&quot;900 google.mail.com&quot;, &quot;50 yahoo.com&quot;, &quot;1 intel.mail.com&quot;, &quot;5 wiki.org&quot;]\n<strong>\u8f93\u51fa:</strong> \n[&quot;901 mail.com&quot;,&quot;50 yahoo.com&quot;,&quot;900 google.mail.com&quot;,&quot;5 wiki.org&quot;,&quot;5 org&quot;,&quot;1 intel.mail.com&quot;,&quot;951 com&quot;]\n<strong>\u8bf4\u660e:</strong> \n\u6309\u7167\u5047\u8bbe\uff0c\u4f1a\u8bbf\u95ee&quot;google.mail.com&quot; 900\u6b21\uff0c&quot;yahoo.com&quot; 50\u6b21\uff0c&quot;intel.mail.com&quot; 1\u6b21\uff0c&quot;wiki.org&quot; 5\u6b21\u3002\n\u800c\u5bf9\u4e8e\u7236\u57df\u540d\uff0c\u4f1a\u8bbf\u95ee&quot;mail.com&quot; 900+1 = 901\u6b21\uff0c&quot;com&quot; 900 + 50 + 1 = 951\u6b21\uff0c\u548c &quot;org&quot; 5 \u6b21\u3002\n</pre>\n\n<p><strong>\u6ce8\u610f\u4e8b\u9879\uff1a</strong></p>\n\n<ul>\n\t<li>&nbsp;<code>cpdomains</code>&nbsp;\u7684\u957f\u5ea6\u5c0f\u4e8e&nbsp;<code>100</code>\u3002</li>\n\t<li>\u6bcf\u4e2a\u57df\u540d\u7684\u957f\u5ea6\u5c0f\u4e8e<code>100</code>\u3002</li>\n\t<li>\u6bcf\u4e2a\u57df\u540d\u5730\u5740\u5305\u542b\u4e00\u4e2a\u6216\u4e24\u4e2a&quot;.&quot;\u7b26\u53f7\u3002</li>\n\t<li>\u8f93\u5165\u4e2d\u4efb\u610f\u4e00\u4e2a\u57df\u540d\u7684\u8bbf\u95ee\u6b21\u6570\u90fd\u5c0f\u4e8e<code>10000</code>\u3002</li>\n</ul>\n"}}}]);
//# sourceMappingURL=sourceCode-content808.a32b9b4c.chunk.js.map