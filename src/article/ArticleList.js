import React from 'react';
import { BackTop,Tag,Card,Skeleton,Avatar, Pagination,Layout,Menu, Breadcrumb, Icon,Affix,Row,Col } from 'antd';
import * as blog_jsonObj from "../asset/blog-data";

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



export default class ArticleList extends React.Component{
  constructor(){
    super()
    this.fetchBlogContent=this.fetchBlogContent.bind(this)
    this.state={
      listLoading:true
    }
  }
  fetchBlogContent(){
    let blogData=[]
    let importQueue=[]
    for(let key in blog_jsonObj){
      if(key==="version")continue
      importQueue.push(import(`./asset/${key}.json`).then(obj=>{
          blogData.push({
            title:blog_jsonObj[key].title,
            content:obj.content,
            label:blog_jsonObj[key].label,
            createdTime:blog_jsonObj[key].createdTime
          })
        }
      ))
    }
    Promise.all(importQueue).then(()=>{
      this.setState({
        contentLoading:false,
        blogs:blogData
      })
    })
  }
  componentDidMount(){
    this.fetchBlogContent()
  }
  render(){
    const {blogList}=this.props
    return blogList.map(blog=>{
      <Skeleton active loading={listLoading} title={{width: "30%"}} paragraph={{rows: 6, width: "50%"}}/>
    })
      {/*<article style={{padding: 24, background: '#fff', minHeight: 360}}>*/}
        {/*<header>*/}
          {/*<div style={{textAlign: "center"}} dangerouslySetInnerHTML={{__html: md.render(`## ${blog.title}`)}}/>*/}
          {/*<Row type="flex" gutter="20">*/}
            {/*<Col>{blog.createdTime}</Col>*/}
            {/*<Col>*/}
              {/*{blog.label.map((t,i) => {*/}
                {/*return (*/}
                  {/*<Tag key={i}>{t}</Tag>*/}
                {/*)*/}
              {/*})}*/}
            {/*</Col>*/}
            {/*<Col style={{textAlign: "center"}}><IconText type="message" text="2"/></Col>*/}
          {/*</Row>*/}
        {/*</header>*/}
        {/*<div style={{marginTop:24}} dangerouslySetInnerHTML={{__html: md.render(blog.content)}}/>*/}
        {/*<footer style={{margin: "0 auto"}}>*/}
          {/*<BackTop />*/}
        {/*</footer>*/}
      {/*</article>*/}
  }
}