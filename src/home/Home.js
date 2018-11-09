import React from 'react';
import ArticleList from "./ArticleList";
import Loading from "../tools/Loading";




export default class Home extends React.PureComponent {
  constructor(props){
    super(props)
    const {articlesEachPage}=props
    this.state={
      contentLoading:true,
      articles:null,
      pageSize:articlesEachPage
    }
  }

  // 这里只要props传值，就会setState并且render
  // 相关拦截在 ArticleList
  static getDerivedStateFromProps(props,state){
    const {articles}=props
    if(!articles )return null
    return {
      articles,
      contentLoading:false
    }
  }

  componentDidMount() {
    Promise.resolve().then(()=>{
      window.scrollTo(0, 0);
    })
  }
  render() {
    const {articles,contentLoading,pageSize}=this.state
    const {page}=this.props
    const renderArticles=articles?articles.slice((page-1)*pageSize,page*pageSize):null
    return(
      contentLoading ?
        <Loading loading={contentLoading} render_nums={3} ske_title_width={"30%"} ske_para_width={"50%"} ske_para_rows={3} /> :

      <ArticleList articles={renderArticles} current={+page} pageSize={pageSize} total={articles.length} />
    )
  }
}

