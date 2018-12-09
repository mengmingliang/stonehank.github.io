import React from 'react'
import {Row,Col} from 'antd';
import {Link} from "@reach/router"
import TagLight from "./TagLight"
import {linkTo} from '../routes/linkPathList'
import CustomComment from "../tools/CustomComment";


const styles={
  row_gutter:{ xs: 4, sm: 8, md: 16,lg:24},
  row_style:{fontWeight: 500}
}

export default class ArticleStatusBar extends React.Component{

  render(){
    const {article,articleSha,noCount,...props}=this.props
    return (
      <Row type="flex" {...props} gutter={styles.row_gutter}  style={styles.row_style}>
        <Col>{<div dangerouslySetInnerHTML={{__html:article.createdTime || "未知日期"}} />}</Col>
        <Col>
          {
            article.label
              ? article.label.map((t,i) => {
                return (
                  <Link key={i} to={`${linkTo.category}/${t}`}>
                    <TagLight>{t}</TagLight>
                  </Link>
                )})
              : null
          }
        </Col>
        <Col>
          {noCount
            ? null
            : <CustomComment.Count title={article.title}
                                   sha={article.titleSHA || articleSha}
                                   locationOrigin={window.location.origin} />
          }
        </Col>
      </Row>
    )
  }
}