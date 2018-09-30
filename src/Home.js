import React from 'react';
// import ReactMarkdown from 'react-markdown'
import { BackTop,Tag,Card,Skeleton,Avatar, Pagination,Layout,Menu, Breadcrumb, Icon,Affix,Row,Col } from 'antd';
import * as blog_jsonObj from "./asset/blog-data.json"
import './css/github.min.css'
import ArticleDetail from "./article/ArticleDetail";
import ArticleList from "./article/ArticleList";


import { Router, Link } from "@reach/router";


const { Header, Content, Footer, Sider } = Layout;
const {Meta}=Card

const input='# This is a header\n\nAnd this is a paragraph'
// const MenuItem=verticalLoose(Menu.Item)

function itemRender(current, type, originalElement) {
  if (type === 'prev') {
    return <a>上一篇</a>;
  } if (type === 'next') {
    return <a>下一篇</a>;
  }
  return originalElement;
}
export default class Home extends React.Component {
  constructor(){
    super()
    this.fetchBlogContent=this.fetchBlogContent.bind(this)
    this.state={
      contentLoading:true,
      discussLoading:true
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
  render() {
    const {blogs,contentLoading}=this.state
    const blog=blogs?blogs[0]:null
    // console.log(blog)
    const customStyle={
      display: "flex",
      flexFlow: "column",
      justifyContent: "normal",
    }
    return(
      contentLoading ?
      <Skeleton active loading={contentLoading} title={{width: "30%"}} paragraph={{rows: 6, width: "50%"}}/>
      :
      <ArticleList />
    )
  }
}

