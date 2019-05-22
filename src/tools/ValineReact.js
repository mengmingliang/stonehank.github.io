import React from 'react'
import Valine from 'valine';

window.AV = require('leancloud-storage');

export default class ValineComment extends React.Component{
  constructor(props){
    super(props)
  }
  // componentDidUpdate(){
  //   window.AV = require('leancloud-storage');
  //   new Valine({
  //     el: '#vcomments',
  //     appId: 'I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz',
  //     appKey: 'lGPcHd7GL9nYKqBbNEkgXKjX',
  //     avatar:'retro',
  //     placeholder: "给点意见吧~",
  //     path:window.location.pathname
  //   })
  // }
  componentDidMount(){

    new Valine({
      el: '#vcomments',
      appId: 'I5DAxOhp2kPXkbj9VXPyKoEB-gzGzoHsz',
      appKey: 'lGPcHd7GL9nYKqBbNEkgXKjX',
      avatar:'retro',
      placeholder: "给点意见吧~",
      path:window.location.pathname,
      visitor: true
    })
  }
  render(){
    return (
      <div>
        <span id="<Your/Path/Name>" className="leancloud-visitors" data-flag-title="Your Article Title">
          <em className="post-meta-item-text">阅读量 </em>
          <i className="leancloud-visitors-count">1000000</i>
        </span>
        <div id={'vcomments'} />
      </div>)
  }
}