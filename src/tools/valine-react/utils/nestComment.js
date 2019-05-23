import deepClone from './deepClone'



function createNestComments(){
  let map=new Map()
  return function(list,arr){
    let res=[]
    for(let i=0;i<list.length;i++){
      let item=list[i]
      if(map.has(item.id)){
        res[i]=map.get(item.id)
        continue
      }
      let cloneItem=deepClone(item)
      map.set(item.id,cloneItem)
      res[i]=cloneItem
    }
    for(let obj of arr){
      let id=obj.id
      let rid=obj.rid
      let parent=map.get(rid)
      let cloneObj=deepClone(obj)
      parent.child.push(cloneObj)
      map.set(id,cloneObj)
    }
    return res
  }
}

 function convert2SimplyList(arr){
  let res=[]
  for(let obj of arr){
    res.push(simplyObj(obj))
  }
  return res
}

function simplyObj(obj){
  let id=obj.id,curAttrs=obj.attributes,createdAt=obj.get('createdAt')
  return Object.assign({id,createdAt,child:[]},curAttrs)
}

// function createNestComment(){
//   let checkLater=[]
//   let allCommentMap=new Map()
//   let orderList=[]
//   return function(insertArr,nest,fetchNxt){
//     let insertList=simplyList(insertArr)
//     for(let i=0;i<insertList.length;i++){
//       let cur=insertList[i],id=cur['id']
//       if(allCommentMap.has(id))continue
//       allCommentMap.set(id,cur)
//     }
//     if(insertList.length===1){
//       orderList.unshift(insertList[0].id)
//     }else{
//       for(let {id} of insertList){
//         orderList.push(id)
//       }
//     }
//     checkLater=[]
//     let res=[]
//     for(let id of orderList){
//       let obj=allCommentMap.get(id),rid=obj.rid
//       if(!nest || rid===''){
//         res.push(deepClone(obj))
//         continue
//       }
//       if(!allCommentMap.has(rid)){
//         checkLater.push(obj)
//         continue
//       }
//       let parent=allCommentMap.get(rid)
//       let duplic=false
//       for(let j=0;j<parent['child'].length;j++){
//         if(parent['child'][j].id===id){
//           duplic=true
//           break
//         }
//       }
//       if(!duplic){
//         // let cloneParent=deepClone(parent)
//         parent['child'].push(obj)
//         // allCommentMap.set(rid,cloneParent)
//       }
//     }
//
//     return res
//   }
//   function simplyList(insertArr){
//     let insertList=[]
//     for(let i=0;i<insertArr.length;i++){
//       let cur=insertArr[i],id=cur.id,curAttrs=cur.attributes,createdAt=cur.get('createdAt')
//       console.log(curAttrs)
//       let newObj=Object.assign({id,createdAt,child:[]},curAttrs)
//       insertList.push(newObj)
//     }
//     return insertList
//   }
// }
// let nestComment=createNestComment()

let mergeNestComment=createNestComments()

export {mergeNestComment,convert2SimplyList,simplyObj}