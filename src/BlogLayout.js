import React from 'react';
import { Router,Location } from "@reach/router";
import {BackTop, Layout,Icon } from 'antd';

import Archive from "./archive/Archive";
import Category from "./category/Category";
import About from "./About";
import Home from "./home/Home";
import ArticleDetail from "./article/ArticleDetail";
import CategoryDetail from './category/CategoryDetail'
import {Header_Pure} from "./antd_pure"
import NavSiderContainer from "./nav/NavSiderContainer";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import {refactor,objSortBy,objGroupBy} from './utils'
import NotFound from "./tools/NotFound";
import Search from "./tools/Search"


const styles={
  layout_wrapper:{minHeight: '100vh',transition:"background 1s solid"  },
  layout_inner:{background:"#fff"},
  layout_header:{ background: '#898989', padding: 0 ,zIndex:1},
}

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_866706_dd0xsi92d3v.js',
});

export default class BlogLayout extends React.Component {
  constructor(){
    super()
    this.state={
      wrapperBackground:"#fff",
      archiveArticles:null,
      categoryArticles:null,
      initArticles:null,
      blog_jsonObj:null,
    }
    this.fetchBlogContent=this.fetchBlogContent.bind(this)
    this.changeBackground=this.changeBackground.bind(this)
  }

  changeBackground(color){
    this.setState({
      wrapperBackground:color
    })
  }

  fetchBlogContent(){
      import(`./asset/_blog-data`)
        .then(blog_jsonObj=>{
          this.setState({
            archiveArticles:refactor(blog_jsonObj,"time"),
            categoryArticles:objGroupBy(blog_jsonObj,"label"),
            initArticles:objSortBy(blog_jsonObj,"timeArr").filter(item=>item.title),
            blog_jsonObj
          })
        })
        .catch(err=>{
          console.log(err)
        })
    }

  componentDidMount(){
    this.fetchBlogContent()
  }
  render() {
    const {userConfig}=this.props
    const {bio,avatar,username,github,articlesEachPage,defaultActiveArchive,tagsEachPage,tagsRenderMode,aboutMe}=userConfig
    const { wrapperBackground,archiveArticles, categoryArticles, initArticles}=this.state

    if(archiveArticles && !archiveArticles.activePanel){
      Object.defineProperty(archiveArticles,"activePanel",{value:null, writable:true})
    }
    if(categoryArticles && !categoryArticles.tagsRenderMode && !categoryArticles.tagsBlockLoaded){
      Object.defineProperties(categoryArticles,{
        "tagsRenderMode":{value:null, writable:true},
        "tagsBlockLoaded":{value:null, writable:true}
      })
    }

    /* archiveArticles数据结构
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

    /* categoryArticles数据结构
    * Category : articles
    * {
    *   tag1:[...],
    *   tag2:[...],
    *   ...
    *   tagsRenderMode:"list" <记录当前的tags渲染模式>
    * }
    * */
    return (
      <Layout>
        <NavSiderContainer bio={bio} avatar={avatar} username={username}/>
        <Layout style={{background:wrapperBackground,minHeight: '100vh', transition: "background 500ms" }}>
          <Header_Pure style={styles.layout_header} >
            <Search data={initArticles} tagsList={categoryArticles && Object.keys(categoryArticles)}/>
            <a href={github}><IconFont id="githubIcon" type="icon-github" /></a>
          </Header_Pure>
          <Location>
            {({location})=>{
              console.log(location)
              return (
                <TransitionGroup>
                  <CSSTransition key={location.key} classNames="slide" exit={false} timeout={500} >
                    <Router location={location}>
                        <Home path="/" page={1} articles={initArticles}
                              articlesEachPage={articlesEachPage}  />
                        <Home path="page/:page" articles={initArticles}
                              articlesEachPage={articlesEachPage}  />
                        <Archive path="archive" articles={archiveArticles}
                                 defaultActiveArchive={defaultActiveArchive} />
                        <Category path="category" page={1}
                                  tagsRenderMode={tagsRenderMode}
                                  tagsEachPage={tagsEachPage}
                                  articles={categoryArticles}  />
                        <Category path="category/page/:page"
                                  tagsRenderMode={tagsRenderMode}
                                  tagsEachPage={tagsEachPage}
                                  articles={categoryArticles}   />
                        <CategoryDetail path="category/:tag" categoryArticles={categoryArticles} />
                        <About path="about" articles={categoryArticles} aboutMe={aboutMe}/>
                        <ArticleDetail path="articles/:articleSha" blogList={initArticles} />
                        <NotFound default changeBG={this.changeBackground} />
                      </Router>
                  </CSSTransition>
                </TransitionGroup>
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
