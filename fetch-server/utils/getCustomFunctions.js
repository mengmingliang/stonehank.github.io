const path=require("path")
const crypto = require('crypto');


  function getAppropriateKey_blog(fetchResult){
    let parse=path.parse(fetchResult.path)
    let rawname=parse.name
    const sha1 = crypto.createHash('sha1');
    sha1.update(rawname);
    return sha1.digest('hex')
  }

  function getFileName_blog(fetchResult,fetchExcludes){
    let parse=path.parse(fetchResult.path)
    let rawname=parse.name
    if(fetchExcludes.includes(rawname))return null
    const sha1 = crypto.createHash('sha1');
    sha1.update(rawname);
    let uniqueID=sha1.digest('hex')
    return uniqueID+'.json'
  }

  function getAppropriateKey_resource(fetchResult){
    let parse=path.parse(fetchResult.path)
    return parse.name
  }

  function getFileName_resource(fetchResult){
    let parse=path.parse(fetchResult.path)
    let initExtension=parse.ext
    return parse.name + initExtension
  }



module.exports={
  getAppropriateKey_blog,
  getFileName_blog,
  getAppropriateKey_resource,
  getFileName_resource
}