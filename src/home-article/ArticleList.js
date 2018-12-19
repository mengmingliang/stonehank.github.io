import React from 'react';
import {List,  Layout} from 'antd';
import {navigate} from "@reach/router";
import ArticleListCard from "./ArticleListCard";
import {deepEqual} from "../utils/index";
// import {linkTo} from "../routes/linkPathList";


const styles={
  summary:{marginTop: 24, fontSize: "small", opacity: '0.7'},
  list_pagi_style:{textAlign: 'center',marginBottom:"1rem"},
  card:{margin:"15px 0"},
  defaultMargin:{margin: '24px 36px'}
}


const { Content} = Layout;


export default class ArticleList extends React.Component {
  constructor() {
    super()
    this.paginationPageChange = this.paginationPageChange.bind(this)
    // this.navigateToPath=this.navigateToPath.bind(this)
  }

  paginationPageChange(page) {
    navigate(`/page/${page}`)
  }

  shouldComponentUpdate(nextProps){
    return !deepEqual(nextProps.articles,this.props.articles)
  }

  render() {

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
                pagination={listPageSetting} >
            {articles.map((item,i)=>(
              <ArticleListCard key={i}
                               cardStyle={styles.card}
                               curPropsData={item}
                               summary={<div style={styles.summary}
                                      dangerouslySetInnerHTML={{__html: item.summary || ''}}/>}
              />
            ))}
          </List>
        </Content>
      </React.Fragment>
    )
  }
}