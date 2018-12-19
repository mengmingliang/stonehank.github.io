import React from 'react'
import TagsBlock from "../share-components/TagsBlock";
import {Button, Icon,Layout,List} from 'antd';
import {linkTo} from "../routes/linkPathList";
import ArticleListCard from "../home-article/ArticleListCard";
// import TagLight from "../share-components/TagLight";
// import { Router,Location } from "@reach/router";
// import MyLeetcodeDetail from '../share-components/ArticleDetailComponent'

const { Content} = Layout;
const styles={
  tagStyle:{width:50},
  card:{margin:"0"},
  list_pagi_style:{textAlign: 'center',marginBottom:"1rem"},
  tag:{ lineHeight: '1rem'}
}

export default class MyLeetcodeComponent extends React.Component{


  componentDidMount() {
    Promise.resolve().then(()=>{
      window.scrollTo(0, 0);
    })

  }
  render(){
    const {leetcodeRenderMode,toggleModeDataStructure,renderContent,page,pageSize,handlePageChange,totalPage,toggleSorted}=this.props
    const listPageSetting={
      style:styles.list_pagi_style,
      // simple:true,
      current:page,
      pageSize,
      total:totalPage,
      onChange:handlePageChange
    }
    return (
      <Content style={styles.defaultMargin}>
        <div className="clearfix">
          <Button style={styles.toggleRenderButton} onClick={toggleModeDataStructure.bind(null,"leetcodeRenderMode")}>
            <Icon type={leetcodeRenderMode === "list" ? "table" : "profile"} style={styles.toggleRenderIcon}/>
          </Button>
        </div>
        { leetcodeRenderMode === "list"
          ? <List split={false}
                  header={<div><button onClick={()=>{toggleSorted('difficultNum')}}>id</button><button>language</button><button>difficult</button></div>}
                  pagination={listPageSetting} >
              { renderContent.slice((page-1)*pageSize,page*pageSize).map((item,i)=>(
                <ArticleListCard key={i}
                                 style={styles.card}
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
                                   {val:'lang',ele:'tag'}
                                 ]}
                                 showComment={false}
                />
                ))}
            </List>
          : <TagsBlock articles={renderContent}
                       linkToProps={"myleetcode"}
                       gutter={60}
                       showCount={true}
                       tagStyle={styles.tagStyle}
                       renderType={"card"} />
        }
      </Content>
    )
  }


}