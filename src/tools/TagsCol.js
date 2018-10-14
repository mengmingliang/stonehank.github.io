import React from 'react';
import {linkTo} from "../routes/linkPathList";
import {Col} from 'antd';
import {Link} from "@reach/router"
import TagLight from "./TagLight";


const styles={
  col:{margin: "1rem 0"}
}

export default class TagsCol extends React.PureComponent {

  render() {
    const {tag}=this.props
    return (
      <Col style={styles.col}>
        <Link to={`${linkTo.category}/${tag}`}>
          <TagLight>{tag}</TagLight>
        </Link>
      </Col>
    )
  }
}

