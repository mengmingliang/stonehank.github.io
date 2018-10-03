import React, {Component} from 'react';
import {Pagination, Row, Button, Anchor, Skeleton, Collapse, List, Affix, Col, Tag, Icon} from 'antd';
import {Link, navigate} from "@reach/router"
import ArticleStatusBar from "./ArticleStatusBar"
import {Layout} from "antd/lib/index";
import TagsList from "./TagsList"
import TagsBlock from "./TagsBlock"

// const {Link : AntdLink} =Anchor
const Panel = Collapse.Panel;

const {Header, Content, Footer, Sider} = Layout;


export default class Category extends React.Component {
  constructor() {
    super()
    this.state = {
      pageSize: 5,
      contentLoading: true,
      articles: null,
      page: 1
    }
    this.totalPage = 0

    this.handlePageChange = this.handlePageChange.bind(this)
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
    const {articles, contentLoading, pageSize, page} = this.state
    const {toggleTagRender,tagsRenderMode}=this.props
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
      <div>
        <Skeleton active loading={contentLoading} title={{width: "30%"}} paragraph={{rows: 3, width: "50%"}}/>
        <Skeleton active loading={contentLoading} title={{width: "30%"}} paragraph={{rows: 3, width: "50%"}}/>
        <Skeleton active loading={contentLoading} title={{width: "30%"}} paragraph={{rows: 3, width: "50%"}}/>
      </div> :
      <Content style={{margin: '24px 36px'}}>
        <div className="clearfix">
          <Button style={{border: "none", background: "#eef8ff", float: "right"}}
            // loading={renderLoading}
                  onClick={toggleTagRender}>
            <Icon type={tagsRenderMode === "list" ? "table" : "profile"} style={{fontSize: "1.5rem", color: "#46a6ff"}}/>
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

