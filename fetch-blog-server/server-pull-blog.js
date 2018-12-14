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
const getWriteJsonWithLog=require('./utils/writeJsonWithLog')
const getCreateWriteStreamWithLog=require('./utils/createWriteStreamWithLog')


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


// 分页查询所有内容并且合并
function getPagesAndConcatData(createBlogSearchCommand,getListInfoPath,getContentInfoPath, options){
  let allDataListArr=[]
  let pageList=[]

  // 查询分页
  function pagination(searchCommand,i){
    return axios.get(searchCommand,check)
      .then(data=>data.data)
      .catch(function (error) {
        console.log(`第${i}页获取失败`);
        console.error(error);
      })
      .then(obj=>allDataListArr=allDataListArr.concat(obj.items))
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
    if(totleCounts<=1000 ){
      for(let i=0;i<Math.ceil(totleCounts/per_page);i++){
        if(showDetail)console.log("正在获取第"+(i+1)+"页")
        pageList.push(pagination(createBlogSearchCommand(i+1),i+1))
      }
      axios.all(pageList)
        .then(()=>{
          console.log(`全部页面(${pageList.length})获取完毕`)
          checkANDwrite(allDataListArr,getListInfoPath,getContentInfoPath, options)
        })
    }
    else {
      console.error("超过1000条数据，需要设定分割条件")
    }
  })
}


// 检查/创建list文件并且判断是否需要更新
function checkANDwrite(githubData,getListInfoPath,getContentInfoPath, options) {
  let defaultOptions= {
    cus_extension:null,
    customListKeys:["label","createdTime","timeArr","title","titleSHA","summary"],
    isResource:false,
    user,
    repository,
    writeModuleWithLog:null,
    needHref2Absolute:false
  }

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
          checkIfNeedUpdated(githubData,listData,listInfoPath,getContentInfoPath,finalOptions)
        })
        .catch(err=>{
          console.log(`${listInfoPath}读取失败，尝试重新创建`)
          checkIfNeedUpdated(githubData,{},listInfoPath,getContentInfoPath,finalOptions)
        })
    })
    .catch(err => {
      console.log(`检查${listInfoPath}出现错误，确保fs-extra正确安装！`)
      console.error(err)
    })

}

let taskQueue=[
  {
    writeListInfoName:`_blog-data.json`,
    writeDIRPath:`${context}/${write_blog_path}`,
    initComputeWriteListInfoPath:(writeDIRPath,writeListInfoName)=>()=>`${writeDIRPath}/${writeListInfoName}`,
    initComputeWriteContentInfoPath:(writeDIRPath)=>(filename)=>`${writeDIRPath}/${filename}`,
    initComputeSearchCommand:(user,repository)=>(page)=>`https://api.github.com/search/code?q=repo:${user}/${repository}+extension:md&per_page=${per_page}&page=${page}`,
    read_restrictDIRList:null,
    checkANDwriteOptions:
      { cus_extension:'.json',
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
    initComputeSearchCommand:(user,repository)=>(page)=>`https://api.github.com/search/code?q=repo:${user}/${repository}+filename:navigation&per_page=${per_page}&page=${page}`,
    read_restrictDIRList:null,
    checkANDwriteOptions:
      { cus_extension:'.json',
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
    initComputeSearchCommand:(user,repository,restrictPath)=>(page)=>`https://api.github.com/search/code?q=repo:${user}/${repository}+path:${restrictPath}&per_page=${per_page}&page=${page}`,
    read_restrictDIRList:resource_dir_list,
    checkANDwriteOptions:
      { isResource:true,
        user:user,
        repository:repository,
        writeModuleWithLog:getCreateWriteStreamWithLog("资源文件",showDetail,limitRetryTimes),
      },
  }
]


function writeListInfoJson(listInfoPath,listData,retryTimes=0){
  if(!listInfoPath || listData==null)throw new Error('Must be have path or data')
  let writeListWithLog=getWriteJsonWithLog("写入List",showDetail)
  return writeListWithLog(listInfoPath,listData)
    .then(hasDone=>{
      if(hasDone){
        if(showDetail)console.log(`正在检查格式是否正确...`)
        try{
          fs.readJsonSync(listInfoPath)
          if(showDetail)console.log(`${listInfoPath} 检查成功！`)
        }catch(err) {
          if(retryTimes===limitRetryTimes)throw new Error(`写入失败，超出重试次数，请删除${listInfoPath}再次尝试`)
          else{
            retryTimes++
            if(showDetail)console.log(`${listInfoPath} 检查失败，尝试重新创建！`)
            writeListInfoJson(listInfoPath,listData,retryTimes)
          }
        }
      }
    })
    .catch(err=>{
      throw new Error('something wrong on write-list?')
    })
}


function tryDelredundant(getContentInfoPath,isResource,listInfoPath,listData,githubResult){
  // 检查asset目录，删除多余文件
  let contentInfoDIR=getContentInfoPath('')
  // 读取文件夹中存在的内容
  fs.readdir(contentInfoDIR,function(e,fileData){
    if(e)console.error(e)
    let set=new Set()
    // 将当前github结果 hash化
    for(let i=0;i<githubResult.length;i++){
      let  parse=path.parse(githubResult[i].name)
      let rawname=parse.name
      let githubTitle
      // if(finalOptions.isResource)githubTitle=rawname
      if(isResource)githubTitle=rawname
      else{
        const sha1 = crypto.createHash('sha1');
        sha1.update(rawname);
        githubTitle=sha1.digest('hex')
      }
      set.add(githubTitle)
    }
    // 忽略的文件
    let not_delete_list_name=path.parse(listInfoPath).base
    let deleteList=new Set()

    // 检测文件夹中list是否有多余
    for(let key in listData){
      if(!set.has(key)){
        deleteList.add(key)
      }
    }

    // 检测文件夹中文件是否有多余
    for(let i=0;i<fileData.length;i++){
      if(fileData[i]===not_delete_list_name)continue
      let parse=path.parse(fileData[i])
      let rawname=parse.name

      if(!set.has(rawname)){
        deleteList.add(rawname)
        fs.remove(contentInfoDIR+'/'+fileData[i])
          .then(() => {
            if(showDetail)console.log('成功删除'+fileData[i])
          })
          .catch(err => {
            console.error(err)
          })
      }
    }
    // size为0，不存在多余文件
    if(deleteList.size===0)return
    if(showDetail)console.log("多余的文件和list有："+deleteList)
    // 重写list
    fs.readJson(listInfoPath)
      .then((obj)=>{
        deleteList.forEach(n=>delete(obj[n]))
        writeListInfoJson(listInfoPath,obj)
          .then(hasDone=>{
            if(hasDone) console.log("存在多余文件或者list并且已删除!")
          })
      })
      .catch((e)=>{
        console.log("已删除多余文件，但读取list失败！")
      })
  })

}


fetchTaskQueue()
function fetchTaskQueue(writeListCheckRedundantOptions,isFirstLoad){
  if(!isFirstLoad && writeListCheckRedundantOptions){
    let {getContentInfoPath,isResource,listInfoPath,listData,githubResult}=writeListCheckRedundantOptions
    writeListInfoJson(listInfoPath,listData)
      .then(()=>{
        if(delRedundant)
          tryDelredundant(getContentInfoPath,isResource,listInfoPath,listData,githubResult)
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

  let curTask=taskQueue.shift()
  let {
    writeListInfoName,
    writeDIRPath,
    checkANDwriteOptions,
    initComputeWriteListInfoPath,
    initComputeWriteContentInfoPath,
    initComputeSearchCommand,
    read_restrictDIRList
  } = curTask
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
    getPagesAndConcatData(computeSearchCommand,computeWriteListInfoPath,computeWriteContentInfoPath,checkANDwriteOptions)
  }
}


// 执行listInfo和contentInfo的更新，需要先确定文件存在，读取文件内容(用来判断是否可以不更新一些key)
function checkIfNeedUpdated(githubResult,listData, listInfoPath, getContentInfoPath, finalOptions) {
  const {  cus_extension,customListKeys,isResource,user,repository,needHref2Absolute,writeModuleWithLog}=finalOptions
  // if(!fileWrittingQueue)throw new Error('fileWrittingQueue must be set in options')
  if(!writeModuleWithLog)throw new Error('writeModuleWithLog must be set in options')
  let pristine=true
  let fetchQueue=[]
  for(let i=0;i<githubResult.length;i++){
    // 解析path和name和ext等
    let cur=githubResult[i];
    let parse=path.parse(cur.path)
    let initExtension=parse.ext
    let basename=parse.base
    let resourcedir=parse.dir
    let rawname=parse.name


    // titleSHA 用于blog_list的key，url和disqus的identify
    const sha1 = crypto.createHash('sha1');
    sha1.update(rawname);
    let titleSHA=sha1.digest('hex')

    // 排除
    if(fetchExcludes.includes(rawname))continue

    let cur_remote_filename=rawname,
        cur_remote_sha=cur.sha,
        cur_remote_basename=basename,
        // 以下在非resource中处理
        cur_remote_timeArr,
        cur_remote_createdTime


    let appropriateKey

    if(isResource)appropriateKey=cur_remote_filename
    else appropriateKey=titleSHA


    // blog用sha做名称
    let contentPath_sha=getContentInfoPath(cus_extension?titleSHA+cus_extension:titleSHA+initExtension)
    // 资源用原名，因为文件内部可能有引用资源原名
    let contentPath_filename=getContentInfoPath(cus_extension?cur_remote_filename+cus_extension:cur_remote_filename+initExtension)

    function checkFile(){
      let noExist=false
      try{
        fs.accessSync(contentPath_sha, fs.constants.F_OK)
      }catch(err){
        try{
          fs.accessSync(contentPath_filename, fs.constants.F_OK)
        }catch (e) {
          noExist=true
        }
      }
      return noExist
    }


    if(ignoreSHA || !listData[appropriateKey] || listData[appropriateKey].sha!==cur_remote_sha || checkFile()){
      pristine=false
      if(!listData[appropriateKey]) listData[appropriateKey]={}
      if(showDetail)if(!ignoreSHA)console.log("找到不存在/不匹配的，name为"+cur_remote_filename)

      let curFetch

      // 写入resource 或者 blog的content，listInfo在最后统一axios.all()写入，确保不会有漏
      if(isResource){
        listData[appropriateKey].title=cur_remote_filename
        listData[appropriateKey].sha=cur_remote_sha
        let encodeBasename=encodeURIComponent(cur_remote_basename)

        // let resorceWriteStream
        curFetch=axios({
          method:'get',
          url:`https://raw.githubusercontent.com/${user}/${repository}/${branch}/${resourcedir}/${encodeBasename}`,
          responseType:'stream',
          timeout:5000,
          maxRedirects:3,
        })
          .then(response=>{
            writeModuleWithLog(contentPath_filename,response.data,{
              fullBytes:+response.headers["content-length"],
              allTasksCount:fetchQueue.length
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

        curFetch= axios.get(`https://api.github.com/repos/${user}/${repository}/git/blobs/${cur_remote_sha}`,check)
          .then(data=>data.data)
          .catch(function (error) {
            console.log("获取"+cur_remote_filename+"文件失败")
            console.log(error);
          })
          .then(obj=>{
            if(showDetail)console.log("获取"+cur_remote_filename+"文件成功，正在写入...")
            let content=base64Decode(obj["content"])
            // const content=Base64.decode(obj["content"])

            if(needHref2Absolute)content=href2Absolute(content,needHref2Absolute.abs,needHref2Absolute.isImg)
            // 计算摘要开始未知
            // let tryStart=getHighDensity(content,0.3,summaryMaxLen)
            // let summaryStart=content.substr(tryStart).match(/(\n+)[\u4E00-\u9FA5]/)
            // if(summaryStart)summaryStart=summaryStart.index+tryStart

            let summaryStart=0

            if(showDetail)console.log('正在判断是否需要更新具体标签...')
            function checkIfNeedForceUpdated(key,defaultValue){
              return (!(forceUpdate===true || forceUpdate[key]===true) && listData[appropriateKey][key]) || defaultValue
            }


            // 计算关键词
            if(showDetail)console.log("正在分析关键词...")
            let filteredLabels=filterExtract(lowercaseKeyWords,obj["content"],cur_remote_filename)


            let htmlContent=md2Html(content)
            let htmlSummary=getAppropriateSummary(content,[summaryMinLen,summaryMaxLen])



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
                listData[appropriateKey][curKey]=listValue[curKey]()
              }
            }else{
              throw new Error("customListKeys必须是Array")
            }



            listData[appropriateKey].sha=cur_remote_sha


            writeModuleWithLog(contentPath_sha,{content:htmlContent},{
              allTasksCount:fetchQueue.length
            })
              .then(hasDone=>{
                if(hasDone)fetchTaskQueue({getContentInfoPath,isResource,listInfoPath,listData,githubResult})
              })

          })
      }
      fetchQueue.push(curFetch)
    }
  }

  if(pristine){
    console.log("未发现变化，无须更新")
      fetchTaskQueue()
  }
  if(ignoreSHA){
    console.log("\n强制更新开启\n")
  }
}


