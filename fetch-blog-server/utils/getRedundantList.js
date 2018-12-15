const fs=require('fs-extra')
const path=require('path')
const crypto = require('crypto');

function getRedundantList(githubResult, listData, listInfoPath, getContentInfoPath, {isResource=null,showDetail=false}={}){
  if(isResource==null)throw new Error('必须设置 isResource')
  // let len=0
  // for(let key in listData)len++
  // console.warn("最后设置总个数：",len)
  // 检查asset目录，删除多余文件
  let contentInfoDIR=getContentInfoPath('')
  let fileData
  // 读取文件夹中存在的内容
  try{
    fileData=fs.readdirSync(contentInfoDIR)
  }catch(err){
    console.error(e)
  }
  let set=new Set()
  // console.warn('再次github获取数量：',githubResult.length)

  // 将当前github结果 hash化
  for(let i=0;i<githubResult.length;i++){
    let  parse=path.parse(githubResult[i].path)
    let rawname=parse.name
    let githubTitle
    // if(finalOptions.isResource)githubTitle=rawname
    if(isResource)githubTitle=rawname
    else{
      const sha1 = crypto.createHash('sha1');
      sha1.update(rawname);
      githubTitle=sha1.digest('hex')
    }
    // console.warn('每一个github name：',rawname)
    set.add(githubTitle)
  }

  // console.warn('github hash 结果：',set.size)
  // 忽略的文件
  let not_delete_list_name=path.parse(listInfoPath).base
  let deleteList=new Set()

  // 检测文件夹中list是否有多余
  for(let key in listData){
    if(!set.has(key)){
      deleteList.add(key)
    }
  }

  // 检测文件夹中文件是否有多余
  for(let i=0;i<fileData.length;i++){
    if(fileData[i]===not_delete_list_name)continue
    let parse=path.parse(fileData[i])
    let rawname=parse.name

    if(!set.has(rawname)){
      deleteList.add(rawname)
      fs.remove(contentInfoDIR+'/'+fileData[i])
        .then(() => {
          if(showDetail)console.log('成功删除'+fileData[i])
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
  if(deleteList.size>0)console.warn("需要删除的个数：",deleteList.size)
  return deleteList

}

module.exports=getRedundantList