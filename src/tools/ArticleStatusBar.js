import React from 'react'
import {Row,Col,Icon,Spin} from 'antd';
import {Link} from "@reach/router"
import TagLight from "./TagLight"
import {linkTo} from '../routes/linkPathList'
import Disqus from 'disqus-react';


const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


const styles={
  row_gutter:{ xs: 4, sm: 8, md: 16,lg:24},
  row_style:{fontWeight: 500}
}

export default class ArticleStatusBar extends React.Component{

  render(){
    const {article,articleSha,...props}=this.props
    let sha=article.sha || articleSha
    const disqusShortname = 'stonehank';
    const disqusConfig = {
      url: `${window.location.origin}/articles/${sha}`,
      identifier: sha,
    };
    return (
      <Row type="flex" {...props} gutter={styles.row_gutter}  style={styles.row_style}>
        <Col>{article.createdTime || "未知日期"}</Col>
        <Col>
          { article.label ?
            article.label.map((t,i) => {
              return (
                <Link key={i} to={`${linkTo.category}/${t}`}>
                  <TagLight>{t}</TagLight>
                </Link>
              )
            }) :
            null
          }
        </Col>
        <Col><Disqus.CommentCount shortname={disqusShortname} config={disqusConfig}>
          评论数：<Spin indicator={antIcon} />
        </Disqus.CommentCount></Col>
      </Row>
    )
  }
}