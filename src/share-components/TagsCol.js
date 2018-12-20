import React from 'react';
import {linkTo} from "../routes/linkPathList";
import {Col,Card} from 'antd';
import {Link} from "@reach/router"
import TagLight from "./TagLight";


const styles={
  col:{margin: "1rem 0"}
}

export default class TagsCol extends React.PureComponent {

  render() {
    const {tag,linkToProps,tagStyle,renderType,count}=this.props
    return (
      <Col style={styles.col}>
        <Link to={`${linkTo[linkToProps]}/${tag}`}>
          {
            renderType==="card"
              ?  <Card hoverable>
                   <span style={{fontWeight:600}}>{tag}</span>
                   <p style={{fontWeight:200}}>{count?`共有${count}`:null}</p>
                 </Card>
              :  <TagLight tagStyle={tagStyle}>
                   <span>{tag}</span>
                 </TagLight>
          }
        </Link>
      </Col>
    )
  }
}

