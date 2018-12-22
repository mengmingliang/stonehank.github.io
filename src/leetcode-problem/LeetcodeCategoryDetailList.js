import React from 'react';
import {List} from 'antd';

import TagHeader from "../category/TagHeader";
import ArticleListCard from "../share-components/ArticleListCard";
import defaultProps from "./listCardDefaultProps";




const styles={
  card_pure_body:{padding:12},
  card:{margin:"8px 0"},
  list:{margin: '24px 36px'},
  icon:{color: "#46a6ff",marginRight:4},
}


export default class LeetcodeCategoryDetailList extends React.Component {

  componentDidMount(){
    this.props.startReg()
  }

  render() {
    const {lazyRenderData,tagName}=this.props
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
                                   title={
                                     <div style={{display:"flex"}}>
                                       <b>{item.uniqueID}、{item.title}</b>
                                     </div>
                                   }
                                   curPropsData={item}
                                   getContentDetailPath={defaultProps.getContentDetailPath}
                                   singleRenderPropsOnHeader={defaultProps.singleRenderPropsOnHeader}
                                   multiRenderPropsOnHeader={defaultProps.multiRenderPropsOnHeader}
                                   showComment={false} />
                )} />
    )
  }
}

