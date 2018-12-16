const  hljs =require('highlight.js/lib/highlight');
const javascript = require('highlight.js/lib/languages/javascript');

hljs.registerLanguage('javascript', javascript); // https://highlightjs.org/

// 转换 markdown 为 html

const md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>';
      } catch (__) {
      }
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});


function md2Html(mdStr){
  return md.render(mdStr)
}

module.exports=md2Html