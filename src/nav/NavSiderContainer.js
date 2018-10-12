import React from 'react';
import NavSider from "../nav/NavSider";
import { Location } from "@reach/router";
import {parseHrefToNav} from "../utils";


export default class NavSiderContainer extends React.PureComponent {
  render() {
    const {bio,avatar,username}=this.props
    return (
        <Location>
          {({location:{pathname}})=> {
            parseHrefToNav(pathname)
          return <NavSider bio={bio} avatar={avatar} username={username}
                           selectedKey={parseHrefToNav(pathname)} />
        }}
        </Location>
    );
  }
}
