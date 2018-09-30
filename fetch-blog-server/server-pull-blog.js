const axios = require('axios');
const fs = require('fs-extra')
const path=require("path")
var Base64 = require('js-base64').Base64;
const {getWeightExtract}=require("./compute-label")
const moment = require("moment")
const slash = require('slash');


const context=slash(process.cwd())



let config
try{
  config=fs.readJsonSync(`${context}/fetch-blog-server/blog-config.json`)
}catch(err){
  console.log("获取配置出现错误，确保fs-extra正确安装")
}

const {user,repository,per_page,forceUpdate,dataType,token,ignoreSHA,summaryLength}=config


let check = {
  headers: {
    'Accept': 'application/vnd.github.squirrel-girl-preview+json',
    Authorization:`token ${token}  `
  },
}



axios.get(`https://api.github.com/search/code?q=repo:${user}/${repository}+extension:md&per_page=${per_page}`,check)
  .then(data=>data.data)
  .catch(function (error) {
    console.log("github search失败");
    console.log(error);
  })
  .then(obj=>{
    console.log("github search成功，开始读取json")
    fs.readJson(`${context}/src/asset/blog-data.json`,function(err,blogData){
      if(err){
        console.log("read json error，请检查json 格式是否正确")
        console.log(err)
      }
      else{
        console.log("blog-data.json 读取成功，开始检测sha值")
        checkIfNeedUpdated(obj.items,blogData)
      }
    })
  })



function checkIfNeedUpdated(result,blogData){
  let pristine=true
  for(let i=0;i<result.length;i++){
    let cur=result[i];

    // let splitTimeName=path.parse(cur.name).name.match(/((?:\d{2}-\d{2})?-?)(.*)/)||[],
    let rawName=path.parse(cur.name).name
    let moment_splitTimeName=moment(rawName,dataType);
      // cur_remote_filename=splitTimeName[2],
      // cur_remote_createdTime=moment(splitTimeName[1],"MM-DD").format("l"),

    let cur_remote_createdTime,cur_remote_filename,cur_remote_sha
    if(moment_splitTimeName.isValid()){
      cur_remote_createdTime=moment_splitTimeName.format("l")
      cur_remote_filename=moment_splitTimeName.parsingFlags().unusedInput[0].replace(/^-/,'')
    }else{
      cur_remote_createdTime="未知日期"
      cur_remote_filename=rawName
    }
      cur_remote_sha=cur.sha
    // if(splitTimeName.length===0)throw Error("Something wrong with splitTimeName RegExp !")
    if(ignoreSHA || !blogData[cur_remote_filename] || blogData[cur_remote_filename].sha!==cur_remote_sha){
      pristine=false
      if(!blogData[cur_remote_filename]) blogData[cur_remote_filename]={}
      if(!ignoreSHA)console.log("找到不存在/不匹配的，name为"+cur_remote_filename)
      axios.get(`https://api.github.com/repos/${user}/${repository}/git/blobs/${cur_remote_sha}`,check)
      // axios.get(`https://raw.githubusercontent.com/${user}/${repository}/master/${cur.name}`,check)
        .then(data=>data.data)
        .catch(function (error) {
          console.log("获取"+cur_remote_filename+"文件失败")
          console.log(error);
        })
        .then(obj=>{
          console.log("获取"+cur_remote_filename+"文件成功，正在写入...")

          blogData[cur_remote_filename].sha=obj["sha"]
          const content=Base64.decode(obj["content"])

          // 计算摘要开始未知


          let tryStart=getHighDensity(content)
          function getHighDensity(content){
            function checkIsCN(s){ return /[\u4E00-\u9FA5]/.test(s)}
            let p=0,numCN=0,result=0,aux=Array(content.length).fill(0)
            for(let i=0;i<content.length;i++){
              let isCN=checkIsCN(content[i])
              if(isCN){aux[i]=1;numCN++}
              if(i>summaryLength-1){
                numCN-=aux[(i-summaryLength)]
                p=(numCN)/summaryLength
              }
              if(p>=0.4){result=i;break}
            }
            return result
          }
          // console.log(tryStart,cur_remote_filename)
          let summaryStart=content.substr(tryStart).match(/\n+[\u4E00-\u9FA5]/)

          // let summaryStart=content.match(new RegExp("[\u4e00-\u9fa5\uFF00-\uFFFF,.!?]{7,}"))
          if(summaryStart)summaryStart=summaryStart.index+tryStart
          else summaryStart=0

          console.log('正在判断是否需要更新具体标签...')
          function checkIfNeedForceUpdated(key,value){
            return (!(forceUpdate===true || forceUpdate[key]===true) && blogData[cur_remote_filename][key]) || value
          }
          // 如果已经存在标签，则不更新,强制更新除外
          let label=checkIfNeedForceUpdated("label",getWeightExtract(obj["content"],cur_remote_filename))
          let createdTime=checkIfNeedForceUpdated("createdTime",cur_remote_createdTime)
          let title=checkIfNeedForceUpdated("title",cur_remote_filename)
          let summary=checkIfNeedForceUpdated("summary",content.substr(summaryStart,summaryLength).replace(/-{3,}/,'')+"...")
          // let label=(!(forceUpdate===true || forceUpdate["label"]===true) && blogData[cur_remote_filename].label) || getWeightExtract(obj["content"],cur_remote_filename)
          // let createdTime=(!(forceUpdate===true || forceUpdate["createdTime"]===true) && blogData[cur_remote_filename].createdTime) || cur_remote_createdTime
          // let title=(!(forceUpdate===true || forceUpdate["title"]===true) && blogData[cur_remote_filename].title) || cur_remote_filename
          blogData[cur_remote_filename].label=label
          blogData[cur_remote_filename].createdTime=createdTime
          blogData[cur_remote_filename].title=title
          blogData[cur_remote_filename].summary=summary

          fs.writeJson(`${context}/src/asset/${cur_remote_filename}.json`,{content:content},{spaces:'\t'},function(err){
            if(err)console.log('写入失败')
            else console.log(cur_remote_filename+"写入成功")
          })
          fs.writeJson(`${context}/src/asset/blog-data.json`,blogData,{spaces:'\t'},function(err){
            if(err)console.log('写入blog-data.json 失败')
            else console.log("blog-data.json 写入成功")
          })
        })
    }
  }
  if(pristine){
    console.log("未发现变化，无须更新")
  }
  if(ignoreSHA){
    console.log("强制更新开启")
  }
}



// console.log(nodejieba.extract("升职加薪，当上CEO，走上人生巅峰。", topN));