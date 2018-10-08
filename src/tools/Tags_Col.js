import React from 'react';
import {linkTo} from "../routes/linkPathList";
import {Col} from 'antd';
import {Link} from "@reach/router"
import Tag_Light from "./Tag_Light";


const styles={
  col:{margin: "1rem 0"}
}

export default class Tags_Col extends React.PureComponent {

  render() {
    const {tag}=this.props
    return (
      <Col style={styles.col}>
        <Link to={`${linkTo.category}/${tag}`}>
          <Tag_Light>{tag}</Tag_Light>
        </Link>
      </Col>
    )
  }
}

