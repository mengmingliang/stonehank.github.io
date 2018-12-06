import React from 'react';
import NavSiderContainer from "./NavSiderContainer";
import { Location } from "@reach/router";
import {parseHrefToNav} from "../utils";


export default class NavSiderWrapper extends React.PureComponent {
  render() {
    const {bio,avatar,username}=this.props
    return (
        <Location>
          {({location:{pathname}})=> {
            return <NavSiderContainer bio={bio}
                                      avatar={avatar}
                                      username={username}
                             // 找出当前路径对应的侧边栏菜单哪一个为高亮
                                      selectedKey={parseHrefToNav(pathname)} />
          }}
        </Location>
    );
  }
}
