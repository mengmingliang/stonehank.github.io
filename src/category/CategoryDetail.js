import React from 'react';
import {Button,Anchor ,Skeleton,Collapse,List,Tag,Icon} from 'antd';
import {Link} from "@reach/router"
import {linkTo} from '../routes/linkPathList'
import ArticleStatusBar from "../tools/ArticleStatusBar"
import Tag_Light from "../tools/Tag_Light";
import Loading from "../tools/Loading";


const styles={
  list:{margin: '24px 36px'},
  list_item:{margin:"0 0 12px 24px",background:"#fcfcfc"},
}

export default class CategoryDetail extends React.Component {
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
       <Loading loading={contentLoading} render_nums={1} ske_title_width={"15%"}  ske_para_rows={6} /> :
       <List size="small"
             split={false}
             style={styles.list}
             header={
               <React.Fragment>
                 <Icon type="tag" />
                 <Tag_Light>{labelName}</Tag_Light>
               </React.Fragment>
             }
         dataSource={labelList}
         renderItem={item => (
           <List.Item style={styles.list_item}>
             <List.Item.Meta
               title={<Link to={`${linkTo.articles}/${item.title}`}>{item.title}</Link>}
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

