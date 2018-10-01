import React from 'react';
import {BackTop, Tag, Card, Skeleton, Avatar, Pagination, Layout, Menu, Breadcrumb, Icon, Affix, Row, Col} from 'antd';
// import * as blog_jsonObj from "../asset/blog-data";
import {Link, navigate} from "@reach/router";


const hljs = require('highlight.js'); // https://highlightjs.org/
const md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>';
      } catch (__) {
      }
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});
const IconText = ({type, text}) => (
  <span>
    <Icon type={type} style={{marginRight: 8}}/>
    {text}
  </span>
);

function itemRender(current, type, originalElement) {

  if (type === 'prev') {
    return <a>上一篇</a>;
  }
  if (type === 'next') {
    return <Link to="/">下一篇</Link>;
  }
  return originalElement;
}


const {Header, Content, Footer, Sider} = Layout;
const {Meta} = Card

export default class ArticleList extends React.Component {
  constructor() {
    super()
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handlePageChange(page) {
    navigate(`/page/${page}`)
  }

  render() {
    // const {listLoading}=this.state
    // const {blogList}=this.state
    const {articles, current, pageSize, total} = this.props
    console.log(this.props)
    // return listLoading ?
    //   <Skeleton active loading={listLoading} title={{width: "30%"}} paragraph={{rows: 6, width: "50%"}} /> :
    return (
      <React.Fragment>
        <Content style={{margin: '0 36px'}}>
          {articles.map((blog, i) => (
            <Link to={"/articles/"+blog.title}>
              <Card key={i} hoverable bordered={false} style={{width: "100%"}}>
                {/*<Skeleton active loading={listLoading} title={{width: "30%"}} paragraph >*/}
                <Meta style={{width: "100%"}}
                      title={blog.title}
                      description={
                        <Row type="flex" gutter="20" style={{fontWeight: 500}}>
                          <Col>{blog.createdTime}</Col>
                          <Col>
                            {blog.label.map((t, i) => {
                              return <Tag key={i}>{t}</Tag>
                            })}
                          </Col>
                          <Col style={{textAlign: "center"}}><IconText type="message" text="2"/></Col>
                        </Row>
                      }>
                </Meta>
                <div style={{marginTop: 24, fontSize: "small", opacity: '0.7'}}
                     dangerouslySetInnerHTML={{__html: md.render(blog.summary)}}/>
                {/*</Skeleton>*/}
              </Card>
            </Link>
          ))}
        </Content>
        <Footer style={{textAlign: 'center'}}>
          <Pagination simple current={current} pageSize={pageSize} total={total} onChange={this.handlePageChange}/>
        </Footer>
      </React.Fragment>
    )
  }
}