const escape2Html=require('./escape2Html')

function html2Md(htmlStr){
  let orderNum=0
  let tag2MdHash={
    'empty':['',''],
    'p':['','\n\n'],
    'em':['*','* '],
    'i':['*','* '],
    'code':[' `','` '],
    'pre':['\n\n```\n','\n```\n'],
    'strong':['**','** '],
    'b':[`**`,`** `],
    'a':['',''],
    'img':['',''],
    'ul':['','\n\n'],
    'uli':['* ','\n'],
    'ol':['','\n\n'],
    'oli':['','\n'],
    'olli':['','\n'],
    'blockquote':['\n> ','\n'],
    'tr':['\n|',''],
    'th':['','|'],
    'td':['','|'],
    'table':['','\n'],
    'thead':['',''],
    'h1':['\n# ','\n'],
    'h2':['\n## ','\n'],
    'h3':['\n### ','\n'],
    'h4':['\n#### ','\n'],
    'h5':['\n##### ','\n'],
    'h6':['\n###### ','\n'],
    's':['~~','~~'],
    'del':['~~','~~'],
  }
  let checkNotNewLine={
    'em':true,
    'i':true,
    'code':true,
    'strong':true,
    'b':true,
    'uli':true,
    'oli':true,
    'blockquote':true,
    'tr':true,
    'th':true,
    'td':true,
    'h1':true,
    'h2':true,
    'h3':true,
    'h4':true,
    'h5':true,
    'h6':true,
    's':true,
  }
  let skipTag={
    'br':true
  }
  // 替换特殊字符

  // let curS='',inPre=false
  // for(let i=0;i<htmlStr.length;i++){
  //   if(curS.endsWith("<pre>")){
  //     inPre=true
  //   }else if(curS.endsWith("</pre>")){
  //     inPre=false
  //   }
  //   if(inPre){
  //     curS+=htmlStr[i]
  //   }else{
  //     if(htmlStr[i]==="\n")continue
  //     curS+=htmlStr[i]
  //   }
  // }

  // htmlStr=curS
  htmlStr=htmlStr.replace(/\r\n/g,'')


  // let ignore=false
  let codeClassName=''
  let result= resolve(htmlStr,[null])[1]
  result=escape2Html(result)
  return result
  function resolve(str,parentStack){
    let tagName='',content=''
    for(let i=0;i<str.length;i++){
      if( str[i]==='<' && str[i+1]==='/'){
        let id=i+2
        while(str[id]!==">"){
          tagName+=str[id++]
        }

        // if(ignore){
        //   if(tagName!==parentStack[parentStack.length-1]){
        //     content+=str[i]
        //     continue
        //   }
        // }


        // if(tagName!==parentStack[parentStack.length-1]){
        //   parentStack.pop()
        //   i=id
        //   continue
        // }

        // 处理叠加
        let parentTag=parentStack[parentStack.length-2]
        if(tagName==='li'){
          if(parentTag==='ol'){
            tagName='oli'
            orderNum++
            tag2MdHash[tagName][0]=tag2MdHash['olli'][0]+orderNum+'. '
          }else{
            tagName='uli'
          }
        }
        if(tagName==='code' && parentTag==='pre'){
          tagName='empty'
        }
        if(tag2MdHash[tagName] && tag2MdHash[tagName][0].includes('*')){
          if(parentTag==='pre' || parentTag==='code')
            tagName='empty'
          content=content.trim()
        }


        // content=content.trim()
        let matchMD=tag2MdHash[tagName]
        if(matchMD==null){

          matchMD=['','']
        }
        let combineContent=''
        let language=codeClassName.match(/js|java|python/)



        if(tagName==='pre'){

          let id=content.length-1
          while(content[id]==='\n')id--
          content=content.substring(0,id+1)
          if(!language)language=['']
          combineContent="```"+language[0]+"\n"+content+matchMD[1]
        }else{

          if(checkNotNewLine[tagName]){
            let id=0
            while(content[id]==='\n')id++
            content=content.substring(id)

          }
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

        if(tagName==='ol' || tagName==='ul'){
          if(parentStack[parentStack.length-1]==='li'){
            tag2MdHash["uli"][0]='\t* '
            tag2MdHash["olli"][0]='\t'
          }
        }
        if(!selfClose){
          parentStack.push(tagName)


          resolveRes=resolve(str.substring(id+1),parentStack)

          let pTag=parentStack.pop()
          if(tagName==='ol' || tagName==='ul'){
            if(parentStack[parentStack.length-1]==='li'){
              tag2MdHash["uli"][0]='* '
              tag2MdHash["olli"][0]=''
            }
          }
          if(pTag==='ol')orderNum=0
          // ignore=false
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
          let matchHref=attrs.match(/href\s*=\s*('|")(.*?)\1/)
          let hrefContent
          if(!matchHref){
            hrefContent=''
          }else{
            hrefContent=matchHref[2]
          }
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
        i=id+nxtId+1
      }else{
        if(!parentStack.includes('pre') && str[i]==='\t')continue
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
    return Math.max(trStr.split('</td>').length-1,trStr.split('</th>').length-1)
  }
}



module.exports= html2Md
