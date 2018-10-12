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


export default class NavSider extends React.PureComponent {
  constructor(props){
    super(props)
    this.state={
      selectedKey:props.selectedKey||"/home",
      collapse:false,
      collapsible:false
    }
    this.toggleCollapse=this.toggleCollapse.bind(this)
    this.toggleCollapsible=this.toggleCollapsible.bind(this)
  }
  toggleCollapsible(breakPoint){
      this.setState({
        collapse:breakPoint,
        collapsible:breakPoint
      })
  }
  toggleCollapse(){
    if(this.state.collapsible)
    this.setState(prevS=>({
      collapse:!prevS.collapse
    }))
  }

  static getDerivedStateFromProps(nextProps,prevState){
    if(nextProps.selectedKey===prevState.selectedKey)return null
    return {
      selectedKey:nextProps.selectedKey
    }
  }

  render() {
    const {bio,avatar,username}=this.props
    const {selectedKey,collapse,collapsible}=this.state
    return (
      <Sider  style={styles.sider}
              theme="dark"
              breakpoint="md"
              collapsedWidth="0"
              collapsible={collapsible}
              collapsed={collapse}
              onCollapse={this.toggleCollapse}
              onBreakpoint={this.toggleCollapsible}
      >
          <div className="logo">
            <Avatar shape="square" size={64} src={avatar} />
            <section style={styles.bio}>
              <span style={styles.blogName}>{username}'s Blog</span>
              <span>{bio}</span>
            </section>
          </div>
          <Menu theme="dark"
                style={styles.menu}
                selectedKeys={[selectedKey]}
                mode="inline"
                onClick={this.toggleCollapse}
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
            <Menu.Item key={linkTo.about}>
              <Icon type="user" />
              <span>关于我</span>
              <Link to={linkTo.about} />
            </Menu.Item>
            {/*<Connect github={"#"} mail={"#"} twitter={"#"} wechat={"#"} qq={"#"} />*/}
          </Menu>
      </Sider>
    );
  }
}
