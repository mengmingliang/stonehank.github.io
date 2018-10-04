import React from 'react';
import {BackTop, Layout } from 'antd';
import './css/github.min.css'
import NavSider from "./nav/NavSider";
import Archive from "./Archive";
import Category from "./Category";
import About from "./About";
import Home from "./Home";
import { Router,Redirect,Location } from "@reach/router";
import ArticleDetail from "./article/ArticleDetail";
import CategoryDetail from './CategoryDetail'
// import parsePath from "parse-filepath"
// import * as blog_jsonObj from "./asset/blog-data";
import {refactor,objSortBy,objGroupBy} from './utils'
import {Header_Pure,Layout_Pure,Location_Pure,BackTop_Pure} from "./antd_pure"


const { Header,Footer} = Layout;

const styles={
  layout_wrapper:{ background:"#fff",minHeight: '100vh' },
  layout_inner:{background:"#fff"},
  layout_header:{ background: '#898989', padding: 0 }
}

export default class BlogLayout extends React.Component {
  constructor(){
    super()
    this.state={
      archiveArticles:null,
      categoryArticles:null,
      initArticles:null,
      blog_jsonObj:null,
    }
    this.fetchBlogContent=this.fetchBlogContent.bind(this)

  }

  fetchBlogContent(){
    import(`./asset/blog-data`).then(blog_jsonObj=>{
      this.setState({
        // archiveArticles:refactor(blog_jsonObj,"time"),
        // categoryArticles:refactor(blog_jsonObj,"label"),
        // initArticles:refactor(blog_jsonObj,"init"),
        archiveArticles:refactor(blog_jsonObj,"time"),
        categoryArticles:objGroupBy(blog_jsonObj,"label"),
        initArticles:objSortBy(blog_jsonObj,"timeArr"),
        blog_jsonObj
      })
    })
  }
  componentDidMount(){
    this.fetchBlogContent()
  }
  render() {
    const { archiveArticles, categoryArticles, initArticles,tagsRenderMode}=this.state
    if(archiveArticles){
      Object.defineProperty(archiveArticles,"activePanel",{
        value:null,
        writable:true
      })
    }
    if(categoryArticles){
      Object.defineProperties(categoryArticles,{
        "tagsRenderMode":{
          value:null,
          writable:true
        },
        "tagsBlockLoaded":{
          value:null,
          writable:true
        }
      })
    }
    return (
      <Layout style={styles.layout_wrapper}>
        <NavSider />
        <Layout style={styles.layout_inner}>
          <Header_Pure style={styles.layout_header} >
            FrontEnd Blogs
          </Header_Pure>
          <Location_Pure archiveArticles={archiveArticles} categoryArticles={categoryArticles} initArticles={initArticles} />

          {/*<Footer style={{textAlign: 'center'}}>*/}
            {/*<Pagination simple current={current} pageSize={pageSize} total={total} onChange={this.handlePageChange}/>*/}
          {/*</Footer>*/}
          <BackTop />
        </Layout>
      </Layout>
    );
  }
}
