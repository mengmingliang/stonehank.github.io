import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import BlogLayout from "./BlogLayout";
import 'antd/dist/antd.css';



class Entry extends Component {
  render() {
    return (
      <BlogLayout />
    );
  }
}

export default Entry;
