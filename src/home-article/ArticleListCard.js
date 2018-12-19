import React from 'react';
import { Card } from 'antd';
// import ArticleStatusBar from "./ArticleStatusBar";
import {navigate} from "@reach/router";
import {linkTo} from "../routes/linkPathList";
import {deepEqual} from "../utils/index";
import ArticleHeaderProps from "../share-components/ArticleHeaderProps";
import {ArticleListCardDefaultProps} from '../defaultProps'

const {
  titlePropDefault,
  singleRenderPropsOnHeaderDefault,
  multiRenderPropsOnHeaderDefault,
  showCommentDefault,
  getContentDetailPathDefault
}=ArticleListCardDefaultProps

export default class ArticleListCard extends React.Component {
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
    if(e.target.className.includes('tag'))return
    if(beforeNavigate)beforeNavigate()
    navigate(path)
  }

  render() {

    const {
      titleProp,
      curPropsData,
      summary,
      getContentDetailPath,
      singleRenderPropsOnHeader,
      multiRenderPropsOnHeader,
      showComment,
      cardStyle,
      bodyStyle
    }=this.props

    let _getPath=getContentDetailPath
      ? getContentDetailPath(curPropsData)
      : getContentDetailPathDefault(curPropsData)
    return (
      <Card hoverable
            bordered={false}
            style={cardStyle}
            bodyStyle={bodyStyle}
            onClick={
        this.navigateToPath.bind(this,_getPath)
      } >
        <div>
          <div>{curPropsData[titleProp || titlePropDefault]}</div>
          {
            curPropsData
              ? <div>
                  <ArticleHeaderProps curContentData={curPropsData}
                                      singleRenderPropsOnHeader={singleRenderPropsOnHeader || singleRenderPropsOnHeaderDefault}
                                      multiRenderPropsOnHeader={multiRenderPropsOnHeader || multiRenderPropsOnHeaderDefault}
                                      showComment={showComment==null ? showCommentDefault :showComment }/>
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

