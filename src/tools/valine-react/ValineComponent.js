import React from 'react'
import InfoComponent from "./info/InfoComponent";
import CommentListComponent from "./list/CommentListComponent";
import InputContainer from "./input/InputContainer";

const GRAVATAR_URL='https://gravatar.loli.net/avatar'

export default class ValineComponent extends React.Component{


  render(){
    const {commentCounts, commentList, placeholder, emptyTxt, toggleTextAreaFocus, submitLoading,fetchMoreLoading,fetchInitLoading,nestShow,
      requireName,requireEmail,submitErrorLog, submitBtnDisable,previewShow,commentContent, submitComment,handleReply,togglePreviewShow,
      commentContentOnChange,fetchNxtCommentList}=this.props
    return (
      <React.Fragment>
        <div className="vwrap">
          {
            submitErrorLog!=null
              ? <div className={"verrorlog"}>{submitErrorLog}</div>
              : null
          }
          <InputContainer submitBtnDisable={submitBtnDisable}
                          placeholder={placeholder}
                          requireName={requireName}
                          requireEmail={requireEmail}
                          GRAVATAR_URL={GRAVATAR_URL}
                          commentContent={commentContent}
                          toggleTextAreaFocus={toggleTextAreaFocus}
                          previewShow={previewShow}
                          submitComment={submitComment}
                          togglePreviewShow={togglePreviewShow}
                          contentOnChange={commentContentOnChange}
          />
        </div>
        <InfoComponent commentCounts={commentCounts}/>
        <CommentListComponent GRAVATAR_URL={GRAVATAR_URL}
                              commentCounts={commentCounts}
                              commentList={commentList}
                              emptyTxt={emptyTxt}
                              nestShow={nestShow}
                              submitLoading={submitLoading}
                              fetchMoreLoading={fetchMoreLoading}
                              fetchInitLoading={fetchInitLoading}
                              handleReply={handleReply}
                              fetchNxtCommentList={fetchNxtCommentList}
        />
      </React.Fragment>
    )
  }
}