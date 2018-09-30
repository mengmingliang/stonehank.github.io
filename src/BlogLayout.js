import React from 'react';
import { Layout } from 'antd';
import './css/github.min.css'
import NavSider from "./nav/NavSider";
import Archive from "./Archive";
import Category from "./Category";
import About from "./About";
import Home from "./Home";
import { Router, } from "@reach/router";
import ArticleDetail from "./article/ArticleDetail";


const { Header} = Layout;


export default class BlogLayout extends React.Component {

  render() {
    return (
      <Layout style={{ background:"#fff",minHeight: '100vh' }}>
        <NavSider />
        <Layout style={{background:"#fff"}}>
          <Header style={{ background: '#898989', padding: 0 }} >
            FrontEnd Blogs
          </Header>
          <Router>
            <Home path="/" />
            <Archive path="archive" >
              {/*<ArchiveAtYear path="./:date" >*/}
                <ArticleDetail path="./:articleName"/>
              {/*</ArchiveAtYear>*/}
            </Archive>
            <Category path="category" />
            <About path="about" />
          </Router>
        </Layout>
      </Layout>
    );
  }
}
