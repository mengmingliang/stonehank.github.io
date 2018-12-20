import React from 'react';

import {navigate} from "@reach/router"
import Loading from "../share-components/Loading";

import ListLazyScrollHOC from "../share-components/ListLazyScrollHOC";

import CategoryDetailList from "./CategoryDetailList";


const LazyScrollCategoryDetail=ListLazyScrollHOC(CategoryDetailList)

export default class CategoryDetail extends React.Component {
  constructor(props){
    super(props)
    this.state={
      contentLoading:true,
      tagList:null,
      tagName:null,
    }
    this.detailListContent=React.createRef()
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
     contentLoading
       ? <Loading loading={contentLoading} render_nums={1} ske_title_width={"15%"}  ske_para_rows={6} />
       : <div ref={this.detailListContent} id={'categoryList'} >
           <LazyScrollCategoryDetail allData={tagList}
                                     useWindow={true}
                                     contentEle={()=>this.detailListContent.current}
                                     tagName={tagName} />
         </div>
   )
  }
}

