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
    if(this.props.size!=null)return
    import('../global-search-size.json')
      .catch(e=>console.warn(e))
      .then(obj=>{
        this.setState({
          fileSize:obj.size
        })
      })
  }
  render(){
    const {size}=this.props
    const {fileSize}=this.state

    return(
      <span>全局搜索会一次性加载所有内容，将会消耗额外流量约 <b>{  size || fileSize ||deafultRender}</b> kb</span>
    )
  }
}