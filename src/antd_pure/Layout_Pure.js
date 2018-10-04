import React from 'react';
import { Layout } from 'antd';
import {deepEqual} from '../utils'
const { Header,Footer} = Layout;

export default class Layout_Pure extends React.Component {

  shouldComponentUpdate(prevProps,nextState) {
    console.log(deepEqual(prevProps, nextState))
    return !deepEqual(prevProps, nextState)
  }

  render() {
    return (
      <Layout style={this.props.style} >
        {this.props.children}
      </Layout>
    )
  }
}

