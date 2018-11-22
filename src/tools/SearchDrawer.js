import React from 'react';
import { List,Divider,Drawer,Row,Input } from 'antd';
// import {navigate} from "@reach/router"
// import {linkTo} from "../routes/linkPathList";
import CardPure from "./CardPure";
import TagsCol from "./TagsCol";



const styles={
  divider:{fontSize:"smaller",fontWeight:"lighter" },
  card_pure_body:{padding:12},
  summary:{marginTop: 6, fontSize: "small", opacity: '0.7'},
  card:{margin:"15px 0"},
}

export default class SearchDrawer extends React.Component {
  // constructor() {
  //   super()
  //   this.navigateToPath=this.navigateToPath.bind(this)
  // }

  shouldComponentUpdate(props){
    const {matchArticles,matchTags,drawShow,searchKeyword,controlledValue}=this.props
    return searchKeyword!==props.searchKeyword ||
      controlledValue!==props.controlledValue ||
      drawShow!==props.drawShow ||
      !!matchArticles !== !!props.matchArticles ||
      !!matchTags !== !!props.matchTags ||
      ( matchArticles && props.matchArticles && matchArticles.length !== props.matchArticles.length ) ||
      (matchTags && props.matchTags && matchTags.length !== props.matchTags.length)
  }
  // navigateToPath(path,e){
  //   const {clearSearchInput}=this.props
  //   clearSearchInput()
  //   navigate(path)
  // }
  render() {
    const {matchTags,matchArticles,drawShow,handleDrawerClose,searchKeyword,onChange,clearSearchInput,controlledValue}=this.props
    const canShow=matchArticles && handleDrawerClose
    return (
      canShow ?
      <Drawer
        width={256}
        title={<Input addonBefore="搜索" value={controlledValue} onChange={onChange}/>}
        placement={"right"}
        onClose={handleDrawerClose}
        visible={drawShow}
      >
        <List
          size="small"
        >
          <Divider orientation={"left"} style={styles.divider}>标签</Divider>
          <Row type="flex"
               justify="start"
               gutter={6}
          >
            {matchTags.map((tag,i) => {
              return (
                <TagsCol key={i} tag={tag}/>
              )
            })}
          </Row>

          <Divider orientation={"left"} style={styles.divider}>文章</Divider>
          {matchArticles.map((item,i)=>(
            <CardPure key={i} hoverable
                      bordered={false}
                      style={styles.card}
                      bodyStyle={styles.card_pure_body}
                      statusBarItem={item}
                      noCount={true}
                      title={<div dangerouslySetInnerHTML={{__html: item.title}}/>}
                      summary={<div style={styles.summary}
                                     dangerouslySetInnerHTML={{__html: item.matchContent}}/>}
                      beforeNavigate={clearSearchInput}
            />
          ))}
        </List>
      </Drawer> :
        null
    )
  }
}

