const md2Html= require('./md2Html')

// 根据密度获取摘要

function getHighDensity(content,density,summaryLength){
  function checkIsCN(s){ return /[\u4E00-\u9FA5]/.test(s)}
  let p=0,numCN=0,result=0,aux=Array(content.length).fill(0)
  for(let i=0;i<content.length;i++){
    let isCN=checkIsCN(content[i])
    if(isCN){aux[i]=1;numCN++}
    if(i>summaryLength-1){
      numCN-=aux[(i-summaryLength)]
      p=(numCN)/summaryLength
    }
    if(p>=density){result=i;break}
  }
  return result
}

// 根据最前方的引用获取摘要
let defaultStartArr=[]
function getAppropriateSummary(content,summaryLens,defaultStart=0,defaultEnd=300){
  defaultStartArr.push(defaultStart)
  let [minLen,maxLen]=summaryLens
  let htmlContent=md2Html(content)
  let realHtmlContent=htmlContent.substr(defaultStart)

  let pattern=/<blockquote>([\s\S]*?)<\/blockquote>/
  let match=realHtmlContent.match(pattern)
  // 找不到合适的，返回默认
  if(!match || match.index>defaultEnd ){
    // 处理md
    let summary=content.substr(defaultStartArr[0],maxLen)+'...'
      // .replace(/-{3,}/,'')  // 清除 hr
      // .replace(/(^|\n|\s)+#{1,3}\s/g,"#### ") // 替换h1-h3 为 h4

    let htmlSummary=md2Html(summary)
    return h1ReplaceToh4(removeHr(htmlSummary)).replace(/\n*$/,"").replace(/^\n*/,'')
  }
  // 发现太短的，继续查找
  if(match[1].length<minLen){
    return getAppropriateSummary(content,summaryLens,match.index+match[1].length,defaultEnd)
  }
  // blockquote内部也应该替换h1-h3
  return h1ReplaceToh4(match[1]).replace(/\n*$/,"").replace(/^\n*/,'')
}

function h1ReplaceToh4(html){
  let pattern=/(<\/?)h[123](>)/g
  html=html.replace(pattern,"$1h4$2")
  return html
}

function removeHr(html){
  let pattern=/<hr>/
  let match=html.match(pattern)
  if(!match)return html
  return html.substring(0,match.index)
}

module.exports=getAppropriateSummary