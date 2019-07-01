(window.webpackJsonp=window.webpackJsonp||[]).push([[379],{452:function(s){s.exports={code:['<pre class="hljs"><code><span class="hljs-comment">/**\n * Initialize your data structure here.\n */</span>\n<span class="hljs-keyword">var</span> Twitter = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{\n  <span class="hljs-keyword">this</span>.userFollows = {}\n  <span class="hljs-keyword">this</span>.time = <span class="hljs-number">1</span>\n  <span class="hljs-keyword">this</span>.userPosts = {}\n};\n\n<span class="hljs-comment">/**\n * Compose a new tweet.\n * @param {number} userId\n * @param {number} tweetId\n * @return {void}\n */</span>\nTwitter.prototype.postTweet = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">userId, tweetId</span>) </span>{\n  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.userPosts[userId] == <span class="hljs-literal">null</span>)\n    <span class="hljs-keyword">this</span>.userPosts[userId] = [[tweetId, <span class="hljs-keyword">this</span>.time++]]\n  <span class="hljs-keyword">else</span>\n    <span class="hljs-keyword">this</span>.userPosts[userId].unshift([tweetId, <span class="hljs-keyword">this</span>.time++])\n};\n\n<span class="hljs-comment">/**\n * Retrieve the 10 most recent tweet ids in the user\'s news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent.\n * @param {number} userId\n * @return {number[]}\n */</span>\nTwitter.prototype.getNewsFeed = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">userId</span>) </span>{\n  <span class="hljs-keyword">let</span> candidates = []\n  candidates.push(userId)\n  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.userFollows[userId]) {\n    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> c <span class="hljs-keyword">of</span> <span class="hljs-keyword">this</span>.userFollows[userId]) candidates.push(c)\n  }\n\n  <span class="hljs-comment">// \u591a\u6307\u9488\u67e5\u627e\u6700\u8fd1\u7684post</span>\n  <span class="hljs-keyword">let</span> idx = <span class="hljs-built_in">Array</span>(candidates.length).fill(<span class="hljs-number">0</span>)\n  <span class="hljs-keyword">let</span> res = [], k = <span class="hljs-number">10</span>\n  <span class="hljs-keyword">while</span> (k-- &gt; <span class="hljs-number">0</span>) {\n    <span class="hljs-keyword">let</span> recent = [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>], recentID = <span class="hljs-literal">null</span>, noMorePosts = <span class="hljs-literal">true</span>\n    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; candidates.length; i++) {\n      <span class="hljs-keyword">let</span> id = idx[i], uid = candidates[i]\n      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.userPosts[uid]) <span class="hljs-keyword">continue</span>\n      <span class="hljs-keyword">if</span> (id &gt;= <span class="hljs-keyword">this</span>.userPosts[uid].length) <span class="hljs-keyword">continue</span>\n      noMorePosts = <span class="hljs-literal">false</span>\n      <span class="hljs-keyword">let</span> curTweet = <span class="hljs-keyword">this</span>.userPosts[uid][id]\n      <span class="hljs-keyword">if</span> (curTweet[<span class="hljs-number">1</span>] &gt; recent[<span class="hljs-number">1</span>]) {\n        recent = curTweet\n        recentID = i\n      }\n    }\n    <span class="hljs-keyword">if</span> (noMorePosts) <span class="hljs-keyword">break</span>\n    idx[recentID]++\n    res.push(recent[<span class="hljs-number">0</span>])\n  }\n  <span class="hljs-keyword">return</span> res\n};\n\n<span class="hljs-comment">/**\n * Follower follows a followee. If the operation is invalid, it should be a no-op.\n * @param {number} followerId\n * @param {number} followeeId\n * @return {void}\n */</span>\nTwitter.prototype.follow = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">followerId, followeeId</span>) </span>{\n  <span class="hljs-keyword">if</span> (followerId === followeeId) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>\n  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.userFollows[followerId] == <span class="hljs-literal">null</span>) <span class="hljs-keyword">this</span>.userFollows[followerId] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>()\n  <span class="hljs-keyword">this</span>.userFollows[followerId].add(followeeId)\n};\n\n<span class="hljs-comment">/**\n * Follower unfollows a followee. If the operation is invalid, it should be a no-op.\n * @param {number} followerId\n * @param {number} followeeId\n * @return {void}\n */</span>\nTwitter.prototype.unfollow = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">followerId, followeeId</span>) </span>{\n  <span class="hljs-keyword">if</span> (followerId === followeeId) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>\n  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.userFollows[followerId] == <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>\n  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.userFollows[followerId].has(followeeId)) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>\n  <span class="hljs-keyword">this</span>.userFollows[followerId].delete(followeeId)\n\n};\n\n<span class="hljs-comment">/**\n * Your Twitter object will be instantiated and called as such:\n * var obj = Object.create(Twitter).createNew()\n * obj.postTweet(userId,tweetId)\n * var param_2 = obj.getNewsFeed(userId)\n * obj.follow(followerId,followeeId)\n * obj.unfollow(followerId,followeeId)\n */</span>\n</code></pre>\n'],titleSlug:"design-twitter",hasThinking:!0,thinking:'<hr>\n<p>\u601d\u8def\uff1a</p>\n<ul>\n<li>\n<p><code>postTweet</code></p>\n<p>\u9898\u76ee\u7ed9\u51fa\u7684<code>tweetId</code>\u548c\u65f6\u95f4\u5e76\u6ca1\u6709\u5173\u7cfb\uff0c\u56e0\u6b64\u6211\u4eec\u9700\u8981\u81ea\u5b9a\u4e49\u4e00\u4e2a\u65f6\u95f4id<code>timeId</code>\uff0c\u8fd9\u4e2a<code>timeId</code>\u662f\u552f\u4e00\u7684\uff0c\u9012\u589e\u7684\u3002</p>\n<p>\u63a5\u7740\u5c06<code>[tweetId,timeId]</code>\u5b58\u5165\u5bf9\u5e94\u7684<code>userId</code>\u4e2d\uff0c\u4fdd\u8bc1\u6bcf\u4e00\u4e2a\u6570\u7ec4\u5185\u90e8<code>timeId</code>\u662f\u9012\u51cf\u7684\u3002</p>\n<p>\u7ed3\u6784\u5982\u4e0b\uff1a</p>\n<pre class="hljs"><code>{\n  userId_1:[[tweetId_5,timeId_5],[tweetId_1,timeId_1]],\n  userId_2:[[tweetId_2,timeId_4]],\n  userId_7:[[tweetId_98,timeId_3],[tweetId_17,timeId_2]],\n  ...\n}\n</code></pre>\n</li>\n<li>\n<p><code>getNewsFeed</code></p>\n<p>\u53ef\u4ee5\u53c2\u8003<code>Leetcode NO.313-\u8d85\u7ea7\u4e11\u6570</code>\u7684\u591a\u6307\u9488\u7b97\u6cd5\uff0c\u7b5b\u9009\u51fa<code>10</code>\u4e2a<code>timeId</code>\u6700\u5927\u7684\u3002</p>\n<p>\u6ce8\u610f\uff1a</p>\n<ul>\n<li>\u8981\u8fdb\u884c\u83b7\u53d6\u7684<code>userId</code>\u4e2d\uff0c\u9664\u4e86\u5173\u6ce8\u7684\u4eba\uff0c\u8fd8\u6709\u81ea\u5df1\u3002</li>\n<li>\u4e00\u65e6\u6240\u6709\u7684<code>post</code>\u5df2\u7ecf\u83b7\u53d6\u5b8c\u6bd5\uff0c\u5373\u4f7f\u4e0d\u8db310\u4e2a\uff0c\u7acb\u523b<code>break</code>\u3002</li>\n</ul>\n</li>\n<li>\n<p><code>follow</code>\u548c<code>unfollow</code></p>\n<p>\u6bd4\u8f83\u7b80\u5355\u4e86\uff0c2\u4e2a\u6ce8\u610f\u7684\u5730\u65b9\uff1a</p>\n<ol>\n<li>\u4e0d\u80fd\u5173\u6ce8\u81ea\u5df1\uff0c\u4e0d\u80fd\u53d6\u5173\u81ea\u5df1\u3002</li>\n<li>\u4e0d\u80fd\u53d6\u5173\u672a\u5173\u6ce8\u7684\u4eba\u3002</li>\n</ol>\n</li>\n</ul>\n',content:"<p>\u8bbe\u8ba1\u4e00\u4e2a\u7b80\u5316\u7248\u7684\u63a8\u7279(Twitter)\uff0c\u53ef\u4ee5\u8ba9\u7528\u6237\u5b9e\u73b0\u53d1\u9001\u63a8\u6587\uff0c\u5173\u6ce8/\u53d6\u6d88\u5173\u6ce8\u5176\u4ed6\u7528\u6237\uff0c\u80fd\u591f\u770b\u89c1\u5173\u6ce8\u4eba\uff08\u5305\u62ec\u81ea\u5df1\uff09\u7684\u6700\u8fd1\u5341\u6761\u63a8\u6587\u3002\u4f60\u7684\u8bbe\u8ba1\u9700\u8981\u652f\u6301\u4ee5\u4e0b\u7684\u51e0\u4e2a\u529f\u80fd\uff1a</p>\n\n<ol>\n\t<li><strong>postTweet(userId, tweetId)</strong>: \u521b\u5efa\u4e00\u6761\u65b0\u7684\u63a8\u6587</li>\n\t<li><strong>getNewsFeed(userId)</strong>: \u68c0\u7d22\u6700\u8fd1\u7684\u5341\u6761\u63a8\u6587\u3002\u6bcf\u4e2a\u63a8\u6587\u90fd\u5fc5\u987b\u662f\u7531\u6b64\u7528\u6237\u5173\u6ce8\u7684\u4eba\u6216\u8005\u662f\u7528\u6237\u81ea\u5df1\u53d1\u51fa\u7684\u3002\u63a8\u6587\u5fc5\u987b\u6309\u7167\u65f6\u95f4\u987a\u5e8f\u7531\u6700\u8fd1\u7684\u5f00\u59cb\u6392\u5e8f\u3002</li>\n\t<li><strong>follow(followerId, followeeId)</strong>: \u5173\u6ce8\u4e00\u4e2a\u7528\u6237</li>\n\t<li><strong>unfollow(followerId, followeeId)</strong>: \u53d6\u6d88\u5173\u6ce8\u4e00\u4e2a\u7528\u6237</li>\n</ol>\n\n<p><strong>\u793a\u4f8b:</strong></p>\n\n<pre>\nTwitter twitter = new Twitter();\n\n// \u7528\u62371\u53d1\u9001\u4e86\u4e00\u6761\u65b0\u63a8\u6587 (\u7528\u6237id = 1, \u63a8\u6587id = 5).\ntwitter.postTweet(1, 5);\n\n// \u7528\u62371\u7684\u83b7\u53d6\u63a8\u6587\u5e94\u5f53\u8fd4\u56de\u4e00\u4e2a\u5217\u8868\uff0c\u5176\u4e2d\u5305\u542b\u4e00\u4e2aid\u4e3a5\u7684\u63a8\u6587.\ntwitter.getNewsFeed(1);\n\n// \u7528\u62371\u5173\u6ce8\u4e86\u7528\u62372.\ntwitter.follow(1, 2);\n\n// \u7528\u62372\u53d1\u9001\u4e86\u4e00\u4e2a\u65b0\u63a8\u6587 (\u63a8\u6587id = 6).\ntwitter.postTweet(2, 6);\n\n// \u7528\u62371\u7684\u83b7\u53d6\u63a8\u6587\u5e94\u5f53\u8fd4\u56de\u4e00\u4e2a\u5217\u8868\uff0c\u5176\u4e2d\u5305\u542b\u4e24\u4e2a\u63a8\u6587\uff0cid\u5206\u522b\u4e3a -&gt; [6, 5].\n// \u63a8\u6587id6\u5e94\u5f53\u5728\u63a8\u6587id5\u4e4b\u524d\uff0c\u56e0\u4e3a\u5b83\u662f\u57285\u4e4b\u540e\u53d1\u9001\u7684.\ntwitter.getNewsFeed(1);\n\n// \u7528\u62371\u53d6\u6d88\u5173\u6ce8\u4e86\u7528\u62372.\ntwitter.unfollow(1, 2);\n\n// \u7528\u62371\u7684\u83b7\u53d6\u63a8\u6587\u5e94\u5f53\u8fd4\u56de\u4e00\u4e2a\u5217\u8868\uff0c\u5176\u4e2d\u5305\u542b\u4e00\u4e2aid\u4e3a5\u7684\u63a8\u6587.\n// \u56e0\u4e3a\u7528\u62371\u5df2\u7ecf\u4e0d\u518d\u5173\u6ce8\u7528\u62372.\ntwitter.getNewsFeed(1);\n</pre>\n"}}}]);
//# sourceMappingURL=sourceCode-content417.ab848ca1.chunk.js.map