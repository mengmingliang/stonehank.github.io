import React from 'react';
import {List, Tag, Card, Skeleton, Avatar, Pagination, Layout, Menu, Breadcrumb, Icon, Affix, Row, Col} from 'antd';
// import * as blog_jsonObj from "../asset/blog-data";
import {Link, navigate} from "@reach/router";
import ArticleStatusBar from "../ArticleStatusBar"

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




const {Header, Content, Footer, Sider} = Layout;
const {Meta} = Card

export default class ArticleList extends React.Component {
  constructor() {
    super()
    this.paginationPageChange = this.paginationPageChange.bind(this)
    this.navigateToPath=this.navigateToPath.bind(this)
  }

  paginationPageChange(page) {
    navigate(`/page/${page}`)
  }
  navigateToPath(path,e){
    if(e.target.className.includes('tag'))return
    navigate(path)
  }
  render() {
    // const {listLoading}=this.state
    // const {blogList}=this.state
    const {articles, current, pageSize, total} = this.props
    // console.log(this.props)
    // return listLoading ?
    //   <Skeleton active loading={listLoading} title={{width: "30%"}} paragraph={{rows: 6, width: "50%"}} /> :
    return (
      <React.Fragment>
        <Content style={{margin: '24px 36px'}}>
          <List split={false}
                header={<strong>最新文章</strong>}
                pagination={{
                  style:{textAlign: 'center',marginBottom:"1rem"},
                  simple:true,
                  current,
                  pageSize,
                  total,
                  onChange:this.paginationPageChange
                }}
                dataSource={articles}
                renderItem={(item,i) => (
                  <List.Item>
                    <Card hoverable bordered={false} style={{width: "100%"}}
                          onClick={this.navigateToPath.bind(this,"/articles/"+item.title)}
                    >
                      <Meta style={{width: "100%"}}
                            title={item.title}
                            description={
                              <ArticleStatusBar article={item}/>
                            }>
                      </Meta>
                      {/*<Link to={"/articles/"+item.title}>*/}
                        <div style={{marginTop: 24, fontSize: "small", opacity: '0.7'}}
                             dangerouslySetInnerHTML={{__html: md.render(item.summary)}}/>
                      {/*</Link>*/}
                    </Card>
                  </List.Item>
                )}
          />

        </Content>
        {/*<Footer style={{textAlign: 'center'}}>*/}
          {/*<Pagination simple current={current} pageSize={pageSize} total={total} onChange={this.handlePageChange}/>*/}
        {/*</Footer>*/}
      </React.Fragment>
    )
  }
}