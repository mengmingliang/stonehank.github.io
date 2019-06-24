import React from 'react'
import {List, Divider, Row} from 'antd';
import ArticleListCard from "../share-components/ArticleListCard";
import TagsCol from "../share-components/TagsCol";


const styles = {
  divider: {fontSize: "smaller", fontWeight: "lighter"},
  card_pure_body: {padding: 12},
  summary: {marginTop: 6, fontSize: "small", opacity: '0.7'},
  card: {margin: "15px 0"},
}

export default class SearchDrawerComponent extends React.Component {


  componentDidMount(){
    this.props.startReg()
  }

  render() {

    const {matchTags, clearSearchInput,lazyRenderData,getContentDetailPath,simpleSearchProps} = this.props

    let newSingleRenderPropsOnHeader=[]
    for(let i=0;i<simpleSearchProps.length;i++){
      let cur=simpleSearchProps[i]
      let val
      if(typeof cur==="string")val=cur
      else val=cur.prop
      if(val==="title")continue
      newSingleRenderPropsOnHeader.push({val:val})
    }
    return (
      <List
        size="small">
        <Divider orientation={"left"} style={styles.divider}>标签</Divider>
        <Row type="flex"
             justify="start"
             gutter={6}>
          {matchTags.map((tag, i) => {
            return (
              <TagsCol key={i} tag={tag} linkToProps={"category"}/>
            )
          })}
        </Row>
        <Divider orientation={"left"} style={styles.divider}>文章</Divider>
        {lazyRenderData.map((item, i) => (
          <ArticleListCard key={i}
                           getContentDetailPath={getContentDetailPath}
                           bodyStyle={styles.card_pure_body}
                           style={styles.card}
                           title={<b dangerouslySetInnerHTML={{__html: item.title}}/>}
                           summary={<div style={styles.summary}
                                         dangerouslySetInnerHTML={{__html: item.matchContent}}/>}
                           beforeNavigate={clearSearchInput}
                           curPropsData={item}
                           singleRenderPropsOnHeader={newSingleRenderPropsOnHeader}
                           dangerouslyRender={true}
                           // multiRenderPropsOnHeader={[
                           //   {val:'label',ele:'tag',link:(tag)=>`${linkTo.category}/${tag}`},
                           // ]}
                           showComment={false}
          />
        ))}
      </List>
    );
  }
}