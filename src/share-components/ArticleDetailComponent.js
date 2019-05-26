import React from 'react'
import fetchLazyContent from '../leetcode-problem/fetchLazyContent'
import {Button,Divider, Pagination} from 'antd';
import {navigate} from "@reach/router";
import Loading from './Loading'
// import CustomComment from "../tools/CustomComment";
// import ValineComment from "../tools/ValineReact";
import BookmarkContext from '../bookmark/BookmarkContext'
import {SetMark} from "../bookmark/Bookmark";
import {querySearch} from "../utils/index";
import ArticleHeaderProps from './ArticleHeaderProps'
import {linkTo} from "../routes/linkPathList";

// import ValinePanel from '../tools/valine-react/ValinPanel'
// import ValineCount from "../tools/valine-react/ValineCount";
// import {ValineCount,ValinePanel} from "../tools/valine-react/index";
import {ValineCount,ValinePanel} from "react-valine";
// const obj=require("react-valine")
// let {ValineCount,ValinePanel}=obj
// const obj=require('react-valine')
// console.log(ValineCount,ValinePanel)
const styles={
  article:{margin:"24px 36px", background: '#fff', minHeight: 360},
  articleTitle:{textAlign:"center"},
  contentDiv:{marginTop:24},
  footer:{margin: "0 auto"},
  disqusButton:{display:"block",margin:"20px auto"}
}

export default class ArticleDetailComponent extends React.Component{

  static defaultProps={
    titleProp:"title",
    fetchKeyProp:"uniqueID",
    justify:"center",
    showComment:{title:'title',sha:'uniqueID'},
    singleRenderPropsOnHeader:[{val:'createdTime'}],
    multiRenderPropsOnHeader:[{val:'relatedTags',ele:'tag',link:(tag)=>`${linkTo.category}/${tag}`}]
  }
  constructor(){
    super()
    this.state={
      curPropsData:null,
      contentLoading:true,
      curFetchKey:null,
      renderData:null,
      disqusRender:false
    }
    // import('react-valine').then(obj=>console.log(obj))
    this.curContentIndex=null
    this.handlePageChange=this.handlePageChange.bind(this)
    this.pageItemRender=this.pageItemRender.bind(this)
    this.showDisqus=this.showDisqus.bind(this)
    this.bookmarkScroll=this.bookmarkScroll.bind(this)
  }
  pageItemRender(current, type,originalElement) {
    const {renderData,titleProp}=this.props
    if (type === 'prev') {
      return <span>上一篇：<strong>{current<1 ? "无" : renderData[current-1][titleProp]}</strong></span>
    }
    if (type === 'next') {
      return <span>下一篇：<strong>{this.curContentIndex === renderData.length ? "无" :renderData[current-1][titleProp]}</strong></span>;
    }
    return originalElement;
  }
  handlePageChange(page) {
    const {fetchKeyProp,renderData,path}=this.props
    let pathname=path.split('/:fetchKey')[0]
    navigate(`${pathname}/${renderData[page-1][fetchKeyProp]}`)
  }

  showDisqus(){
    this.setState({
      disqusRender:true
    })
  }
  bookmarkScroll(){
    const {location}=this.props
    const {search}=location
    if(/bookmark/.test(search)){
      let data=querySearch(search)
      this.timer=setTimeout(()=>{
        window.scrollTo({
          top: +data.bookmark,
          behavior: 'smooth'
        });
      },200)
    }
  }

  static getDerivedStateFromProps(props,state){
    if(props["fetchKey"]===state.curFetchKey)return null
    return {
      curFetchKey:null,
      curPropsData:null,
      contentLoading:true
    }
  }
  componentDidUpdate(){
    const {fetchKey,read_content_path,renderData,fetchKeyProp,wantedPropsFromList,wantedPropsFromContent}=this.props
    const {curFetchKey}=this.state
    if(!renderData)return
    if(fetchKey!==curFetchKey){
      const curContentListProps=renderData.find((o,i)=>{

        if(o[fetchKeyProp]===fetchKey){
          this.curContentIndex=i+1
          return true
        }
        return false
      })
      // console.log(curContentListProps,fetchKey,fetchKeyProp,renderData)
      fetchLazyContent(read_content_path, fetchKey,curContentListProps,wantedPropsFromList,wantedPropsFromContent)
        .then(obj=>{
          this.bookmarkScroll()
          this.setState({
            curFetchKey:fetchKey,
            curPropsData:obj,
            contentLoading:false
          })
        })
        .catch(err=>{
          // todo 此处可以用全局提示
          console.log(err)
          navigate("/NoThisPage", { replace: true })
        })
    }
  }

  componentDidMount(){
    const {fetchKey,read_content_path,renderData,fetchContentList,fetchKeyProp,wantedPropsFromList,wantedPropsFromContent}=this.props
    if(!renderData) fetchContentList()
    else {
      // console.log(renderData)
      const curContentListProps=renderData.find((o,i)=>{
        if(o[fetchKeyProp]===fetchKey){
          this.curContentIndex=i+1
          return true
        }
        return false
      })
      // console.log(curContentListProps,fetchKey,fetchKeyProp,renderData)
      fetchLazyContent(read_content_path, fetchKey,curContentListProps,wantedPropsFromList,wantedPropsFromContent)
        .then(contentData => {
          this.bookmarkScroll()
          this.setState({
            curFetchKey: fetchKey,
            curPropsData: contentData,
            contentLoading: false
          })
        })
        .catch(err => {
          // todo 此处可以用全局提示
          console.log(err)
          navigate("/NoThisPage", {replace: true})
        })
    }
  }
  componentWillUnmount(){
    clearTimeout(this.timer)
    this.timer=null
  }
  render(){
    // console.log('article')
    const {curPropsData,contentLoading,disqusRender}=this.state
    // console.log(curPropsData)
    const {
      renderData,
      fetchKey,
      // location,
      titleProp,
      showComment,
      wantedPropsFromContent,
      singleRenderPropsOnHeader,
      multiRenderPropsOnHeader,
      justify}=this.props

    return(
      contentLoading ?
        <Loading loading={contentLoading} render_nums={1} ske_title_width={"30%"} ske_para_width={"50%"} ske_para_rows={9} /> :
        <article style={styles.article}>
          <header>
            <h1 style={styles.articleTitle}>{curPropsData[titleProp]}</h1>
            <ArticleHeaderProps curContentData={curPropsData}
                                singleRenderPropsOnHeader={singleRenderPropsOnHeader}
                                multiRenderPropsOnHeader={multiRenderPropsOnHeader}
                                showComment={showComment}
                                justify={justify}
            />
          </header>
          {
            wantedPropsFromContent.map((prop,i)=>{
              return <div className="markdown-body" key={i} style={styles.contentDiv} dangerouslySetInnerHTML={{__html: curPropsData[prop]}}/>
            })
          }
          <Divider />
          <footer style={styles.footer}>
            <Pagination simple  pageSize={1} total={renderData.length}
                        current={this.curContentIndex}
                        itemRender={this.pageItemRender}
                        onChange={this.handlePageChange}/>
          </footer>

          {showComment
            ? disqusRender
                ? <ValinePanel uniqStr={fetchKey}/>
              // ? <CustomComment.Detail title={curPropsData[titleProp]} sha={fetchKey} locationOrigin={location.origin}/>
              : <Button onClick={this.showDisqus} style={styles.disqusButton}>
                  查看评论(<ValineCount uniqStr={fetchKey}/>条)
                  {/*加载评论 (<CustomComment.Count title={curPropsData[titleProp]} sha={fetchKey} locationOrigin={location.origin}/>)*/}
                </Button>
            : null
          }


          <BookmarkContext.Consumer>
            {({setBookmark})=>{
              const {path}=this.props
              let pathname=path.split('/:fetchKey')[0]
              return <SetMark pathname={pathname} sha={fetchKey} setBookmark={setBookmark}/>
            }}
          </BookmarkContext.Consumer>
        </article>
    )
  }
}