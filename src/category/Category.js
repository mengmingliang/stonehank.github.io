import React from 'react';
import {Button, Icon} from 'antd';
import { navigate} from "@reach/router"
import {Layout} from "antd";
import TagsList from "./TagsList"
import TagsBlock from "../share-components/TagsBlock"
import Loading from "../share-components/Loading";


const { Content} = Layout;

const styles={
  defaultMargin:{margin: '24px 36px'},
  toggleRenderButton:{border: "none", background: "#eef8ff", float: "right"},
  toggleRenderIcon:{fontSize: "1.5rem", color: "#46a6ff"}
}

export default class Category extends React.Component {
  constructor(props) {
    super(props)
    const {articles,tagsEachPage,tagsRenderMode}=props
    this.state = {
      pageSize: tagsEachPage,
      contentLoading: true,
      articles: null,
      // 初始渲染模式
      tagsRenderMode:(articles && articles.tagsRenderMode) ||tagsRenderMode,
      // 初始页数
      page: 1
    }
    this.totalPage = 0
    this.toggleTagRender=this.toggleTagRender.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  toggleTagRender(){
    const {articles}=this.props
    let newTagsMode=this.state.tagsRenderMode === "card" ? "list" : "card"
    articles.tagsRenderMode=newTagsMode
    this.setState({
      tagsRenderMode: newTagsMode
    })
  }

  handlePageChange(page) {
    navigate(`/category/page/${page}`)
  }

  componentDidMount() {
    Promise.resolve().then(()=>{
      window.scrollTo(0, 0);
    })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.articles && nextProps.page === prevState.page) return null
    const {articles, page} = nextProps
    if (!articles) return null
    return {
      page: page,
      articles,
      contentLoading: false
    }
  }

  render() {
    const {articles, contentLoading, pageSize, page,tagsRenderMode} = this.state

    let renderArticles
    if (articles) {
      let keysArr = Object.keys(articles)
      this.totalPage = keysArr.length
      renderArticles = keysArr.slice((page - 1) * pageSize, page * pageSize)
    } else {
      renderArticles = null
    }
    return contentLoading
      ? <Loading loading={contentLoading}
                 render_nums={3}
                 ske_title_width={"30%"}
                 ske_para_width={"50%"}
                 ske_para_rows={3} />
      : <Content style={styles.defaultMargin}>
          <div className="clearfix">
            <Button style={styles.toggleRenderButton}
                    onClick={this.toggleTagRender}>
              <Icon type={tagsRenderMode === "list" ? "table" : "profile"} style={styles.toggleRenderIcon}/>
            </Button>
          </div>
          {tagsRenderMode === "list"
            ? <React.Fragment>
                <TagsBlock articles={articles} linkToProps={"category"} />
                <TagsList articles={articles}
                          pageSize={pageSize}
                          page={page}
                          handlePageChange={this.handlePageChange}
                          totalPage={this.totalPage}
                          renderArticles={renderArticles} />
              </React.Fragment>
             : <TagsBlock articles={articles} linkToProps={"category"} renderType={'card'}/>
            }
        </Content>


  }
}

