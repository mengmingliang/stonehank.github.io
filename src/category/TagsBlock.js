import React, {Component} from 'react';
import {Pagination, Row, Button, Anchor, Skeleton, Collapse, List, Affix, Col, Tag, Icon} from 'antd';

import Tags_Col from "../tools/Tags_Col";




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
                  <Tags_Col key={i} tag={tag}/>
                )
              })}
            </Row>
    )
  }
}

