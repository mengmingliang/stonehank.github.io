import React, {Component} from 'react';
import {Pagination, Row, Button, Anchor, Skeleton, Collapse, List, Affix, Col, Tag, Icon} from 'antd';
import {Link, navigate} from "@reach/router"
import ArticleStatusBar from "./ArticleStatusBar"
import {Layout} from "antd/lib/index";


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
      page: 1,
      tagsRenderMode:"list",
      renderLoading: false,
    }
    this.totalPage = 0

    this.handlePageChange = this.handlePageChange.bind(this)
    this.toggleRender = this.toggleRender.bind(this)
  }

  handlePageChange(page) {
    navigate(page)
  }

  toggleRender() {
    this.setState(prevState => ({
      tagsRenderMode: prevState.tagsRenderMode === "block" ? "list" : "block"
    }))
  }

  // shouldComponentUpdate(a,b,c,d){
  //   console.log(a,b,c,d)
  //   return true
  // }
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
    // console.log(this.props)
    const {articles, contentLoading, pageSize, page, renderLoading, tagsRenderMode} = this.state
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
      <React.Fragment>
        <Content style={{margin: '24px 36px'}}>
          <div className="clearfix">
            <Button style={{border: "none", background: "#eef8ff", float: "right"}}
              // loading={renderLoading}
                    onClick={this.toggleRender}>
              <Icon type={tagsRenderMode === "list" ? "table" : "profile"} style={{fontSize: "1.5rem", color: "#46a6ff"}}/>
            </Button>
          </div>
          {tagsRenderMode === "block" ?
            <Row type="flex"
                 justify="start"
                 gutter={"6"}
            >
              {Object.keys(articles).map((tag,i) => {
                return (
                  <Col style={{margin: "1rem 0"}}>
                    <Link key={i} to={`/category/${tag}`}>
                    <Tag>{tag}</Tag>
                    </Link>
                  </Col>
                )
              })}
            </Row> :
            <List split={false}
                  pagination={{
                    style: {textAlign: 'center'},
                    current: +page,
                    pageSize,
                    total: this.totalPage,
                    onChange: this.handlePageChange
                  }}
                  dataSource={renderArticles}
                  renderItem={(key, i) => {
                    let tag = key, tagList = articles[key]
                    return (
                      <List key={i} size="small"
                            split={false}
                        // style={{margin:"0 36px"}}
                            header={
                              <React.Fragment>
                                <Icon type="tag"/>
                                <Link to={`/category/${tag}`}>
                                  <Tag>{tag}</Tag>
                                  {/*<Button style={{background:"#fafafa"}}>{tag}</Button>*/}
                                </Link>
                              </React.Fragment>
                            }
                            dataSource={tagList}
                            renderItem={item => (
                              <List.Item style={{background: "#fcfcfc"}}>
                                <List.Item.Meta
                                  title={<Link to={`/articles/${item.title}`}>
                                    <div>{item.title}</div>
                                  </Link>}
                                  description={
                                    <ArticleStatusBar article={item}/>
                                  }
                                />
                              </List.Item>
                            )}
                      />
                    )
                  }}
            />
            // renderArticles.map((key, i) => {
            //   let tag = key, tagList = articles[key]
            //
            // })
          }
        </Content>
        {/*<Footer style={{textAlign: 'center'}}>*/}
        {/*<Pagination current={+page} pageSize={pageSize} total={this.totalPage} onChange={this.handlePageChange}/>*/}
        {/*</Footer>*/}
      </React.Fragment>
  }
}

