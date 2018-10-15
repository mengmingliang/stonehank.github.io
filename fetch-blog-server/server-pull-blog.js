const axios = require('axios');
const fs = require('fs-extra')
const path=require("path")
const Base64 = require('js-base64').Base64;
const moment = require("moment")
const slash = require('slash');
const appRoot = require('app-root-path');
const ProgressRemider=require('./progress_remider')
const filterExtract=require('./filterExtract')


// 获取根目录
const context=slash(appRoot.path)

// 获取配置信息
const config_json_path=`${context}/fetch-blog-server/blog-config.json`
let config
try{
  config=fs.readJsonSync(config_json_path)
}catch(err){
  console.log(`获取配置出现错误，确保fs-extra正确安装以及${config_json_path}存在`)
}

// 开始
console.log("项目根目录为："+context,"正在通过github获取数据...")
const {user,repository,branch,per_page,forceUpdate,dataType,token,ignoreSHA,summaryLength,retry_times,resource_dir_list,keywords,showDetail}=config
// 判断blog是否完成，完成blog后才执行资源
let fetchBlogHasDone
// 用于保存获取的github数据，用于发生错误重复执行
let  githubData=null
let retryTimes=retry_times
// valid的tags集合
let lowercaseKeyWords={}
// 创建写入列表，用于显示progress
let fileWritingList=new ProgressRemider("资源文件",showDetail)
let blogWritingList=new ProgressRemider("blog文件",showDetail)
// 定义github search的header
let check = {
  headers: {
    'Accept': 'application/vnd.github.squirrel-girl-preview+json',
    Authorization:`token ${token}  `
  },
}
// 填充valid的tags
for(let i=0;i<keywords.length;i++){
  let cur=keywords[i].toLowerCase()
  lowercaseKeyWords[cur]=1
}


// 获取blog
const blog_listInfoPath=`${context}/src/asset/_blog-data.json`
const blog_contentInfoDIR=`${context}/src/asset`
const blog_searchCommand=`https://api.github.com/search/code?q=repo:${user}/${repository}+extension:md&per_page=${per_page}`
let getBlogContentInfoPath=(filename)=>`${blog_contentInfoDIR}/${filename}`
let getBlogListInfoPath=()=>blog_listInfoPath
checkANDwrite(blog_searchCommand,getBlogListInfoPath,getBlogContentInfoPath,{cus_extension:'.json'})


// 获取resource
function fetchResource(){
  const resource_DIR=`${context}/public`
  // blog全部获取完成后，获取资源
  for(let i=0;i<resource_dir_list.length;i++){
    const resoucre_searchCommand=`https://api.github.com/search/code?q=repo:${user}/${repository}+path:${resource_dir_list[i]}`
    const resource_contentInfoDIR=resource_DIR+`/articles/${resource_dir_list[i]}`
    const resource_listInfoPath=`${resource_contentInfoDIR}/_${resource_dir_list[i]}-listInfo.json`
    const getResource_listInfoPath=()=>resource_listInfoPath
    const getResource_contentInfoPath=(filename)=>`${resource_contentInfoDIR}/${filename}`
    checkANDwrite(resoucre_searchCommand,getResource_listInfoPath,getResource_contentInfoPath,{isResource:true})
  }
}


// 写入list文件
function writelistInfoJson(listInfoPath,listData,result,getContentInfoPath,finalOptions){
  fs.writeJson(listInfoPath,listData,{spaces:'\t'})
    .then(()=>{
      if(showDetail)console.log(`${listInfoPath} 写入成功，检查...`)
      fs.readJson(listInfoPath)
        .then(()=>{
          if(showDetail)console.log(`${listInfoPath} 检查成功！`)
        })
    })
    .catch(err=>{
      if(retryTimes===0){
        console.log("超出重试次数，请尝试手动删除后再执行")
      }
      console.log(`写入${listInfoPath}失败或者格式错误，准备删除重新创建...`)
      retryTimes--
      fs.remove(listInfoPath)
      checkIfNeedUpdated(result,{},listInfoPath,getContentInfoPath,finalOptions)
    })
}






// 根据密度获取摘要
// function getHighDensity(content,density){
//   function checkIsCN(s){ return /[\u4E00-\u9FA5]/.test(s)}
//   let p=0,numCN=0,result=0,aux=Array(content.length).fill(0)
//   for(let i=0;i<content.length;i++){
//     let isCN=checkIsCN(content[i])
//     if(isCN){aux[i]=1;numCN++}
//     if(i>summaryLength-1){
//       numCN-=aux[(i-summaryLength)]
//       p=(numCN)/summaryLength
//     }
//     if(p>=density){result=i;break}
//   }
//   return result
// }




// 检查/创建list文件并且判断是否需要更新
function checkANDwrite(searchCommand,getListInfoPath,getContentInfoPath,
                       options) {
  let defaultOptions= {
    cus_extension:null,
    customListKeys:["label","createdTime","timeArr","title","summary"],
    isResource:false
  }
  let finalOptions=Object.assign(defaultOptions,options)

  let listInfoPath=getListInfoPath()
  function searchGithub(searchCommand){
    return axios.get(searchCommand,check)
      .then(data=>data.data)
      .catch(function (error) {
        console.log("github search失败");
        console.error(error);
      })
  }
  searchGithub(searchCommand)
    .then(obj=>{
      githubData=obj.items
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
    })
}




// 执行listInfo和contentInfo的更新，需要先确定文件存在，读取文件内容(用来判断是否可以不更新一些key)
function checkIfNeedUpdated(result,listData, listInfoPath, getContentInfoPath, finalOptions)
{
  const {  cus_extension,customListKeys,isResource}=finalOptions
  let pristine=true
  let fetchQueue=[]
  for(let i=0;i<result.length;i++){
    let cur=result[i];
    let parse=path.parse(cur.path)

    let initExtension=parse.ext
    let basename=parse.base
    let resourcedir=parse.dir
    let rawname=parse.name

    // 获取时间
    let moment_splitTimeName=moment(rawname,dataType);
    let cur_remote_createdTime,
      cur_remote_filename,
      cur_remote_sha=cur.sha,
      cur_remote_timeArr,
      cur_remote_basename=basename

    if(moment_splitTimeName.isValid()){
      cur_remote_timeArr=moment_splitTimeName.toArray()
      cur_remote_createdTime=moment_splitTimeName.format("l")
      cur_remote_filename=moment_splitTimeName.parsingFlags().unusedInput[0].replace(/^-/,'')
    }else{
      cur_remote_createdTime="未知日期"
      cur_remote_filename=rawname
      cur_remote_timeArr=[]
    }

    let contentInfoPath=getContentInfoPath(cus_extension?cur_remote_sha+cus_extension:cur_remote_sha+initExtension)
    function checkFile(){
      let noExist=false
      try{
        fs.accessSync(contentInfoPath, fs.constants.F_OK)
      }catch(err){
        noExist=true
      }
      return noExist
    }


    if(ignoreSHA || !listData[cur_remote_filename] || listData[cur_remote_filename].sha!==cur_remote_sha || checkFile()){
      pristine=false
      if(!listData[cur_remote_filename]) listData[cur_remote_filename]={}
      if(showDetail)if(!ignoreSHA)console.log("找到不存在/不匹配的，name为"+cur_remote_filename)

      let curFetch
      // 写入resource 或者 blog的content，listInfo在最后统一axios.all()写入，确保不会有漏
      if(isResource){
        listData[cur_remote_filename].title=cur_remote_filename
        listData[cur_remote_filename].sha=cur_remote_sha
        let encodeBasename=encodeURIComponent(cur_remote_basename)



        let resorceWriteStream

        curFetch=axios({
          method:'get',
          url:`https://raw.githubusercontent.com/${user}/${repository}/${branch}/${resourcedir}/${encodeBasename}`,
          responseType:'stream',
          timeout:5000,
          maxRedirects:3,

        })
          .then(response=>{
            response.data.pipe(resorceWriteStream=fs.createWriteStream(contentInfoPath))
            if(showDetail)console.log(`${resorceWriteStream.path}正在写入...`)
            fileWritingList.addTask(resorceWriteStream.path)
            let read=0
            let fullBytes=+response.headers["content-length"]
            response.data.on("data",function(data){
              read+=data.length
              fileWritingList.fetching(read,fullBytes,fetchQueue.length)
            })
            resorceWriteStream.close=function(){
              fileWritingList.doneTask(resorceWriteStream.path,fetchQueue.length,read,fullBytes)
            }
          })
          .catch(err=>{
            console.error("当前请求发生错误，配置ignoreSHA设置false，然后重试")
          })
      }
      else{
        curFetch= axios.get(`https://api.github.com/repos/${user}/${repository}/git/blobs/${cur_remote_sha}`,check)
          .then(data=>data.data)
          .catch(function (error) {
            console.log("获取"+cur_remote_filename+"文件失败")
            console.log(error);
          })
          .then(obj=>{
            if(showDetail)console.log("获取"+cur_remote_filename+"文件成功，正在写入...")
            const content=Base64.decode(obj["content"])


            // 计算摘要开始未知
            // let tryStart=getHighDensity(content,0.3)
            // let summaryStart=content.substr(tryStart).match(/(\n+)[\u4E00-\u9FA5]/)
            // if(summaryStart)summaryStart=summaryStart.index+tryStart

            let summaryStart=0

            if(showDetail)console.log('正在判断是否需要更新具体标签...')
            function checkIfNeedForceUpdated(key,value){
              return (!(forceUpdate===true || forceUpdate[key]===true) && listData[cur_remote_filename][key]) || value
            }


            // 计算关键词
            if(showDetail)console.log("正在分析关键词...")
            let filteredLabels=filterExtract(lowercaseKeyWords,obj["content"],cur_remote_filename)



            let getLabel=()=>checkIfNeedForceUpdated("label",filteredLabels)
            let getCreatedTime=()=>checkIfNeedForceUpdated("createdTime",cur_remote_createdTime)
            let getTimeArr=()=>checkIfNeedForceUpdated("timeArr",cur_remote_timeArr)
            let getTitle=()=>checkIfNeedForceUpdated("title",cur_remote_filename)
            let getSummary=()=>checkIfNeedForceUpdated("summary",content.substr(summaryStart,summaryLength)
              .replace(/-{3,}/,'').replace(/(^|\n|\s)+#{1,3}\s/g,"#### ")+"...")


            if(Array.isArray(customListKeys)){
              let listValue={
                label:getLabel,
                createdTime:getCreatedTime,
                timeArr:getTimeArr,
                title:getTitle,
                summary:getSummary}
              for(let i=0;i<customListKeys.length;i++){
                let curKey=customListKeys[i]
                listData[cur_remote_filename][curKey]=listValue[curKey]()
              }
            }else{
              console.error("customListKeys必须是Array")
            }



            listData[cur_remote_filename].sha=cur_remote_sha


            let contentInfoPath=getContentInfoPath(cus_extension?cur_remote_sha+cus_extension:cur_remote_sha+initExtension)
            blogWritingList.addTask(contentInfoPath)



            fs.outputJson(contentInfoPath,{content},{spaces:2},function(err){
              if(err){
                console.log(`写入${cur_remote_filename}失败，尝试重新写入`)
                try{
                  fs.outputJsonSync(contentInfoPath,{content},{spaces:2})
                  fetchBlogHasDone=blogWritingList.doneTask(contentInfoPath,fetchQueue.length,1,1)
                }
                catch(e){console.log(`写入${cur_remote_filename}失败！尝试手动添加`)}
              }
              else{
                fetchBlogHasDone=blogWritingList.doneTask(contentInfoPath,fetchQueue.length,1,1)
              }
              if(fetchBlogHasDone){
                fetchResource()
              }
            })
          })
      }
      fetchQueue.push(curFetch)
    }
  }
  // 所有list数据准备完成后，再一次性写入

  axios.all(fetchQueue).then(()=>writelistInfoJson(listInfoPath,listData,result,getContentInfoPath,finalOptions))
    .then(()=>{
      if(showDetail)console.log("list全部写入完成！")
    })

  if(pristine){
    console.log("未发现变化，无须更新")
    if(!fetchBlogHasDone){
      fetchBlogHasDone=true
      fetchResource()
    }
  }
  if(ignoreSHA){
    console.log("\n强制更新开启\n")
  }
}


