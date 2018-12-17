import React,{useState,useEffect} from 'react'
import TagsBlock from "../share-components/TagsBlock";
import TagsList from "../category/TagsList";
import {Button, Icon,Layout,List} from 'antd';
import {linkTo} from "../routes/linkPathList";
import ArticleListCard from "../home-article/ArticleListCard";



const { Content} = Layout;
const styles={
  tagStyle:{width:50},
  card:{margin:"15px 0"},
  list_pagi_style:{textAlign: 'center',marginBottom:"1rem"},
}

export default class MyLeetcodeComponent extends React.Component{


  componentDidMount() {
    Promise.resolve().then(()=>{
      window.scrollTo(0, 0);
    })

  }
  render(){
    const {leetcodeRenderMode,toggleModeDataStructure,renderContent,page,pageSize,handlePageChange,totalPage}=this.props
    const listPageSetting={
      style:styles.list_pagi_style,
      // simple:true,
      current:page,
      pageSize,
      total:totalPage,
      onChange:handlePageChange
    }
    const curRenderContent=renderContent.slice((page-1)*pageSize,page*pageSize)
    return (
      <Content style={styles.defaultMargin}>
        <div className="clearfix">
          <Button style={styles.toggleRenderButton} onClick={toggleModeDataStructure.bind(null,"leetcodeRenderMode")}>
            <Icon type={leetcodeRenderMode === "list" ? "table" : "profile"} style={styles.toggleRenderIcon}/>
          </Button>
        </div>
        { leetcodeRenderMode === "list"
          ? <List split={false}
                  header={<strong>My-Leetcode</strong>}
                  pagination={listPageSetting} >
              { curRenderContent.map((item,i)=>(
                <ArticleListCard key={i}
                                 hoverable
                                 bordered={false}
                                 label={false}
                                 createdTime={false}
                                 linkToPath={linkTo.myleetcode+"/problems/"+item.frontEndId}
                                 style={styles.card}
                                 title={
                                   <div>
                                     <span>{item.frontEndId}、{item.title}</span>
                                     <span>{item.lang}</span>
                                     <span>{item.difficult}</span>
                                     <span>{item.topicTags.translatedName}</span>
                                   </div>
                                 }
                                 noCount={true}
                                 statusBarItem={item}/>
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