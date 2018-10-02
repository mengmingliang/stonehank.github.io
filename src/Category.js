import React, { Component } from 'react';
import {Pagination,Drawer,Button,Anchor ,Skeleton,Collapse,List,Row,Col,Tag,Icon} from 'antd';
import {Link,navigate} from "@reach/router"
import ArticleStatusBar from "./ArticleStatusBar"
import {Layout} from "antd/lib/index";


// const {Link : AntdLink} =Anchor
const Panel = Collapse.Panel;

const {Header, Content, Footer, Sider} = Layout;


export default class Category extends React.Component {
  constructor(){
    super()
    this.state={
      pageSize:5,
      contentLoading:true,
      articles:null,
      page:1,
      drawerVisible:true
    }
    this.totalPage=0
    this.drawerToggle=this.drawerToggle.bind(this)
    this.handlePageChange=this.handlePageChange.bind(this)
  }
  handlePageChange(page) {
    navigate(page)
  }
  drawerToggle(){
    this.setState(prevState=>({
      drawerVisible:!prevState.drawerVisible
    }))
  }
  // shouldComponentUpdate(a,b,c,d){
  //   console.log(a,b,c,d)
  //   return true
  // }
  static getDerivedStateFromProps(nextProps,prevState){
    console.log(nextProps.page,prevState.page)
    if(prevState.articles && nextProps.page===prevState.page)return null
    const {articles,page}=nextProps
    if(!articles)return null
    return {
      page:page,
      articles,
      contentLoading:false
    }
  }

  render() {
    // console.log(this.props)
    const {articles,contentLoading,pageSize,page,drawerVisible}=this.state
    // const renderArticles=articles?Object.keys(articles).slice((page-1)*pageSize,page*pageSize):null
    let renderArticles
    if(articles){
      let keysArr=Object.keys(articles)
      this.totalPage=keysArr.length
      renderArticles=keysArr.slice((page-1)*pageSize,page*pageSize)
    }else{
      renderArticles=null
    }
    // console.log(articles)
    return contentLoading ?
      <div>
        <Skeleton active loading={contentLoading} title={{width: "30%"}} paragraph={{rows: 3, width: "50%"}}/>
        <Skeleton active loading={contentLoading} title={{width: "30%"}} paragraph={{rows: 3, width: "50%"}}/>
        <Skeleton active loading={contentLoading} title={{width: "30%"}} paragraph={{rows: 3, width: "50%"}}/>
      </div> :
      <React.Fragment>
      <Content>
        <Drawer
          title="Basic Drawer"
          placement="top"
          closable={false}
          onClose={this.drawerToggle}
          visible={drawerVisible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
        {renderArticles.map((key,i)=>{
        let curLabel=key,labelList=articles[key]
        return (
          <List key={i} size="small"
                split={false}
                style={{margin:"0 36px"}}
                header={
                  <Link to={`/category/${curLabel}`}>
                    <Button style={{background:"#001529",color:"#fff"}}>{curLabel}</Button>
                  </Link>
                }
                dataSource={labelList}
            renderItem={item => (
              <List.Item  style={{margin:"0 0 12px 24px",background:"#fcfcfc"}}>
                  <List.Item.Meta
                    title={<Link to={`/articles/${item.title}`}><div>{item.title}</div></Link>}
                    description={
                      <ArticleStatusBar article={item}/>
                    }
                  />
              </List.Item>
            )}
          />
        )
      })
        }
      </Content>
        <Footer style={{textAlign: 'center'}}>
          <Pagination current={+page} pageSize={pageSize} total={this.totalPage} onChange={this.handlePageChange}/>
        </Footer>
      </React.Fragment>
  }
}

