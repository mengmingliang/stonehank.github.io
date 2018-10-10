import React from 'react';
import {List,Icon} from 'antd';
import {navigate} from "@reach/router"
import {linkTo} from '../routes/linkPathList'
import Loading from "../tools/Loading";
import TagHeader from "./TagHeader";
import Card_Pure from "../antd_pure/Card_Pure";


const styles={
  card_pure_body:{padding:12},
  card:{margin:"8px 0"},
  list:{margin: '24px 36px'},
  icon:{color: "#46a6ff",marginRight:4},
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
  navigateToPath(path,e){
    if(e.target.className.includes('tag'))return
    navigate(path)
  }
  static getDerivedStateFromProps(nextProps,prevState){
    // console.log(prevState.labelName,nextProps.labelName)

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
               <TagHeader tag={labelName} />
             }
         dataSource={labelList}
         renderItem={item => (
           <Card_Pure hoverable bordered={false}
                      bodyStyle={styles.card_pure_body}
                      style={styles.card}
                      title={item.title}
                      statusBarItem={item}
                      onClick={this.navigateToPath.bind(this,linkTo.articles+"/"+item.sha)}
           />
         )}
       />
   )
  }
}

