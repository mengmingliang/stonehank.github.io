var nodejieba = require("nodejieba");
var Base64 = require('js-base64').Base64;

function getWeightExtract(content_base64,title){
  console.log('正在分析关键词...')
  let extractNum=8
  let content=Base64.decode(content_base64)
  let extract_content=nodejieba.extract(content,extractNum).filter(o=>o.weight>8)
  let extract_title=nodejieba.extract(title,extractNum).filter(o=>o.weight>8)
  let weightMap={}
  let count=4

  for(let i=0;i<extract_content.length;i++){
    if(count<=0)break
    let exContent=extract_content[i].word
    let exTitle=extract_title[i]?extract_title[i].word:''
    if(!/^\d+$/.test(exContent) && !/^[a-zA-Z]{1,3}$/.test(exContent)){
      if(!weightMap[exContent])weightMap[exContent]=1
      else weightMap[exContent]++
    }
    if(exTitle && !/^\d+$/.test(exTitle) && !/^[a-zA-Z]{1,3}$/.test(exTitle)){
      if(!weightMap[exTitle])weightMap[exTitle]=1
      else weightMap[exTitle]++
    }
  }
  let weightMapKeys=Object.keys(weightMap)
  weightMapKeys.sort((a,b)=>weightMap[b]-weightMap[a])
  return weightMapKeys
}


module.exports={
  getWeightExtract
}