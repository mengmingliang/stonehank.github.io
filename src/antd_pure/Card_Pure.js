import React from 'react';
import { Card } from 'antd';
import {navigate} from "@reach/router/index";
import ArticleStatusBar from "../tools/ArticleStatusBar";


export default class Card_Pure extends React.PureComponent {

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

