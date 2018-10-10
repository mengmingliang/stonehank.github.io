import React from 'react';
import { Icon,Tag } from 'antd';
import {Link} from "@reach/router";
import {linkTo} from "../routes/linkPathList";

const styles={
  icon:{color: "#46a6ff",marginRight:4}
}
export default class TagHeader extends React.PureComponent {

  render() {
    const {tag}=this.props
    return (
      <strong>
        <Icon type="tag" style={styles.icon} />
        <Link to={`${linkTo.category}/${tag}`}>
          <Tag color="blue">{tag}</Tag>
        </Link>
      </strong>
    )
  }
}

