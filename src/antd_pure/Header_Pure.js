import React from 'react';
import { Layout } from 'antd';

const { Header} = Layout;
export default class Header_Pure extends React.PureComponent {
  render() {
    return (
      <Header {...this.props} />
    )
  }
}

