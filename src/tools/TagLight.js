import React from 'react';

export default class TagLight extends React.Component {

  render() {
    return (
      <div className="ant-tag">
        {this.props.children}
      </div>
    )
  }
}

