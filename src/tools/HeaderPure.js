import React from 'react';
import { Layout } from 'antd';

const { Header} = Layout;
export default class HeaderPure extends React.PureComponent {
  render() {
    // console.log('Header')
    return (
      <Header {...this.props} />
    )
  }
}

