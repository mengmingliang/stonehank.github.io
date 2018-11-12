import React from "react";
import BlogLayout from '../BlogLayout'

export default class WrappedProgressApp extends React.Component{
  constructor(){
    super()
    this.state={
      readyRender:false
    }
  }

  componentDidMount(){
    const progressEle = document.getElementById("progressLoading");
    setTimeout(()=>{
      document.body.removeChild(progressEle)
      this.setState({
        readyRender:true
      })
    },300)
  }
  render(){
    const {readyRender}=this.state
    return (
      readyRender ?
        <BlogLayout {...this.props} /> :
        null
    )
  }
}

