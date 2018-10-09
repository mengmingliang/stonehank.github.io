import React from 'react'
import {Row,Col} from 'antd';
import {Link} from "@reach/router"
import Tag_Light from "./Tag_Light"
import {linkTo} from '../routes/linkPathList'


const styles={
  row_gutter:{ xs: 4, sm: 8, md: 16,lg:24},
  row_style:{fontWeight: 500}
}

export default class ArticleStatusBar extends React.Component{

  render(){
    const {article,...props}=this.props
    return (
      <Row type="flex" {...props} gutter={styles.row_gutter}  style={styles.row_style}>
        <Col>{article.createdTime || "未知日期"}</Col>
        <Col>
          { article.label ?
            article.label.map((t,i) => {
              return (
                <Link key={i} to={`${linkTo.category}/${t}`}>
                  <Tag_Light>{t}</Tag_Light>
                </Link>
              )
            }) :
            null
          }
        </Col>
      </Row>
    )
  }
}