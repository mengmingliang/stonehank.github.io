import React from 'react';
import { Layout } from 'antd';

const { Header,Footer} = Layout;
export default class Header_Pure extends React.PureComponent {
  render() {
    return (
      <Header style={this.props.style} >
        FrontEnd Blogs
      </Header>
    )
  }
}

