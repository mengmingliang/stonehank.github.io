import React from 'react';
import { Tag,Card,Skeleton,Avatar, Pagination,Layout,Menu, Breadcrumb, Icon,Affix,Row,Col } from 'antd';
import {  Link } from "@reach/router";
import {Sider_Pure} from "../antd_pure"
const {  Sider } = Layout;



// const NavLink = props => {
//   // let {selectedKey,selectedKey,...prop}=props
//   return (
//     <Link {...props}  />
//   )
// };


const styles={sider:{zIndex:1,opacity:0.8}}


export default class NavSider extends React.PureComponent {
  constructor(props){
    super(props)
    this.state={
      selectedKey:props.selectedKey||"home"
    }
  }
  static getDerivedStateFromProps(nextProps,prevState){
    if(nextProps.selectedKey===prevState.selectedKey)return null
    return {
      selectedKey:nextProps.selectedKey
    }
  }

  render() {

    // console.log("render")
    // console.log(this.state.selectedKey)
    const {pathEnum}=this.props
    const {selectedKey}=this.state


    // this.selectedKey=this.props.selectedKey
    const customStyle={
      display: "flex",
      flexFlow: "column",
      justifyContent: "normal",
    }
    return (
      <Sider  style={styles.sider}
                            theme="dark"
                            breakpoint="lg"
                            collapsedWidth="0"
                   >
          <div className="logo" />
          <Menu theme="dark"
                style={customStyle}
                selectedKeys={[selectedKey]}
                mode="inline">
            <Menu.Item key={pathEnum[0]}>
              <Icon type="pie-chart" />
              <span>首页</span>
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key={pathEnum[1]}>
              <Icon type="desktop" />
              <span>归档</span>
              <Link to={`/${pathEnum[1]}`} />
            </Menu.Item>
            <Menu.Item key={pathEnum[2]}>
              <Icon type="desktop" />
              <span>标签</span>
              <Link to={`/${pathEnum[2]}/page/1`} />
            </Menu.Item>
            <Menu.Item key={pathEnum[3]}>
              <Icon type="file" />
              <span>关于我</span>
              <Link to={`/${pathEnum[3]}`} />
            </Menu.Item>
          </Menu>
      </Sider>
    );
  }
}
