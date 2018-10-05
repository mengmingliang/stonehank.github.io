import React from 'react';
// import ReactMarkdown from 'react-markdown'
import { Tag,Card,Skeleton,Avatar, Pagination,Layout,Menu, Breadcrumb, Icon,Affix,Row,Col } from 'antd';
// import * as blog_jsonObj from "./asset/blog-data.json"
import './css/github.min.css'
// import ArticleDetail from "./article/ArticleDetail";
import ArticleList from "./article/ArticleList";


const styles={
  skeleton_title:{width: "30%"},
  skeleton_paragraph:{rows: 3, width: "50%"}
}

export default class Home extends React.PureComponent {
  constructor(){
    super()
    this.state={
      contentLoading:true,
      discussLoading:true,
      articles:null,
      pageSize:3
    }
  }
  static getDerivedStateFromProps(props){
    const {articles}=props
    if(!articles)return null
    return {
      articles,
      contentLoading:false
    }
  }

  render() {
    const {articles,contentLoading,pageSize}=this.state
    const {page}=this.props
    const renderArticles=articles?articles.slice((page-1)*pageSize,page*pageSize):null
    return(
      contentLoading ?
        <React.Fragment>
          <Skeleton active loading={contentLoading} title={styles.skeleton_title} paragraph={styles.skeleton_paragraph}/>
          <Skeleton active loading={contentLoading} title={styles.skeleton_title} paragraph={styles.skeleton_paragraph}/>
          <Skeleton active loading={contentLoading} title={styles.skeleton_title} paragraph={styles.skeleton_paragraph}/>
        </React.Fragment> :
      <ArticleList articles={renderArticles} current={+page} pageSize={pageSize} total={articles.length} />
    )
  }
}

