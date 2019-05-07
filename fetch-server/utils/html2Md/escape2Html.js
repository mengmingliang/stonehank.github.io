function escape2Html(str) {
  let arrEntities={
    'lt':'<',
    'gt':'>',
    'nbsp':'',
    'amp':'&',
    'quot':'"',
    '#39':"'"
  }
  return str.replace(/&(lt|gt|nbsp|amp|quot|#39);/ig,(all,t)=>arrEntities[t])
}

module.exports=escape2Html