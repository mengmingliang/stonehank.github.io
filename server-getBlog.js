const axios = require('axios');
const fs = require('fs-extra')
const path=require("path")
var Base64 = require('js-base64').Base64;
const {getWeightExtract}=require("./getLabel")
const moment = require("moment")

const user="stonehank"
const repository="blogs"
const per_page=10
const context="./src/"

let check = {
  headers: {
    'Accept': 'application/vnd.github.squirrel-girl-preview+json',
    Authorization:`token b6774f0253b5b570d202583d5372ec0bcf21859e  `
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
    fs.readJson(`${context}./asset/blog-data.json`,function(err,blogData){
      if(err)console.log("read json error")
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

    let splitTimeName=path.parse(cur.name).name.match(/((?:\d{2}-\d{2})?-?)(.*)/)||[],
    // let moment_splitTimeName=moment(path.parse(cur.name).name,'MM-DD'),
      cur_remote_filename=splitTimeName[2],
      // cur_remote_filename=moment_splitTimeName.parsingFlags().unusedInput[0].replace(/^-/,''),
      // cur_remote_createdTime=splitTimeName[1],
      cur_remote_createdTime=moment(splitTimeName[1],"MM-DD").format("l"),
      cur_remote_sha=cur.sha
    if(splitTimeName.length===0)throw Error("Something wrong with splitTimeName RegExp !")
    if(!blogData[cur_remote_filename] || blogData[cur_remote_filename].sha!==cur_remote_sha){
      if(!blogData[cur_remote_filename]) blogData[cur_remote_filename]={}
      pristine=false
      console.log("找到不存在/不匹配的，name为"+cur_remote_filename)
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
          console.log('正在分析关键词...')
          let label=blogData[cur_remote_filename].label||getWeightExtract(obj["content"],cur_remote_filename)
          blogData[cur_remote_filename].label=label
          blogData[cur_remote_filename].createdTime=cur_remote_createdTime
          // blogData[cur_remote_filename].title=obj["node_id"]
          // blogData[cur_remote_filename].content=obj["content"]
          fs.writeJson(`${context}./asset/${cur_remote_filename}.json`,{content:Base64.decode(obj["content"])},{spaces:'\t'},function(err){
            if(err)console.log('写入失败')
            else console.log(cur_remote_filename+"写入成功")
          })
          fs.writeJson(`${context}./asset/blog-data.json`,blogData,{spaces:'\t'},function(err){
            if(err)console.log('写入blog-data.json 失败')
            else console.log("blog-data.json 写入成功")
          })
        })
    }
  }
  if(pristine){
    console.log("未发现变化，无须更新")
  }
}



// console.log(nodejieba.extract("升职加薪，当上CEO，走上人生巅峰。", topN));