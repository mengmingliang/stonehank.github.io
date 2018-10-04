import React from 'react'
import {Drawer,Button,Anchor ,Skeleton,Collapse,List,Row,Col,Tag,Icon} from 'antd';
import {Link} from "@reach/router"
import Tag_Light from "./Tag_Light"


const IconText = ({ type, text,...props}) => {
  return (
    <span {...props}>
    <Icon type={type}  />
      {text}
  </span>
  )
};

export default class ArticleStatusBar extends React.PureComponent{
  render(){
    const {article,...props}=this.props
    return (
      <Row type="flex" {...props} gutter={{ xs: 4, sm: 8, md: 16,lg:24}}  style={{fontWeight: 500}}>
        <Col>{article.createdTime}</Col>
        <Col>
          { article.label ?
            article.label.map((t,i) => {
              return (
                <Link key={i} to={`/category/${t}`}>
                  <Tag_Light>{t}</Tag_Light>
                </Link>
              )
            }) :
            <Tag>No-Tag</Tag>
          }
        </Col>
        <Col style={{textAlign: "center"}}><IconText type="message" text="2"/></Col>
      </Row>
    )
  }
}