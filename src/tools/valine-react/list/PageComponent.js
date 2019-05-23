import React from 'react'

export default class PageComponent extends React.Component{

  render(){
    const {commentListLen, commentCounts, nestShow,fetchNxtCommentList}=this.props
    return (
      <div className="vpage txt-center">
        {
          commentListLen < commentCounts
            ? <button onClick={fetchNxtCommentList}>{"加载更多评论"+(nestShow ? "" : `(剩余${commentCounts - commentListLen}条)`)}</button>
            : <span>已经到最后了</span>
        }
      </div>
    )
  }
}