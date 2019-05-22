import React from 'react';
import EmojiComponent from "./emoji/EmojiComponent";
import PreviewComponent from "./preview/PreviewComponent";
import SubmitComponent from "./submit/SubmitComponent";
import EmojiComponentShow from "./emoji/EmojiComponentShow";
import PreviewComponentShow from "./preview/PreviewComponentShow";
import MarkDownSupportInfo from "./MarkDownSupportInfo";
import {xssMarkdown,replaceAt} from '../../utils/index'


export default class ButtonContainer extends React.Component {
  constructor(props){
    super(props)
    this.state={
      show:false,
      previewContent:''
    }
    this.parseContent=this.parseContent.bind(this)
    this.checkIfClose=this.checkIfClose.bind(this)
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

  checkIfClose(event){
    if(!event)return
    // event.stopPropagation()
    if(event && typeof event.target.className==="string"  && !event.target.className.includes("vemoji")){
      // console.log(event.target.className)
      this.setState(()=>({
        show:false
      }))
    }
  }


  componentDidMount(){
    document.addEventListener('click',this.checkIfClose)
  }
  componentWillUnmount(){
    document.removeEventListener('click',this.checkIfClose)
  }
  componentDidUpdate(){
    if(this.props.previewShow){
      this.parseContent()
    }
  }
  render() {
    const {show,previewContent} = this.state;
    const {contentOnChange,previewShow,togglePreviewShow,submitBtnDisable,handleOnSubmit}=this.props
    return (
      <React.Fragment>
        <div className={"vctrl"}>
          <EmojiComponent toggleEmojiShow={this.toggleEmojiShow}/>
          <PreviewComponent previewShow={previewShow} togglePreviewShow={togglePreviewShow}/>
        </div>
        <EmojiComponentShow show={show} contentOnChange={contentOnChange} />
        <PreviewComponentShow previewShow={previewShow} previewContent={previewContent} />
        <div className="vcontrol">
          <MarkDownSupportInfo />
          <SubmitComponent submitBtnDisable={submitBtnDisable} handleOnSubmit={handleOnSubmit}/>
        </div>
      </React.Fragment>

    );
  }
}
