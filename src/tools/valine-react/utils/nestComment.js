import deepClone from './deepClone'





function createNestComment(){
  let checkLater=[]
  let allCommentMap=new Map()
  let orderList=[]
  return function(insertArr,nest,fetchNxt){
    let insertList=simplyList(insertArr)
    for(let i=0;i<insertList.length;i++){
      let cur=insertList[i],id=cur['id']
      if(allCommentMap.has(id))continue
      allCommentMap.set(id,cur)
    }
    if(insertList.length===1){
      orderList.unshift(insertList[0].id)
    }else{
      for(let {id} of insertList){
        orderList.push(id)
      }
    }
    checkLater=[]
    let res=[]
    for(let id of orderList){
      let obj=allCommentMap.get(id),rid=obj.rid
      if(!nest || rid===''){
        res.push(deepClone(obj))
        continue
      }
      if(!allCommentMap.has(rid)){
        checkLater.push(obj)
        continue
      }
      let parent=allCommentMap.get(rid)
      let duplic=false
      for(let j=0;j<parent['child'].length;j++){
        if(parent['child'][j].id===id){
          duplic=true
          break
        }
      }
      if(!duplic){
        // let cloneParent=deepClone(parent)
        parent['child'].push(obj)
        // allCommentMap.set(rid,cloneParent)
      }
    }

    return res
  }
  function simplyList(insertArr){
    let insertList=[]
    for(let i=0;i<insertArr.length;i++){
      let cur=insertArr[i],id=cur.id,curAttrs=cur.attributes,createdAt=cur.get('createdAt')
      let newObj=Object.assign({id,createdAt,child:[]},curAttrs)
      insertList.push(newObj)
    }
    return insertList
  }
}
let nestComment=createNestComment()



export {nestComment}