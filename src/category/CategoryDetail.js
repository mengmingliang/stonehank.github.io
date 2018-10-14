import React from 'react';
import {List} from 'antd';
import {navigate} from "@reach/router"
import {linkTo} from '../routes/linkPathList'
import Loading from "../tools/Loading";
import TagHeader from "./TagHeader";
import CardPure from "../tools/CardPure";


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
      tagList:null,
      tagName:null,
    }
  }
  navigateToPath(path,e){
    if(e.target.className.includes('tag'))return
    navigate(path)
  }

  static getDerivedStateFromProps(nextProps,prevState){
    const {location,categoryArticles}=nextProps
    const pathname=location.pathname
    let basenameStart=pathname.lastIndexOf('/')+1
    let basename=decodeURIComponent(pathname.substr(basenameStart))
    if(prevState.tagName===basename)return null
    let activeData =categoryArticles?categoryArticles[basename]:null
    if(categoryArticles && !activeData){
      navigate("/NoThisPage",{replace:true})
    }
    if(!activeData)return null
    // console.log(basename,prevState.tagName,activeData)
    return {
      tagList:activeData,
      tagName:basename,
      contentLoading:false
    }
  }

  componentDidMount(){
    Promise.resolve().then(()=>{
      window.scrollTo(0, 0);
    })
  }

  render() {
    // console.log("render")
    const {tagList,contentLoading,tagName}=this.state
   return (
     contentLoading ?
       <Loading loading={contentLoading} render_nums={1} ske_title_width={"15%"}  ske_para_rows={6} /> :
       <List size="small"
             split={false}
             style={styles.list}
             header={
               <TagHeader tag={tagName} />
             }
         dataSource={tagList}
         renderItem={item => (
           <CardPure hoverable bordered={false}
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

