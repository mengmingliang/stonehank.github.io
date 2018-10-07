

import 'jsdom-global/register'
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import NavSider from "../nav/NavSider";
import { mount,shallow } from 'enzyme';
import {parseHrefToNav} from "../utils";

configure({ adapter: new Adapter() });

it('default selectedKey should be /home', () => {
  let pathname="/notFound"
  let wrapper = shallow(
    <NavSider  selectedKey={parseHrefToNav(pathname)}/>
  );
  wrapper=wrapper.setProps({"selectedKey":parseHrefToNav(pathname)})
  expect(wrapper.state("selectedKey")).toBe("/home")
});

it('the selectedKey should be change', () => {
  let pathname="/category/page/2"
  let wrapper = shallow(
    <NavSider  selectedKey={parseHrefToNav(pathname)}/>
  );
  expect(wrapper.state("selectedKey")).toBe("/category");
  pathname="/archive"
  wrapper=wrapper.setProps({"selectedKey":parseHrefToNav(pathname)})
  expect(wrapper.state("selectedKey")).toBe("/archive")
});