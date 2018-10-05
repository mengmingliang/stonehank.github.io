const axios = require('axios');
const fs = require('fs-extra')
const path=require("path")
const Base64 = require('js-base64').Base64;
const {getWeightExtract}=require("./fetch-blog-server/compute-label")
const moment = require("moment")
const slash = require('slash');
const appRoot = require('app-root-path');
// var myModule = require(appRoot + process.cwd());
const request=require("request")


function writelistInfoJson(listInfoPath,listData,result,getContentInfoPath,finalOptions){
  fs.writeJson(listInfoPath,listData,{spaces:'\t'})
    .then(()=>{
      console.log(`${listInfoPath} 写入成功，检查...`)
      fs.readJson(listInfoPath)
        .then(()=>{
          console.log(`${listInfoPath} 检查成功！`)
          // if(i&& i===result.length-1){
          //   console.log("全部完成，重试了"+(retry_times-retryTimes)+"次")
          //   // process.exit()
          // }
        })
    })
    .catch(err=>{
      if(retryTimes===0){
        console.log("超出重试次数，请尝试手动删除后再执行")
        // process.exit()
      }
      console.log(`写入${listInfoPath}失败或者格式错误，准备删除重新创建...`)
      retryTimes--
      fs.remove(listInfoPath)
      checkIfNeedUpdated(result,{},listInfoPath,getContentInfoPath,finalOptions)
    })
}

// console.log(process.cwd())
// console.log(slash(appRoot.path))
// const context=slash(process.cwd())

const context=slash(appRoot.path)
const config_json_path=`${context}/fetch-blog-server/blog-config.json`


// console.log(`${context}/fetch-blog-server/blog-config.json`)
// console.log(fs.readJsonSync(`${context}/blog-config.json`))
console.log("项目根目录为："+context,"正在通过github获取数据...")
let config
try{
  config=fs.readJsonSync(config_json_path)
}catch(err){
  console.log(`获取配置出现错误，确保fs-extra正确安装以及${config_json_path}存在`)
}

const {user,repository,branch,per_page,forceUpdate,dataType,token,ignoreSHA,summaryLength,retry_times,resource_dir_list}=config

const blog_listInfoPath=`${context}/src/asset/_blog-data.json`
const blog_contentInfoDIR=`${context}/src/asset`
const blog_searchCommand=`https://api.github.com/search/code?q=repo:${user}/${repository}+extension:md&per_page=${per_page}`

const resource_DIR=`${context}/public`



let retryTimes=retry_times
let check = {
  headers: {
    'Accept': 'application/vnd.github.squirrel-girl-preview+json',
    Authorization:`token ${token}  `
  },
}
let  githubData=null


for(let i=0;i<resource_dir_list.length;i++){
  const resoucre_searchCommand=`https://api.github.com/search/code?q=repo:${user}/${repository}+path:${resource_dir_list[i]}`
  const resource_contentInfoDIR=resource_DIR+`/articles/${resource_dir_list[i]}`
  const resource_listInfoPath=`${resource_contentInfoDIR}/_${resource_dir_list[i]}-listInfo.json`

  const getResource_listInfoPath=()=>resource_listInfoPath
  const getResource_contentInfoPath=(filename)=>`${resource_contentInfoDIR}/${filename}`

  checkANDwrite(resoucre_searchCommand,getResource_listInfoPath,getResource_contentInfoPath,{isResource:true})

}

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

let getBlogContentInfoPath=(filename)=>`${blog_contentInfoDIR}/${filename}`
let getBlogListInfoPath=()=>blog_listInfoPath

checkANDwrite(blog_searchCommand,getBlogListInfoPath,getBlogContentInfoPath,{cus_extension:'.json'})


function checkANDwrite(searchCommand,getListInfoPath,getContentInfoPath,
                       options)
{
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
      console.log("github search成功，开始检查json")
      fs.ensureFile(listInfoPath)
        .then(() => {
          console.log(`检查成功，开始读取${listInfoPath}`)
          fs.readJson(listInfoPath)
            .then(listData=>{
              console.log(`${listInfoPath} 读取成功，开始检测sha值`)
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


let listInfoPath,listData,result,getContentInfoPath,finalOptions


let fileWritingList={}

// 执行listInfo和contentInfo的更新，需要先确定文件存在，读取文件内容(用来判断是否可以不更新一些key)

function checkIfNeedUpdated(result,listData, listInfoPath, getContentInfoPath, finalOptions)
{
  const {  cus_extension,customListKeys,isResource}=finalOptions
  let pristine=true
  for(let i=0;i<result.length;i++){
    let cur=result[i];

    let basename=path.parse(cur.path).base
    let resourcedir=path.parse(cur.path).dir
    let rawname=path.parse(cur.path).name

    // 获取时间
    let moment_splitTimeName=moment(rawname,dataType);
    let cur_remote_createdTime,cur_remote_filename,cur_remote_sha,cur_remote_timeArr,cur_remote_basename=basename
    if(moment_splitTimeName.isValid()){
      cur_remote_timeArr=moment_splitTimeName.toArray()
      cur_remote_createdTime=moment_splitTimeName.format("l")
      cur_remote_filename=moment_splitTimeName.parsingFlags().unusedInput[0].replace(/^-/,'')
    }else{
      cur_remote_createdTime="未知日期"
      cur_remote_filename=rawname
      cur_remote_timeArr=[]
    }


      cur_remote_sha=cur.sha


    // if(splitTimeName.length===0)throw Error("Something wrong with splitTimeName RegExp !")
    if(ignoreSHA || !listData[cur_remote_filename] || listData[cur_remote_filename].sha!==cur_remote_sha){
      pristine=false
      if(!listData[cur_remote_filename]) listData[cur_remote_filename]={}
      if(!ignoreSHA)console.log("找到不存在/不匹配的，name为"+cur_remote_filename)
      listData[cur_remote_filename].sha=cur_remote_sha

      if(isResource){
        listData[cur_remote_filename].title=cur_remote_filename
        let encodeBasename=encodeURIComponent(cur_remote_basename)
        // let encodeRawBasename=encodeURIComponent(basename)
        // console.log(encodeBasename,encodeRawBasename)
        let contentInfoPath=getContentInfoPath(cus_extension?cur_remote_filename+cus_extension:cur_remote_basename)
        // console.log(`https://raw.githubusercontent.com/${user}/${repository}/${branch}/${resourcedir}/${basename}`)
        // console.log(decodeURIComponent)
        let resorceWriteStream
        request(`https://raw.githubusercontent.com/${user}/${repository}/${branch}/${resourcedir}/${encodeBasename}`)
          .on("error",err=>{
            console.error("请求resource错误，请检查参数")
          })
          .on('response',res=>{
            console.log(`${resorceWriteStream.path}正在写入...`)
            fileWritingList[resorceWriteStream.path]=1
            // console.log(fileWritingList)
          })
          .pipe(resorceWriteStream=fs.createWriteStream(contentInfoPath))
        // resorceWriteStream.ready=function(){
        //   console.log(`${resorceWriteStream.path}正在写入...`)
        // }
        // console.log(resorceWriteStream.bytesWritten)
        resorceWriteStream.close=function(){
          // console.log(x,y,z)
          delete(fileWritingList[resorceWriteStream.path])
          let leaveWritingList=Object.keys(fileWritingList)
          if(leaveWritingList.length===0)console.log("全部写入完成！")
          else {
            console.log(`${resorceWriteStream.path}写入结束，当前还剩下:\n`)
            leaveWritingList.forEach(path=>{
              console.log(path)
            })
            console.log("-------------------------------------")
          }

        }
        if(i===result.length-1)
        writelistInfoJson(listInfoPath,listData,result,getContentInfoPath,finalOptions)
      }
      else{

        axios.get(`https://api.github.com/repos/${user}/${repository}/git/blobs/${cur_remote_sha}`,check)
        // axios.get(`https://raw.githubusercontent.com/${user}/${repository}/master/${cur.name}`,check)
          .then(data=>data.data)
          .catch(function (error) {
            console.log("获取"+cur_remote_filename+"文件失败")
            console.log(error);
          })
          .then(obj=>{
            console.log("获取"+cur_remote_filename+"文件成功，正在写入...")


            // todo 图片是否需要
            // const content=Base64.atob(obj["content"])
            const content=Base64.decode(obj["content"])
            // const content=obj["content"]

            // 计算摘要开始未知


            // let tryStart=getHighDensity(content,0.3)


            // let summaryStart=content.substr(tryStart).match(/(\n+)[\u4E00-\u9FA5]/)
            //
            //
            // if(summaryStart)summaryStart=summaryStart.index+tryStart
            // else
            let summaryStart=0

            console.log('正在判断是否需要更新具体标签...')
            function checkIfNeedForceUpdated(key,value){
              return (!(forceUpdate===true || forceUpdate[key]===true) && listData[cur_remote_filename][key]) || value
            }

            // 如果已经存在标签，则不更新,强制更新除外
            // let label=checkIfNeedForceUpdated("label",getWeightExtract(obj["content"],cur_remote_filename))
            // let createdTime=checkIfNeedForceUpdated("createdTime",cur_remote_createdTime)
            // let timeArr=checkIfNeedForceUpdated("timeArr",cur_remote_timeArr)
            // let title=checkIfNeedForceUpdated("title",cur_remote_filename)
            // let summary=checkIfNeedForceUpdated("summary",content.substr(summaryStart,summaryLength).replace(/-{3,}/,'').replace(/(^|\n|\s)+#{1,3}\s/,"#### ")+"...")

            let getLabel=()=>checkIfNeedForceUpdated("label",getWeightExtract(obj["content"],cur_remote_filename))
            let getCreatedTime=()=>checkIfNeedForceUpdated("createdTime",cur_remote_createdTime)
            let getTimeArr=()=>checkIfNeedForceUpdated("timeArr",cur_remote_timeArr)
            let getTitle=()=>checkIfNeedForceUpdated("title",cur_remote_filename)
            let getSummary=()=>checkIfNeedForceUpdated("summary",content.substr(summaryStart,summaryLength).replace(/-{3,}/,'').replace(/(^|\n|\s)+#{1,3}\s/,"#### ")+"...")

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
            // listData[cur_remote_filename].label=getLabel()
            // listData[cur_remote_filename].createdTime=createdTime
            // listData[cur_remote_filename].timeArr=timeArr
            // listData[cur_remote_filename].title=title
            // listData[cur_remote_filename].summary=summary

            let contentInfoPath=getContentInfoPath(cus_extension?cur_remote_filename+cus_extension:cur_remote_basename)
            // let listInfo=getListInfo(listData)

            fs.outputJson(contentInfoPath,{content},{spaces:2},function(err){
              if(err){
                console.log(`写入${cur_remote_filename}失败，尝试重新写入`)
                try{
                  fs.outputJsonSync(contentInfoPath,{content},{spaces:2})
                  console.log(cur_remote_filename+"写入成功")
                }
                catch(e){console.log(`写入${cur_remote_filename}失败！尝试手动添加`)}
              }
              else console.log(cur_remote_filename+"写入成功")
            })
            if(i===result.length-1)
            writelistInfoJson(listInfoPath,listData,result,getContentInfoPath,finalOptions)




          })
      }
    }
  }
  if(pristine){
    console.log("未发现变化，无须更新")
  }
  if(ignoreSHA){
    console.log("强制更新开启")
  }
}

