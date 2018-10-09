import React from 'react';
import {List, Tag, Card, Skeleton, Avatar, Pagination, Layout, Menu, Breadcrumb, Icon, Affix, Row, Col} from 'antd';
import {Link, navigate} from "@reach/router";
import ArticleStatusBar from "../tools/ArticleStatusBar"
import Card_Pure from "../antd_pure/Card_Pure";
import {deepEqual} from "../utils/index";
import {linkTo} from "../routes/linkPathList";

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

const styles={
  summary:{marginTop: 24, fontSize: "small", opacity: '0.7'},
  list_pagi_style:{textAlign: 'center',marginBottom:"1rem"},
  card:{margin:"15px 0"},
  defaultMargin:{margin: '24px 36px'}
}


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

  shouldComponentUpdate(nextProps){
    return !deepEqual(nextProps.articles,this.props.articles)
  }

  render() {
    // console.log("render")
    const {articles, current, pageSize, total} = this.props
    const listPageSetting={
      style:styles.list_pagi_style,
      simple:true,
      current,
      pageSize,
      total,
      onChange:this.paginationPageChange
    }
    return (
      <React.Fragment>
        <Content style={styles.defaultMargin}>
          <List split={false}
                header={<strong>最新文章</strong>}
                pagination={listPageSetting}
          >
            {articles.map((item,i)=>(
              <Card_Pure key={i} hoverable bordered={false} style={styles.card}
                         title={item.title}
                         statusBarItem={item}
                         summary={<div style={styles.summary}
                                       dangerouslySetInnerHTML={{__html: md.render(item.summary || '')}}/>}
                    onClick={this.navigateToPath.bind(this,linkTo.articles+"/"+item.title)}
              />
            ))}
          </List>

        </Content>
      </React.Fragment>
    )
  }
}