

let checkLater=[]
export default function nestComment(commentArr){
  let commentList=simplyObj(commentArr)
  let hash={}
  for(let i=0;i<commentList.length;i++){
    let cur=commentList[i],id=cur['id']
    hash[id]=cur
  }
  commentList=checkLater.concat(commentList)
  checkLater=[]
  let res=[]
  for(let i=0;i<commentList.length;i++){
    let {rid,id}=commentList[i]
    if(rid===''){
      res.push(hash[id])
      continue
    }
    let parent=hash[rid]
    if(!parent){
      checkLater.push(hash[id])
      continue
    }
    parent['child'].push(hash[id])
  }
  return res
}

function simplyObj(commentArr){
  let commentList=[]
  for(let i=0;i<commentArr.length;i++){
    let cur=commentArr[i],id=cur.id,curAttrs=cur.attributes
    // 此处不需要深拷贝
    let newObj=Object.assign({id,child:[]},curAttrs)
    commentList.push(newObj)
  }
  return commentList
}