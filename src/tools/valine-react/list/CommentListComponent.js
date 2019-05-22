import React from 'react'
import Loading from "../Loading";
import PageComponent from "./PageComponent";
import CommentCardComponent from "./CommentCardComponent";
import {xssMarkdown} from '../utils'


export default class CommentListComponent extends React.Component{

  render(){
    const {commentList, commentCounts, emptyTxt, handleReply,submitLoading,fetchInitLoading,fetchMoreLoading, GRAVATAR_URL,fetchNxtCommentList}=this.props
    console.log(commentList)
    return (

      <React.Fragment>
        {
          submitLoading
          ? <Loading />
          : null
        }
        {
          fetchInitLoading
          ? <Loading />
          : <React.Fragment>
              <div className={"vlist"}>
                {
                  commentCounts===0
                    ? <div className={"vempty"}>{emptyTxt}</div>
                    : commentList.map(commentObj=>{
                      let avatarSrc = commentObj.get('avatarSrc'),
                        nickName=commentObj.get("nick"),
                        link=commentObj.get("link"),
                        createdAt=commentObj.get('createdAt'),
                        commentContent=xssMarkdown(commentObj.get('comment')),
                        curId=commentObj.id

                      return <CommentCardComponent curId={curId}
                                                   key={curId}
                                                   GRAVATAR_URL={GRAVATAR_URL}
                                                   avatarSrc={avatarSrc}
                                                   link={link}
                                                   handleReply={handleReply }
                                                   nickName={nickName}
                                                   commentContent={commentContent}
                                                   createdAt={createdAt}
                      />
                    })
                }
              </div>
              <PageComponent commentList={commentList} commentCounts={commentCounts}  fetchNxtCommentList={fetchNxtCommentList}/>
              {
                fetchMoreLoading
                  ? <Loading />
                  : null
              }
            </React.Fragment>
        }

      </React.Fragment>
    )
  }
}