const log = require('single-line-log').stdout;

function ProgressRemider(fileType,showDetail){
  let hasDoneNum=0
  let fileWritingList={}
  this.addTask=function (pathOrFilename) {
    fileWritingList[pathOrFilename]=1
  }

  this.fetching=function (read,fullBytes,allTaskLen) {
    log(`当前文件已完成${(read/fullBytes*100).toFixed(2)}%\n${fileType}已完成${hasDoneNum}/${allTaskLen}`)
  }

  this.doneTask=function (pathOrFilename,allTaskLen,read,fullBytes) {
    hasDoneNum++
    delete(fileWritingList[pathOrFilename])
    if(hasDoneNum===allTaskLen ){
      if(showDetail)console.log(`${pathOrFilename}写入结束`)
      log(`当前文件已完成${(read/fullBytes*100).toFixed(2)}%\n${fileType}已完成${hasDoneNum}/${allTaskLen}\n当前${fileType}已全部完成`)
      return true
    }
    return false
  }
  this.showNoEmpty=function(pathOrFilename,allTaskLen){
    if(showDetail)console.log(`${pathOrFilename}写入结束`)
    log(`\n${fileType}已完成${hasDoneNum}/${allTaskLen}`)
    if(showDetail)extraShowDetail(fileType,fileWritingList)
  }

}
function extraShowDetail(fileType,fileWritingList){
  console.log(`${fileType}还剩下：`)
  Object.keys(fileWritingList).forEach(path=>{
    console.log(path)
  })
  console.log("-------------------------------------")
}


module.exports=ProgressRemider