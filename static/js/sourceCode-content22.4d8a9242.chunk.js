(window.webpackJsonp=window.webpackJsonp||[]).push([[160],{1073:function(s){s.exports={content:'<p>\u672c\u6b21\u89e3\u6790\u5c06\u5206\u4e3a2\u7bc7\u6587\u7ae0\uff0c\u5f53\u524d\u662f\u7b2c\u4e8c\u7bc7\uff0c\u7b2c\u4e00\u7bc7\u5728<a href="./07-20-%E8%A7%A3%E6%9E%90anime%E6%A0%B8%E5%BF%83(1).md">\u8fd9\u91cc</a></p>\n<p>\u53e6\u5916\uff0c\u4e3a\u4e86\u80fd\u66f4\u597d\u7684\u7406\u89e3\u8fd9\u4e2a\u5e93\uff0c\u4e2a\u4eba\u5199\u4e86\u4e00\u4e2a\u6b64\u5e93\u7684\u538b\u7f29\u7248\uff0c\u5b9e\u73b0\u4e86\u6838\u5fc3\u7684\u529f\u80fd(\u4e3b\u8981\u4e5f\u662f\u4e3a\u4e86\u66f4\u597d\u7406\u89e3\u6838\u5fc3\u529f\u80fd)\uff0c\u5185\u5bb9\u66f4\u5c11\u65b9\u4fbf\u9605\u8bfb\uff0c\n\u5730\u5740\u5728<a href="https://github.com/stonehank/simplify-anime">\u8fd9\u91cc</a></p>\n<hr>\n<p>\u7ee7\u7eed\u4e0a\u4e00\u7bc7\uff0c\u5148\u628a\u7ed3\u6784\u56fe\u62c9\u8fc7\u6765\uff1a</p>\n<pre class="hljs"><code><span class="hljs-comment">// anime\u4e3b\u4f53</span>\n<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">anime</span>(<span class="hljs-params">params</span>)</span>{\n  \n  <span class="hljs-comment">// \u5b9a\u4e49instance \u4e5f\u662f\u6700\u7ec8\u8fd4\u56de\u503c</span>\n  <span class="hljs-keyword">let</span> instance = createNewInstance(params);\n  \n  <span class="hljs-comment">// \u5916\u90e8API \u4ece\u5f53\u524d\u4f4d\u7f6e\u5f00\u59cb\u6267\u884c\u52a8\u753b</span>\n  instance.play = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}\n  \n  <span class="hljs-comment">// \u914d\u7f6e startTime \u548c engineTime(\u5173\u952e)</span>\n   instance.tick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t</span>) </span>{}\n   \n  <span class="hljs-comment">// \u5bf9\u5f53\u524dengineTime\u8fdb\u884c\u5224\u65ad\uff0c\u786e\u5b9a\u52a8\u753b\u65b9\u6848(\u5173\u952e)</span>\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setInstanceProgress</span>(<span class="hljs-params">engineTime</span>) </span>{}\n  \n  <span class="hljs-comment">// \u8ba1\u7b97\u52a8\u753b\u5f53\u524d\u4f4d\u7f6e \u5e76\u4e14\u8d4b\u503c(\u5173\u952e)</span>\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setAnimationsProgress</span>(<span class="hljs-params">insTime</span>)</span>{}\n\n  <span class="hljs-comment">// \u76f4\u63a5\u8df3\u5230\u53c2\u6570time\u7684\u65f6\u95f4\u6240\u5728\u7684\u4f4d\u7f6e</span>\n  instance.seek = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">time</span>) </span>{}\n  <span class="hljs-comment">// \u5916\u90e8API \u6682\u505c</span>\n  instance.pause = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}\n  <span class="hljs-comment">// \u5916\u90e8API \u53cd\u8f6c</span>\n  instance.reverse = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}\n  <span class="hljs-comment">// \u5916\u90e8API reset</span>\n  instance.reset = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}\n  <span class="hljs-comment">// \u5916\u90e8API \u91cd\u65b0\u5f00\u59cb</span>\n  instance.restart = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}\n  <span class="hljs-comment">/*...*/</span>\n  <span class="hljs-keyword">return</span> instance\n}\n</code></pre>\n<ul>\n<li>setAnimationsProgress(\u7701\u7565\u4e86\u4e00\u4e9b\u914d\u7f6e\u7684\u5b9a\u4e49)</li>\n</ul>\n<p>\u8fd9\u4e2a\u51fd\u6570\u63a5\u53d7\u4e00\u4e2a\u53c2\u6570\uff0c\u5c31\u662f\u5f53\u524d\u4f4d\u7f6e\u6240\u6d88\u8017\u65f6\u95f4(\u52a8\u753b\u8d77\u59cb\u70b9)\uff0c\u7136\u540e\u5728\u91cc\u9762\u8ba1\u7b97\u51fa\u6bcf\u4e00\u4e2a\u52a8\u753b\u76ee\u6807\u7684\u4f4d\u7f6e\uff0c\u5e76\u4e14\u8d4b\u503c</p>\n<pre class="hljs"><code><span class="hljs-comment">// \u8ba1\u7b97\u52a8\u753b\u5f53\u524d\u4f4d\u7f6e \u5e76\u4e14\u8d4b\u503c</span>\n<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setAnimationsProgress</span>(<span class="hljs-params">insTime</span>) </span>{\n  <span class="hljs-comment">/* ... */</span>\n  <span class="hljs-comment">// \u8fd9\u4e2awhile\u9010\u4e2a\u8ba1\u7b97\u5f53\u524d\u5b9e\u4f8b\u4e2d\u7684\u6bcf\u4e2a\u52a8\u753b\u7684\u5f53\u524d\u4f4d\u7f6e(\u901a\u8fc7\u65f6\u95f4\u548c\u7b97\u6cd5)</span>\n  <span class="hljs-keyword">while</span> (i &lt; animationsLength) {\n      <span class="hljs-comment">/* ... */</span>\n    <span class="hljs-comment">// \u6d88\u8017\u7684\u65f6\u95f4\u5360\u603b\u6301\u7eed\u65f6\u95f4\u7684\u6bd4\u4f8b \u5728\u8d77\u70b9\u7ec8\u70b9\u4e4b\u95f4</span>\n    <span class="hljs-keyword">const</span> elapsed = minMaxValue(insTime - tween.start - tween.delay, <span class="hljs-number">0</span>, tween.duration) / tween.duration;\n    <span class="hljs-comment">// \u901a\u8fc7\u7b97\u6cd5\u8ba1\u7b97\u5f53\u524d\u8fdb\u5ea6</span>\n    <span class="hljs-keyword">const</span> eased = <span class="hljs-built_in">isNaN</span>(elapsed) ? <span class="hljs-number">1</span> : tween.easing(elapsed, tween.elasticity);\n    <span class="hljs-comment">/* ... */</span>\n    <span class="hljs-comment">// \u904d\u5386\u6bcf\u4e00\u4e2a\u5230\u8fbe\u70b9\u6267\u884c</span>\n    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> n = <span class="hljs-number">0</span>; n &lt; toNumbersLength; n++) {\n      <span class="hljs-keyword">let</span> value;\n      <span class="hljs-keyword">const</span> toNumber = tween.to.numbers[n];\n      <span class="hljs-keyword">const</span> fromNumber = tween.from.numbers[n];\n      <span class="hljs-keyword">if</span> (!tween.isPath) {\n        <span class="hljs-comment">// \u8ba1\u7b97\u5f53\u524d\u5177\u4f53\u4f4d\u7f6e</span>\n        value = fromNumber + (eased * (toNumber - fromNumber));\n      } <span class="hljs-keyword">else</span> {\n        <span class="hljs-comment">// \u8fdb\u884cSVG path\u8ba1\u7b97</span>\n        value = getPathProgress(tween.value, eased * toNumber);\n      }\n      <span class="hljs-comment">/* ... */</span>\n      numbers.push(value);\n    }\n         <span class="hljs-comment">/* ... */</span>\n        <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">isNaN</span>(n)) {\n          <span class="hljs-comment">// \u7ec4\u5408\u5355\u4f4d \'135.546\'+\'px\'</span>\n          <span class="hljs-keyword">if</span> (!b) {\n            progress += n + <span class="hljs-string">\' \'</span>;\n          } <span class="hljs-keyword">else</span> {\n            progress += n + b;\n          }\n        }\n    <span class="hljs-comment">/* ... */</span>\n    <span class="hljs-comment">// \u7ec4\u5408\u7ed3\u679c \'translateX(\'+\'135.546px\'+\')`</span>\n    setTweenProgress[anim.type](animatable.target, anim.property, progress, transforms, animatable.id);\n    anim.currentValue = progress;\n    i++;\n  }\n  <span class="hljs-comment">// \u904d\u5386\u7ed3\u679c\uff0c\u9010\u4e2atarget\u8d4b\u503c</span>\n  <span class="hljs-keyword">const</span> transformsLength = <span class="hljs-built_in">Object</span>.keys(transforms).length;\n  <span class="hljs-keyword">if</span> (transformsLength) {\n    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> id = <span class="hljs-number">0</span>; id &lt; transformsLength; id++) {\n      <span class="hljs-keyword">if</span> (!transformString) {\n        <span class="hljs-keyword">const</span> t = <span class="hljs-string">\'transform\'</span>;\n        <span class="hljs-comment">// \u914d\u7f6e\u517c\u5bb9\u6027</span>\n        transformString = (getCSSValue(<span class="hljs-built_in">document</span>.body, t) ? t : <span class="hljs-string">`-webkit-<span class="hljs-subst">${t}</span>`</span>);\n      }\n      <span class="hljs-comment">// \u8bbe\u7f6estyle</span>\n      instance.animatables[id].target.style[transformString] = transforms[id].join(<span class="hljs-string">\' \'</span>);\n    }\n  }\n  <span class="hljs-comment">// \u8bb0\u5f55\u5f53\u524d\u4f4d\u7f6e\u6240\u5bf9\u5e94\u7684\u65f6\u95f4</span>\n  instance.currentTime = insTime;\n  <span class="hljs-comment">// \u8bbe\u7f6e\u8fdb\u5ea6</span>\n  instance.progress = (insTime / instance.duration) * <span class="hljs-number">100</span>;\n}\n</code></pre>\n<p>\u5269\u4e0b\u7684\u5c31\u662f\u4e00\u4e9b\u64cd\u4f5c\u51fd\u6570\u4e86\uff1a</p>\n<ul>\n<li>instance.seek</li>\n</ul>\n<pre class="hljs"><code><span class="hljs-comment">// \u76f4\u63a5\u8df3\u5230\u53c2\u6570time\u7684\u65f6\u95f4\u6240\u5728\u7684\u4f4d\u7f6e</span>\ninstance.seek = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">time</span>) </span>{\n  setInstanceProgress(adjustTime(time));\n}\n</code></pre>\n<ul>\n<li>instance.pause</li>\n</ul>\n<pre class="hljs"><code><span class="hljs-comment">// \u5916\u90e8API \u6682\u505c</span>\ninstance.pause = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{\n  <span class="hljs-keyword">const</span> i = activeInstances.indexOf(instance);\n  <span class="hljs-comment">// \u5220\u9664activeInstances \u540e\u7eedengine\u4e2d\u627e\u4e0d\u5230\u4fbf\u4e0d\u4f1a\u6267\u884c</span>\n  <span class="hljs-keyword">if</span> (i &gt; <span class="hljs-number">-1</span>) activeInstances.splice(i, <span class="hljs-number">1</span>);\n  instance.paused = <span class="hljs-literal">true</span>;\n}\n</code></pre>\n<ul>\n<li>instance.reverse</li>\n</ul>\n<pre class="hljs"><code><span class="hljs-comment">// \u5916\u90e8API \u53cd\u8f6c</span>\ninstance.reverse = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{\n  toggleInstanceDirection();\n  startTime = <span class="hljs-number">0</span>;\n  lastTime = adjustTime(instance.currentTime);\n}\n</code></pre>\n<ul>\n<li>instance.restart</li>\n</ul>\n<pre class="hljs"><code><span class="hljs-comment">// \u5916\u90e8API \u91cd\u65b0\u6267\u884c</span>\ninstance.restart = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{\n  instance.pause();\n  instance.reset();\n  instance.play();\n}\n</code></pre>\n<ul>\n<li>instance.reset</li>\n</ul>\n<pre class="hljs"><code><span class="hljs-comment">// \u5916\u90e8API reset</span>\ninstance.reset = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{\n  <span class="hljs-keyword">const</span> direction = instance.direction;\n  <span class="hljs-keyword">const</span> loops = instance.loop;\n  <span class="hljs-comment">// \u5f53\u524d\u4f4d\u7f6e,\u8fdb\u5ea6 \u5f52\u96f6</span>\n  instance.currentTime = <span class="hljs-number">0</span>;\n  instance.progress = <span class="hljs-number">0</span>;\n  instance.paused = <span class="hljs-literal">true</span>;\n  instance.began = <span class="hljs-literal">false</span>;\n  instance.completed = <span class="hljs-literal">false</span>;\n  instance.reversed = direction === <span class="hljs-string">\'reverse\'</span>;\n  instance.remaining = direction === <span class="hljs-string">\'alternate\'</span> &amp;&amp; loops === <span class="hljs-number">1</span> ? <span class="hljs-number">2</span> : loops;\n  setAnimationsProgress(<span class="hljs-number">0</span>);\n  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = instance.children.length; i--; ){\n    instance.children[i].reset();\n  }\n}\n</code></pre>\n<h2>\u603b\u7ed3</h2>\n<ol>\n<li>\u4f7f\u7528\u4e86<code>requestAnimateFrame</code>\u548c<code>CSS</code>\u52a8\u753b\u63d0\u9ad8\u6d41\u7545\u5ea6\u3002</li>\n<li>\u4f7f\u7528\u4e86\u7f13\u52a8\u51fd\u6570\uff0c\u53ea\u9700\u8981\u901a\u8fc7<code>\u5f53\u524d\u52a8\u753b\u6d88\u8017\u7684\u65f6\u95f4</code>\uff0c\u642d\u914d\u5176\u4ed6\u5b9a\u4e49\u7684\u914d\u7f6e\u9879\uff0c\u5c31\u53ef\u4ee5\u8ba1\u7b97\u51fa\u5f53\u524d\u52a8\u753b\u5177\u4f53\u4f4d\u7f6e\u3002</li>\n</ol>\n<p>\u6b64\u6b21\u89e3\u6790\u5c31\u5230\u8fd9\u91cc\u7ed3\u675f\uff0c\u5982\u6709\u9519\u8bef\uff0c\u656c\u8bf7\u6307\u51fa\uff0c\u611f\u8c22\uff01</p>\n'}}}]);
//# sourceMappingURL=sourceCode-content22.4d8a9242.chunk.js.map