const {getWeightExtract}=require("./compute-label")

// 过滤 label(tags)关键词

function filterExtract(lowercaseKeyWords,content,title){
  let filteredLabels=[]
  let labels=getWeightExtract(content,title)
  let filteredSet=new Set()
  for(let i=0;i<labels.length;i++){
    let cur=labels[i].toLowerCase()
    if(lowercaseKeyWords.hasOwnProperty(cur) && lowercaseKeyWords[cur]){
      filteredSet.add(cur)
    }
  }
  for(let label of filteredSet){
    filteredLabels.push(label)
  }
  if(filteredLabels.length===0)return null
  return filteredLabels
}

module.exports=filterExtract