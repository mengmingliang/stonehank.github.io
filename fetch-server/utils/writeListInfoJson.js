const getWriteJsonWithLog=require('./getWriteJsonWithLog')
const fs=require('fs-extra')

function writeListInfoJson(writeListPath,listData,{retryTimes=0,showDetail=false,limitRetryTimes=3}){
  if(!writeListPath || listData==null)throw new Error('Must be have path or data')
  let writeListWithLog=getWriteJsonWithLog("写入List",showDetail,limitRetryTimes)
  return writeListWithLog(writeListPath,listData)
    .then(hasDone=>{
      if(hasDone){
        if(showDetail)console.log(`正在检查格式是否正确...`)
        try{
          fs.readJsonSync(writeListPath)
          if(showDetail)console.log(`${writeListPath} 检查成功！`)
        }catch(err) {
          if(retryTimes===limitRetryTimes)throw new Error(`写入失败，超出重试次数，请删除${writeListPath}再次尝试`)
          else{
            retryTimes++
            if(showDetail)console.log(`${writeListPath} 检查失败，尝试重新创建！`)
            writeListInfoJson(writeListPath,listData,{retryTimes,showDetail,limitRetryTimes})
          }
        }
      }
    })
    .catch(err=>{
      throw new Error('something wrong on write-list? or need require fs')
    })
}


module.exports=writeListInfoJson