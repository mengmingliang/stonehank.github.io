const axios = require('axios');
const fs = require('fs-extra')
const path=require("path")
const Base64 = require('js-base64').Base64;
const moment = require("moment")
const slash = require('slash');
const appRoot = require('app-root-path');
const ProgressRemider=require('./progress_remider')
const filterExtract=require('./filterExtract')
const crypto = require('crypto');


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
const {user,repository,branch,per_page,
  dataType,summaryLength,resource_dir_list,keywords,delRedundance,fetchExcludes,
  forceUpdate,ignoreSHA,retry_times,showDetail}=config
// 判断blog是否完成，完成blog后才执行资源
let fetchBlogHasDone
let hasFetchResource=false
// 用于保存获取的github数据，用于发生错误重复执行
let  githubData=null
let retryTimes=retry_times

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

// valid的tags集合
let lowercaseKeyWords={}
// 填充valid的tags(keyword)
for(let i=0;i<keywords.length;i++){
  let cur=keywords[i].toLowerCase()
  lowercaseKeyWords[cur]=1
}


// 获取blog
const blog_list_name=`_blog-data.json`
const blog_listInfoPath=`${context}/src/asset/${blog_list_name}`
const blog_contentInfoDIR=`${context}/src/asset`
// 动态页码查询命令
const createBlogSearchCommand=(page)=>`https://api.github.com/search/code?q=repo:${user}/${repository}+extension:md&per_page=${per_page}&page=${page}`

let getBlogContentInfoPath=(filename)=>`${blog_contentInfoDIR}/${filename}`
let getBlogListInfoPath=()=>blog_listInfoPath

getPagesAndConcatData(createBlogSearchCommand,getBlogListInfoPath,getBlogContentInfoPath,{cus_extension:'.json'})


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
          if(showDetail)console.log("全部页面获取完毕")
          checkANDwrite(allDataListArr,getListInfoPath,getContentInfoPath, options)
        })
    }
    else {
      console.error("超过1000条数据，需要设定分割条件")
    }
  })
}


// 检查/创建list文件并且判断是否需要更新
function checkANDwrite(githubData,getListInfoPath,getContentInfoPath,
                       options) {
  let defaultOptions= {
    cus_extension:null,
    customListKeys:["label","createdTime","timeArr","title","titleSHA","summary"],
    isResource:false
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

// 获取global-search文件size

function getSize(assetFilePath,userConfigPath,sizeSum){
  let files=fs.readdirSync(assetFilePath)
  files.forEach(file=>{
    if(file==="_blog-data.json")return
    let status=fs.statSync(assetFilePath+'/'+file)
    if(status.isDirectory())console.error("asset目录中存在目录")
    sizeSum+=status.size
  })
  fs.writeJsonSync(userConfigPath,{size:Math.floor(sizeSum/1024/2)})
}




// 获取resource
function fetchResource(){
  if(hasFetchResource)return
  hasFetchResource=true
  const resource_DIR=`${context}/public`
  // 写入globalSearchSize
  const sizeFilename="global-search-size.json"
  getSize(blog_contentInfoDIR,`${context}/src/${sizeFilename}`,0)

  // blog全部获取完成后，获取资源
  for(let i=0;i<resource_dir_list.length;i++){


    // 动态页码查询命令
    const createResourceSearchCommand=(page)=>`https://api.github.com/search/code?q=repo:${user}/${repository}+path:${resource_dir_list[i]}&page=${page}`

    // const resoucre_searchCommand=`https://api.github.com/search/code?q=repo:${user}/${repository}+path:${resource_dir_list[i]}`
    const resource_contentInfoDIR=resource_DIR+`/articles/${resource_dir_list[i]}`
    const resource_listInfoPath=`${resource_contentInfoDIR}/_${resource_dir_list[i]}-listInfo.json`
    const getResource_listInfoPath=()=>resource_listInfoPath
    const getResource_contentInfoPath=(filename)=>`${resource_contentInfoDIR}/${filename}`

    getPagesAndConcatData(createResourceSearchCommand,getResource_listInfoPath,getResource_contentInfoPath,{isResource:true})
    // checkANDwrite(resoucre_searchCommand,getResource_listInfoPath,getResource_contentInfoPath,{isResource:true})
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





// 执行listInfo和contentInfo的更新，需要先确定文件存在，读取文件内容(用来判断是否可以不更新一些key)
function checkIfNeedUpdated(result,listData, listInfoPath, getContentInfoPath, finalOptions) {
  const {  cus_extension,customListKeys,isResource}=finalOptions
  let pristine=true
  let fetchQueue=[]
  for(let i=0;i<result.length;i++){
    // 解析path和name和ext等
    let cur=result[i];
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

    if(finalOptions.isResource)appropriateKey=cur_remote_filename
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

        let resorceWriteStream
        curFetch=axios({
          method:'get',
          url:`https://raw.githubusercontent.com/${user}/${repository}/${branch}/${resourcedir}/${encodeBasename}`,
          responseType:'stream',
          timeout:5000,
          maxRedirects:3,

        })
          .then(response=>{
            response.data.pipe(resorceWriteStream=fs.createWriteStream(contentPath_filename))
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
            const content=Base64.decode(obj["content"])


            // 计算摘要开始未知
            // let tryStart=getHighDensity(content,0.3)
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



            let getLabel=()=>checkIfNeedForceUpdated("label",filteredLabels)
            let getCreatedTime=()=>checkIfNeedForceUpdated("createdTime",cur_remote_createdTime)
            let getTimeArr=()=>checkIfNeedForceUpdated("timeArr",cur_remote_timeArr)
            let getTitle=()=>checkIfNeedForceUpdated("title",cur_remote_filename)
            let getTitleSHA=()=>checkIfNeedForceUpdated("titleSHA",titleSHA)
            let getSummary=()=>checkIfNeedForceUpdated("summary",content.substr(summaryStart,summaryLength)
              .replace(/-{3,}/,'').replace(/(^|\n|\s)+#{1,3}\s/g,"#### ")+"...")


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
              console.error("customListKeys必须是Array")
            }



            listData[appropriateKey].sha=cur_remote_sha


            // let contentPath_sha=getContentInfoPath(cus_extension?titleSHA+cus_extension:titleSHA+initExtension)
            blogWritingList.addTask(contentPath_sha)



            fs.outputJson(contentPath_sha,{content},{spaces:2},function(err){
              if(err){
                console.log(`写入${cur_remote_filename}失败，尝试重新写入`)
                try{
                  fs.outputJsonSync(contentPath_sha,{content},{spaces:2})
                  fetchBlogHasDone=blogWritingList.doneTask(contentPath_sha,fetchQueue.length,1,1)
                }
                catch(e){console.log(`写入${cur_remote_filename}失败！尝试手动添加`)}
              }
              else{
                fetchBlogHasDone=blogWritingList.doneTask(contentPath_sha,fetchQueue.length,1,1)
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
      if(!delRedundance)return

      // 检查asset目录，删除多余文件
      let contentInfoDIR=getContentInfoPath('')
      // 读取文件夹中存在的内容
      fs.readdir(contentInfoDIR,function(e,fileData){
        if(e)console.error(e)
        let set=new Set()
        // 将当前github结果 hash化
        for(let i=0;i<result.length;i++){
          let  parse=path.parse(result[i].name)
          let rawname=parse.name
          let githubTitle
          if(finalOptions.isResource)githubTitle=rawname
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
            fs.writeJson(listInfoPath,obj,{spaces:'\t'})
              .then(()=>{
                console.log("存在多余文件或者list并且已删除!")
              })
          })
          .catch((e)=>{
            console.log("已删除多余文件，但读取list失败！")
          })
      })
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


