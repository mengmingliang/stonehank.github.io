var nodejieba = require("nodejieba");
var Base64 = require('js-base64').Base64;

// 计算 label(tags)关键词

function getWeightExtract(content_base64,title){
  let extractNum=200
  let content=Base64.decode(content_base64)
  // let content=content_base64
  // let extract_content=nodejieba.extract(content,extractNum).filter(o=>o.weight>8)
  let extract_content=nodejieba.extract(content,extractNum)
  // let extract_content=nodejieba.cut(content,extractNum)
  // let extract_title=nodejieba.extract(title,extractNum).filter(o=>o.weight>8)
  let extract_title=nodejieba.extract(title,extractNum)
  // let extract_title=nodejieba.cut(title,extractNum)

  let weightMap={}
  let count=100

  // 取长的结果遍历
  for(let i=0;i<extract_content.length;i++){
    // 判断计数器
    if(count<=0)break

    let exContent=extract_content[i].word
    let exTitle=extract_title[i]?extract_title[i].word:''

    // filter规则
    // if(!/^\d+$/.test(exContent) && !/^[a-zA-Z]{1,3}$/.test(exContent)){
    if(exContent && !/^\d+$/.test(exContent)){
      if(!weightMap[exContent])weightMap[exContent]=1
      else weightMap[exContent]++
    }

    // if(exTitle && !/^\d+$/.test(exTitle) && !/^[a-zA-Z]{1,3}$/.test(exTitle)){
    if(exTitle && !/^\d+$/.test(exTitle)){
      if(!weightMap[exTitle])weightMap[exTitle]=1
      else weightMap[exTitle]++
    }
  }
  let weightMapKeys=Object.keys(weightMap)
  weightMapKeys.sort((a,b)=>weightMap[b]-weightMap[a])
  return weightMapKeys
}


module.exports={
  getWeightExtract
}

// let str="对比了map和hashTable对数据存取的性能，key类型为string\n\n测试方法：\n```js\n// CODES是字符串组成的数组\n\n// map\nfor(let x=0;x<2;x++){\n    for(let k=0;k<CODES.length;k++){\n      let i=CODES[k]\n      if(!m.has(i))m.set(i,1)\n      else m.set(i,m.get(i)+1)\n    }\n  }\n\n// hashTable {}\nfor(let x=0;x<2;x++){\n  for(let k=0;k<CODES.length;k++){\n    let i=CODES[k]\n    if(!c[i])c[i]=1\n    else c[i]++\n  }\n}\n```\n\n测试结果\n\n```\nmap:           hashTable:         \n22,755         7,502          \n±0.52%         ±0.65%         \nfastest        67% slower              \n```\n\n测试地址:[https://jsperf.com/hanktest-map-vs-hashtable](https://jsperf.com/hanktest-map-vs-hashtable)"
// console.log(getWeightExtract(str,"获取函数参数名称"))