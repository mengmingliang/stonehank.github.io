(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{1159:function(e){e.exports={content:'<h4>\u76d1\u542c\u7f51\u9875\u8bfb\u53d6\u72b6\u51b5\u4f7f\u7528</h4>\n<p><code>DOMContentLoaded</code>\u548c<code>window.onload</code></p>\n<p>\u76d1\u542c\u7f51\u9875\u5c55\u793a\u72b6\u51b5\uff0c\u53ef\u4ee5\u8c03\u7528\u4e00\u7cfb\u5217<code>Page LIfecycle</code>API</p>\n<h4>\u751f\u547d\u5468\u671f\uff1a</h4>\n<p><img src="https://raw.githubusercontent.com/WICG/page-lifecycle/master/LifecycleStates.png" alt=""></p>\n<ul>\n<li><code>Active</code>\uff1a\u7f51\u9875\u53ef\u89c1\u5e76\u4e14\u63a5\u53d7\u8f93\u5165\uff0c\u4f8b\u5982\u6eda\u52a8\uff0c\u952e\u5165\u5b57\u7b26</li>\n<li><code>Passive</code>\uff1a\u7f51\u9875\u53ef\u89c1\u5e76\u4e14\u4e0d\u63a5\u53d7\u8f93\u5165\uff0cUI\u6267\u884c\uff0c\u4f8b\u5982\u6b63\u5728console\u5e73\u53f0\u952e\u5165</li>\n<li><code>Hidden</code>\uff1a\u7f51\u9875\u4e0d\u53ef\u89c1\uff0cUI\u4e0d\u6267\u884c</li>\n<li><code>Terminated</code>\uff1a\u7528\u6237\u4e3b\u52a8\u5173\u95ed\u9875\u9762\uff0c\u4e5f\u6709\u53ef\u80fd\u4eceFrozen\u72b6\u6001\u76f4\u63a5\u7ed3\u675f\u3002</li>\n<li><code>Frozen</code>\uff1a\u7528\u6237\u672a\u5173\u95ed\u9875\u9762\uff0c\u9875\u9762\u957f\u65f6\u95f4\u672a\u4f7f\u7528\u88ab\u51bb\u7ed3\uff0c\u7f51\u9875\u4e0d\u4f1a\u518d\u88ab\u5206\u914d CPU \u8ba1\u7b97\u8d44\u6e90(\u5c0f\u90e8\u5206\u4efb\u52a1\u7ee7\u7eed\u8fd0\u884c)\u3002</li>\n<li><code>Discarded</code>\uff1a\u7f51\u9875\u957f\u65f6\u95f4\u51bb\u7ed3\uff0c\u5378\u8f7d\u7f51\u9875\uff0c\u6e05\u9664\u5360\u7528\u5185\u5b58\uff0c\u518d\u6b21\u8fdb\u5165\u4f1a\u91cd\u65b0\u52a0\u8f7d\u3002(\u5f53tab\u8fc7\u591a\uff0c\u5bb9\u6613\u51fa\u73b0\u8fd9\u79cd\u60c5\u51b5)</li>\n</ul>\n<h4>\u4e8b\u4ef6\uff1a</h4>\n<ul>\n<li>\n<p>focus</p>\n</li>\n<li>\n<p>blur</p>\n</li>\n<li>\n<p>visibilitychange : \u5f53\u9875\u9762\u53ef\u89c1\u72b6\u6001\u53d1\u751f\u53d8\u5316\uff0c\u4f8b\u5982\uff0c\u6700\u5c0f\u5316\uff0c\u5207\u6362tab\uff0c\u5173\u95edtab\u7b49</p>\n</li>\n<li>\n<p>freeze : chrome 68\u65b0\u589e\uff0c\u5f53\u9875\u9762\u8f6c\u4e3a<code>Frozen</code>\u65f6\u89e6\u53d1\u3002</p>\n</li>\n<li>\n<p>resume : chrome 68\u65b0\u589e\uff0c\u5f53\u9875\u9762\u79bb\u5f00<code>Frozen</code>\u5e76\u4e14\u4e0d\u662f\u5173\u95ed\u65f6\u89e6\u53d1\u3002</p>\n</li>\n<li>\n<p>pageshow</p>\n<blockquote>\n<p><code>pageshow</code>\u4e8b\u4ef6\u5728\u7528\u6237\u52a0\u8f7d\u7f51\u9875\u65f6\u89e6\u53d1\u3002\u8fd9\u65f6\uff0c\u6709\u53ef\u80fd\u662f\u5168\u65b0\u7684\u9875\u9762\u52a0\u8f7d\uff0c\u4e5f\u53ef\u80fd\u662f\u4ece\u7f13\u5b58\u4e2d\u83b7\u53d6\u7684\u9875\u9762\u3002\n\u5982\u679c\u662f\u4ece\u7f13\u5b58\u4e2d\u83b7\u53d6\uff0c\u5219\u8be5\u4e8b\u4ef6\u5bf9\u8c61\u7684<code>event.persisted</code>\u5c5e\u6027\u4e3atrue\uff0c\u5426\u5219\u4e3afalse\u3002</p>\n</blockquote>\n<blockquote>\n<p>\u8fd9\u4e2a\u4e8b\u4ef6\u7684\u540d\u5b57\u6709\u70b9\u8bef\u5bfc\uff0c\u5b83\u8ddf\u9875\u9762\u7684\u53ef\u89c1\u6027\u5176\u5b9e\u6beb\u65e0\u5173\u7cfb\uff0c\u53ea\u8ddf\u6d4f\u89c8\u5668\u7684 History \u8bb0\u5f55\u7684\u53d8\u5316\u6709\u5173\u3002</p>\n</blockquote>\n</li>\n<li>\n<p>pagehide</p>\n<blockquote>\n<p><code>pagehide</code>\u4e8b\u4ef6\u5728\u7528\u6237\u79bb\u5f00\u5f53\u524d\u7f51\u9875\u3001\u8fdb\u5165\u53e6\u4e00\u4e2a\u7f51\u9875\u65f6\u89e6\u53d1\u3002\u5b83\u7684\u524d\u63d0\u662f\u6d4f\u89c8\u5668\u7684 History \u8bb0\u5f55\u5fc5\u987b\u53d1\u751f\u53d8\u5316\uff0c\u8ddf\u7f51\u9875\u662f\u5426\u53ef\u89c1\u65e0\u5173\u3002</p>\n</blockquote>\n<blockquote>\n<p>\u5982\u679c\u6d4f\u89c8\u5668\u80fd\u591f\u5c06\u5f53\u524d\u9875\u9762\u6dfb\u52a0\u5230\u7f13\u5b58\u4ee5\u4f9b\u7a0d\u540e\u91cd\u7528\uff0c\u5219\u4e8b\u4ef6\u5bf9\u8c61\u7684<code>event.persisted</code>\u5c5e\u6027\u4e3atrue\u3002 \u5982\u679c\u4e3atrue\u3002\u5982\u679c\u9875\u9762\u6dfb\u52a0\u5230\u4e86\u7f13\u5b58\uff0c\u5219\u9875\u9762\u8fdb\u5165 Frozen \u72b6\u6001\uff0c\u5426\u5219\u8fdb\u5165 Terminatied \u72b6\u6001\u3002</p>\n</blockquote>\n</li>\n<li>\n<p>unload</p>\n</li>\n<li>\n<p>beforeunload : \u901a\u8fc7\u8bbe\u7f6e<code>event.returnValue</code>\u5728\u9000\u51fa\u7f51\u9875\u65f6\u63d0\u793a\u3002</p>\n</li>\n</ul>\n<h4>\u5c5e\u6027\uff1a</h4>\n<p><code>document.visibilityState</code>\uff1a\u83b7\u53d6\u5f53\u524d\u9875\u9762\u53ef\u89c1\u72b6\u6001<code>visible</code>,<code>hidden</code>\u3002\n<code>document.wasDiscarded</code>\uff1a\u5224\u65ad\u7f51\u9875\u662f\u5426\u7ecf\u8fc7<code>Discarded</code>\u9636\u6bb5\u3002</p>\n<hr>\n<p>demo:<a href="https://page-lifecycle.glitch.me/">https://page-lifecycle.glitch.me/</a></p>\n<p>\u53c2\u8003\uff1a</p>\n<ul>\n<li><a href="http://www.ruanyifeng.com/blog/2018/11/page_lifecycle_api.html">Page Lifecycle API \u6559\u7a0b</a></li>\n<li><a href="https://github.com/WICG/page-lifecycle">page lifecycle</a></li>\n</ul>\n'}}}]);
//# sourceMappingURL=sourceCode-content109.aa6893d4.chunk.js.map