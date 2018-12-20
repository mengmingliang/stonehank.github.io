import React from 'react';
import {List} from 'antd';
import TagHeader from "./TagHeader";
import ArticleListCard from "../share-components/ArticleListCard";


const styles={
  card_pure_body:{padding:12},
  card:{margin:"8px 0"},
  list:{margin: '24px 36px'},
  icon:{color: "#46a6ff",marginRight:4},
}


export default class CategoryDetailList extends React.Component {

  componentDidMount(){
    this.props.startReg()
  }

  render() {
    const {tagName,lazyRenderData}=this.props
    return (
        <List size="small"
              split={false}
              style={styles.list}
              header={
                <TagHeader tag={tagName} />
              }
              dataSource={lazyRenderData}
              renderItem={item => (
                <ArticleListCard bodyStyle={styles.card_pure_body}
                                 cardStyle={styles.card}
                                 curPropsData={item}
                />
              )}
        />
    )
  }
}

