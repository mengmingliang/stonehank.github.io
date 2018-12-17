import React from 'react';
import { Card } from 'antd';
import ArticleStatusBar from "./ArticleStatusBar";
import {navigate} from "@reach/router";
import {linkTo} from "../routes/linkPathList";
import {deepEqual} from "../utils/index";

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
    // console.log(1)
    const {title,statusBarItem,summary,beforeNavigate,noCount,linkToPath,createdTime,label,labelLinkToProp,...otherProps}=this.props
    let _linkToPath
    if(linkToPath==null)_linkToPath=linkTo.articles+"/"+statusBarItem.titleSHA
    else _linkToPath=linkToPath
    // console.log(statusBarItem)
    return (
      <Card onClick={this.navigateToPath.bind(this,_linkToPath)} {...otherProps}>
        {
          title
            ? <div>{title}</div>
            : null
        }
        {
          statusBarItem
          ? <div>
              <ArticleStatusBar noCount={noCount}
                                createdTime={createdTime==null?"createdTime":createdTime}
                                label={label==null?"label":label}
                                labelLinkToProp={labelLinkToProp==null?"category":labelLinkToProp}
                                article={statusBarItem}/>
            </div>
          : null
        }
        {
          summary
            ? <div className="markdown-body">{summary}</div>
            : null
        }
      </Card>
    )
  }
}

