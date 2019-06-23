import React from 'react';
import { Router,Location } from "@reach/router";
import {BackTop, Layout,Icon ,Affix} from 'antd';

import { TransitionGroup, CSSTransition } from "react-transition-group";

import Archive from "./archive/Archive";
import Category from "./category/Category";
import About from "./about/About";
import Home from "./home-article/Home";
// import ArticleDetail from "./home-article/ArticleDetail";
import CategoryDetail from './category/CategoryDetail'
import NavSiderWrapper from "./nav/NavSiderWrapper";
import {refactor,objSortBy,objGroupBy} from './utils'
import NotFound from "./tools/NotFound";
// import SearchContainer from "./search/SearchContainer"
import SearchContainer from "./search/SearchContainer"
import HeaderPure from "./tools/HeaderPure"
import {GetMark} from "./bookmark/Bookmark";
import BookmarkContext from "./bookmark/BookmarkContext";
import {linkTo} from "./routes/linkPathList";
import SourceCode from "./source-code/SourceCode";
import MyLeetcode from "./leetcode-problem/MyLeetcodeContainer";
import ArticleDetailComponent from "./share-components/ArticleDetailComponent";
import LeetcodeDetailComponent from "./share-components/ArticleDetailComponent";
import LeetcodeCategoryDetail from "./leetcode-problem/LeetcodeCategoryDetail";
import defaultProps from "./leetcode-problem/listCardDefaultProps";

import './css/github-markdown-css.css'
import './css/github.min.css'
import './css/index.css';



const styles={
  layout_wrapper:{minHeight: '100vh',transition:'background 1s solid'  },
  layout_inner:{background:'#fff'},
  layout_header:{ background: '#898989', padding: 0 ,zIndex:1,display: 'flex', flexFlow: 'row', justifyContent: 'start',alignItems:'center'},
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
      sourceCodeNavSHA:null,
      leetcodeRenderMode:'list',
      leetcodeData:null,
      leetcodeList:null,
      leetcodeCategory:null,
    }
    this.fetchBlogList=this.fetchBlogList.bind(this)
    this.fetchSourceCodeList=this.fetchSourceCodeList.bind(this)
    this.changeBackground=this.changeBackground.bind(this)
    this.toggleRenderMode=this.toggleRenderMode.bind(this)
    this.fetchLeetcodeList=this.fetchLeetcodeList.bind(this)
  }

  toggleRenderMode(prop){
    this.setState(prevState=>({
      [prop]:prevState[prop]==="list"?'card':"list"
    }))
  }

  fetchLeetcodeList(){
    const {read_leetcode_path}=this.props.userConfig
    import(
      /* webpackChunkName: "leetcode-list" */
      `./${read_leetcode_path}/_leetcode-list.json`
      )
      .then((module)=>{
        let leetcodeData=module.default
        let leetcodeList=objSortBy(leetcodeData,'uniqueID',true)
        let leetcodeCategory=objGroupBy(leetcodeData,"relatedTags")
        this.setState({
          leetcodeData,
          leetcodeList,
          leetcodeCategory
        })
      })
  }

  changeBackground(color){
    this.setState({
      wrapperBackground:color
    })
  }

  fetchBlogList(){
    const {read_blog_path}=this.props.userConfig
      return import(
        /*webpackChunkName: "articles-list"*/
        `./${read_blog_path}/_blog-list.json`)
    }

  fetchSourceCodeList(){
    const {read_sourceCode_path}=this.props.userConfig
    return import(
      /*webpackChunkName: "sourceCode-navList"*/
      `./${read_sourceCode_path}/_sourceCode-list.json`)
  }

  componentDidMount(){
    let promiseQueue=[]
    promiseQueue.push(this.fetchBlogList())
    promiseQueue.push(this.fetchSourceCodeList())
    Promise.all(promiseQueue)
      .then(modules=>{
        let blog_jsonObj=modules[0].default
        let source_jsonObj=modules[1].default
        this.setState({
          archiveArticles:refactor(blog_jsonObj,"time"),
          categoryArticles:objGroupBy(blog_jsonObj,"relatedTags"),
          initArticles:objSortBy(blog_jsonObj,"timeArr").filter(item=>item.title),
          blog_jsonObj,
          sourceCodeNavSHA:objSortBy(source_jsonObj,"uniqueID").filter(item=>item.title)[0].uniqueID,
        })
      })
      .catch(err=>{
        console.log(err)
      })

  }
  render() {
    const {userConfig}=this.props
    const {
      bio,
      avatar,
      username,
      github,
      articlesEachPage,
      defaultActiveArchive,
      tagsEachPage,
      tagsRenderMode,
      archiveEachPage,
      aboutMe,
      read_blog_path,
      read_sourceCode_path,
      read_leetcode_path
    }=userConfig

    const {
      wrapperBackground,
      archiveArticles,
      categoryArticles,
      initArticles,
      sourceCodeNavSHA,
      leetcodeRenderMode,
      leetcodeData,
      leetcodeList,
      leetcodeCategory
    }=this.state

    if(archiveArticles && !archiveArticles.activePanel){
      Object.defineProperty(archiveArticles,"activePanel",{value:null, writable:true})
    }
    if(categoryArticles && !categoryArticles.tagsRenderMode
      // && !categoryArticles.tagsBlockLoaded
    ){
      Object.defineProperties(categoryArticles,{
        "tagsRenderMode":{value:null, writable:true},
        // "tagsBlockLoaded":{value:null, writable:true}
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
        <NavSiderWrapper bio={bio}
                         avatar={avatar}
                         username={username}/>

        <Layout style={{background:wrapperBackground,minHeight: '100vh', transition: "background 500ms" }}>

          <Location>
            {({location})=>{
              // console.log(leetcodeData)
              return (
                <>
                  <HeaderPure style={styles.layout_header} >
                    <Affix>
                      <Router location={location} style={styles.layout_header}>
                        <SearchContainer path='/*'
                                         ident={linkTo.home}
                                         data={initArticles}
                                         id={"slide-checkbox1"}
                                         needGlobalMode={true}
                                         simpleSearchProps={['title','createdTime']}
                                         complicateSearchProps={[{prop:'summary',globalProp:'content'}]}
                                         read_content_path={read_blog_path}
                                         tagsList={categoryArticles && Object.keys(categoryArticles)}
                        />
                        <SearchContainer path={`${linkTo.myleetcode}/*`}
                                         ident={linkTo.myleetcode}
                                         data={leetcodeList}
                                         id={"slide-checkbox2"}
                                         getContentDetailPath={(curPropsData)=>linkTo.myleetcode+"/problems/"+curPropsData.uniqueID}
                                         simpleSearchProps={['title']}
                                         placeholder={"leetcode题目查询"}
                          // complicateSearchProps={[{globalProp:'content'}]}
                                         read_content_path={read_leetcode_path}
                        />
                      </Router>
                    </Affix>
                    <BookmarkContext.Consumer>
                      {({bookmark})=> <GetMark bookmark={bookmark} />}
                    </BookmarkContext.Consumer>

                    <a style={{marginLeft:"auto"}} href={github}><IconFont id="githubIcon" type="icon-github" /></a>

                  </HeaderPure>
                  <TransitionGroup>
                    <CSSTransition key={location.pathname} classNames="slide" exit={false} timeout={500} >
                      <Router location={location}>
                        <Home path="/"
                              page={1}
                              articles={initArticles}
                              articlesEachPage={articlesEachPage}  />

                        <Home path="/page/:page"
                              articles={initArticles}
                              articlesEachPage={articlesEachPage}  />

                        <Archive path={linkTo.archive}
                                 articles={archiveArticles}
                                 defaultActiveArchive={defaultActiveArchive}
                                 archiveEachPage={archiveEachPage} />

                        <Category path={linkTo.category}
                                  page={1}
                                  tagsRenderMode={tagsRenderMode}
                                  tagsEachPage={tagsEachPage}
                                  articles={categoryArticles}  />

                        <Category path={`${linkTo.category}/page/:page`}
                                  tagsRenderMode={tagsRenderMode}
                                  tagsEachPage={tagsEachPage}
                                  articles={categoryArticles}   />

                        <SourceCode path={linkTo.sourcecode}
                                    read_sourceCode_path={read_sourceCode_path}
                                    sourceCodeNavSHA={sourceCodeNavSHA} />

                        <MyLeetcode path={`${linkTo.myleetcode}`}
                                    initLeetcodeData={leetcodeData}
                                    leetcodeRenderMode={leetcodeRenderMode}
                                    fetchLeetcodeList={this.fetchLeetcodeList}
                                    toggleRenderMode={this.toggleRenderMode}/>
                        {/*fetchKey 通过路由url传送*/}
                        <LeetcodeDetailComponent path={`${linkTo.myleetcode}/problems/:fetchKey`}
                                                 titleProp={"title"}
                                                 fetchKeyProp={"uniqueID"}
                                                 wantedPropsFromList={['title','uniqueID','relatedTags','difficult','lang']}
                                                 wantedPropsFromContent={['content','thinking','code']}
                                                 read_content_path={read_leetcode_path}
                                                 renderData={leetcodeList}
                                                 fetchContentList={this.fetchLeetcodeList}
                                                 singleRenderPropsOnHeader={defaultProps.singleRenderPropsOnHeader}
                                                 multiRenderPropsOnHeader={defaultProps.multiRenderPropsOnHeader}/>

                        <LeetcodeCategoryDetail path={`${linkTo.myleetcode}/:tag`}
                                                renderData={leetcodeCategory}
                                                fetchLeetcodeList={this.fetchLeetcodeList}/>

                        <About path={linkTo.about}
                               articles={categoryArticles}
                               aboutMe={aboutMe} />

                        <ArticleDetailComponent path={`${linkTo.articles}/:fetchKey`}
                                                wantedPropsFromList={['title','createdTime','relatedTags','uniqueID']}
                                                wantedPropsFromContent={['content']}
                                                read_content_path={read_blog_path}
                                                renderData={initArticles}
                                                fetchContentList={this.fetchBlogList} />

                        <CategoryDetail path={`${linkTo.category}/:tag`}
                                        categoryArticles={categoryArticles} />

                        <NotFound default
                                  changeBG={this.changeBackground} />

                      </Router>
                    </CSSTransition>
                  </TransitionGroup>
                </>

              )
            }}
          </Location>
          <BackTop />
        </Layout>
      </Layout>
    );
  }
}
