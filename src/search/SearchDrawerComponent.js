import React from 'react'
import {List, Divider, Row} from 'antd';
import ArticleListCard from "../share-components/ArticleListCard";
import TagsCol from "../share-components/TagsCol";
import {linkTo} from "../routes/linkPathList";


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

    const {matchTags, clearSearchInput,lazyRenderData} = this.props
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
                           hoverable
                           bordered={false}
                           linkToPath={linkTo.articles+"/"+item.uniqueID}
                           bodyStyle={styles.card_pure_body}
                           style={styles.card}
                           title={<div dangerouslySetInnerHTML={{__html: item.title}}/>}
                           summary={<div style={styles.summary}
                                         dangerouslySetInnerHTML={{__html: item.matchContent}}/>}
                           beforeNavigate={clearSearchInput}
                           curPropsData={item}
                           singleRenderPropsOnHeader={[{
                             val:'createdTime',
                           }]}
                           multiRenderPropsOnHeader={[
                             {val:'label',ele:'tag',link:(tag)=>`${linkTo.category}/${tag}`},
                           ]}
                           showComment={false}
          />
        ))}
      </List>
    );
  }
}