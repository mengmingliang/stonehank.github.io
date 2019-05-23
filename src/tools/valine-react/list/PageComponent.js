import React from 'react'

export default class PageComponent extends React.Component{

  render(){
    const {currentCounts, commentCounts, nestShow,fillNxtCommentList}=this.props
    return (
      <div className="vpage txt-center">
        {
          currentCounts < commentCounts
            ? <button onClick={fillNxtCommentList}>{"加载更多评论"+(nestShow ? "" : `(剩余${commentCounts - currentCounts}条)`)}</button>
            : <span>已经到最后了</span>
        }
      </div>
    )
  }
}