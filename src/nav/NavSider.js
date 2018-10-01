import React from 'react';
import { BackTop,Tag,Card,Skeleton,Avatar, Pagination,Layout,Menu, Breadcrumb, Icon,Affix,Row,Col } from 'antd';
import {  Link } from "@reach/router";

const {  Sider } = Layout;



const NavLink = props => {
  const {selectedKeys,selectedKey,...prop}=props
  return (
    <Link {...prop} getProps={({isCurrent}) => {
        if(isCurrent)selectedKeys[0]=selectedKey
      }} />
  )
};




export default class NavSider extends React.Component {

  render() {
    this.selectedKeys=["home"]
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
          <Menu theme="dark"
                style={customStyle}
                defaultSelectedKeys={this.selectedKeys}
                mode="inline">
            <Menu.Item key="home">
              <Icon type="pie-chart" />
              <span>首页</span>
              <NavLink to="/" selectedKeys={this.selectedKeys} selectedKey={"home"} />
            </Menu.Item>
            <Menu.Item key="archive">
              <Icon type="desktop" />
              <span>归档</span>
              <NavLink to="/archive" selectedKeys={this.selectedKeys} selectedKey={"archive"} />
            </Menu.Item>
            <Menu.Item key="category">
              <Icon type="desktop" />
              <span>标签</span>
              <NavLink to="/category" selectedKeys={this.selectedKeys} selectedKey={"category"} />
            </Menu.Item>
            <Menu.Item key="about">
              <Icon type="file" />
              <span>关于我</span>
              <NavLink to="/about" selectedKeys={this.selectedKeys} selectedKey={"about"} />
            </Menu.Item>
          </Menu>
        </Sider>
    );
  }
}
