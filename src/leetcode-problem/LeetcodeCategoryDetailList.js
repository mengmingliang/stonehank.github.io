import React from 'react';
import {List} from 'antd';

import TagHeader from "../category/TagHeader";
import ArticleListCard from "../share-components/ArticleListCard";
import {linkTo} from "../routes/linkPathList";




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
                                       <span>{item.uniqueID}、{item.title}</span>
                                     </div>
                                   }
                                   curPropsData={item}
                                   getContentDetailPath={(curPropsData)=>linkTo.myleetcode+"/problems/"+curPropsData.uniqueID}
                                   singleRenderPropsOnHeader={[{
                                     val:'difficult',
                                     ele:'tag',
                                     getClassName:difficult=>`leetcode-difficult-tags leetcode-${difficult}`
                                   }]}
                                   multiRenderPropsOnHeader={[
                                     {val:'relatedTags',ele:'tag',link:(tag)=>`${linkTo.myleetcode}/${tag}`},
                                     {val:'lang'}
                                   ]}
                                   showComment={false} />
                )} />
    )
  }
}

