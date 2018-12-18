export default function fetchLazyContent(read_content_path,fetchKey,curContentListProps,wantedPropsFromList,wantedPropsFromContent){
  return import(
    `../${read_content_path}/${fetchKey}.json`)
    .then(({default:fetchResult})=>{
      // console.log(fetchResult)
      let fromList={},fromContents={}
      for(let i=0;i<wantedPropsFromList.length;i++){
        let prop=wantedPropsFromList[i]
        // console.log(fromList,curContentListProps)
        fromList[prop]=curContentListProps[prop]
      }
      for(let i=0;i<wantedPropsFromContent.length;i++){
        let prop=wantedPropsFromContent[i]
        fromContents[prop]=fetchResult[prop]
      }
      return Object.assign({},fromList,fromContents)
    })
}
