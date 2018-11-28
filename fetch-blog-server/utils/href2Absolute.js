
function href2Absolute(content,absHref,isImg){

  let regPatt=`(!?\\[.*])\\(\\s*?[.\\/|..\\/]+${isImg? ".*img\\/":""}`

  return content.replace(new RegExp(regPatt,'g'),"$1"+"("+absHref)
  // if(isImg) return content.replace(/(!?\[.*])\(\s*?[.\/|..\/]+.*img\//,"$1"+'('+absHref)
  // return content.replace(/(!?\[.*])\(\s*?[.\/|..\/]+/,"$1"+'('+absHref)
  // return content.replace(/\(.\//g,'('+absHref)
}



module.exports=href2Absolute