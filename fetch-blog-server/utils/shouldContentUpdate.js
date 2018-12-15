const checkFileIsExist=require('./checkFileIsExist')

let ignoreSHA=false,
  showDetail=false



function shouldContentUpdate(fetchResults,
                              listData,
                              listInfoPath,
                              getContentInfoPath,
                              getFileName,
                              getAppropriateKey,
                              getDetailSearchAPI,
                              {compareProps=[],otherProps={}}={})
{

  let pristine=true
  let needUpdateData=[]
  for(let i=0;i<fetchResults.length;i++){

    // 找到list中的key
    let appropriateKey=getAppropriateKey(fetchResults[i],otherProps)


    // 找到实际文件名
    let contentFilename=getFileName(fetchResults[i],otherProps)
    // 找到实际文件路径
    let contentPath=getContentInfoPath(contentFilename)

    let checkPaths=Array.isArray(contentPath)?contentPath:[contentPath]

    let shouldUpdate=false
    if(!ignoreSHA && listData[appropriateKey]){
      // list中需要对比的属性,例如sha等
      for(let i=0;i<compareProps.length;i++){
        if(listData[appropriateKey][compareProps[i]]!==fetchResults[i][compareProps[i]]){
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
      let detailSearchAPI=getDetailSearchAPI(fetchResults[i],otherProps)
      pristine=false
      if(showDetail)if(!ignoreSHA)console.log("找到不存在/不匹配的，name为"+contentFilename)
      if(!listData[appropriateKey]) listData[appropriateKey]={}
      needUpdateData.push({latestDataIdx:i,curDataKey:appropriateKey,contentPath,detailSearchAPI})
    }
  }
  if(pristine){
    console.log("未发现变化，无须更新")

  }
  if(ignoreSHA){
    console.log("\n强制更新开启\n")
  }

  return needUpdateData
  // updateListAndContent(needUpdateData,fetchResults,listData,listInfoPath,getContentInfoPath,options)
}

module.exports=shouldContentUpdate