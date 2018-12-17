import React from 'react'
import {Row,Col} from 'antd';
import {Link} from "@reach/router"
import TagLight from "../share-components/TagLight"
import {linkTo} from '../routes/linkPathList'
import CustomComment from "../tools/CustomComment";


const styles={
  row_gutter:{ xs: 4, sm: 8, md: 16,lg:24},
  row_style:{fontWeight: 500}
}

export default class ArticleStatusBar extends React.Component{

  render(){
    const {article,articleSha,createdTime,label,labelLinkToProp,noCount,...props}=this.props
    // console.log(labelLinkToProp)
    return (
      <Row type="flex" {...props} gutter={styles.row_gutter}  style={styles.row_style}>
        {createdTime
          ?  <Col>{<div dangerouslySetInnerHTML={{__html:article[createdTime] || "未知日期"}} />}</Col>
          :  null
        }

        <Col>
          {
            article[label]
              ? article[label].map((t,i) => {
                return (
                  <Link key={i} to={`${linkTo[labelLinkToProp]}/${t}`}>
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