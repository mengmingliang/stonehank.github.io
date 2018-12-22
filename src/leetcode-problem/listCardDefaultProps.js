import {linkTo} from "../routes/linkPathList";

 let defaultProps={
  getContentDetailPath:(curPropsData)=>linkTo.myleetcode+"/problems/"+curPropsData.uniqueID,
  singleRenderPropsOnHeader:[{
      val:'difficult',
      ele:'tag',
      getClassName:difficult=>`leetcode-difficult-tags leetcode-${difficult}`
    }],
  multiRenderPropsOnHeader:[
    {val:'relatedTags',ele:'tag',link:(tag)=>`${linkTo.myleetcode}/${tag}`},
    {val:'lang'}
]
}

export default defaultProps
