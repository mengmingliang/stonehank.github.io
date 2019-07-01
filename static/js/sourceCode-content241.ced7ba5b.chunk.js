(window.webpackJsonp=window.webpackJsonp||[]).push([[184],{276:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * @param {string} beginWord\n * @param {string} endWord\n * @param {string[]} wordList\n * @return {number}\n */</span>\n<span class="hljs-keyword">var</span> ladderLength = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">beginWord, endWord, wordList</span>) </span>{\n  <span class="hljs-comment">// bfs</span>\n  <span class="hljs-comment">// if(!wordList.includes(endWord))return 0</span>\n  <span class="hljs-comment">// wordList.push(beginWord)</span>\n  <span class="hljs-comment">// let steps=Array(wordList.length).fill(Infinity)</span>\n  <span class="hljs-comment">// let arr=[endWord],aux=[]</span>\n  <span class="hljs-comment">// let stepCount=0</span>\n  <span class="hljs-comment">// while(arr.length&gt;0){</span>\n  <span class="hljs-comment">//   stepCount++</span>\n  <span class="hljs-comment">//   for(let i=0;i&lt;arr.length;i++){</span>\n  <span class="hljs-comment">//     let cur=arr[i]</span>\n  <span class="hljs-comment">//     for(let j=0;j&lt;wordList.length;j++){</span>\n  <span class="hljs-comment">//       if(cur===wordList[j])continue</span>\n  <span class="hljs-comment">//       let res=checkSteps(cur,wordList[j])</span>\n  <span class="hljs-comment">//       if(res &amp;&amp; steps[j]&gt;1){</span>\n  <span class="hljs-comment">//         if(wordList[j]===beginWord)return stepCount+1</span>\n  <span class="hljs-comment">//         aux.push(wordList[j])</span>\n  <span class="hljs-comment">//         steps[j]=1</span>\n  <span class="hljs-comment">//       }</span>\n  <span class="hljs-comment">//     }</span>\n  <span class="hljs-comment">//   }</span>\n  <span class="hljs-comment">//   arr=aux</span>\n  <span class="hljs-comment">//   aux=[]</span>\n  <span class="hljs-comment">// }</span>\n  <span class="hljs-comment">// return 0</span>\n  <span class="hljs-comment">// function checkSteps(s1,s2){</span>\n  <span class="hljs-comment">//   let diff=0</span>\n  <span class="hljs-comment">//   for(let i=0;i&lt;s1.length;i++){</span>\n  <span class="hljs-comment">//     if(s1[i]!==s2[i])diff++</span>\n  <span class="hljs-comment">//     if(diff&gt;1)return false</span>\n  <span class="hljs-comment">//   }</span>\n  <span class="hljs-comment">//   return true</span>\n  <span class="hljs-comment">// }</span>\n  \n  <span class="hljs-comment">// bfs2</span>\n  <span class="hljs-keyword">let</span> hash=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>()\n  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> word <span class="hljs-keyword">of</span> wordList)hash.set(word,<span class="hljs-literal">true</span>)\n  <span class="hljs-keyword">if</span>(!hash.has(endWord))<span class="hljs-keyword">return</span> <span class="hljs-number">0</span>\n  <span class="hljs-keyword">let</span> arr=[beginWord]\n  <span class="hljs-keyword">let</span> step=<span class="hljs-number">0</span>\n  <span class="hljs-keyword">while</span>(arr.length&gt;<span class="hljs-number">0</span>){\n    step++\n    <span class="hljs-keyword">let</span> len=arr.length\n    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;len;i++){\n      <span class="hljs-keyword">let</span> cur=arr.shift()\n      <span class="hljs-keyword">let</span> newStr=<span class="hljs-string">\'\'</span>\n      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j=<span class="hljs-number">0</span>;j&lt;cur.length;j++){\n        <span class="hljs-keyword">let</span> l=cur.substring(<span class="hljs-number">0</span>,j),r=cur.substring(j+<span class="hljs-number">1</span>)\n        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> k=<span class="hljs-number">0</span>;k&lt;<span class="hljs-number">26</span>;k++){\n          newStr=l+<span class="hljs-built_in">String</span>.fromCharCode(k+<span class="hljs-number">97</span>)+r\n          <span class="hljs-keyword">if</span>(hash.has(newStr)){\n            <span class="hljs-keyword">if</span>(newStr===endWord)<span class="hljs-keyword">return</span> step+<span class="hljs-number">1</span>\n            arr.push(newStr)\n            hash.delete(newStr)\n          }\n        }\n      }\n    }\n  }\n  <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>\n};\n</code></pre>\n'],titleSlug:"word-ladder",hasThinking:!0,thinking:"<hr>\n<p>\u601d\u8def\uff1a</p>\n<p><code>BFS</code>\u3002</p>\n<p>\u601d\u8def\u4e00\uff1a</p>\n<p>\u9996\u5148\u5c06<code>startWord</code>\u6dfb\u52a0\u5230<code>arr</code>\u4e2d\uff0c\u5bf9<code>arr</code>\u5185\u90e8\u7684\u6bcf\u4e2a\u5b57\u7b26\u4e32\uff0c\u4ece<code>wordList</code>\u627e\u51fa\u4e0e\u5b83\u53ea\u76f8\u5dee<code>1</code>\u4e2a\u5b57\u6bcd\u7684\u5b57\u7b26\u4e32\uff0c\u6dfb\u52a0\u5230<code>arr</code>\u4e2d\u3002</p>\n<p>\u601d\u8def\u4e8c\uff1a</p>\n<p>\u540c\u6837\u5c06<code>startWord</code>\u6dfb\u52a0\u5230<code>arr</code>\u4e2d\uff0c\u5bf9<code>arr</code>\u5185\u90e8\u7684\u6bcf\u4e2a\u5b57\u7b26\u4e32\u7684\u6bcf\u4e2a\u5b57\u6bcd\uff0c\u4e0d\u65ad\u66ff\u6362\u5b83\u4e3a\u53e6\u5916\u7684\u5176\u4ed6<code>25</code>\u4e2a\u5b57\u6bcd\uff0c\n\u7136\u540e\u67e5\u770b<code>hash</code>(wordList)\u4e2d\u662f\u5426\u5b58\u5728\uff0c\u5982\u679c\u5b58\u5728\uff0c\u6dfb\u52a0\u5230<code>arr</code>\u5e76\u4e14\u5220\u9664\u5f53\u524d\u5b57\u7b26\u4e32\u7684<code>hash</code>\uff0c\u56e0\u4e3a\u4e0d\u9700\u8981\u518d\u6b21\u4f7f\u7528\u3002</p>\n<p>\u6ce8\u610f\uff1a</p>\n<p><code>\u601d\u8def\u4e00</code>\u7684\u7f3a\u9677\u5c31\u662f\u5982\u679c<code>wordList</code>\u8fc7\u5927\uff0c\u76f8\u5bf9\u7684\u6bcf\u6b21\u67e5\u627e\u76f8\u5dee<code>1</code>\u5b57\u6bcd\u7684\u65f6\u95f4\u4e5f\u540c\u6837\u589e\u52a0\uff1b</p>\n<p><code>\u601d\u8def\u4e8c</code>\u4e0d\u9700\u8981\u8003\u8651<code>wordList</code>\u7684\u957f\u5ea6\uff0c\u4f46\u5b83\u7684\u7f3a\u9677\u5728\u4e8e\u6bcf\u4e00\u4e2a\u5b57\u7b26\u90fd\u8981\u66ff\u6362<code>26</code>\u6b21\uff0c\u56e0\u6b64\u5982\u679c\u6bcf\u4e00\u4e2a\u5b57\u7b26\u4e32\u7684\u957f\u5ea6\u8fc7\u957f\uff0c\u540c\u6837\u4f1a\u51fa\u73b0\u6027\u80fd\u95ee\u9898\u3002</p>\n",content:"<p>\u7ed9\u5b9a\u4e24\u4e2a\u5355\u8bcd\uff08<em>beginWord&nbsp;</em>\u548c <em>endWord</em>\uff09\u548c\u4e00\u4e2a\u5b57\u5178\uff0c\u627e\u5230\u4ece&nbsp;<em>beginWord</em> \u5230&nbsp;<em>endWord</em> \u7684\u6700\u77ed\u8f6c\u6362\u5e8f\u5217\u7684\u957f\u5ea6\u3002\u8f6c\u6362\u9700\u9075\u5faa\u5982\u4e0b\u89c4\u5219\uff1a</p>\n\n<ol>\n\t<li>\u6bcf\u6b21\u8f6c\u6362\u53ea\u80fd\u6539\u53d8\u4e00\u4e2a\u5b57\u6bcd\u3002</li>\n\t<li>\u8f6c\u6362\u8fc7\u7a0b\u4e2d\u7684\u4e2d\u95f4\u5355\u8bcd\u5fc5\u987b\u662f\u5b57\u5178\u4e2d\u7684\u5355\u8bcd\u3002</li>\n</ol>\n\n<p><strong>\u8bf4\u660e:</strong></p>\n\n<ul>\n\t<li>\u5982\u679c\u4e0d\u5b58\u5728\u8fd9\u6837\u7684\u8f6c\u6362\u5e8f\u5217\uff0c\u8fd4\u56de 0\u3002</li>\n\t<li>\u6240\u6709\u5355\u8bcd\u5177\u6709\u76f8\u540c\u7684\u957f\u5ea6\u3002</li>\n\t<li>\u6240\u6709\u5355\u8bcd\u53ea\u7531\u5c0f\u5199\u5b57\u6bcd\u7ec4\u6210\u3002</li>\n\t<li>\u5b57\u5178\u4e2d\u4e0d\u5b58\u5728\u91cd\u590d\u7684\u5355\u8bcd\u3002</li>\n\t<li>\u4f60\u53ef\u4ee5\u5047\u8bbe <em>beginWord</em> \u548c <em>endWord </em>\u662f\u975e\u7a7a\u7684\uff0c\u4e14\u4e8c\u8005\u4e0d\u76f8\u540c\u3002</li>\n</ul>\n\n<p><strong>\u793a\u4f8b&nbsp;1:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong>\nbeginWord = &quot;hit&quot;,\nendWord = &quot;cog&quot;,\nwordList = [&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;lot&quot;,&quot;log&quot;,&quot;cog&quot;]\n\n<strong>\u8f93\u51fa: </strong>5\n\n<strong>\u89e3\u91ca: </strong>\u4e00\u4e2a\u6700\u77ed\u8f6c\u6362\u5e8f\u5217\u662f &quot;hit&quot; -&gt; &quot;hot&quot; -&gt; &quot;dot&quot; -&gt; &quot;dog&quot; -&gt; &quot;cog&quot;,\n     \u8fd4\u56de\u5b83\u7684\u957f\u5ea6 5\u3002\n</pre>\n\n<p><strong>\u793a\u4f8b 2:</strong></p>\n\n<pre><strong>\u8f93\u5165:</strong>\nbeginWord = &quot;hit&quot;\nendWord = &quot;cog&quot;\nwordList = [&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;lot&quot;,&quot;log&quot;]\n\n<strong>\u8f93\u51fa:</strong>&nbsp;0\n\n<strong>\u89e3\u91ca:</strong>&nbsp;<em>endWord</em> &quot;cog&quot; \u4e0d\u5728\u5b57\u5178\u4e2d\uff0c\u6240\u4ee5\u65e0\u6cd5\u8fdb\u884c\u8f6c\u6362\u3002</pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content241.ced7ba5b.chunk.js.map