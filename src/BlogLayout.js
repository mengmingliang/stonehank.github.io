import React from 'react';
import { Layout,BackTop } from 'antd';
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
import {refactor,objSortBy,objGroupBy} from './utils/utils'

const { Header,Footer} = Layout;



export default class BlogLayout extends React.Component {
  constructor(){
    super()
    this.state={
      archiveArticles:null,
      categoryArticles:null,
      initArticles:null,
      blog_jsonObj:null,
      tagsRenderMode:"list"
    }
    this.fetchBlogContent=this.fetchBlogContent.bind(this)
    this.toggleTagRender=this.toggleTagRender.bind(this)
  }
  toggleTagRender() {
    this.setState(prevState => ({
      tagsRenderMode: prevState.tagsRenderMode === "block" ? "list" : "block"
    }))
  }
  fetchBlogContent(){
    import(`./asset/blog-data`).then(blog_jsonObj=>{
      console.time(1)
      refactor(blog_jsonObj,"time")
      console.timeEnd(1)
      console.time(2)
      refactor(blog_jsonObj,"label")
      console.timeEnd(2)
      console.time(3)
      refactor(blog_jsonObj,"init")
      console.timeEnd(3)


      console.time(8)
      refactor(blog_jsonObj,"time")
      console.timeEnd(8)
      console.time(9)
      objGroupBy(blog_jsonObj,"label")
      console.timeEnd(9)
      console.time(0)
      objSortBy(blog_jsonObj,"init")
      console.timeEnd(0)
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
    return (
      <Layout style={{ background:"#fff",minHeight: '100vh' }}>
        <NavSider />
        <Layout style={{background:"#fff"}}>
          <Header style={{ background: '#898989', padding: 0 }} >
            FrontEnd Blogs
          </Header>
          <Location>
            {({location:{pathname}})=>{
              let basenameStart=pathname.lastIndexOf('/')+1
              let basename=decodeURIComponent(pathname.substr(basenameStart))
              let matchdir=pathname.substr(0,basenameStart)
              let activeData
              if(matchdir.includes("category"))activeData=categoryArticles?categoryArticles[basename]:null
              // else if(matchdir.includes("articles"))activeData=initArticles
              return (
                <Router>
                  <Redirect to="page/1" from="/" noThrow/>
                  <Home articles={initArticles} path="page/:page" />
                  <Archive articles={archiveArticles} path="archive" />
                  <Category articles={categoryArticles} path="category/page/:page"  toggleTagRender={this.toggleTagRender} tagsRenderMode={tagsRenderMode}/>
                  <CategoryDetail labelList={activeData} labelName={basename} path="category/:tag" />
                  <About path="about" articles={categoryArticles}/>
                  <ArticleDetail path="articles/:articleName" blogList={initArticles}/>
                </Router>
              )
            }}
          </Location>
          {/*<Footer style={{textAlign: 'center'}}>*/}
            {/*<Pagination simple current={current} pageSize={pageSize} total={total} onChange={this.handlePageChange}/>*/}
          {/*</Footer>*/}
          <BackTop />
        </Layout>
      </Layout>
    );
  }
}
