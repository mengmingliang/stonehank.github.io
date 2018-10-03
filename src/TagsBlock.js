import React, {Component} from 'react';
import {Pagination, Row, Button, Anchor, Skeleton, Collapse, List, Affix, Col, Tag, Icon} from 'antd';
import {Link, navigate} from "@reach/router"
import ArticleStatusBar from "./ArticleStatusBar"
import {Layout} from "antd/lib/index";


// const {Link : AntdLink} =Anchor
const Panel = Collapse.Panel;

const {Header, Content, Footer, Sider} = Layout;


export default class TagsBlock extends React.Component {

  render() {
    const {articles} = this.props
    return (
            <Row type="flex"
                 justify="start"
                 gutter={6}
            >
              {Object.keys(articles).map((tag,i) => {
                return (
                  <Col key={i} style={{margin: "1rem 0"}}>
                    <Link to={`/category/${tag}`}>
                      <Tag>{tag}</Tag>
                    </Link>
                  </Col>
                )
              })}
            </Row>
    )
  }
}

