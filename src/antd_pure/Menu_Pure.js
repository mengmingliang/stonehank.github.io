import React from 'react';
import { Layout,Icon,Menu } from 'antd';
import {deepEqual} from '../utils'
import {  Link } from "@reach/router";


const customStyle={
  display: "flex",
  flexFlow: "column",
  justifyContent: "normal",
}

export default class Menu_Pure extends React.PureComponent {
  constructor(prop){
    super(prop)
    this.state={
      selectedKey:prop.selectedKey
    }
    this.selectedKey='home'
    this.changeSelectedKey=this.changeSelectedKey.bind(this)
  }

  changeSelectedKey(selectedKey){
    console.log(this.state.selectedKey,selectedKey)
    if(this.state.selectedKey!==selectedKey)
    this.setState({
      selectedKey:selectedKey
    })
  }

  render() {
    const {selectedKey}=this.state
    // this.selectedKey=["home"]
    const NavLink = props => {
      const {selectedKey,...prop}=props
      return (
        <Link {...prop} getProps={({isPartiallyCurrent}) => {
          if(isPartiallyCurrent)this.selectedKey=selectedKey
        }} />
      )
    };
    return (
      <Menu theme="dark"
            style={customStyle}
            defaultSelectedKeys={[this.selectedKey]}
            mode="inline">
        <Menu.Item key="home">
          <Icon type="pie-chart" />
          <span>首页</span>
          <NavLink to="/"  selectedKey={"home"} />
        </Menu.Item>
        <Menu.Item key="archive">
          <Icon type="desktop" />
          <span>归档</span>
          <NavLink to="/archive"  selectedKey={"archive"} />
        </Menu.Item>
        <Menu.Item key="category">
          <Icon type="desktop" />
          <span>标签</span>
          <NavLink to="/category/page/1"  selectedKey={"category"} />
        </Menu.Item>
        <Menu.Item key="about">
          <Icon type="file" />
          <span>关于我</span>
          <NavLink to="/about"  selectedKey={"about"} />
        </Menu.Item>
      </Menu>
    )
  }
}

