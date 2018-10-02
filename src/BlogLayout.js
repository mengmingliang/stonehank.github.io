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

const { Header} = Layout;

function refactor(json,groupBy){
  let groupObj={}
  let group
  if(groupBy==="time" )group="timeArr"
  else if(groupBy==="label")group="label"
  else group='init'
  if(group==="timeArr"){
    for(let k in json){
      let cur=json[k]
      if(!cur[group])continue;
      let year=cur[group][0]
      let month=cur[group][1]
      let day=cur[group][2]
      if(!groupObj[year])groupObj[year]=Array(11).fill(null)
      else if(!groupObj[year][month])groupObj[year][month]=Array(31).fill(null)
      else groupObj[year][month][day]=cur
    }
    return groupObj
  }
  if(group==="label"){
    for(let k in json){
      let cur=json[k]
      if(!cur[group])continue;
      let curLabel=cur[group]
      for(let i=0;i<curLabel.length;i++){
        if(!groupObj[curLabel[i]])groupObj[curLabel[i]]=[cur]
        else groupObj[curLabel[i]].push(cur)
      }
    }
    return groupObj
  }
  if(group==="init"){
    let result=[]
    for(let k in json){
      if(k==="version" || Object.prototype.toString.call(json[k])!=="[object Object]")continue
      result.push(json[k])
    }
    result.sort(function(o1,o2){
      let t1=o1.timeArr,t2=o2.timeArr
      if(!t1 || !t2)return -1
      if(t2[0]!==t1[0])return t2[0]-t1[0]
      else if(t2[1]!==t1[1])return t2[1]-t1[1]
      else return t2[2]-t1[2]
    })
    return result
  }
}

export default class BlogLayout extends React.Component {
  constructor(){
    super()
    this.state={
      archiveArticles:null,
      categoryArticles:null,
      initArticles:null,
      blog_jsonObj:null
    }
    this.fetchBlogContent=this.fetchBlogContent.bind(this)
  }
  fetchBlogContent(){
    import(`./asset/blog-data`).then(blog_jsonObj=>{
      this.setState({
        archiveArticles:refactor(blog_jsonObj,"time"),
        categoryArticles:refactor(blog_jsonObj,"label"),
        initArticles:refactor(blog_jsonObj,"init"),
        blog_jsonObj
      })
    })
  }
  componentDidMount(){
    this.fetchBlogContent()
  }
  render() {
    const { archiveArticles, categoryArticles, initArticles,blog_jsonObj}=this.state
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
                  <Category articles={categoryArticles} path="category/page/:page" />
                  <CategoryDetail labelList={activeData} labelName={basename} path="category/:tag" />
                  <About path="about" />
                  <ArticleDetail path="articles/:articleName" blogList={initArticles}/>
                </Router>
              )
            }}
          </Location>

          <BackTop />
        </Layout>
      </Layout>
    );
  }
}
