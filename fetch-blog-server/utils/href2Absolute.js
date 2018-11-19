
function href2Absolute(content,absHref){
  return content.replace(/\(.\//g,'('+absHref)
}

module.exports=href2Absolute