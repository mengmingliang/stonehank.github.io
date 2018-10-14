import React from 'react';
import { Row} from 'antd';

import TagsCol from "../tools/TagsCol";




export default class TagsBlock extends React.Component {

  render() {
    const {articles} = this.props
    return (
            <Row type="flex"
                 justify="start"
                 gutter={6}
            >
              {Object.keys(articles).map((tag,i) => {
                return (
                  <TagsCol key={i} tag={tag}/>
                )
              })}
            </Row>
    )
  }
}

