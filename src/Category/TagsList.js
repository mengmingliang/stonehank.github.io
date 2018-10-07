import React, {Component} from 'react';
import {Pagination, Row, Button, Anchor, Skeleton, Collapse, List, Affix, Col, Tag, Icon} from 'antd';
import {Link, navigate} from "@reach/router"
import ArticleStatusBar from "../ArticleStatusBar"
import {Layout} from "antd/lib/index";
import {linkTo} from '../linkPathList'

// const {Link : AntdLink} =Anchor
const Panel = Collapse.Panel;

const {Header, Content, Footer, Sider} = Layout;
const styles={
  pages:{textAlign: 'center'},
  list_item:{background: "#fcfcfc"},
  icon:{color: "#46a6ff"}
}



export default class TagsList extends React.Component {

  render() {
    const {articles, pageSize, page,handlePageChange,totalPage,renderArticles} = this.props
    return (
            <List split={false}
                  pagination={{
                    style: styles.pages,
                    current: +page,
                    pageSize,
                    total: totalPage,
                    onChange: handlePageChange
                  }}
                  dataSource={renderArticles}
                  renderItem={(key, i) => {
                    const tag = key, tagList = articles[key]
                    return (
                      <List key={i}
                            size="small"
                            split={false}
                            header={
                              <strong>
                                <Icon type="tag" style={styles.icon} />
                                <Link to={`${linkTo.category}/${tag}`}>
                                  <Tag>{tag}</Tag>
                                </Link>
                              </strong>
                            }
                            dataSource={tagList}
                            renderItem={item => (
                              <List.Item style={styles.list_item}>
                                <List.Item.Meta
                                  title={
                                    <Link to={`${linkTo.articles}/${item.title}`}>
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

