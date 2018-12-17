import React from 'react';

export default class TagLight extends React.Component {

  render() {
    return (
      <div className="ant-tag" style={this.props.tagStyle}>
        {this.props.children}
      </div>
    )
  }
}

