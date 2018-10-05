import React from 'react';
import { Layout,BackTop } from 'antd';
import {deepEqual} from '../utils'
const { Header,Footer} = Layout;

export default class BackTop_Pure extends React.PureComponent {

  render() {
    return (
      <BackTop {...this.props}/>
    )
  }
}

