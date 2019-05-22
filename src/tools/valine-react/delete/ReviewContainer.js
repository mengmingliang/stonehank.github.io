import React from 'react';
import PreviewComponent from "../textArea/input-components/review/PreviewComponent";
import marked from 'marked';
const xss=require('xss')

function replaceAt(content,rid="_"){
  return content.replace(/^(@.+)\s/,`<a href="#${rid}">$1</a>&nbsp;`)
}


export default class ReviewContainer extends React.Component {
  constructor(props){
    super(props)
    this.state={
      reviewContent:''
    }
    this.parseContent=this.parseContent.bind(this)
  }


  parseContent(){
    const {commentContent}=this.props
    // console.log(this.props)
    let reviewContent=replaceAt(commentContent)
    reviewContent=xss(marked(reviewContent))
    if(reviewContent===this.state.reviewContent)return
    this.setState({
      reviewContent
    })
  }

  componentDidUpdate(){
    if(this.props.reviewShow){
      this.parseContent()
    }
  }

  render() {
    const {reviewContent} = this.state;
    const {reviewShow,toggleReviewShow}=this.props
    return (
      <PreviewComponent show={reviewShow}
                        reviewContent={reviewContent}
                        handleToggle={toggleReviewShow}
                       // parseContent={this.parseContent}
      />
    );
  }
}
