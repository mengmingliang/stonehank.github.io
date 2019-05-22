import React from 'react'

export default class PageComponent extends React.Component{

  render(){
    const {commentList, commentCounts,fetchLoading, fetchNxtCommentList}=this.props
    return (
      <div className="vpage txt-center">
        {
          commentList.length < commentCounts
            ? <button onClick={fetchNxtCommentList}>加载更多评论（剩余{commentCounts - commentList.length}条）</button>
            : <span>已经到最后了</span>
        }
      </div>
    )
  }
}