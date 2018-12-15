import React from 'react';
import { List} from 'antd';
// import { navigate} from "@reach/router"
// import {linkTo} from '../routes/linkPathList'
import CardPure from "../share-components/CardPure";
import TagHeader from "./TagHeader";


const styles={
  card_pure_body:{padding:12},
  pages:{textAlign: 'center'},
  card:{margin:"8px 0"},
}


export default class TagsList extends React.Component {

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
                              <TagHeader tag={tag} />
                            }
                            dataSource={tagList}
                            renderItem={item => (
                              <CardPure hoverable bordered={false}
                                        bodyStyle={styles.card_pure_body}
                                        style={styles.card}
                                        title={item.title}
                                        statusBarItem={item}

                              />
                            )}
                      />
                    )
                  }}
            />
    )
  }
}

