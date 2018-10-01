import React from 'react';
import { BackTop,Tag,Card,Skeleton,Avatar, Pagination,Layout,Menu, Breadcrumb, Icon,Affix,Row,Col } from 'antd';
// import Loadable from 'react-loadable';
// import Loading from './my-loading-component';

// const LoadableComponent = (path)=>Loadable({
//   loader: () => import(path),
//   // loading: Loading,
// });

const hljs = require('highlight.js'); // https://highlightjs.org/
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
      contentLoading:true
    }
    this.fetchBlogContent=this.fetchBlogContent.bind(this)
  }
  fetchBlogContent(){
    const {articleName,blogList}=this.props
    const curArticle=blogList[articleName]
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
    if(props.articleName===state.articleName)return null
    return {
      articleName:null,
      contentLoading:true
    }
  }
  componentDidUpdate(){
    const {articleName}=this.props
    if(articleName!==this.state.articleName){
      this.fetchBlogContent()
        .then(obj=>{
          this.setState({
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
          curArticleData:obj,
          contentLoading:false
        })
      })
  }
  render(){
    const {curArticleData,contentLoading}=this.state
    return(
      contentLoading ?
        <Skeleton active loading={contentLoading} title={{width: "30%"}} paragraph={{rows: 6, width: "50%"}}/> :
        <article style={{padding: 24, background: '#fff', minHeight: 360}}>
          <header>
            <div style={{textAlign: "center"}} dangerouslySetInnerHTML={{__html: md.render(`## ${curArticleData.title}`)}}/>
            <Row type="flex" gutter="20">
              <Col>{curArticleData.createdTime}</Col>
              <Col>
                {curArticleData.label.map((t,i) => {
                  return (
                    <Tag key={i}>{t}</Tag>
                  )
                })}
              </Col>
              <Col style={{textAlign: "center"}}><IconText type="message" text="2"/></Col>
            </Row>
          </header>
          <div style={{marginTop:24}} dangerouslySetInnerHTML={{__html: md.render(curArticleData.content)}}/>
          <footer style={{margin: "0 auto"}}>
            <BackTop />
          </footer>
        </article>
    )
  }
}