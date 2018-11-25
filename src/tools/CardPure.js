import React from 'react';
import { Card } from 'antd';
import ArticleStatusBar from "./ArticleStatusBar";
import {navigate} from "@reach/router";
import {linkTo} from "../routes/linkPathList";
import {deepEqual} from "../utils";

export default class CardPure extends React.Component {
  constructor() {
    super()
    this.navigateToPath=this.navigateToPath.bind(this)
  }
  shouldComponentUpdate(props){
    const {summary,title,...curOtherProps}=this.props
    const {summary:prevSummary,title:prevTitle,...prevOtherProps}=this.props
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
    const {title,statusBarItem,summary,beforeNavigate,noCount,...otherProps}=this.props
    return (
      <Card onClick={this.navigateToPath.bind(this,linkTo.articles+"/"+statusBarItem.titleSHA)} {...otherProps}>
        {title?<div>{title}</div>:null}
        {statusBarItem?<div><ArticleStatusBar noCount={noCount} article={statusBarItem}/></div>:null}
        {summary?<div>{summary}</div>:null}
      </Card>
    )
  }
}

