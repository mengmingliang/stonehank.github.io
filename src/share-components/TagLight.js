import React from 'react';

export default class TagLight extends React.Component {

  render() {
    const {className}=this.props
    return (
      <div className={`ant-tag  ${className}`} style={this.props.tagStyle}>
        {this.props.children}
      </div>
    )
  }
}

