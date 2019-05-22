import React from 'react';
import InputComponent from "./InputComponent";

const avatarsList=["mp","identicon", "monsterid",  "retro", "robohash", "wavatar","blank",]

export default class InputContainer extends React.Component {
  constructor(props){
    super(props)
    this.state={
      nickName:'',
      email:'',
      link:'',
      avatarSrc:`${props.GRAVATAR_URL}/?d=${avatarsList[Math.floor(Math.random()*avatarsList.length)]}&size=50`,
    }
    this.emailOnChange=this.emailOnChange.bind(this)
    this.linkOnChange=this.linkOnChange.bind(this)
    this.nameOnChange=this.nameOnChange.bind(this)
    this.avatarOnChange=this.avatarOnChange.bind(this)
    this.handleOnSubmit=this.handleOnSubmit.bind(this)
  }

  avatarOnChange(event){
    // console.log(event,event.target,event.currentTarget)
    let ele=event.target,parent=event.currentTarget
    return new Promise((resolve,reject)=>{
      if(parent.className==="vavatars-select-list" && ele.nodeName==="IMG"){
        let src=''
        if(ele.getAttribute)src=ele.getAttribute("src")
        else src=ele.src
        // console.log(src)
        this.setState({
          avatarSrc:src
        })
          resolve()


      }else{
        reject()
      }
    })
  }

  nameOnChange(event){
    let newStr=event.target.value
    this.setState({
      nickName:newStr
    })
  }

  emailOnChange(event){
    let newStr=event.target.value
    this.setState({
      email:newStr
    })
  }

  linkOnChange(event){
    let newStr=event.target.value
    this.setState({
      link:newStr
    })
  }
  handleOnSubmit(){
    const {nickName,email,link,avatarSrc}=this.state
    const {submitComment}=this.props
    submitComment({mail:email,link,nick:nickName,avatarSrc})

  }

  componentDidMount(){
    if(localStorage){
      let item=localStorage.getItem("ValineCache")
      if(!item)return
      let obj=JSON.parse(item)
      console.log(obj)
      this.setState({
        link:obj.link,
        nickName:obj.nick,
        email:obj.mail,
        avatarSrc:obj.avatarSrc || this.state.avatarSrc
      })
    }
  }

  render() {
    const { link,email,nickName,avatarSrc } = this.state;
    const {commentContent,placeholder,requireName,requireEmail,GRAVATAR_URL,submitBtnDisable,toggleTextAreaFocus,previewShow,togglePreviewShow,contentOnChange}=this.props
    return (
      <InputComponent email={email}
                      link={link}
                      nickName={nickName}
                      avatarSrc={avatarSrc}
                      requireName={requireName}
                      requireEmail={requireEmail}
                      GRAVATAR_URL={GRAVATAR_URL}
                      commentContent={commentContent}
                      placeholder={placeholder}
                      previewShow={previewShow}
                      submitBtnDisable={submitBtnDisable}
                      toggleTextAreaFocus={toggleTextAreaFocus}
                      togglePreviewShow={togglePreviewShow}
                      linkOnChange={this.linkOnChange}
                      emailOnChange={this.emailOnChange}
                      nameOnChange={this.nameOnChange}
                      avatarOnChange={this.avatarOnChange}
                      contentOnChange={contentOnChange}
                      handleOnSubmit={this.handleOnSubmit}
      />
    );
  }
}
