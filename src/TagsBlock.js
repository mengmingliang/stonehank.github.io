import React, {Component} from 'react';
import {Pagination, Row, Button, Anchor, Skeleton, Collapse, List, Affix, Col, Tag, Icon} from 'antd';
import {Link, navigate} from "@reach/router"
import Tag_Light from './Tag_Light'
import {linkTo} from './linkPathList'



const styles={
  col:{margin: "1rem 0"}
}

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
                  <Col key={i} style={styles.col}>
                    <Link to={`${linkTo.category}/${tag}`}>
                      <Tag_Light>{tag}</Tag_Light>
                    </Link>
                  </Col>
                )
              })}
            </Row>
    )
  }
}

