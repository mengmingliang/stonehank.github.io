

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

module.exports=getHighDensity