import React from 'react';

import {navigate} from "@reach/router"
import Loading from "../share-components/Loading";

import ListLazyScrollHOC from "../share-components/ListLazyScrollHOC";
import LeetcodeCategoryDetailList from "./LeetcodeCategoryDetailList";

const LazyScrollLeetcodeCategory=ListLazyScrollHOC(LeetcodeCategoryDetailList)



export default class LeetcodeCategoryDetail extends React.Component {
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
    const {renderData}=nextProps
    let nextTag=nextProps.tag
    if(prevState.tagName===nextTag)return null
    // console.log(renderData,basename,nextProps.tag)
    let activeData =renderData?renderData[nextTag]:null
    if(renderData && !activeData){
      navigate("/NoThisPage",{replace:true})
    }
    if(!activeData)return null
    return {
      tagList:activeData,
      tagName:nextTag,
      contentLoading:false
    }
  }

  componentDidMount(){
    const {renderData}=this.state
    if(!renderData)this.props.fetchLeetcodeList()
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
        : <div ref={this.detailListContent}>
            <LazyScrollLeetcodeCategory allData={tagList}
                                        useWindow={true}
                                        contentEle={()=>this.detailListContent.current}
                                        tagName={tagName} />
          </div>

    )
  }
}

