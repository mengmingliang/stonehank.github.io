import React from 'react';

export default class Tag_Light extends React.Component {

  render() {
    return (
      <div className="ant-tag">
        {this.props.children}
      </div>
    )
  }
}

