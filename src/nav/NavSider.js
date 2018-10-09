import React from 'react';
import {Layout,Menu, Icon } from 'antd';
import {  Link } from "@reach/router";
import {linkTo} from '../routes/linkPathList'



const {  Sider } = Layout;




const styles={
  sider:{zIndex:1,opacity:0.8},
  menu: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "normal",
  }
}


export default class NavSider extends React.PureComponent {
  constructor(props){
    super(props)
    this.state={
      selectedKey:props.selectedKey||"/home"
    }
  }
  static getDerivedStateFromProps(nextProps,prevState){
    if(nextProps.selectedKey===prevState.selectedKey)return null
    return {
      selectedKey:nextProps.selectedKey
    }
  }

  render() {
    const {selectedKey}=this.state
    return (
      <Sider  style={styles.sider}
                            theme="dark"
                            breakpoint="lg"
                            collapsedWidth="0"
                   >
          <div className="logo" />
          <Menu theme="dark"
                style={styles.menu}
                selectedKeys={[selectedKey]}
                mode="inline">
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
              <Link to={`${linkTo.category}`} />
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
