const fs=require('fs-extra')

test('check sha is unique',function () {
  let blogList
  try{blogList=fs.readJsonSync('./src/asset/blog/_blog-data.json')}
  catch(e){throw new Error("Test read _blog-data.json wrong!"+"\n"+e)}
  let result=true,mem={}
  for(let k in blogList){
    let sha=blogList[k].sha
    if(!mem[sha])mem[sha]=1
    else{
      result=false
      break;
    }
  }

    expect(result).toBe(true)
})