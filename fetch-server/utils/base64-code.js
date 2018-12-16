const Base64 = require('js-base64').Base64;

// base64 功能

function base64Decode(content){
  return Base64.decode(content)
}


module.exports={
  base64Decode
}