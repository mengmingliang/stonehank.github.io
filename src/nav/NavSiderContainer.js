import React from 'react';
import NavSider from "../nav/NavSider";
import { Location } from "@reach/router";
import {parseHrefToNav} from "../utils";


export default class NavSiderContainer extends React.Component {
  render() {
    return (
        <Location>
          {({location:{pathname}})=> {
            parseHrefToNav(pathname)
          return <NavSider selectedKey={parseHrefToNav(pathname)} />
        }}
        </Location>
    );
  }
}
