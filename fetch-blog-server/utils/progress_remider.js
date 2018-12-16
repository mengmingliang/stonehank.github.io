const log = require('single-line-log').stdout;

// 进度提示

function ProgressRemider(fileType){
  let hasDoneNum=0
  let fileWritingList={}
  this.addTask=function (pathOrFilename) {
    fileWritingList[pathOrFilename]=1
  }

  this.runningTask=function (read,fullBytes,allTaskLen) {
    let progress=fullBytes? `${(read/fullBytes*100).toFixed(2)}%` : `${Math.floor(read/1024)}kb`
    log(`当前文件已完成${progress}\n${fileType}已完成${hasDoneNum}/${allTaskLen}`)
  }

  this.doneTask=function (pathOrFilename,allTaskLen,read,fullBytes) {
    let progress=fullBytes? `${(read/fullBytes*100).toFixed(2)}%` : `${Math.floor(read/1024)}kb`
    hasDoneNum++
    delete(fileWritingList[pathOrFilename])
    log(`${pathOrFilename}已完成${progress}，当前进度${hasDoneNum}/${allTaskLen}`)
    if(hasDoneNum===allTaskLen ){
      log(`${fileType}已完成${hasDoneNum}/${allTaskLen}\n${fileType}已全部完成`)
      return true
    }
    return false
  }

}



module.exports=ProgressRemider