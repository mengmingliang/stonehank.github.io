import React from 'react'
import Loading from "../Loading";
import PageComponent from "./PageComponent";
import CommentCardComponent from "./CommentCardComponent";
import {xssMarkdown} from '../utils'


export default class CommentListComponent extends React.Component{

  render(){
    const {commentList, commentCounts,currentCounts, emptyTxt,nestShow, handleReply,submitLoading,fetchInitLoading,fetchMoreLoading, GRAVATAR_URL,fillNxtCommentList}=this.props
    // console.log(commentList)
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
                      let avatarSrc = commentObj['avatarSrc'],
                        nickName=commentObj["nick"],
                        link=commentObj["link"],
                        createdAt=commentObj['createdAt'],
                        commentContent=xssMarkdown(commentObj['comment']),
                        curId=commentObj['id']
                      let child=nestShow ? commentObj['child'] : null

                      return <CommentCardComponent curId={curId}
                                                   key={curId}
                                                   nestShow={nestShow}
                                                   child={child}
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
              <PageComponent  commentCounts={commentCounts} currentCounts={currentCounts}  fillNxtCommentList={fillNxtCommentList}/>
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