import React from 'react';
import { BackTop,Tag,Card,Skeleton,Avatar, Pagination,Layout,Menu, Breadcrumb, Icon,Affix,Row,Col } from 'antd';

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

export default class ArticleDetail extends React.Component{
  render(){
    const {blog}=this.props
    return(
      <article style={{padding: 24, background: '#fff', minHeight: 360}}>
        <header>
          <div style={{textAlign: "center"}} dangerouslySetInnerHTML={{__html: md.render(`## ${blog.title}`)}}/>
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
        </header>
        <div style={{marginTop:24}} dangerouslySetInnerHTML={{__html: md.render(blog.content)}}/>
        <footer style={{margin: "0 auto"}}>
          <BackTop />
        </footer>
      </article>
    )
  }
}