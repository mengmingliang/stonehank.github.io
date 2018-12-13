const fs = require('fs-extra')
const ProgressReminder=require('./progress_remider')


function getWriteJsonWithLog(description="当前任务",showDetail=false){
  let fileWrittingQueue=new ProgressReminder(description,showDetail)
  return function(path,content,{spaces=2,filename=null,allTasksCount=1,}={}){
    filename=filename===null ?path:filename
    fileWrittingQueue.addTask(filename)
    let writingHasDone
    return fs.outputJson(path,content,{spaces:spaces})
      .catch(err=>{
        if(showDetail)console.log(`写入${filename}失败，尝试重新写入`)
        try{
          fs.outputJsonSync(path,content,{spaces:spaces})
          writingHasDone=fileWrittingQueue.doneTask(filename,allTasksCount,1,1)
        }
        catch(e){console.warn(`写入${filename}失败！尝试手动添加`)}
      })
      .then(()=>{
        writingHasDone=fileWrittingQueue.doneTask(filename,allTasksCount,1,1)
        return writingHasDone
      })
  }
}


module.exports=getWriteJsonWithLog

