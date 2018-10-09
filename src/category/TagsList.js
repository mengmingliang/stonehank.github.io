import React, {Component} from 'react';
import {Pagination, Row, Card, Anchor, Skeleton, Collapse, List, Affix, Col, Tag, Icon} from 'antd';
import {Link, navigate} from "@reach/router"
import ArticleStatusBar from "../tools/ArticleStatusBar"
import {Layout} from "antd/lib/index";
import {linkTo} from '../routes/linkPathList'
import Card_Pure from "../antd_pure/Card_Pure";

// const {Link : AntdLink} =Anchor
const Panel = Collapse.Panel;

const {Header, Content, Footer, Sider} = Layout;
const styles={
  pages:{textAlign: 'center'},
  list_item:{background: "#fcfcfc"},
  icon:{color: "#46a6ff"},
  list_pagi_style:{textAlign: 'center',marginBottom:"1rem"},
  card:{margin:"8px 0"},
  defaultMargin:{margin: '24px 36px'}
}
const {Meta} = Card



export default class TagsList extends React.Component {
  constructor() {
    super()
    this.navigateToPath=this.navigateToPath.bind(this)
  }

  navigateToPath(path,e){
    // const {clearSearchInput}=this.props
    if(e.target.className.includes('tag'))return
    // clearSearchInput()
    navigate(path)
  }
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
                              <Card_Pure hoverable bordered={false}
                                         bodyStyle={{padding:12}}
                                         style={styles.card}
                                         title={item.title}
                                         statusBarItem={item}
                                         onClick={this.navigateToPath.bind(this,linkTo.articles+"/"+item.title)}
                              />
                            )}
                      />
                    )
                  }}
            />
    )
  }
}

