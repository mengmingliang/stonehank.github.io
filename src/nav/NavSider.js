import React from 'react';
import { BackTop,Tag,Card,Skeleton,Avatar, Pagination,Layout,Menu, Breadcrumb, Icon,Affix,Row,Col } from 'antd';
import {  Link } from "@reach/router";

const { Header, Content, Footer, Sider } = Layout;

export default class NavSider extends React.Component {
  constructor(){
    super()
    this.state={
    }
  }

  componentDidMount(){
  }
  render() {
    const customStyle={
      display: "flex",
      flexFlow: "column",
      justifyContent: "normal",
    }
    return (
        <Sider
          theme="dark"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => { console.log(broken); }}
          onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        >
          <div className="logo" />
          <Menu theme="dark" style={customStyle} defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>首页</span>
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>归档</span>
              <Link to="archive" />
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="desktop" />
              <span>标签</span>
              <Link to="category" />
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="file" />
              <span>关于我</span>
              <Link to="about" />
            </Menu.Item>
          </Menu>
        </Sider>
    );
  }
}
