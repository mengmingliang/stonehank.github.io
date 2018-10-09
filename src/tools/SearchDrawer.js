import React from 'react';
import { List,Divider,Drawer,Card,Row } from 'antd';
import Tag_Light from "./Tag_Light";
import {navigate} from "@reach/router"
import {linkTo} from "../routes/linkPathList";
import Card_Pure from "../antd_pure/Card_Pure";
import Tags_Col from "./Tags_Col";

const {Meta} = Card



const styles={
  summary:{marginTop: 6, fontSize: "small", opacity: '0.7'},
  list_pagi_style:{textAlign: 'center',marginBottom:"1rem"},
  card:{margin:"15px 0"},
  defaultMargin:{margin: '24px 36px'}
}

export default class SearchDrawer extends React.Component {
  constructor() {
    super()
    this.navigateToPath=this.navigateToPath.bind(this)
  }

  navigateToPath(path,e){
    const {clearSearchInput}=this.props
    // if(e.target.className.includes('tag'))return
    clearSearchInput()
    navigate(path)
  }
  render() {
    const {matchTags,matchArticles,drawShow,handleDrawerClose,searchKeyword,clearSearchInput}=this.props
    const canShow=matchArticles && handleDrawerClose
    return (
      canShow ?
      <Drawer
        width={256}
        title={`搜索：${searchKeyword}`}
        placement={"right"}
        onClose={handleDrawerClose}
        visible={drawShow}
      >
        <List
          size="small"
        >
          <Divider orientation={"left"} style={{fontSize:"smaller",fontWeight:"lighter" }}>标签</Divider>
          <Row type="flex"
               justify="start"
               gutter={6}
          >
            {matchTags.map((tag,i) => {
              return (
                <Tags_Col key={i} tag={tag}/>
              )
            })}
          </Row>

          <Divider orientation={"left"} style={{fontSize:"smaller",fontWeight:"lighter" }}>文章</Divider>
          {matchArticles.map((item,i)=>(
            <Card_Pure key={i} hoverable
                       bordered={false}
                       style={styles.card}
                       bodyStyle={{padding:12}}
                       title={<div dangerouslySetInnerHTML={{__html: item.title}}/>}
                       summary={<div style={styles.summary}
                                     dangerouslySetInnerHTML={{__html: item.matchContent}}/>}
                       onClick={this.navigateToPath.bind(this,linkTo.articles+"/"+item.rawTitle)}
            />
          ))}
        </List>
      </Drawer> :
        null
    )
  }
}

