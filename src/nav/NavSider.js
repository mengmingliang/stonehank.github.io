import React from 'react';
import { Tag,Card,Skeleton,Avatar, Pagination,Layout,Menu, Breadcrumb, Icon,Affix,Row,Col } from 'antd';
import {  Link } from "@reach/router";
import {Sider_Pure} from "../antd_pure"
import {linkTo} from '../linkPathList'



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
    // console.log(nextProps.selectedKey,prevState.selectedKey)
    if(nextProps.selectedKey===prevState.selectedKey)return null
    return {
      selectedKey:nextProps.selectedKey
    }
  }

  render() {
    const {selectedKey}=this.state
    // console.log("rendernav")
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
              <Icon type="pie-chart" />
              <span>首页</span>
              <Link to="/page/1" />
            </Menu.Item>
            <Menu.Item key={linkTo.archive}>
              <Icon type="desktop" />
              <span>归档</span>
              <Link to={linkTo.archive} />
            </Menu.Item>
            <Menu.Item key={linkTo.category}>
              <Icon type="desktop" />
              <span>标签</span>
              <Link to={`${linkTo.category}/page/1`} />
            </Menu.Item>
            <Menu.Item key={linkTo.about}>
              <Icon type="file" />
              <span>关于我</span>
              <Link to={linkTo.about} />
            </Menu.Item>
          </Menu>
      </Sider>
    );
  }
}
