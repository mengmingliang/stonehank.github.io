import React from 'react';
import { Layout } from 'antd';
import '../css/github.min.css'
import NavSider from "../nav/NavSider";
import Archive from "../Archive";
import Category from "../Category";
import About from "../About";
import Home from "../Home";
import { Router,Redirect,Location } from "@reach/router";
import ArticleDetail from "../article/ArticleDetail";
import CategoryDetail from '../CategoryDetail'
// import parsePath from "parse-filepath"
// import * as blog_jsonObj from "./asset/blog-data";
import {refactor,objSortBy,objGroupBy,deepEqual} from '../utils'
import {Header_Pure,Layout_Pure} from "../antd_pure"


const { Header,Footer} = Layout;
export default class Location_Pure extends React.PureComponent {


  render() {
    const {categoryArticles,archiveArticles,initArticles}=this.props
    return (
      <Location>
        {({location:{pathname}})=>{
          let basenameStart=pathname.lastIndexOf('/')+1
          let basename=decodeURIComponent(pathname.substr(basenameStart))
          let matchdir=pathname.substr(0,basenameStart)
          let activeData
          if(matchdir.includes("category"))activeData=categoryArticles?categoryArticles[basename]:null
          // else if(matchdir.includes("articles"))activeData=initArticles

          /*
          * Archive : articles
          * {
          *   2018:[
          *     1:[...],
          *     2:[...],
          *     ...
          *     loadedLength:10 <记录已经加载的文章数目>
          *   ]
          *   2017:[
          *     1:[..],
          *     ...
          *     loadedLength:5
          *   ]
          *   ..
          *   activePanel:["2018年","7月"] <记录当前打开的年份和月份>
          * }
          * */

          /*
          * Category : articles
          * {
          *   tag1:[...],
          *   tag2:[...],
          *   ...
          *   tagsRenderMode:"list" <记录当前的tags渲染模式>
          * }
          * */

          return (
            <Router>
              <Redirect to="page/1" from="/" noThrow/>
              <Home articles={initArticles} path="page/:page" />
              <Archive articles={archiveArticles} path="archive" />
              <Category articles={categoryArticles} path="category/page/:page"  />
              <CategoryDetail labelList={activeData} labelName={basename} path="category/:tag" />
              <About path="about" articles={categoryArticles}/>
              <ArticleDetail path="articles/:articleName" blogList={initArticles}/>
            </Router>
          )
        }}
      </Location>
    )
  }
}

