import React from 'react';
import { Card } from 'antd';
// import ArticleStatusBar from "./ArticleStatusBar";
import {navigate} from "@reach/router";
// import {linkTo} from "../routes/linkPathList";
import {deepEqual} from "../utils/index";
import ArticleHeaderProps from "./ArticleHeaderProps";
// import {ArticleListCardDefaultProps} from '../defaultProps'
import {linkTo} from "../routes/linkPathList";

// const {
//   singleRenderPropsOnHeaderDefault,
//   multiRenderPropsOnHeaderDefault,
//   showCommentDefault,
//   getContentDetailPathDefault
// }=ArticleListCardDefaultProps

export default class ArticleListCard extends React.Component {
  static defaultProps={
    getContentDetailPath:curPropsData=>linkTo.articles+"/"+curPropsData.uniqueID,
    singleRenderPropsOnHeader:[{val:'createdTime'}],
    multiRenderPropsOnHeader:[{val:'relatedTags',ele:'tag',link:(tag)=>`${linkTo.category}/${tag}`}],
    showCommentDefault:{title:'title',sha:'uniqueID'}
  }

  constructor() {
    super()
    this.navigateToPath=this.navigateToPath.bind(this)
  }

  shouldComponentUpdate(props){
    const {summary,title,...curOtherProps}=this.props
    const {summary:prevSummary,title:prevTitle,...prevOtherProps}=props
    return !deepEqual(curOtherProps,prevOtherProps)
  }

  navigateToPath(path,e){
    const {beforeNavigate}=this.props
    // console.log(e.target)
    if(e.target.className.includes('tag'))return
    if(beforeNavigate)beforeNavigate()
    navigate(path)
  }

  render() {

    const {
      title,
      curPropsData,
      summary,
      getContentDetailPath,
      singleRenderPropsOnHeader,
      multiRenderPropsOnHeader,
      showComment,
      cardStyle,
      bodyStyle
    }=this.props


    return (
      <Card hoverable
            bordered={false}
            style={cardStyle}
            bodyStyle={bodyStyle}
            onClick={
        this.navigateToPath.bind(this,getContentDetailPath(curPropsData))
      } >
        <div>
          <div>{title|| curPropsData['title']}</div>
          {
            curPropsData
              ? <div>
                  <ArticleHeaderProps curContentData={curPropsData}
                                      singleRenderPropsOnHeader={singleRenderPropsOnHeader }
                                      multiRenderPropsOnHeader={multiRenderPropsOnHeader }
                                      showComment={showComment}/>
                </div>
              : null
          }
          {
            summary
              ? <div className="markdown-body">{summary}</div>
              : null
          }
        </div>
      </Card>
    )
  }
}

