import React from 'react';
import { Divider,Tag,Card,Skeleton,Avatar, Pagination,Layout,Menu, Breadcrumb, Icon,Affix,Row,Col } from 'antd';
import {navigate} from "@reach/router";
import ArticleStatusBar from "../ArticleStatusBar"
import Loading from '../Loading'
import hljs from 'highlight.js' // https://highlightjs.org/


const md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8}} />
    {text}
  </span>
);

export default class ArticleDetail extends React.Component{
  constructor(){
    super()
    this.state={
      curArticleData:null,
      contentLoading:true,
      curArticleName:null
    }
    this.curArticleIndex=null
    this.fetchBlogContent=this.fetchBlogContent.bind(this)
    this.handlePageChange=this.handlePageChange.bind(this)
    this.itemRender=this.itemRender.bind(this)
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
    navigate(`/articles/${this.props.blogList[page-1].title}`)
  }
  fetchBlogContent(){
    const {articleName,blogList}=this.props
    const curArticle=blogList.find((o,i)=>{
      if(o.title===articleName){
        this.curArticleIndex=i+1
        return true
      }
    })
    return import(`../asset/${articleName}.json`)
      .then(obj=>({
        content:obj.content,
        title:curArticle.title,
        label:curArticle.label,
        createdTime:curArticle.createdTime
      }))
      .catch(err=>{
        console.log("延迟加载失败")
        console.log(err)
      })
  }
  static getDerivedStateFromProps(props,state){
    if(props.articleName===state.curArticleName)return null
    return {
      curArticleName:null,
      curArticleData:null,
      contentLoading:true
    }
  }
  componentDidUpdate(){
    if(!this.props.blogList)return
    if(this.props.articleName!==this.state.curArticleName){
      this.fetchBlogContent()
        .then(obj=>{
          this.setState({
            curArticleName:this.props.articleName,
            curArticleData:obj,
            contentLoading:false
          })
        })
    }
  }
  componentDidMount(){
    if(!this.props.blogList)return
    this.fetchBlogContent()
      .then(obj=>{
        this.setState({
          curArticleName:this.props.articleName,
          curArticleData:obj,
          contentLoading:false
        })
      })
  }
  render(){
    const {curArticleData,contentLoading}=this.state
    const {blogList}=this.props
    return(
      contentLoading ?
        <Loading loading={contentLoading} render_nums={1} ske_title_width={"30%"} ske_para_width={"50%"} ske_para_rows={9} /> :
        <article style={{margin:"24px 36px", background: '#fff', minHeight: 360}}>
          <header>
            <h1 style={{textAlign:"center"}}>{curArticleData.title}</h1>
            <ArticleStatusBar justify={"center"} article={curArticleData} />
          </header>
          <div style={{marginTop:24}} dangerouslySetInnerHTML={{__html: md.render(curArticleData.content)}}/>
          <Divider />
          <footer style={{margin: "0 auto"}}>
            <Pagination simple  pageSize={1} total={blogList.length} current={this.curArticleIndex} itemRender={this.itemRender} onChange={this.handlePageChange}/>
          </footer>
        </article>
    )
  }
}