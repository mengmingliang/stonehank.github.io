import React from 'react';
import {Icon,Spin} from 'antd';


const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const deafultRender=<Spin indicator={antIcon} />
export default class SearchConfirmSize extends React.Component{
  constructor(props){
    super(props)
    this.state={
      fileSize:null
    }
  }
  componentDidMount(){
    import('../global-search-size.json')
      .then(data=>{
        this.setState({
          fileSize:data.size
        })
      })
  }
  render(){
    const {fileSize}=this.state

    return(
      <span>全局搜索会一次性加载所有内容，将会消耗额外流量约 <b>{  fileSize ||deafultRender}</b> kb</span>
    )
  }
}