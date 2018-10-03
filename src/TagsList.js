import React, {Component} from 'react';
import {Pagination, Row, Button, Anchor, Skeleton, Collapse, List, Affix, Col, Tag, Icon} from 'antd';
import {Link, navigate} from "@reach/router"
import ArticleStatusBar from "./ArticleStatusBar"
import {Layout} from "antd/lib/index";


// const {Link : AntdLink} =Anchor
const Panel = Collapse.Panel;

const {Header, Content, Footer, Sider} = Layout;


export default class TagsList extends React.Component {

  render() {
    const {articles, pageSize, page,handlePageChange,totalPage,renderArticles} = this.props
    return (
            <List split={false}
                  pagination={{
                    style: {textAlign: 'center'},
                    current: +page,
                    pageSize,
                    total: totalPage,
                    onChange: handlePageChange
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
    )
  }
}

