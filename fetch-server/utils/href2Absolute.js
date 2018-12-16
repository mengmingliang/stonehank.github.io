
function href2Absolute(content,absHref,isImg){

  let regPatt=`(!?\\[.*])\\(\\s*?[.\\/|..\\/]+${isImg? ".*img\\/":""}`

  return content.replace(new RegExp(regPatt,'g'),"$1"+"("+absHref)

}



module.exports=href2Absolute