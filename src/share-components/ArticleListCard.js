import React from 'react';
import { Card } from 'antd';
import {navigate} from "@reach/router";
import {deepEqual} from "../utils/index";
import ArticleHeaderProps from "./ArticleHeaderProps";
import {linkTo} from "../routes/linkPathList";



export default class ArticleListCard extends React.Component {
  static defaultProps={
    getContentDetailPath:curPropsData=>linkTo.articles+"/"+curPropsData.uniqueID,
    singleRenderPropsOnHeader:[{val:'createdTime'}],
    multiRenderPropsOnHeader:[{val:'relatedTags',ele:'tag',link:(tag)=>`${linkTo.category}/${tag}`}],
    showComment:{title:'title',sha:'uniqueID'}
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
      bodyStyle,
      oneRow
    }=this.props

// console.log(curPropsData)
    return (
      <Card hoverable
            bordered={false}
            style={cardStyle}
            bodyStyle={bodyStyle}
            onClick={this.navigateToPath.bind(this,getContentDetailPath(curPropsData))} >
        <div style={oneRow ? {display:'flex'} : null}>
          <div style={{flex:2}}>{title|| curPropsData['title']}</div>
          {
            curPropsData
              ? <div style={{flex:5}}>
                  <ArticleHeaderProps curContentData={curPropsData}
                                      oneRow={oneRow}
                                      singleRenderPropsOnHeader={singleRenderPropsOnHeader }
                                      multiRenderPropsOnHeader={multiRenderPropsOnHeader }
                                      showComment={showComment}/>
                </div>
              : null
          }
        </div>
        {
          summary
            ? <div className="markdown-body">{summary}</div>
            : null
        }
      </Card>
    )
  }
}

