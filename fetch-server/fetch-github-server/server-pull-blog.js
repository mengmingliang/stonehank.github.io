const axios = require('axios');
const fs = require('fs-extra')
const path=require("path")
const moment = require("moment")
const filterExtract=require('../utils/filterExtract')
const crypto = require('crypto');
const md2Html= require('../utils/md2Html')
const getGZipSize=require('../utils/getGZipSize')
const {base64Decode}=require('../utils/base64-code')
const getAppropriateSummary=require('../utils/getSummary')
const href2Absolute=require('../utils/href2Absolute')

const shouldContentUpdate=require('../utils/shouldContentUpdate')
const getRedundantList=require('../utils/getRedundantList')
const writeListInfoJson=require('../utils/writeListInfoJson')
const {user,repository,branch,per_page,
  dataType,summaryMaxLen,summaryMinLen,keywords,delRedundant,fetchExcludes,
  forceUpdate,ignoreSHA,limitRetryTimes,showDetail}=require('./basic.config')

const {taskQueue,context,token}=require('./advance.config')

// 开始
console.log("项目根目录为："+context,"正在通过github获取数据...")

// 定义github search的header
const authorizationHeader = {
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
  lowercaseKeyWords[cur]=true
}


fetchTaskQueue()
function fetchTaskQueue(writeListCheckRedundantOptions,isFirstLoad){
  if(!isFirstLoad && writeListCheckRedundantOptions){
    let {getWriteContentPath,isResource,writeListPath,listData,fetchResults}=writeListCheckRedundantOptions
    writeListInfoJson(writeListPath,listData,{showDetail,limitRetryTimes})
      .then(()=>{
        if(delRedundant) {
          let deleteList=getRedundantList(fetchResults,listData,writeListPath,getWriteContentPath,{isResource,showDetail})
          // size为0，不存在多余文件
          if(deleteList.size===0)return
          if(showDetail)console.log("多余的文件和list有："+deleteList)
          // 重写list
          fs.readJson(writeListPath)
            .then((obj)=>{
              deleteList.forEach(n=>delete(obj[n]))
              writeListInfoJson(writeListPath,obj,{showDetail,limitRetryTimes})
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
    const blog_contentInfoDIR=`${context}/src/asset/blog`
    const sizeFilename="global-search-size.json"
    getGZipSize(blog_contentInfoDIR,`${context}/src/${sizeFilename}`,0)
    console.log('\n 已写入globalSearchSize')
    return
  }

  let curTask=taskQueue.shift()
  let {
    writeListInfoName,
    writeDIRPath,
    checkAndWriteOptions,
    initGetWriteListPath,
    initGetWriteContentPath,
    initGetFetchResultsAPI,
    read_restrictDIRList,
    getAppropriateKey,
    initGetDetailSearchAPI,
    getFileName,
  } = curTask
  const updateNecessaryOptions={
    getAppropriateKey,
    getFileName,
  }
  // 此处有可能不是config里面的
  const {user,repository}=checkAndWriteOptions
  if(!read_restrictDIRList)read_restrictDIRList=[null]
  let getWriteListPath,getWriteContentPath,getFetchResultsAPI
  const getDetailSearchAPI=initGetDetailSearchAPI(user,repository,branch)
  for(let i=0;i<read_restrictDIRList.length;i++){
    if(read_restrictDIRList[i]){
      getWriteListPath = initGetWriteListPath(writeDIRPath,writeListInfoName,read_restrictDIRList[i])
      getWriteContentPath = initGetWriteContentPath(writeDIRPath,read_restrictDIRList[i])
      getFetchResultsAPI = initGetFetchResultsAPI(user,repository,per_page,read_restrictDIRList[i])
    }else{
      getWriteListPath=initGetWriteListPath(writeDIRPath,writeListInfoName)
      getWriteContentPath=initGetWriteContentPath(writeDIRPath)
      getFetchResultsAPI=initGetFetchResultsAPI(user,repository,per_page)
    }
    getPagesAndConcatData(getFetchResultsAPI,getDetailSearchAPI,getWriteListPath,getWriteContentPath,checkAndWriteOptions,updateNecessaryOptions)
  }
}


// 分页查询所有内容并且合并
function getPagesAndConcatData(getFetchResultsAPI,getDetailSearchAPI,getListWritePath,getWriteContentPath,options,updateNecessaryOptions){
  let fetchResults=[]
  let pageList=[]
  let dataList=[]
  // 查询分页
  function pagination(getFetchResultsAPI,curPage){
    dataList.push(
      axios.get(getFetchResultsAPI,authorizationHeader)
      .then(data=>data.data)
      .catch(function (error) {
        console.log(`第${curPage}页获取失败`);
        console.error(error);
      })
      .then(obj=>fetchResults=fetchResults.concat(obj.items))
    )
  }

  axios.get(getFetchResultsAPI(1),authorizationHeader)
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
          pageList.push(pagination(getFetchResultsAPI(i+1),i+1))
        }
        axios.all(pageList)
          .then(()=>{
            console.log(`全部页面(${pageList.length})获取完毕`)
            axios.all(dataList)
              .then(()=>{

                checkAndWrite(fetchResults,getListWritePath,getWriteContentPath,getDetailSearchAPI,options,updateNecessaryOptions)
              })
          })
      }
      else {
        console.error("超过1000条数据，需要设定分割条件")
      }
    })
}


// 检查/创建list文件并且判断是否需要更新
function checkAndWrite(fetchResults,getListWritePath,getWriteContentPath,getDetailSearchAPI,options,updateNecessaryOptions) {
  let defaultOptions= {
    customListKeys:["relatedTags","createdTime","timeArr","title","uniqueID","summary"],
    isResource:false,
    user,
    repository,
    writeModuleWithLog:null,
    needHref2Absolute:false
  }

  const {
    getAppropriateKey,
    getFileName,
  }=updateNecessaryOptions

  let finalOptions=Object.assign(defaultOptions,options)
  let writeListPath=getListWritePath()
  if(showDetail)console.log("github search成功，开始检查json")
  fs.ensureFile(writeListPath)
    .then(() => {
      if(showDetail)console.log(`检查成功，开始读取${writeListPath}`)
      fs.readJson(writeListPath)
        .then(listData=>{
          if(showDetail)console.log(`${writeListPath} 读取成功，开始检测sha值`)
          if(Object.prototype.toString.call(listData)!=="[object Object]")listData={}

          let [needUpdateData,newListData]=
            shouldContentUpdate(
              fetchResults,
              listData,
              getWriteContentPath,
              getFileName,
              getAppropriateKey,
              {fetchExcludes,compareProps:['sha'],ignoreSHA,showDetail}
              )

          return [needUpdateData,newListData]
        })
        .catch(err=>{
          console.log(`${writeListPath}读取失败，尝试重新创建`)

          let [needUpdateData,newListData]=
            shouldContentUpdate(
              fetchResults,
              {},
              getWriteContentPath,
              getFileName,
              getAppropriateKey,
              {fetchExcludes,compareProps:['sha'],ignoreSHA,showDetail}
              )

          return [needUpdateData,newListData]
        })
        .then(arr=>{
          const [needUpdateData,listData]=arr
          if(needUpdateData.length===0)return fetchTaskQueue()
          updateListAndContent(needUpdateData,fetchResults,listData,writeListPath,getWriteContentPath,getDetailSearchAPI,finalOptions)
        })
    })
    .catch(err => {
      console.log(`检查${writeListPath}出现错误，确保fs-extra正确安装！`)
      console.error(err)
    })

}


function updateListAndContent(needUpdateData,fetchResults,listData,writeListPath,getWriteContentPath,getDetailSearchAPI,options){
  const {  customListKeys,isResource,user,repository,needHref2Absolute,writeModuleWithLog}=options
  if(!writeModuleWithLog)throw new Error('writeModuleWithLog must be set in options')
  for(let i=0;i<needUpdateData.length;i++){
    const {latestDataIdx,curDataKey,contentPath}=needUpdateData[i]

    let parse=path.parse(fetchResults[latestDataIdx].path)
    let basename=parse.base
    let resourcedir=parse.dir
    let rawname=parse.name

    const sha1 = crypto.createHash('sha1');
    sha1.update(rawname);
    let uniqueID=sha1.digest('hex')

    let cur_remote_filename=rawname,
      cur_remote_sha=fetchResults[latestDataIdx].sha,
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
            if(hasDone)fetchTaskQueue({getWriteContentPath,isResource,writeListPath,listData,fetchResults})
          })

        })
        .catch(err=>{
          console.error("当前请求发生错误，配置ignoreSHA设置false，然后重试")
        })
    }
    else{
      // 获取时间
      let dataString=rawname.trim().substr(0,dataType.length)
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

      axios.get(`https://api.github.com/repos/${user}/${repository}/git/blobs/${cur_remote_sha}`,authorizationHeader)
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


          let getLabel=()=>checkIfNeedForceUpdated("relatedTags",filteredLabels)
          let getCreatedTime=()=>checkIfNeedForceUpdated("createdTime",cur_remote_createdTime)
          let getTimeArr=()=>checkIfNeedForceUpdated("timeArr",cur_remote_timeArr)
          let getTitle=()=>checkIfNeedForceUpdated("title",cur_remote_filename)
          let getUniqueID=()=>checkIfNeedForceUpdated("uniqueID",uniqueID)
          let getSummary=()=>checkIfNeedForceUpdated("summary",htmlSummary)


          if(Array.isArray(customListKeys)){
            let listValue={
              relatedTags:getLabel,
              createdTime:getCreatedTime,
              timeArr:getTimeArr,
              title:getTitle,
              uniqueID:getUniqueID,
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
              if(hasDone)fetchTaskQueue({getWriteContentPath,isResource,writeListPath,listData,fetchResults})
            })

        })
    }
  }
}
