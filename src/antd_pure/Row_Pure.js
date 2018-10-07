import React from 'react';
import { Row } from 'antd';
import {deepEqual} from "../utils";


export default class Row_Pure extends React.Component {

  shouldComponentUpdate(prevProps) {
    return !deepEqual(prevProps, this.props)
  }

  render() {
    return (
      <Row {...this.props} />
    )
  }
}

