import React from 'react'
import CreatedTimeComponent from "./CreatedTimeComponent";
import {xssMarkdown} from "../utils";


export default class CommentCardComponent extends React.Component{
  constructor(props){
    super(props)
    this.state={
      showChild:false
    }
    this.toggleShowChild=this.toggleShowChild.bind(this)
  }

  toggleShowChild(){
    this.setState((prevState)=>({
      showChild:!prevState.showChild
    }))
  }

  render(){
    const {showChild}=this.state
    const {GRAVATAR_URL,curId,nestShow,toggleShowChild,child,avatarSrc, link, handleReply,nickName, commentContent,createdAt}=this.props
    return (
      <div id={curId} className={'vcard'} >
        <img className={"vimg"} src={avatarSrc || `${GRAVATAR_URL}/?d=mp&size=50`}/>
        <div className={'vh'}>
          <div className={"vhead"}>
                          <span className={"vnick"}>
                            {link
                              ? <a  href={ link } target="_blank" rel="nofollow" > {nickName}</a>
                              : <span>{nickName}</span>
                            }
                          </span>
            <span className={"vsys"}></span>
            <span className={"vsys"}></span>
          </div>
          <div className={"vmeta"}>
            <CreatedTimeComponent oldTime={createdAt} />
            <span className={"vat"} onClick={handleReply.bind(this,curId,nickName)}>回复</span>
          </div>
          <div className={"vcontent"}>
            <div dangerouslySetInnerHTML={{__html:commentContent}} />
          </div>
          {
            nestShow && child.length>0
            ? showChild
              ? <React.Fragment>
                <div className={"vquote"}>
                  {
                    child.map(commentObj=>{
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
                <span className={"showchild-button-off"} onClick={this.toggleShowChild}>收起回复</span>
              </React.Fragment>
              : <span className={"showchild-button-on"} onClick={this.toggleShowChild}>展开回复</span>
            : null
          }
          {/*{*/}
            {/*nestShow && child.length>0*/}
            {/*? <div className={"vquote"}>*/}
                {/*{*/}
                   {/*!showChild*/}
                    {/*? <span className={"showchild-button"} onClick={this.toggleShowChild}>展开回复</span>*/}
                    {/*: child.map(commentObj=>{*/}
                      {/*let avatarSrc = commentObj['avatarSrc'],*/}
                        {/*nickName=commentObj["nick"],*/}
                        {/*link=commentObj["link"],*/}
                        {/*createdAt=commentObj['createdAt'],*/}
                        {/*commentContent=xssMarkdown(commentObj['comment']),*/}
                        {/*curId=commentObj['id']*/}
                      {/*let child=nestShow ? commentObj['child'] : null*/}

                      {/*return <CommentCardComponent curId={curId}*/}
                                                   {/*key={curId}*/}
                                                   {/*nestShow={nestShow}*/}
                                                   {/*child={child}*/}
                                                   {/*GRAVATAR_URL={GRAVATAR_URL}*/}
                                                   {/*avatarSrc={avatarSrc}*/}
                                                   {/*link={link}*/}
                                                   {/*handleReply={handleReply }*/}
                                                   {/*nickName={nickName}*/}
                                                   {/*commentContent={commentContent}*/}
                                                   {/*createdAt={createdAt}*/}
                      {/*/>*/}
                    {/*})*/}
                {/*}*/}
              {/*</div>*/}
            {/*: null*/}
          {/*}*/}
          {/*{*/}
            {/*nestShow && showChild*/}
              {/*? <span className={"showchild-button"} onClick={this.toggleShowChild}>收起回复</span>*/}
              {/*: null*/}
          {/*}*/}
        </div>
      </div>
    )
  }
}