import React from 'react';
import { BackTop,Tag,Card,Skeleton,Avatar, Pagination,Layout,Menu, Breadcrumb, Icon,Affix,Row,Col } from 'antd';
import * as blog_jsonObj from "../asset/blog-data";

const hljs = require('highlight.js'); // https://highlightjs.org/
const md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8}} />
    {text}
  </span>
);

function itemRender(current, type, originalElement) {
  if (type === 'prev') {
    return <a>上一篇</a>;
  } if (type === 'next') {
    return <a>下一篇</a>;
  }
  return originalElement;
}


const { Header, Content, Footer, Sider } = Layout;
const {Meta}=Card

export default class ArticleList extends React.Component{
  constructor(){
    super()
    this.fetchBlogContent=this.fetchBlogContent.bind(this)
    this.state={
      listLoading:true
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
    this.fetchBlogContent()
  }
  render(){
    const {listLoading}=this.state
    const {blogList}=this.state
    return listLoading ?
      <Skeleton active loading={listLoading} title={{width: "30%"}} paragraph={{rows: 6, width: "50%"}} /> :
      <React.Fragment>
      <Content style={{margin: '0 36px'}}>
        {blogList.slice(0,3).map(blog=>(
        <Card  hoverable bordered={false} style={{ width: "100%" }}>
          <Skeleton active loading={listLoading} title={{width: "30%"}} paragraph >
            <Meta style={{width:"100%"}}
                  title={blog.title}
                  description={
                    <Row type="flex" gutter="20">
                      <Col>{blog.createdTime}</Col>
                      <Col>
                        {blog.label.map((t,i) => {
                          return (
                            <Tag key={i}>{t}</Tag>
                          )
                        })}
                      </Col>
                      <Col style={{textAlign: "center"}}><IconText type="message" text="2"/></Col>
                    </Row>
                  }>
            </Meta>
            <div style={{marginTop:24,fontSize:"small"}} dangerouslySetInnerHTML={{__html: md.render(blog.summary)}}/>
          </Skeleton>
        </Card>
          ))}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <Pagination simple defaultCurrent={1} pageSize={3} total={10}  />
      </Footer>
    </React.Fragment>
  }
}