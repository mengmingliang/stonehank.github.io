const fs=require('fs-extra')


function checkFileIsExist(paths,start=0){
  if(start>=paths.length)return false
  let curPath=paths[start]
  try{
    fs.accessSync(curPath, fs.constants.F_OK)
  }catch(err){
    return checkFileIsExist(paths,start+1)
  }
  return true
}



module.exports=checkFileIsExist