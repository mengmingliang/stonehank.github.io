import React from 'react';
import { Skeleton } from 'antd';
import './css/github.min.css'
import ArticleList from "./article/ArticleList";
import Loading from "./Loading";




export default class Home extends React.PureComponent {
  constructor(){
    super()
    this.state={
      contentLoading:true,
      discussLoading:true,
      filteredArticles:null,
      pageSize:3
    }
  }
  static getDerivedStateFromProps(props){
    const {articles}=props
    if(!articles)return null
    const filteredArticles=articles.filter(item=>item.title)
    return {
      filteredArticles,
      contentLoading:false
    }
  }

  render() {
    const {filteredArticles,contentLoading,pageSize}=this.state
    const {page}=this.props
    const renderArticles=filteredArticles?filteredArticles.slice((page-1)*pageSize,page*pageSize):null
    return(
      contentLoading ?
        <Loading loading={contentLoading} render_nums={3} ske_title_width={"30%"} ske_para_width={"50%"} ske_para_rows={3} /> :

      <ArticleList articles={renderArticles} current={+page} pageSize={pageSize} total={filteredArticles.length} />
    )
  }
}

