const fs = require('fs-extra')
const ProgressReminder=require('./progress_remider')

/**
 * 接受path和ReadableStream
 * @param description
 * @param showDetail
 * @param limitRetryTimes
 * @returns {function(<String>, <ReadableStream>, {filename?: *, allTasksCount?: *, fullBytes?: *}=): Promise<any>}
 */
function getCreateWriteStreamWithLog(description="当前任务",showDetail=false,limitRetryTimes=2){
  let fileWritingQueue=new ProgressReminder(description,showDetail)
  return function(path,data,{filename=null,allTasksCount=1,fullBytes=null}={}){
    let writingHasDone
    if(showDetail)console.log(`${filename}正在写入...`)
    fileWritingQueue.addTask(filename)
    return tryWriteStream(path,data,filename,showDetail,fileWritingQueue,fullBytes,allTasksCount,limitRetryTimes)
      .then(()=>{
        writingHasDone=fileWritingQueue.doneTask(filename,allTasksCount,1,1)
        return writingHasDone
      })
  }
}

function tryWriteStream(path,data,filename,showDetail,fileWritingQueue,fullBytes,allTasksCount,limitRetryTimes){
  return new Promise((res,rej)=>{
    let resourceWriteStream,
      // 每次重试清零
      read=0
    data.pipe(resourceWriteStream=fs.createWriteStream(path))
    filename=filename===null ?path:resourceWriteStream.path
    data.on("data",function(data){
      read+=data.length
      fileWritingQueue.fetching(read,fullBytes,allTasksCount)
    })
    resourceWriteStream.error=function(err){
      rej()
    }
    resourceWriteStream.close=function(){
      res()
    }
  })
    .catch(err=>{
      if(limitRetryTimes===0) console.warn(`写入${filename}失败！超出重试次数`)
      else {
        if (showDetail) console.log(`写入${filename}失败，尝试重新写入`)
        limitRetryTimes--
        return tryWriteStream(path,data,filename,showDetail,fileWritingQueue,fullBytes,allTasksCount,limitRetryTimes)
      }
    })
}


module.exports=getCreateWriteStreamWithLog