import React from 'react';
import {Button,Divider, Pagination} from 'antd';
import {navigate} from "@reach/router";
import ArticleStatusBar from "./ArticleStatusBar"
import Loading from './Loading'
import {linkTo} from "../routes/linkPathList";
import CustomComment from "../tools/CustomComment";
import BookmarkContext from '../bookmark/BookmarkContext'
import {SetMark} from "../bookmark/Bookmark";
import {querySearch} from "../utils/index";


const styles={
  article:{margin:"24px 36px", background: '#fff', minHeight: 360},
  articleTitle:{textAlign:"center"},
  contentDiv:{marginTop:24},
  footer:{margin: "0 auto"},
  disqusButton:{display:"block",margin:"20px auto"}
}


export default class ArticleDetail extends React.Component{
  constructor(){
    super()
    this.state={
      curArticleData:null,
      contentLoading:true,
      curArticleName:null,
      disqusRender:false
    }
    this.curArticleIndex=null
    this.fetchBlogContent=this.fetchBlogContent.bind(this)
    this.handlePageChange=this.handlePageChange.bind(this)
    this.itemRender=this.itemRender.bind(this)
    this.showDisqus=this.showDisqus.bind(this)
    this.bookmarkScroll=this.bookmarkScroll.bind(this)
  }
  itemRender(current, type,originalElement) {
    const {blogList}=this.props
    if (type === 'prev') {
      return <span>上一篇：<strong>{current<1 ? "无" : blogList[current-1].title}</strong></span>
    }
    if (type === 'next') {
      return <span>下一篇：<strong>{this.curArticleIndex === blogList.length ? "无" :blogList[current-1].title}</strong></span>;
    }
    return originalElement;
  }
  handlePageChange(page) {
    navigate(`${linkTo.articles}/${this.props.blogList[page-1].titleSHA}`)
  }
  fetchBlogContent(){
    const {articleSha,blogList,read_blog_path}=this.props

    const curArticle=blogList.find((o,i)=>{
      if(o.titleSHA===articleSha){
        this.curArticleIndex=i+1
        return true
      }
      return false
    })

    return import(
      `../${read_blog_path}/${articleSha}.json`)
      .then(({default:obj})=>({
        content:obj.content,
        title:curArticle.title,
        label:curArticle.label,
        createdTime:curArticle.createdTime
      }))

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
    if(props.articleSha===state.curArticleName)return null
    return {
      curArticleName:null,
      curArticleData:null,
      contentLoading:true
    }
  }
  componentDidUpdate(){
    // console.log(1)
    if(!this.props.blogList)return
    if(this.props.articleSha!==this.state.curArticleName){
      this.fetchBlogContent()
        .then(obj=>{
          this.bookmarkScroll()
          this.setState({
            curArticleName:this.props.articleSha,
            curArticleData:obj,
            contentLoading:false
          })
        })
        .catch(err=>{
          // todo 此处可以用全局提示
          // console.log(err)
          navigate("/NoThisPage", { replace: true })
        })
    }
  }

  componentDidMount(){
    const {articleSha,blogList}=this.props
    Promise.resolve().then(()=>{
      window.scrollTo(0, 0);
    })
    if(!blogList)return
    this.fetchBlogContent()
      .then(obj=>{
        this.bookmarkScroll()
        this.setState({
          curArticleName:articleSha,
          curArticleData:obj,
          contentLoading:false
        })
      })
      .catch(err=>{
        // todo 此处可以用全局提示
        // console.log(err)
        navigate("/NoThisPage", { replace: true })
      })
  }
  componentWillUnmount(){
    clearTimeout(this.timer)
  }
  render(){
    // console.log('article')
    const {curArticleData,contentLoading,disqusRender}=this.state
    const {blogList,articleSha,location}=this.props
    return(
      contentLoading ?
        <Loading loading={contentLoading} render_nums={1} ske_title_width={"30%"} ske_para_width={"50%"} ske_para_rows={9} /> :
        <article style={styles.article}>
          <header>
            <h1 style={styles.articleTitle}>{curArticleData.title}</h1>
            <ArticleStatusBar justify={"center"} article={curArticleData} articleSha={articleSha}/>
          </header>
          {/*<div style={styles.contentDiv} dangerouslySetInnerHTML={{__html: md.render(curArticleData.content)}}/>*/}
          <div style={styles.contentDiv} dangerouslySetInnerHTML={{__html: curArticleData.content}}/>
          <Divider />
          {disqusRender ?
            <CustomComment.Detail title={curArticleData.title} sha={articleSha} locationOrigin={location.origin}/>:
            <Button onClick={this.showDisqus} style={styles.disqusButton}>
              加载评论 (<CustomComment.Count title={curArticleData.title} sha={articleSha} locationOrigin={location.origin}/>)
            </Button>
          }
          <footer style={styles.footer}>
            <Pagination simple  pageSize={1} total={blogList.length}
                        current={this.curArticleIndex}
                        itemRender={this.itemRender}
                        onChange={this.handlePageChange}/>
          </footer>
          <BookmarkContext.Consumer>
            {({setBookmark})=><SetMark sha={articleSha} setBookmark={setBookmark}/>}
          </BookmarkContext.Consumer>
        </article>
    )
  }
}