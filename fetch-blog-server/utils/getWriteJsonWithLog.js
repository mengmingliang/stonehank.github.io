const fs = require('fs-extra')
const ProgressReminder=require('./progress_remider')

/**
 * 接受path和content
 * @param description
 * @param showDetail
 * @param limitRetryTimes
 * @returns {function(*=, *=, {spaces?: *, filename?: *, allTasksCount?: *}=): Promise<boolean>}
 */
function getWriteJsonWithLog(description="当前任务",showDetail=false,limitRetryTimes=2){
  let fileWritingQueue=new ProgressReminder(description,showDetail)
  return function(path,content,{spaces=2,filename=null,allTasksCount=1,}={}){
    filename=filename===null ?path:filename
    fileWritingQueue.addTask(filename)
    let writingHasDone
    return tryWriteFile(path,content,spaces,limitRetryTimes,showDetail)
      .then(()=>{
        writingHasDone=fileWritingQueue.doneTask(filename,allTasksCount,1,1)
        return writingHasDone
      })
  }
}

function tryWriteFile(path,content,spaces,limitRetryTimes,showDetail){
  return fs.outputJson(path,content,{spaces:spaces})
    .catch(err=>{
      if(limitRetryTimes===0) console.warn(`写入${filename}失败！超出重试次数`)
      else{
        if(showDetail)console.log(`写入${filename}失败，尝试重新写入`)
        limitRetryTimes--
        return tryWriteFile(path,content,spaces,limitRetryTimes)
      }
    })
}

module.exports=getWriteJsonWithLog

