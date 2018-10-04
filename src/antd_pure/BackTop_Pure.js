import React from 'react';
import { Layout,BackTop } from 'antd';
import {deepEqual} from '../utils'
const { Header,Footer} = Layout;

export default class BackTop_Pure extends React.Component {

  shouldComponentUpdate(){
    return false
  }
  render() {
    console.log(this.props)
    return (
      <BackTop />
    )
  }
}

