import React from 'react';
import { List, Tag, Icon} from 'antd';
import {Link, navigate} from "@reach/router"
import {linkTo} from '../routes/linkPathList'
import Card_Pure from "../antd_pure/Card_Pure";

const styles={
  card_pure_body:{padding:12},
  pages:{textAlign: 'center'},
  icon:{color: "#46a6ff"},
  card:{margin:"8px 0"},
}


export default class TagsList extends React.Component {
  constructor() {
    super()
    this.navigateToPath=this.navigateToPath.bind(this)
  }

  navigateToPath(path,e){
    if(e.target.className.includes('tag'))return
    navigate(path)
  }
  render() {
    const {articles, pageSize, page,handlePageChange,totalPage,renderArticles} = this.props
    return (
            <List split={false}
                  pagination={{
                    style: styles.pages,
                    current: +page,
                    pageSize,
                    total: totalPage,
                    onChange: handlePageChange
                  }}
                  dataSource={renderArticles}
                  renderItem={(key, i) => {
                    const tag = key, tagList = articles[key]
                    return (
                      <List key={i}
                            size="small"
                            split={false}
                            header={
                              <strong>
                                <Icon type="tag" style={styles.icon} />
                                <Link to={`${linkTo.category}/${tag}`}>
                                  <Tag>{tag}</Tag>
                                </Link>
                              </strong>
                            }
                            dataSource={tagList}
                            renderItem={item => (
                              <Card_Pure hoverable bordered={false}
                                         bodyStyle={styles.card_pure_body}
                                         style={styles.card}
                                         title={item.title}
                                         statusBarItem={item}
                                         onClick={this.navigateToPath.bind(this,linkTo.articles+"/"+item.title)}
                              />
                            )}
                      />
                    )
                  }}
            />
    )
  }
}

