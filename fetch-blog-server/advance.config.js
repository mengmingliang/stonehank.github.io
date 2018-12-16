const slash = require('slash');
const {token}=require('./token.config')
const appRoot = require('app-root-path');
const getWriteJsonWithLog=require('./utils/getWriteJsonWithLog')
const getWriteStreamWithLog=require('./utils/getWriteStreamWithLog')
const {showDetail,limitRetryTimes,imgAbsPath}=require('./basic.config')
const {getAppropriateKey_blog, getFileName_blog, getAppropriateKey_resource, getFileName_resource}=require('./utils/getCustomFunctions')
// 获取根目录
const context=slash(appRoot.path)

let taskQueue=[
  {
    writeListInfoName:`_blog-data.json`,
    writeDIRPath:`${context}/src/asset/blog`,
    initGetWriteListPath:(writeDIRPath,writeListInfoName)=>()=>`${writeDIRPath}/${writeListInfoName}`,
    initGetWriteContentPath:(writeDIRPath)=>(filename)=>`${writeDIRPath}/${filename}`,
    initGetFetchResultsAPI:(user,repository,per_page)=>(page)=>`https://api.github.com/search/code?q=repo:${user}/${repository}+extension:md&sort=indexed&per_page=${per_page}&page=${page}`,
    initGetDetailSearchAPI:(user,repository,branch)=>sha=>`https://api.github.com/repos/${user}/${repository}/git/blobs/${sha}`,
    read_restrictDIRList:null,
    getAppropriateKey:getAppropriateKey_blog,
    getFileName:getFileName_blog,
    checkAndWriteOptions:
      {
        user:'stonehank',
        repository:'blogs',
        writeModuleWithLog:getWriteJsonWithLog("blog文件",showDetail,limitRetryTimes),
        needHref2Absolute:{abs:`${imgAbsPath}/articles/img/`,isImg:true}
      },
  },
  {
    writeListInfoName:`_source-code-list.json`,
    writeDIRPath:`${context}/src/asset/sourceCode`,
    initGetWriteListPath:(writeDIRPath,writeListInfoName)=>()=>`${writeDIRPath}/${writeListInfoName}`,
    initGetWriteContentPath:(writeDIRPath)=>(filename)=>`${writeDIRPath}/${filename}`,
    initGetFetchResultsAPI:(user,repository,per_page)=>(page)=>`https://api.github.com/search/code?q=repo:${user}/${repository}+filename:navigation&sort=indexed&per_page=${per_page}&page=${page}`,
    initGetDetailSearchAPI:(user,repository,branch)=>sha=>`https://api.github.com/repos/${user}/${repository}/git/blobs/${sha}`,
    read_restrictDIRList:null,
    getAppropriateKey:getAppropriateKey_blog,
    getFileName:getFileName_blog,
    checkAndWriteOptions:
      {
        user:'stonehank',
        repository:`sourcecode-analysis`,
        writeModuleWithLog:getWriteJsonWithLog("源码阅读",showDetail,limitRetryTimes),
        needHref2Absolute:{abs:'https://github.com/stonehank/sourcecode-analysis/blob/master/',isImg:false}
      },
  },
  {
    writeListInfoName:`_resource_list.json`,
    writeDIRPath:`${context}/public/articles`,
    initGetWriteListPath:(writeDIRPath,writeListInfoName,restrictPath)=>()=>`${writeDIRPath}/${restrictPath}/${writeListInfoName}`,
    initGetWriteContentPath:(writeDIRPath,restrictPath)=>filename=>`${writeDIRPath}/${restrictPath}/${filename}`,
    initGetFetchResultsAPI:(user,repository,per_page,restrictPath)=>(page)=>`https://api.github.com/search/code?q=repo:${user}/${repository}+path:${restrictPath}&sort=indexed&per_page=${per_page}&page=${page}`,
    initGetDetailSearchAPI:(user,repository,branch)=>(resourceDir,encodeBasename)=>`https://raw.githubusercontent.com/${user}/${repository}/${branch}/${resourceDir}/${encodeBasename}`,
    read_restrictDIRList:["img"],
    getAppropriateKey:getAppropriateKey_resource,
    getFileName:getFileName_resource,
    checkAndWriteOptions:
      {
        isResource:true,
        user:"stonehank",
        repository:"blogs",
        writeModuleWithLog:getWriteStreamWithLog("资源文件",showDetail,limitRetryTimes),
      },
  }
]

module.exports={
  taskQueue,
  context,
  token
}