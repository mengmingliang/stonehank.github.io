import React from 'react'
import {Icon,Spin} from 'antd';
// import Disqus from 'disqus-react';


const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


function createComment(Component,children){
  return class extends React.Component{
    render(){
      const {title,sha,locationOrigin}=this.props
      const disqusShortname = 'stonehank';
      const disqusConfig = {
        url: `${locationOrigin}/articles/${sha}`,
        identifier: sha,
        title: title,
      };
      return (
        <Component shortname={disqusShortname} config={disqusConfig}>
          {children}
        </Component>
      )
    }
  }
}


export default class CustomComment extends React.Component{
  render(){
    return null
  }
}

CustomComment.Count=createComment(Disqus.CommentCount,<div>评论数：<Spin indicator={antIcon} /></div>)
CustomComment.Detail=createComment(Disqus.DiscussionEmbed)