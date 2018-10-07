import React, {Component} from 'react';
import {Pagination, Row, Button, Anchor, Skeleton, Collapse, List, Affix, Col, Tag, Icon} from 'antd';
import {Link, navigate} from "@reach/router"
import ArticleStatusBar from "./ArticleStatusBar"
import {Layout} from "antd/lib/index";
import TagsList from "./TagsList"
import TagsBlock from "./TagsBlock"
import Loading from "./Loading";

// const {Link : AntdLink} =Anchor
const Panel = Collapse.Panel;

const {Header, Content, Footer, Sider} = Layout;

const styles={
  defaultMargin:{margin: '24px 36px'},
  toggleRenderButton:{border: "none", background: "#eef8ff", float: "right"},
  toggleRenderIcon:{fontSize: "1.5rem", color: "#46a6ff"}
}

export default class Category extends React.Component {
  constructor(props) {
    super(props)
    const {articles}=props
    this.state = {
      // todo 5是默认加载标签数量，可转换为配置
      pageSize: 5,
      contentLoading: true,
      articles: null,
      // 初始渲染模式
      tagsRenderMode:(articles && articles.tagsRenderMode) ||"list",
      // 初始页数
      page: 1
    }
    this.totalPage = 0
    this.toggleTagRender=this.toggleTagRender.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  toggleTagRender(){
    const {articles}=this.props
    let newTagsMode=this.state.tagsRenderMode === "block" ? "list" : "block"
    articles.tagsRenderMode=newTagsMode
    this.setState({
      tagsRenderMode: newTagsMode
    })
  }

  handlePageChange(page) {
    navigate(page)
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.articles && nextProps.page === prevState.page) return null
    const {articles, page} = nextProps
    if (!articles) return null
    return {
      page: page,
      articles,
      contentLoading: false
    }
  }

  render() {
    const {articles, contentLoading, pageSize, page,tagsRenderMode} = this.state
    // const {toggleTagRender,tagsRenderMode}=this.props
    // const renderArticles=articles?Object.keys(articles).slice((page-1)*pageSize,page*pageSize):null
    let renderArticles
    if (articles) {
      let keysArr = Object.keys(articles)
      this.totalPage = keysArr.length
      renderArticles = keysArr.slice((page - 1) * pageSize, page * pageSize)
    } else {
      renderArticles = null
    }
    // console.log(articles)
    return contentLoading ?
      <Loading loading={contentLoading} render_nums={3} ske_title_width={"30%"} ske_para_width={"50%"} ske_para_rows={3} /> :

      <Content style={styles.defaultMargin}>
        <div className="clearfix">
          <Button style={styles.toggleRenderButton}
                  onClick={this.toggleTagRender}>
            <Icon type={tagsRenderMode === "list" ? "table" : "profile"} style={styles.toggleRenderIcon}/>
          </Button>
        </div>
        {tagsRenderMode === "list" ?
          <TagsList articles={articles}
                    pageSize={pageSize} page={page}
                    handlePageChange={this.handlePageChange}
                    totalPage={this.totalPage}
                    renderArticles={renderArticles}
          /> :
          <TagsBlock articles={articles}/>
        }
      </Content>
  }
}

