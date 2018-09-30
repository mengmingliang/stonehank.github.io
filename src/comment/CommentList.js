import React from 'react';
import { BackTop,Tag,Card,Skeleton,Avatar, Pagination,Layout,Menu, Breadcrumb, Icon,Affix,Row,Col } from 'antd';
import * as blog_jsonObj from "../asset/blog-data";






const { Header, Content, Footer, Sider } = Layout;
const {Meta}=Card

export default class CommentList extends React.Component{
  constructor(){
    super()
    this.fetchBlogContent=this.fetchBlogContent.bind(this)
    this.state={
      commentLoading:true
    }
  }
  fetchBlogContent(){
    let blogList=[]
    for(let key in blog_jsonObj){
      if(key==="version")continue
      blogList.push(blog_jsonObj[key])
    }
    this.setState({
      listLoading:false,
      blogList
    })
  }
  componentDidMount(){
    // this.fetchBlogContent()
  }
  render() {
    const {commentLoading}=this.state
    return (
      <aside style={{  padding: '30px' }}>
        <Card  hoverable bordered={false} style={{ width: "100%" }}>
          <Skeleton loading={commentLoading} avatar title={{width:"20%"}} active>
            <Meta style={{width:"100%",display:"flex",flexFlow:"row"}}
                  avatar={<Avatar style={{ width: 50,height: 50}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={"stonehank_fsdn"}
                  description={"2018-3-4 16:11"}
            />
            <div style={{width:"100%",marginTop:20,textAlign:"left"}}>
              "this is very long comment body this is very long comment body this is very long comment body" +
              "this is very long comment body this is very long comment body this is very long comment bodythis is very long comment body" +
              "this is very long comment bodythis is very long comment bodythis is very long comment bodythis is very long comment body"
            </div>
          </Skeleton>
        </Card>
      </aside>
    )
  }
}