import {linkTo} from "./routes/linkPathList";


const singleRenderPropsOnHeaderDefault=[{val:'createdTime'}]
const multiRenderPropsOnHeaderDefault=[{val:'relatedTags',ele:'tag',link:(tag)=>`${linkTo.category}/${tag}`}]
const showCommentDefault={title:'title',sha:'uniqueID'}

const ArticleListCardDefaultProps={
  titlePropDefault:"title",
  getContentDetailPathDefault:curPropsData=>linkTo.articles+"/"+curPropsData.uniqueID,
  singleRenderPropsOnHeaderDefault,
  multiRenderPropsOnHeaderDefault,
  showCommentDefault,
}

const ArticleDetailComponentsDefaultProps={
  titlePropDefault:"title",
  fetchKeyPropDefault:"uniqueID",
  justifyDefault:"center",
  showCommentDefault,
  singleRenderPropsOnHeaderDefault,
  multiRenderPropsOnHeaderDefault
}


export  {
  ArticleDetailComponentsDefaultProps,
  ArticleListCardDefaultProps
}


