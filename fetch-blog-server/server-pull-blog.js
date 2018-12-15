const axios = require('axios');
const fs = require('fs-extra')
const path=require("path")
const moment = require("moment")
const slash = require('slash');
const appRoot = require('app-root-path');
const filterExtract=require('./utils/filterExtract')
const crypto = require('crypto');
const md2Html= require('./utils/md2Html')
const getGZipSize=require('./utils/getGZipSize')
const {base64Decode}=require('./utils/base64-code')
const getAppropriateSummary=require('./utils/getSummary')
const href2Absolute=require('./utils/href2Absolute')
const getWriteJsonWithLog=require('./utils/getWriteJsonWithLog')
const getCreateWriteStreamWithLog=require('./utils/getWriteStreamWithLog')
// const checkFileIsExist=require('./utils/checkFileIsExist')
const getCustomFunctions=require('./utils/getCustomFunctions')
const shouldContentUpdate=require('./utils/shouldContentUpdate')
const getRedundantList=require('./utils/getRedundantList')
const writeListInfoJson=require('./utils/writeListInfoJson')

// 获取根目录
const context=slash(appRoot.path)

// 获取配置信息
const config_json_path=`${context}/fetch-blog-server/blog-config.json`
const token_json_path=`${context}/fetch-blog-server/blog-token.json`
let config,token_json
try{
  token_json=fs.readJsonSync(token_json_path)
  config=fs.readJsonSync(config_json_path)
}catch(err){
  console.log(`获取配置出现错误，确保fs-extra正确安装以及${config_json_path}和${token_json_path}存在`)
}

// 开始
console.log("项目根目录为："+context,"正在通过github获取数据...")
const {token}=token_json
const {user,repository,branch,per_page,imgAbsPath,write_blog_path,write_sourceCode_path,write_resource_path,
  dataType,summaryMaxLen,summaryMinLen,resource_dir_list,keywords,delRedundant,fetchExcludes,
  forceUpdate,ignoreSHA,retry_times,showDetail}=config

let limitRetryTimes=retry_times



// 定义github search的header
let check = {
  headers: {
    'Accept': 'application/vnd.github.squirrel-girl-preview+json',
    Authorization:`token ${token}  `
  },
}

// valid的tags集合
let lowercaseKeyWords={}
// 填充valid的tags(keyword)
for(let i=0;i<keywords.length;i++){
  let cur=keywords[i].toLowerCase()
  lowercaseKeyWords[cur]=1
}





let {
  getAppropriateKey_blog,
  getDetailSearchAPI_blog,
  getFileName_blog,
  getAppropriateKey_resource,
  getDetailSearchAPI_resource,
  getFileName_resource
}=getCustomFunctions(user,repository,branch)

let taskQueue=[
  {
    writeListInfoName:`_blog-data.json`,
    writeDIRPath:`${context}/${write_blog_path}`,
    initComputeWriteListInfoPath:(writeDIRPath,writeListInfoName)=>()=>`${writeDIRPath}/${writeListInfoName}`,
    initComputeWriteContentInfoPath:(writeDIRPath)=>(filename)=>`${writeDIRPath}/${filename}`,
    initComputeSearchCommand:(user,repository)=>(page)=>`https://api.github.com/search/code?q=repo:${user}/${repository}+extension:md&sort=indexed&per_page=${per_page}&page=${page}`,
    read_restrictDIRList:null,
    getAppropriateKey:getAppropriateKey_blog,
    getDetailSearchAPI:getDetailSearchAPI_blog,
    getFileName:getFileName_blog,
    checkANDwriteOptions:
      {
        user:user,
        repository:repository,
        writeModuleWithLog:getWriteJsonWithLog("blog文件",showDetail,limitRetryTimes),
        needHref2Absolute:{abs:`${imgAbsPath}/articles/img/`,isImg:true}
      },
  },
  {
    writeListInfoName:`_source-code-list.json`,
    writeDIRPath:`${context}/${write_sourceCode_path}`,
    initComputeWriteListInfoPath:(writeDIRPath,writeListInfoName)=>()=>`${writeDIRPath}/${writeListInfoName}`,
    initComputeWriteContentInfoPath:(writeDIRPath)=>(filename)=>`${writeDIRPath}/${filename}`,
    initComputeSearchCommand:(user,repository)=>(page)=>`https://api.github.com/search/code?q=repo:${user}/${repository}+filename:navigation&sort=indexed&per_page=${per_page}&page=${page}`,
    read_restrictDIRList:null,
    getAppropriateKey:getAppropriateKey_blog,
    getDetailSearchAPI:getDetailSearchAPI_blog,
    getFileName:getFileName_blog,
    checkANDwriteOptions:
      {
        user:user,
        repository:`sourcecode-analysis`,
        writeModuleWithLog:getWriteJsonWithLog("源码阅读",showDetail,limitRetryTimes),
        needHref2Absolute:{abs:'https://github.com/stonehank/sourcecode-analysis/blob/master/',isImg:false}
      },
  },
  {

    writeListInfoName:`_resource_list.json`,
    writeDIRPath:`${context}/${write_resource_path}`,
    initComputeWriteListInfoPath:(writeDIRPath,writeListInfoName,restrictPath)=>()=>`${writeDIRPath}/${restrictPath}/${writeListInfoName}`,
    initComputeWriteContentInfoPath:(writeDIRPath,restrictPath)=>filename=>`${writeDIRPath}/${restrictPath}/${filename}`,
    initComputeSearchCommand:(user,repository,restrictPath)=>(page)=>`https://api.github.com/search/code?q=repo:${user}/${repository}+path:${restrictPath}&sort=indexed&per_page=${per_page}&page=${page}`,
    read_restrictDIRList:resource_dir_list,
    getAppropriateKey:getAppropriateKey_resource,
    getDetailSearchAPI:getDetailSearchAPI_resource,
    getFileName:getFileName_resource,
    checkANDwriteOptions:
      {
        isResource:true,
        user:user,
        repository:repository,
        writeModuleWithLog:getCreateWriteStreamWithLog("资源文件",showDetail,limitRetryTimes),
      },
  }
]

fetchTaskQueue()
function fetchTaskQueue(writeListCheckRedundantOptions,isFirstLoad){
  if(!isFirstLoad && writeListCheckRedundantOptions){
    let {getContentInfoPath,isResource,listInfoPath,listData,githubResult}=writeListCheckRedundantOptions
    writeListInfoJson(listInfoPath,listData,{showDetail,limitRetryTimes})
      .then(()=>{
        if(delRedundant) {
          let deleteList=getRedundantList(githubResult,listData,listInfoPath,getContentInfoPath,{isResource,showDetail})
          // size为0，不存在多余文件
          if(deleteList.size===0)return
          if(showDetail)console.log("多余的文件和list有："+deleteList)
          // 重写list
          fs.readJson(listInfoPath)
            .then((obj)=>{
              deleteList.forEach(n=>delete(obj[n]))
              writeListInfoJson(listInfoPath,obj,{showDetail,limitRetryTimes})
                .then(hasDone=>{
                  if(hasDone) console.log("存在多余文件或者list并且已删除!")
                })
            })
            .catch((e)=>{
              console.log("已删除多余文件，但读取list失败！")
            })
        }

      })
  }

  if(taskQueue.length===0){
    // 写入globalSearchSize
    const blog_contentInfoDIR=`${context}/${write_blog_path}`
    const sizeFilename="global-search-size.json"
    getGZipSize(blog_contentInfoDIR,`${context}/src/${sizeFilename}`,0)
    console.log('\n 已写入globalSearchSize')
    return
  }
  // console.log("start check update -----")
  let curTask=taskQueue.shift()
  let {
    writeListInfoName,
    writeDIRPath,
    checkANDwriteOptions,
    initComputeWriteListInfoPath,
    initComputeWriteContentInfoPath,
    initComputeSearchCommand,
    read_restrictDIRList,
    getAppropriateKey,
    getDetailSearchAPI,
    getFileName,
  } = curTask
  const updateNecessaryOptions={
    getAppropriateKey,
    getDetailSearchAPI,
    getFileName,
  }
  const {user,repository,}=checkANDwriteOptions
  if(!read_restrictDIRList)read_restrictDIRList=[null]
  let computeWriteListInfoPath,computeWriteContentInfoPath,computeSearchCommand
  for(let i=0;i<read_restrictDIRList.length;i++){
    if(read_restrictDIRList[i]){
      computeWriteListInfoPath = initComputeWriteListInfoPath(writeDIRPath,writeListInfoName,read_restrictDIRList[i])
      computeWriteContentInfoPath = initComputeWriteContentInfoPath(writeDIRPath,read_restrictDIRList[i])
      computeSearchCommand = initComputeSearchCommand(user,repository,read_restrictDIRList[i])
    }else{
      computeWriteListInfoPath=initComputeWriteListInfoPath(writeDIRPath,writeListInfoName)
      computeWriteContentInfoPath=initComputeWriteContentInfoPath(writeDIRPath)
      computeSearchCommand=initComputeSearchCommand(user,repository)
    }
    getPagesAndConcatData(computeSearchCommand,computeWriteListInfoPath,computeWriteContentInfoPath,checkANDwriteOptions,updateNecessaryOptions)
  }
}


// 分页查询所有内容并且合并
function getPagesAndConcatData(createBlogSearchCommand,getListInfoPath,getContentInfoPath, options,updateNecessaryOptions){
  let allDataListArr=[]
  let pageList=[]
  let dataList=[]
  // 查询分页
  function pagination(searchCommand,curPage){
    dataList.push(
      axios.get(searchCommand,check)
      .then(data=>data.data)
      .catch(function (error) {
        console.log(`第${curPage}页获取失败`);
        console.error(error);
      })
      .then(obj=>allDataListArr=allDataListArr.concat(obj.items))
    )
  }

  axios.get(createBlogSearchCommand(1),check)
    .then(data=>{
      console.log("\n正在获取页数...")
      return data.data
    })
    .catch(function (error) {
      console.log("github获取页数失败");
      console.error(error);
    })
    .then(obj=>{
      let totleCounts=obj["total_count"]
      // console.warn('页数获取总个数：',totleCounts)
      if(totleCounts<=1000 ){
        for(let i=0;i<Math.ceil(totleCounts/per_page);i++){
          if(showDetail)console.log("正在获取第"+(i+1)+"页")
          pageList.push(pagination(createBlogSearchCommand(i+1),i+1))
        }
        axios.all(pageList)
          .then(()=>{
            console.log(`全部页面(${pageList.length})获取完毕`)
            axios.all(dataList)
              .then(()=>{
                // console.warn('实际添加个数：',allDataListArr.length)
                // allDataListArr.forEach(o=>{
                //   console.warn('初始每一个github name：',o.name)
                // })
                checkANDwrite(allDataListArr,getListInfoPath,getContentInfoPath, options,updateNecessaryOptions)
              })
          })
      }
      else {
        console.error("超过1000条数据，需要设定分割条件")
      }
    })
}


// 检查/创建list文件并且判断是否需要更新
function checkANDwrite(githubData,getListInfoPath,getContentInfoPath, options,updateNecessaryOptions) {
  let defaultOptions= {
    customListKeys:["label","createdTime","timeArr","title","titleSHA","summary"],
    isResource:false,
    user,
    repository,
    writeModuleWithLog:null,
    needHref2Absolute:false
  }

  const {
    getAppropriateKey,
    getDetailSearchAPI,
    getFileName,
  }=updateNecessaryOptions

  let finalOptions=Object.assign(defaultOptions,options)
  let listInfoPath=getListInfoPath()
  if(showDetail)console.log("github search成功，开始检查json")
  fs.ensureFile(listInfoPath)
    .then(() => {
      if(showDetail)console.log(`检查成功，开始读取${listInfoPath}`)
      fs.readJson(listInfoPath)
        .then(listData=>{
          if(showDetail)console.log(`${listInfoPath} 读取成功，开始检测sha值`)
          if(Object.prototype.toString.call(listData)!=="[object Object]")listData={}
          // shouldContentUpdate(githubData,listData,listInfoPath,getContentInfoPath,finalOptions)
          let [needUpdateData,newListData]= shouldContentUpdate(githubData,listData,listInfoPath,getContentInfoPath,getFileName,getAppropriateKey,getDetailSearchAPI,{compareProps:['sha'],ignoreSHA,showDetail})
          // console.log(needUpdateData.length)
          return [needUpdateData,newListData]
        })
        .catch(err=>{
          console.log(`${listInfoPath}读取失败，尝试重新创建`)
          let [needUpdateData,newListData]=  shouldContentUpdate(githubData,{},listInfoPath,getContentInfoPath,getFileName,getAppropriateKey,getDetailSearchAPI,{compareProps:['sha'],ignoreSHA,showDetail})
          return [needUpdateData,newListData]
        })
        .then(arr=>{
          const [needUpdateData,listData]=arr
          if(needUpdateData.length===0)return fetchTaskQueue()
          updateListAndContent(needUpdateData,githubData,listData,listInfoPath,getContentInfoPath,finalOptions)
        })
    })
    .catch(err => {
      console.log(`检查${listInfoPath}出现错误，确保fs-extra正确安装！`)
      console.error(err)
    })

}


function updateListAndContent(needUpdateData,githubResult,listData,listInfoPath,getContentInfoPath,options){
  const {  customListKeys,isResource,user,repository,needHref2Absolute,writeModuleWithLog}=options
  if(!writeModuleWithLog)throw new Error('writeModuleWithLog must be set in options')
  for(let i=0;i<needUpdateData.length;i++){
    const {latestDataIdx,curDataKey,contentPath}=needUpdateData[i]

    let parse=path.parse(githubResult[latestDataIdx].path)
    let basename=parse.base
    let resourcedir=parse.dir
    let rawname=parse.name

    const sha1 = crypto.createHash('sha1');
    sha1.update(rawname);
    let titleSHA=sha1.digest('hex')

    let cur_remote_filename=rawname,
      cur_remote_sha=githubResult[latestDataIdx].sha,
      cur_remote_basename=basename,
      // 以下在非resource中处理
      cur_remote_timeArr,
      cur_remote_createdTime

    if(isResource){
      listData[curDataKey].title=cur_remote_filename
      listData[curDataKey].sha=cur_remote_sha
      let encodeBasename=encodeURIComponent(cur_remote_basename)

      // 此处 user 和 repository 可能和config不一致
      axios({
        method:'get',
        url:`https://raw.githubusercontent.com/${user}/${repository}/${branch}/${resourcedir}/${encodeBasename}`,
        responseType:'stream',
        timeout:5000,
        maxRedirects:3,
      })
        .then(response=>{
          writeModuleWithLog(contentPath,response.data,{
            fullBytes:+response.headers["content-length"],
            allTasksCount:needUpdateData.length
          }).then(hasDone=>{
            if(hasDone)fetchTaskQueue({getContentInfoPath,isResource,listInfoPath,listData,githubResult})
          })

        })
        .catch(err=>{
          console.error("当前请求发生错误，配置ignoreSHA设置false，然后重试")
        })
    }
    else{
      // 获取时间
      let dataString=rawname.substr(0,dataType.length)
      let parseDataStr=moment(dataString,dataType,true)
      let isDataValid=parseDataStr.isValid();

      if(isDataValid){
        cur_remote_timeArr=parseDataStr.toArray()
        cur_remote_createdTime=parseDataStr.format("l")
        cur_remote_filename=rawname.substr(dataType.length).replace(/^-/,'')
      }else{
        cur_remote_createdTime="未知日期"
        cur_remote_filename=rawname
        cur_remote_timeArr=[]
      }

      axios.get(`https://api.github.com/repos/${user}/${repository}/git/blobs/${cur_remote_sha}`,check)
        .then(data=>data.data)
        .catch(function (error) {
          console.log("获取"+cur_remote_filename+"文件失败")
          console.log(error);
        })
        .then(obj=>{
          if(showDetail)console.log("获取"+cur_remote_filename+"文件成功，正在写入...")
          let content=base64Decode(obj["content"])

          if(needHref2Absolute)content=href2Absolute(content,needHref2Absolute.abs,needHref2Absolute.isImg)

          if(showDetail)console.log('正在判断是否需要更新具体标签...')
          function checkIfNeedForceUpdated(key,defaultValue){
            return (!(forceUpdate===true || forceUpdate[key]===true) && listData[curDataKey][key]) || defaultValue
          }

          // 计算关键词
          if(showDetail)console.log("正在分析关键词...")
          let filteredLabels=filterExtract(lowercaseKeyWords,obj["content"],cur_remote_filename)


          let summaryStartIdx=0,boundaryLimitIdx=300

          let htmlContent=md2Html(content)
          let htmlSummary=getAppropriateSummary(content,[summaryMinLen,summaryMaxLen],summaryStartIdx,boundaryLimitIdx)


          let getLabel=()=>checkIfNeedForceUpdated("label",filteredLabels)
          let getCreatedTime=()=>checkIfNeedForceUpdated("createdTime",cur_remote_createdTime)
          let getTimeArr=()=>checkIfNeedForceUpdated("timeArr",cur_remote_timeArr)
          let getTitle=()=>checkIfNeedForceUpdated("title",cur_remote_filename)
          let getTitleSHA=()=>checkIfNeedForceUpdated("titleSHA",titleSHA)
          let getSummary=()=>checkIfNeedForceUpdated("summary",htmlSummary)


          if(Array.isArray(customListKeys)){
            let listValue={
              label:getLabel,
              createdTime:getCreatedTime,
              timeArr:getTimeArr,
              title:getTitle,
              titleSHA:getTitleSHA,
              summary:getSummary}
            for(let i=0;i<customListKeys.length;i++){
              let curKey=customListKeys[i]
              listData[curDataKey][curKey]=listValue[curKey]()
            }
          }else{
            throw new Error("customListKeys必须是Array")
          }

          listData[curDataKey].sha=cur_remote_sha

          writeModuleWithLog(contentPath,{content:htmlContent},{
            allTasksCount:needUpdateData.length
          })
            .then(hasDone=>{
              if(hasDone)fetchTaskQueue({getContentInfoPath,isResource,listInfoPath,listData,githubResult})
            })

        })
    }
  }
}
