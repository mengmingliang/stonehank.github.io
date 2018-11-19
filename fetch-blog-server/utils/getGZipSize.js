const gzipSize = require('gzip-size');
const fs=require('fs-extra')

// 计算global-search 文件大小

function getGZipSize(assetFilePath,userConfigPath,sizeSum){
  let files=fs.readdirSync(assetFilePath)
  files.forEach(file=>{
    if(file==="_blog-data.json")return
    let size=gzipSize.fileSync(assetFilePath+'/'+file)-200
    let status=fs.statSync(assetFilePath+'/'+file)
    if(status.isDirectory())console.error("asset目录中存在目录")
    sizeSum+=size
    // sizeSum+=status.size
  })
  // fs.writeJsonSync(userConfigPath,{size:Math.floor(sizeSum/1024/2.45)})
  fs.writeJsonSync(userConfigPath,{size:Math.floor(sizeSum/1024)})
}

module.exports=getGZipSize