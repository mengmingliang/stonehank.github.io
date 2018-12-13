const fs = require('fs-extra')
const ProgressReminder=require('./progress_remider')

/**
 *
 * @param description
 * @param showDetail
 * @returns {function(<String>, <ReadableStream>, {filename?: *, allTasksCount?: *, fullBytes?: *}=): Promise<any>}
 */
function getCreateWriteStreamWithLog(description="当前任务",showDetail=false){
  let fileWritingQueue=new ProgressReminder(description,showDetail)
  return function(path,data,{filename=null,allTasksCount=1,fullBytes=null}={}){
    return new Promise((res,rej)=>{
      let resourceWriteStream,
        writingHasDone,
        read=0

      data.pipe(resourceWriteStream=fs.createWriteStream(path))
      filename=filename===null ?path:resourceWriteStream.path
      if(showDetail)console.log(`${filename}正在写入...`)
      fileWritingQueue.addTask(filename)
      data.on("data",function(data){
        read+=data.length
        fileWritingQueue.fetching(read,fullBytes,allTasksCount)
      })
      resourceWriteStream.close=function(){
        writingHasDone=fileWritingQueue.doneTask(filename,allTasksCount,read,fullBytes)
        res(writingHasDone)
      }
    })
  }
}


module.exports=getCreateWriteStreamWithLog