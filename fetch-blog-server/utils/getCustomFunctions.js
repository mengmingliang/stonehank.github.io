const path=require("path")
const crypto = require('crypto');





function getCustomFunctions(user,repository,branch){

  // blog
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
    let titleSHA=sha1.digest('hex')
    return titleSHA+'.json'
  }

  function getDetailSearchAPI_blog(fetchResult){
    const {sha}=fetchResult
    return `https://api.github.com/repos/${user}/${repository}/git/blobs/${sha}`
  }

// resource

  function getAppropriateKey_resource(fetchResult){
    let parse=path.parse(fetchResult.path)
    return parse.name
  }

  function getFileName_resource(fetchResult){
    let parse=path.parse(fetchResult.path)
    let initExtension=parse.ext
    return parse.name + initExtension
  }

  function getDetailSearchAPI_resource(fetchResult){
    let parse=path.parse(fetchResult.path)
    let basename=parse.base
    let resourcedir=parse.dir
    let encodeBasename=encodeURIComponent(basename)
    return `https://raw.githubusercontent.com/${user}/${repository}/${branch}/${resourcedir}/${encodeBasename}`
  }


  return {
    getAppropriateKey_blog,
    getDetailSearchAPI_blog,
    getFileName_blog,
    getAppropriateKey_resource,
    getDetailSearchAPI_resource,
    getFileName_resource
  }
}

module.exports=getCustomFunctions