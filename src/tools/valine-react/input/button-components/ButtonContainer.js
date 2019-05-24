import React from 'react';
import EmojiComponentShow from "./emoji/EmojiComponentShow";
import PreviewComponentShow from "./preview/PreviewComponentShow";
import {xssMarkdown,replaceAt} from '../../utils/index'
import ButtonComponent from "./ButtonComponent";
import ControlButton from "./ControlButton";


export default class ButtonContainer extends React.PureComponent {
  constructor(props){
    super(props)
    this.state={
      show:false,
      previewContent:''
    }
    this.parseContent=this.parseContent.bind(this)
    this.shutdownEmojiPanel=this.shutdownEmojiPanel.bind(this)
    this.toggleEmojiShow=this.toggleEmojiShow.bind(this)
  }

  toggleEmojiShow(){
    this.setState((prevState)=>({
      show:!prevState.show
    }))
  }

  parseContent(){
    const {commentContent}=this.props
    let previewContent=replaceAt(commentContent)
    previewContent=xssMarkdown(previewContent)
    if(previewContent===this.state.previewContent)return
    this.setState({
      previewContent
    })
  }

  shutdownEmojiPanel(event){
    if(!event)return
    event.stopPropagation()
    if(event && typeof event.target.className==="string"  && !event.target.className.includes("vemoji")){
      this.setState(()=>({
        show:false
      }))
    }
  }


  componentDidMount(){
    document.addEventListener('click',this.shutdownEmojiPanel)
  }
  componentWillUnmount(){
    document.removeEventListener('click',this.shutdownEmojiPanel)
  }
  componentDidUpdate(){
    if(this.props.previewShow){
      this.parseContent()
    }
  }
  render() {
    const {show,previewContent} = this.state;
    const {previewShow,togglePreviewShow,submitBtnDisable,handleOnSubmit,insertEmoji}=this.props
    return (
      <React.Fragment>
        <ButtonComponent previewShow={previewShow} togglePreviewShow={togglePreviewShow} toggleEmojiShow={this.toggleEmojiShow}/>
        <EmojiComponentShow show={show} insertEmoji={insertEmoji} />
        <PreviewComponentShow previewShow={previewShow} previewContent={previewContent} />
        <ControlButton submitBtnDisable={submitBtnDisable} handleOnSubmit={handleOnSubmit}/>
      </React.Fragment>
    );
  }
}
