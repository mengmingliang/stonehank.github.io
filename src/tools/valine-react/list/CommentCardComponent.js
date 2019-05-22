import React from 'react'
import CreatedTimeComponent from "./CreatedTimeComponent";


export default class CommentCardComponent extends React.Component{

  render(){
    const {GRAVATAR_URL,curId, avatarSrc, link, handleReply,nickName, commentContent,createdAt}=this.props
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
        </div>
      </div>
    )
  }
}