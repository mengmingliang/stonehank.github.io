import React from 'react';
import {Layout,Menu, Icon ,Avatar} from 'antd';
import {  Link } from "@reach/router";
import {linkTo} from '../routes/linkPathList'

const {  Sider } = Layout;

const styles={
  sider:{zIndex:1,opacity:0.8},
  menu: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "normal",
  },
  bio:{
    color:"#fff",
    textAlign:"center",
    flex:1,height:64,
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    fontSize:"smaller",
    textShadow:`#a2a2a2 0px 1px 0px, #696969 0px 2px 0px, #4e4e4e 0px 3px 0px`
  },
  blogName:{
    fontSize:"medium"
  }
}

export default class NavSiderComponent extends React.PureComponent {
  render() {
    const {bio,avatar,username,selectedKey,collapse,collapsible,toggleCollapse,toggleCollapsible}=this.props
    return (
      <Sider  style={styles.sider}
              theme="dark"
              breakpoint="md"
              collapsedWidth="0"
              collapsible={collapsible}
              collapsed={collapse}
              onCollapse={toggleCollapse}
              onBreakpoint={toggleCollapsible} >
        <div className="logo">
          <Avatar shape="square" size={64} src={process.env.PUBLIC_URL+avatar} />
          <section style={styles.bio}>
            <span style={styles.blogName}>{username}'s Blog</span>
            <span>{bio}</span>
          </section>
        </div>
        <Menu theme="dark"
              style={styles.menu}
              selectedKeys={[selectedKey]}
              mode="inline"
              onClick={toggleCollapse}
        >
          <Menu.Item key={linkTo.home}>
            <Icon type="home" />
            <span>首页</span>
            <Link to="/" />
          </Menu.Item>
          <Menu.Item key={linkTo.archive}>
            <Icon type="database" />
            <span>归档</span>
            <Link to={linkTo.archive} />
          </Menu.Item>
          <Menu.Item key={linkTo.category}>
            <Icon type="cluster" />
            <span>标签</span>
            <Link to={linkTo.category} />
          </Menu.Item>
          <Menu.Item key={linkTo.sourceCode}>
            <Icon type="file-text" />
            <span>源码阅读</span>
            <Link to={linkTo.sourceCode} />
          </Menu.Item>
          <Menu.Item key={linkTo.about}>
            <Icon type="user" />
            <span>关于我</span>
            <Link to={linkTo.about} />
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
