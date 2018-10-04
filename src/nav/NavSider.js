import React from 'react';
import { Tag,Card,Skeleton,Avatar, Pagination,Layout,Menu, Breadcrumb, Icon,Affix,Row,Col } from 'antd';
import {  Link } from "@reach/router";

const {  Sider } = Layout;



const NavLink = props => {
  const {selectedKeys,selectedKey,...prop}=props
  return (
    <Link {...prop} getProps={({isPartiallyCurrent}) => {
        if(isPartiallyCurrent)selectedKeys[0]=selectedKey
      }} />
  )
};




export default class NavSider extends React.PureComponent {
  // constructor(){
  //   super()
  //   this.state={
  //     collapsed:false
  //   }
  // }
  render() {
    // const {collapsed}=this.state
    this.selectedKeys=["home"]
    const customStyle={
      display: "flex",
      flexFlow: "column",
      justifyContent: "normal",
    }
    return (
        <Sider
          style={{zIndex:1,opacity:0.8}}
          theme="dark"
          breakpoint="lg"
          collapsedWidth="0"
          // onBreakpoint={(broken) => { console.log(broken); }}
          // trigger={"sfsf"}
          // onCollapse={(collapsed, type) => {
          //   if(collapsed){
          //     console.log(1)
          //     this.setState({
          //       collapsed:true
          //     })
          //   }else{
          //     this.setState({
          //       collapsed:false
          //     })
          //   }
          //   console.log(collapsed, type); }}
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
              <NavLink to="/category/page/1" selectedKeys={this.selectedKeys} selectedKey={"category"} />
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
