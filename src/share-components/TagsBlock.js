import React from 'react';
import { Row} from 'antd';

import TagsCol from "./TagsCol";




export default class TagsBlock extends React.Component {

  render() {
    const {articles,linkToProps,gutter,tagStyle,renderType,showCount} = this.props
    return (
            <Row type="flex"
                 justify="start"
                 gutter={gutter||6}
            >
              { Object.keys(articles).map((tag,i) => {
                let count=null
                if(showCount)count=articles[tag].length
                return (
                  <TagsCol key={i}
                           tag={tag}
                           count={count}
                           linkToProps={linkToProps}
                           tagStyle={tagStyle}
                           renderType={renderType}/>
                )
              })}
            </Row>
    )
  }
}

