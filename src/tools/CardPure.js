import React from 'react';
import { Card } from 'antd';
import ArticleStatusBar from "./ArticleStatusBar";
import {navigate} from "@reach/router";
import {linkTo} from "../routes/linkPathList";


export default class CardPure extends React.PureComponent {
  constructor() {
    super()
    this.navigateToPath=this.navigateToPath.bind(this)
  }

  navigateToPath(path,e){
    const {beforeNavigate}=this.props
    console.log(e.target)
    if(e.target.className.includes('tag'))return
    if(beforeNavigate)beforeNavigate()
    navigate(path)
  }
  render() {
    const {title,statusBarItem,summary,beforeNavigate,...otherProps}=this.props
    return (
      <Card onClick={this.navigateToPath.bind(this,linkTo.articles+"/"+statusBarItem.titleSHA)} {...otherProps}>
        {title?<div>{title}</div>:null}
        {statusBarItem?<div><ArticleStatusBar article={statusBarItem}/></div>:null}
        {summary?<div>{summary}</div>:null}
      </Card>
    )
  }
}

