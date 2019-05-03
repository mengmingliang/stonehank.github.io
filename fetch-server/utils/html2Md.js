

function html2Md(htmlStr){
  let orderNum=0
  let tag2MdHash={
    'p':['','\n\n'],
    'em':[' *','* '],
    'i':[' *','* '],
    'code':[' `','` '],
    'pre':['\n\n```\n','\n```'],
    'strong':[' **','** '],
    'b':[` **`,`** `],
    'a':['',''],
    'img':['',''],
    'ul':['\n','\n\n'],
    'uli':['* ','\n'],
    'ol':['\n','\n\n'],
    'oli':[1+'. ','\n'],
    'blockquote':['\n> ','\n'],
    'tr':['\n|',''],
    'th':['','|'],
    'td':['','|'],
    'table':['','\n'],
    'thead':['','']
  }
  let skipTag={
    'br':true
  }
  // 替换特殊字符

  htmlStr=htmlStr.replace(/\&nbsp\;/g,'').replace(/\&quot\;/g,'"').replace(/\r\n/g,'')

  let codeClassName=''
  return resolve(htmlStr,[null])[1]
  function resolve(str,parentStack){
    let tagName='',content=''
    for(let i=0;i<str.length;i++){
      if(str[i]==='<' && str[i+1]==='/'){
        let id=i+2
        while(str[id]!==">"){
          tagName+=str[id++]
        }

        if(tagName!==parentStack[parentStack.length-1]){
          parentStack.pop()
          i=id
          continue
        }

        // 处理叠加
        let parentTag=parentStack[parentStack.length-2]
        if(tagName==='li'){
          if(parentTag==='ol'){
            tagName='oli'
            orderNum++
            tag2MdHash[tagName][0]=orderNum+'. '
          }else{
            tagName='uli'
          }
        }
        if(tagName==='code' && parentTag==='pre'){
          tagName='p'
        }
        if(tag2MdHash[tagName] && tag2MdHash[tagName][0].includes('*') && (parentTag==='pre' || parentTag==='code')){
          tagName='p'
        }
        // content=content.trim()
        let matchMD=tag2MdHash[tagName]
        if(matchMD==null){
          // if(tagName!=='span' && tagName!=='sub' && tagName!=='sup' && tagName!=='small'){
            // console.warn(tagName+'未匹配!')

          // }
          matchMD=['','']
        }
        let combineContent=''
        let language=codeClassName.match(/js|java|python/)
        if(tagName==='pre' && language){

          combineContent="```"+language[0]+"\n"+content+matchMD[1]
        }else{

          combineContent=matchMD[0]+content+matchMD[1]

        }
        return [id,combineContent]


      }else if(str[i]==='<' && str[i+1]!=='/'){
        let id=i+1,attrs=''
        while(str[id]!==">"){
          attrs+=str[id++]
        }
        let selfClose=false
        let attrArr=attrs.trim().split(' ')
        let tagName=attrArr[0]
        // 跳过style标签
        if(tagName==='style'){
          let id=i+1,s=''
          while(!s.endsWith("</style>")){
            id++
            s+=str[id]
          }
          i=id
          continue
        }
        if(skipTag[tagName]){
          i=id
          continue
        }
        // 处理自闭合
        if(str[id-1]==='/' || tagName==='img'){
          selfClose=true
        }
        let s='',nxtId=null
        let resolveRes=null
        if(!selfClose){
          parentStack.push(tagName)
          resolveRes=resolve(str.substring(id+1),parentStack)
        }

        if(tagName==='table' || tagName==='thead'){
          let existHead=str.substring(i).includes('thead')
          let count=countTdNum(str.substring(i))
          let tableHrStr=''
          for(let j=0;j<count;j++){
            tableHrStr+=':---:|'
          }
          let noHeadTableHrStr='\n'+'|'.repeat(count+1)+'\n|'+tableHrStr
          nxtId=resolveRes[0]
          s=resolveRes[1]
          if(!existHead){
            content+=noHeadTableHrStr+s
          }else{
            if(tagName==='table')content+=s
            else{
              content+=s+'\n|'+tableHrStr
            }
          }
        }else if(tagName==='a'){
          let hrefContent=attrs.match(/href\s*=\s*('|")(.*?)\1/)[2]
          if(selfClose){
            nxtId=-1
            content+='[]('+hrefContent+')\n'
          }else{
            nxtId=resolveRes[0]
            s=resolveRes[1]
            content+='['+s+']('+hrefContent+')\n'
          }
        }else if(tagName==='img'){
          let srcContent=attrs.match(/src\s*=\s*('|")(.*?)\1/)[2]
          if(selfClose){
            nxtId=-1
            content+='![]('+srcContent+')\n'
          }else{
            nxtId=resolveRes[0]
            s=resolveRes[1]
            content+='!['+s+']('+srcContent+')\n'
          }
        }else{
          if(selfClose){
            nxtId=-1
            content+=''
          }else{
            nxtId=resolveRes[0]
            s=resolveRes[1]
            content+=s
          }
        }
        let pTag=parentStack.pop()
        if(pTag==='ol')orderNum=0
        i=id+nxtId+1
      }else{
        if(str[i]==='\t')continue
        if(parentStack.includes('table')){
          if(str[i]==='\r' || str[i]==='\n')continue
        }

        content+=str[i]
      }
    }
    return [str.length-1,content]
  }
  function countTdNum(str){
    let trStr=''
    for(let i=0;i<str.length;i++){
      if(trStr.endsWith("</tr>")){
        break
      }
      trStr+=str[i]
    }
    return Math.max(trStr.split('<td>').length-1,trStr.split('<th>').length-1)
  }

}


module.exports= html2Md
