import React, { Component } from 'react';
import {Button,Anchor ,Skeleton,Collapse,List,Row,Col,Tag,Icon} from 'antd';
// import {navigate} from "@reach/router"
import {Link} from "@reach/router"

import ArticleStatusBar from "./ArticleStatusBar"


const Panel = Collapse.Panel;

export default class CategoryDetail extends Component {
  constructor(){
    super()
    this.state={
      contentLoading:true,
      labelList:null,
      labelName:null
    }
  }
  static getDerivedStateFromProps(nextProps,prevState){
    console.log(prevState.labelName,nextProps.labelName)
    if(prevState.labelName===nextProps.labelName)return null
    const {labelList,labelName}=nextProps
    if(!labelList)return null
    return {
      labelList,
      labelName,
      contentLoading:false
    }
  }
  render() {
    const {labelList,contentLoading,labelName}=this.state
   return (
     contentLoading ?
       <Skeleton active loading={contentLoading} title={{width: "15%"}} paragraph={{rows: 6}}/> :
       <List size="small"
             split={false}
             style={{margin:"0 36px"}}
             header={<Button style={{background:"#001529",color:"#fff"}}>{labelName}</Button>}
         dataSource={labelList}
         renderItem={item => (
           <List.Item style={{margin:"0 0 12px 24px",background:"#fcfcfc"}}>
             <List.Item.Meta
               title={<Link to={`/articles/${item.title}`}>{item.title}</Link>}
               description={
                 <ArticleStatusBar article={item}/>
               }
             />

           </List.Item>
         )}
       />
   )
  }
}

