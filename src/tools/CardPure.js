import React from 'react';
import { Card } from 'antd';
import ArticleStatusBar from "./ArticleStatusBar";


export default class CardPure extends React.PureComponent {

  render() {
    const {title,statusBarItem,summary,...otherProps}=this.props
    return (
      <Card  {...otherProps} >
        {title?<div>{title}</div>:null}
        {statusBarItem?<div><ArticleStatusBar article={statusBarItem}/></div>:null}
        {summary?<div>{summary}</div>:null}
      </Card>
    )
  }
}

