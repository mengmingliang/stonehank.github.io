import React from 'react'
import {Drawer,Button,Anchor ,Skeleton,Collapse,List,Row,Col,Tag,Icon} from 'antd';
import {Link} from "@reach/router"
import Tag_Light from "./Tag_Light"
import {deepEqual} from "./utils";
import {linkTo} from './linkPathList'


class IconText extends React.PureComponent{
  render(){
    const { type, text,...props}=this.props
    return (
      <span {...props}>
    <Icon type={type}  />
        {text}
  </span>
    )
  }
}

const styles={
  row_gutter:{ xs: 4, sm: 8, md: 16,lg:24},
  row_style:{fontWeight: 500},
  col_message_style:{textAlign: "center"}
}

export default class ArticleStatusBar extends React.Component{


  shouldComponentUpdate(prevProps,nextState) {
    console.log(deepEqual(prevProps, this.props))
    return !deepEqual(prevProps, this.props)
  }


  render(){
    const {article,...props}=this.props
    return (
      <Row type="flex" {...props} gutter={styles.row_gutter}  style={styles.row_style}>
        <Col>{article.createdTime}</Col>
        <Col>
          { article.label ?
            article.label.map((t,i) => {
              return (
                <Link key={i} to={`${linkTo.category}/${t}`}>
                  <Tag_Light>{t}</Tag_Light>
                </Link>
              )
            }) :
            <Tag>No-Tag</Tag>
          }
        </Col>
        <Col style={styles.col_message_style}><IconText type="message" text="2"/></Col>
      </Row>
    )
  }
}