(window.webpackJsonp=window.webpackJsonp||[]).push([[183],{275:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {string} beginWord\n * @param {string} endWord\n * @param {string[]} wordList\n * @return {string[][]}\n */</span>\n<span class="hljs-keyword">var</span> findLadders = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">beginWord, endWord, wordList</span>) </span>{\n  <span class="hljs-keyword">let</span> hash=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>()\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;wordList.length;i++){\n    hash.set(wordList[i],i)\n  }\n  <span class="hljs-keyword">let</span> mem=<span class="hljs-built_in">Array</span>(wordList.length).fill(<span class="hljs-literal">false</span>)\n  <span class="hljs-keyword">let</span> temp=<span class="hljs-built_in">Array</span>(wordList.length).fill(<span class="hljs-literal">false</span>)\n  <span class="hljs-keyword">let</span> arr=[[beginWord,beginWord]]\n  <span class="hljs-keyword">let</span> reach=<span class="hljs-literal">false</span>\n  <span class="hljs-keyword">while</span>(arr.length&gt;<span class="hljs-number">0</span>){\n    <span class="hljs-keyword">let</span> len=arr.length\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;len;i++){\n      <span class="hljs-keyword">let</span> [cur,str]=arr.shift()\n      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;j&lt;cur.length;j++){\n        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> k=<span class="hljs-number">0</span>;k&lt;<span class="hljs-number">26</span>;k++){\n          <span class="hljs-keyword">let</span> repl=<span class="hljs-built_in">String</span>.fromCharCode(k+<span class="hljs-number">97</span>)\n          <span class="hljs-keyword">if</span>(repl===cur[j])<span class="hljs-keyword">continue</span>\n          <span class="hljs-keyword">let</span> newS=cur.substring(<span class="hljs-number">0</span>,j)+repl+cur.substring(j+<span class="hljs-number">1</span>)\n          <span class="hljs-keyword">if</span>(hash.has(newS)){\n            <span class="hljs-keyword">let</span> id=hash.get(newS)\n            <span class="hljs-keyword">if</span>(mem[id])<span class="hljs-keyword">continue</span>\n            <span class="hljs-keyword">if</span>(newS===endWord)reach=<span class="hljs-literal">true</span>\n            arr.push([newS,str+<span class="hljs-string">\'-\'</span>+newS])\n            temp[id]=<span class="hljs-literal">true</span>\n          }\n        }\n      }\n    }\n    mem=temp.slice()\n    <span class="hljs-keyword">if</span>(reach)<span class="hljs-keyword">break</span>\n  }\n  <span class="hljs-keyword">let</span> result=[]\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;arr.length;i++){\n    <span class="hljs-keyword">if</span>(arr[i][<span class="hljs-number">0</span>]===endWord) \n      result.push(arr[i][<span class="hljs-number">1</span>].split(<span class="hljs-string">\'-\'</span>))\n  }\n  <span class="hljs-keyword">return</span> result\n};\n</code></pre>\n'],titleSlug:"word-ladder-ii",hasThinking:!1,content:"<p>\u7ed9\u5b9a\u4e24\u4e2a\u5355\u8bcd\uff08<em>beginWord</em> \u548c <em>endWord</em>\uff09\u548c\u4e00\u4e2a\u5b57\u5178 <em>wordList</em>\uff0c\u627e\u51fa\u6240\u6709\u4ece <em>beginWord </em>\u5230 <em>endWord </em>\u7684\u6700\u77ed\u8f6c\u6362\u5e8f\u5217\u3002\u8f6c\u6362\u9700\u9075\u5faa\u5982\u4e0b\u89c4\u5219\uff1a</p>\n\n<ol>\n\t<li>\u6bcf\u6b21\u8f6c\u6362\u53ea\u80fd\u6539\u53d8\u4e00\u4e2a\u5b57\u6bcd\u3002</li>\n\t<li>\u8f6c\u6362\u8fc7\u7a0b\u4e2d\u7684\u4e2d\u95f4\u5355\u8bcd\u5fc5\u987b\u662f\u5b57\u5178\u4e2d\u7684\u5355\u8bcd\u3002</li>\n</ol>\n\n<p><strong>\u8bf4\u660e:</strong></p>\n\n<ul>\n\t<li>\u5982\u679c\u4e0d\u5b58\u5728\u8fd9\u6837\u7684\u8f6c\u6362\u5e8f\u5217\uff0c\u8fd4\u56de\u4e00\u4e2a\u7a7a\u5217\u8868\u3002</li>\n\t<li>\u6240\u6709\u5355\u8bcd\u5177\u6709\u76f8\u540c\u7684\u957f\u5ea6\u3002</li>\n\t<li>\u6240\u6709\u5355\u8bcd\u53ea\u7531\u5c0f\u5199\u5b57\u6bcd\u7ec4\u6210\u3002</li>\n\t<li>\u5b57\u5178\u4e2d\u4e0d\u5b58\u5728\u91cd\u590d\u7684\u5355\u8bcd\u3002</li>\n\t<li>\u4f60\u53ef\u4ee5\u5047\u8bbe <em>beginWord</em> \u548c <em>endWord </em>\u662f\u975e\u7a7a\u7684\uff0c\u4e14\u4e8c\u8005\u4e0d\u76f8\u540c\u3002</li>\n</ul>\n\n<p><strong>\u793a\u4f8b 1:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong>\nbeginWord = &quot;hit&quot;,\nendWord = &quot;cog&quot;,\nwordList = [&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;lot&quot;,&quot;log&quot;,&quot;cog&quot;]\n\n<strong>\u8f93\u51fa:</strong>\n[\n  [&quot;hit&quot;,&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;cog&quot;],\n&nbsp; [&quot;hit&quot;,&quot;hot&quot;,&quot;lot&quot;,&quot;log&quot;,&quot;cog&quot;]\n]\n</pre>\n\n<p><strong>\u793a\u4f8b 2:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong>\nbeginWord = &quot;hit&quot;\nendWord = &quot;cog&quot;\nwordList = [&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;lot&quot;,&quot;log&quot;]\n\n<strong>\u8f93\u51fa: </strong>[]\n\n<strong>\u89e3\u91ca:</strong>&nbsp;<em>endWord</em> &quot;cog&quot; \u4e0d\u5728\u5b57\u5178\u4e2d\uff0c\u6240\u4ee5\u4e0d\u5b58\u5728\u7b26\u5408\u8981\u6c42\u7684\u8f6c\u6362\u5e8f\u5217\u3002</pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content240.3f481ab4.chunk.js.map