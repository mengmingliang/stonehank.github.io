const checkFileIsExist=require('./checkFileIsExist')





function shouldContentUpdate(fetchResults,
                              listData,
                              getContentInfoPath,
                              getFileName,
                              getAppropriateKey,
                              {fetchExcludes=[],compareProps=[],otherProps={},ignoreSHA=false,showDetail=false}={})
{

  let pristine=true
  let needUpdateData=[]
  for(let i=0;i<fetchResults.length;i++){

    // 找到list中的key
    let appropriateKey=getAppropriateKey(fetchResults[i],otherProps)


    // 找到实际文件名
    let contentFilename=getFileName(fetchResults[i],fetchExcludes,otherProps)
    if(contentFilename==null)continue
    // 找到实际文件路径
    let contentPath=getContentInfoPath(contentFilename)

    let checkPaths=Array.isArray(contentPath)?contentPath:[contentPath]

    let shouldUpdate=false
    if(!ignoreSHA && listData[appropriateKey]){
      // list中需要对比的属性,例如sha等
      for(let j=0;j<compareProps.length;j++){
        if(listData[appropriateKey][compareProps[j]]!==fetchResults[i][compareProps[j]]){
          shouldUpdate=true
          break
        }
      }
      if(!shouldUpdate){
        shouldUpdate=!checkFileIsExist(checkPaths)
      }
    }else{
      shouldUpdate=true
    }

    if(shouldUpdate){
      pristine=false
      if(showDetail)if(!ignoreSHA)console.log("找到不存在/不匹配的，name为"+contentFilename)
      if(!listData[appropriateKey]) listData[appropriateKey]={}
      needUpdateData.push({latestDataIdx:i,curDataKey:appropriateKey,contentPath})
    }
  }
  if(pristine){
    console.log("未发现变化，无须更新")

  }
  if(ignoreSHA){
    console.log("\n强制更新开启\n")
  }

  return [needUpdateData,listData]

}

module.exports=shouldContentUpdate