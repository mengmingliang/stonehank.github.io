import React from 'react';
import { Icon,Menu } from 'antd';
import {deepEqual} from '../utils'
import {  Link } from "@reach/router";
import {Layout} from "antd/lib/index";



const {  Sider } = Layout;
const customStyle={
  display: "flex",
  flexFlow: "column",
  justifyContent: "normal",
}


export default class Sider_Pure extends React.Component {

  shouldComponentUpdate(prop,state){
    // console.log(prop,this.props)
    console.log(prop===this.props)
    return prop!==this.props
  }

  render() {
    console.log("render")
    const {style,theme,breakpoint,collapsedWidth}=this.props

    const NavLink = props => {
      const {selectedKey,...prop}=props
      return (
        <Link {...prop} getProps={({isPartiallyCurrent}) => {
          if(isPartiallyCurrent)this.selectedKey=selectedKey
        }} />
      )
    };
    return (
      <Sider
        style={style}
        theme={theme}
        breakpoint={breakpoint}
        collapsedWidth={collapsedWidth}
      >
        {this.props.children}
      </Sider>
    )
  }
}

