import React from 'react'
import {xssMarkdown} from "../utils";
import CardAvatar from "./card/CardAvatar";
import CardHead from "./card/CardHead";
import CardMeta from "./card/CardMeta";
import CardContent from "./card/CardContent";


export default class CommentCardContainer extends React.PureComponent{
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

  // shouldComponentUpdate(nextProps,nextState){
  //   let {child:nxtChild,...nxtOtherProps}=nextProps,
  //     {child:curChild,...curOtherPorps}=this.props
  //   // console.log(nxtChild,curChild)
  //   return !(deepEqual(nxtChild,curChild) &&
  //     shallowEqual(nxtOtherProps,curOtherPorps) &&
  //     this.state.showChild===nextState.showChild)
  // }

  render(){
    const {showChild}=this.state
    const {
      GRAVATAR_URL,
      curId,
      nest,
      child,
      avatarSrc,
      rootId,
      link,
      handleReply,
      nickName,
      commentContent,
      createdAt
    }=this.props
    // console.log(2)
    return (
      <div id={curId} className={'vcard'} >
        <CardAvatar avatarSrc={avatarSrc} GRAVATAR_URL={GRAVATAR_URL}/>
        <div className={'vh'}>
          <CardHead link={link} nickName={nickName}/>
          <CardMeta curId={curId} rootId={rootId} nickName={nickName} createdAt={createdAt} handleReply={handleReply}/>
          <CardContent commentContent={commentContent}/>
          {
            nest && child.length>0
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
                      let child=nest ? commentObj['child'] : null

                      return <CommentCardContainer curId={curId}
                                                   key={curId}
                                                   rootId={rootId}
                                                   nest={nest}
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
        </div>
      </div>
    )
  }
}