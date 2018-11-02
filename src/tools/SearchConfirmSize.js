import React from 'react';

export default class SearchConfirmSize extends React.Component{
  constructor(props){
    super(props)
    this.state={
      fileSize:null
    }
  }
  componentDidMount(){
    if(this.props.size!=null)return
    fetch("https://api.github.com/repositories/151232913/contents/static/js/global-search.chunk.js")
      .then(data=>data.json())
      .catch(e=>"未知")
      .then(obj=>{
        let size=Math.floor(obj.size/3.4/1024)
        this.props.setGlobalSearchSize(size)
        this.setState({
          fileSize:size
        })
      })
  }
  render(){
    return(
      <span>全局搜索会一次性加载所有内容，将会消耗额外流量约 <b>{this.props.size || this.state.fileSize}</b> kb</span>
    )
  }
}