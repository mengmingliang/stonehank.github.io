import React from 'react';
import {Button, Tag, Card, List, Avatar, Pagination, Layout, Menu, Breadcrumb, Icon, Affix, Row, Col} from 'antd';
// import * as blog_jsonObj from "../asset/blog-data";



export default class About extends React.Component {
  render() {
    const {articles}=this.props
    return (
      articles?
        <React.Fragment>

        </React.Fragment>:
        <div />
    )
  }
}

