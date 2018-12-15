import {pathEnum} from "../routes/linkPathList";

export function refactor(json,groupBy){
  let groupObj={}
  let group
  if(groupBy==="time" )group="timeArr"
  // else if(groupBy==="label")group="label"
  // else group='init'
  if(group==="timeArr"){
    for(let k in json){
      let cur=json[k]
      if(!cur[group])continue;
      if(cur[group].length===0){
        if(!groupObj["noDate"])groupObj["noDate"]=[]
        groupObj["noDate"].push(cur)
        continue
      }
      let year=cur[group][0]
      let month=cur[group][1]
      let day=cur[group][2]
      if(!groupObj[year])groupObj[year]=[]
      if(!groupObj[year][month])groupObj[year][month]=[]
      let index=groupObj[year][month].length
      // insertion sort
      while(index>0 && day< groupObj[year][month][index-1][group][2])index--;
      groupObj[year][month].splice(index,0,cur)
    }
    return groupObj
  }
  // if(group==="label"){
  //   for(let k in json){
  //     let cur=json[k]
  //     if(!cur[group])continue;
  //     let curLabel=cur[group]
  //     for(let i=0;i<curLabel.length;i++){
  //       if(!groupObj[curLabel[i]])groupObj[curLabel[i]]=[cur]
  //       else groupObj[curLabel[i]].push(cur)
  //     }
  //   }
  //   return groupObj
  // }
  // if(group==="init"){
  //   let result=[]
  //   for(let k in json){
  //     if(k==="version" || Object.prototype.toString.call(json[k])!=="[object Object]")continue
  //     result.push(json[k])
  //   }
  //   result.sort(function(o1,o2){
  //     let t1=o1.timeArr,t2=o2.timeArr
  //     if(!t1 || !t2)return -1
  //     if(t2[0]!==t1[0])return t2[0]-t1[0]
  //     else if(t2[1]!==t1[1])return t2[1]-t1[1]
  //     else return t2[2]-t1[2]
  //   })
  //   return result
  // }
}

// 按sortKey的顺序比较，sortKey对应的值支持Array(nest)
// immutable
// obj<json>:{ a:{},b:{}}
// 不同类型只能比较数字，字符串等js默认能比较的（需要更准确需要类似JAVA compare函数）
export function objSortBy(obj,sortKey,asc){
  let os=Object.prototype.toString
  if(os.call(obj)!=="[object Object]")throw Error("obj must be Object")
  let result=[],
    // cannotSort=[],
    compareReturn=asc?1:-1,
    sortFactor=Array.isArray(sortKey)?sortKey:[sortKey]
  for(let k in obj){
    if(!obj.hasOwnProperty(k))continue
    // if(!obj[k][sortFactor[0]]){
    //   cannotSort.push(obj[k])
    //   continue
    // }
    result.push(obj[k])
  }
  _sort(result,sortFactor)
  function _sort(sortArr,sortFactor){
    sortArr.sort((a,b)=>{
      let index=0
      let valA,valB
      while(index<sortFactor.length){
        valA=a[sortFactor[index]]
        valB=b[sortFactor[index]]
        if(valA==null && valB==null) index++
        else if(valA==null || _compare(valA,valB)<0)return -compareReturn
        else if(valB==null || _compare(valA,valB)>0)return compareReturn
        else index++
      }
      return 0
    })
  }
  function _compare(a,b){
    if(a==null && b==null)return 0
    else if(a==null)return -1
    else if(b==null)return 1
    let typeA=os.call(a),typeB=os.call(b)
    if(typeA==="[object Array]" && typeB==="[object Array]"){
      let i=0
      while(i<a.length){
        if(_compare(a[i],b[i])<0)return -1
        else if(_compare(a[i],b[i])>0)return 1
        else i++
      }
    }else if(typeA!=="[object Array]" && typeB!=="[object Array]"){
      if(typeof a!==typeof b){a=a.toString();b=b.toString()}
      if(a<b)return -1
      else if(a>b)return 1
    }else{
      if(typeA==="[object Array]")return 1
      else return -1
    }
    return 0
  }
  return result
}

export function objGroupBy(obj,key){
  let os=Object.prototype.toString
  if(os.call(obj)!=="[object Object]")throw Error("obj must be Object")
  let result={}
  for(let k in obj){
    if(!obj.hasOwnProperty(k))continue
    let objValue=obj[k]
    if(!objValue[key])continue;
    let keyValue = objValue[key]
    function _group(data,result){
      let typeData=os.call(data)
      if(typeData==="[object Array]") {
        for (let i = 0; i < data.length; i++) {
          _group(data[i],result)
          // if (!result[data[i]]) result[data[i]] = [objValue]
          // else result[data[i]].push(objValue)
        }
      }else if(typeData==="[object Object]"){
        for(let _k in data){
          if(!data.hasOwnProperty(_k))continue
          _group(data[_k],result)
          // if (!result[data[_k]]) result[data[_k]] = [objValue]
          // else result[data[_k]].push(objValue)
        }
      }else{
        if (!result[data]) result[data] = [objValue]
        else result[data].push(objValue)
      }
    }
    _group(keyValue,result)
  }
  return result
}



/**
 * 深比较
 * @param obj1
 * @param obj2
 * @returns {boolean}
 */
export function deepEqual(obj1,obj2){
  if(obj1===obj2)return true
  if(!obj1 || !obj2)return false
  let os=Object.prototype.toString,result=true;
  for(let key in obj1){
    if(obj1.hasOwnProperty(key)){
      if(os.call(obj1[key])==='[object Array]' && os.call(obj2[key])==='[object Array]'){
        if(obj1[key].length!==obj2[key].length){ return false}
        result=deepEqual(obj1[key],obj2[key])
      }else if(os.call(obj1[key])==='[object Object]' && os.call(obj2[key])==='[object Object]'){
        if(Object.keys(obj1[key]).length!==Object.keys(obj2[key]).length){ return false}
        result=deepEqual(obj1[key],obj2[key])
      }else if(typeof obj1[key]==='function' && typeof obj2[key]==='function'){
        if(obj1[key].toString()!==obj2[key].toString()){
          return false
        }
      }else if(Number.isNaN(obj1[key]) && Number.isNaN(obj2[key])){
        result=true;
      }else if(obj1[key]!==obj2[key]){
        return false;
      }
      if(!result){
        return false;
      }
    }
  }
  return true
}


/*
* 获取第一个路径
* /category/page  --> category
* pathEnum.includes("category") --> true
* return category
* */
export function parseHrefToNav(pathname){
  let selectedKeyMathch=pathname.match(/^.*?(\/\w+)\/?/) || []
  let selectedKey=selectedKeyMathch[1]
  return pathEnum.includes(selectedKey)
    ? selectedKey
    : pathEnum[0]
}


// export function withOutSrcInMD(patternValue,content){
//   return new RegExp(`.*?\\[.*?]\\(.*?${patternValue}.*?\\).*`).test(content) ||
//     new RegExp(`.*?\!\\[.*?${patternValue}.*?].*`).test(content)
// }

export function withOutImgHTML(content){
  return content.replace(/<\s*(img[^>]*)>?/g," $1 ")
}

export function inHTMLTag(patternValue,content,preIdx){
  let reg
  if(preIdx && content.substr(preIdx,patternValue.length)!==patternValue){
    console.warn('preIdx 指定错误，当前指定下标并不是匹配值，此处逻辑有误需要修复')
    return true
  }

  // 设定前一个搜索的index，当preIdx在前一个和当前index之间，说明preIdx属于tag内部
  let lastSearchIdx=Infinity
  try{
    reg=new RegExp(`(<[^>]*?)${patternValue}|${patternValue}[^<]*?>`,'g')
    let match=reg.exec(content)
    while(match){
      if(preIdx!=null){
        if(preIdx===match.index+((match[1] && match[1].length) || 0))return true
        else if(preIdx > lastSearchIdx && preIdx<reg.lastIndex)return true
        else {
          lastSearchIdx=reg.lastIndex
          match=reg.exec(content)
        }
      }
      else return true
    }
    return false
  }catch(__){
    console.log('err')
    return true
  }
}
export function searchPrecision(patternValue,content,fromIndex=0){
  patternValue=patternValue.replace(/(\(|\)|\[|\]|\\|\/|\+|\*|\.|\?|\^|\$|!|:)/g,"\\$1")
  let _content=content.substr(fromIndex),result,regPattern=''
  if(/^[\u4e00-\u9fa5]+$/.test(patternValue))regPattern= patternValue
  else if(/[\u4e00-\u9fa5]+$/.test(patternValue)) regPattern=`\\b${patternValue}`
  else if(/^[\u4e00-\u9fa5]+/.test(patternValue))regPattern=`${patternValue}\\b`
  else if(/[\u4e00-\u9fa5]+/.test(patternValue))regPattern= `${patternValue}`
  else regPattern= `\\b${patternValue}\\b`
  let tryP=tryReg(regPattern,false)
  if(tryP)result=_content.search(tryP)
  else return null
  if(result!==-1)return result+fromIndex
  else return -1
}

export function isMatchPrecision(patternValue,content){
  patternValue=patternValue.replace(/(\(|\)|\[|\]|\\|\/|\+|\*|\.|\?|\^|\$|!|:)/g,"\\$1")
  if(/^[\u4e00-\u9fa5].*[\u4e00-\u9fa5]$/.test(patternValue))return new RegExp(`${patternValue}`).test(content)
  else if(/.*[\u4e00-\u9fa5]$/.test(patternValue)) return new RegExp(`\\b${patternValue}`).test(content)
  else if(/^[\u4e00-\u9fa5].*/.test(patternValue))return new RegExp(`${patternValue}\\b`).test(content)
  else if(/[\u4e00-\u9fa5]+/.test(patternValue))return new RegExp(`${patternValue}`).test(content)
  else return new RegExp(`\\b${patternValue}\\b`).test(content)
}

export function tryReg(regPattern,otherwise){
  try{
    return new RegExp(regPattern)
  }catch(__){
    return otherwise
  }
}


export function getCookie(key,forTestCookie){
  let cookie=forTestCookie?forTestCookie:document.cookie
  return cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" +
    encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")
}

export function querySearch(search){
  let splitSearch=search.replace("?",'').split('&')
  let data={}
  for(let i=0;i<splitSearch.length;i++){
    let splitEach=splitSearch[i].split('=')
    data[splitEach[0]]=splitEach[1]
  }
  return data
}