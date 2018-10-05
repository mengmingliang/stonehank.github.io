import React from 'react';
import { Card } from 'antd';

export default class Card_Pure extends React.PureComponent {
  render() {
    // const {...props}=this.props
    return (
      <Card  {...this.props} />
    )
  }
}

