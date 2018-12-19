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
    const {leetcodeRenderMode,toggleModeDataStructure,renderContent,page,pageSize,handlePageChange,totalPage}=this.props
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
                  header={<div><button>id</button><button>language</button><button>difficult</button></div>}
                  pagination={listPageSetting} >
              { renderContent.slice((page-1)*pageSize,page*pageSize).map((item,i)=>(
                <ArticleListCard key={i}
                                 hoverable
                                 bordered={false}
                                 label={false}
                                 createdTime={false}
                                 linkToPath={linkTo.myleetcode+"/problems/"+item.frontEndId}
                                 style={styles.card}
                                 title={
                                   <div style={{display:"flex"}}>
                                     <span>{item.frontEndId}、{item.translatedTitle}</span>
                                     {/*<div  style={{display:'flex',justifyContent:'start',flex:1}}>*/}
                                       {/*{item.topicTags.map((tag,i)=>*/}
                                           {/*<TagLight key={i} tagStyle={styles.tag}>{tag}</TagLight>*/}
                                       {/*)}*/}
                                      {/*</div>*/}
                                     {/*{item.lang.map((lang,i)=>*/}
                                       {/*<TagLight key={i} tagStyle={styles.tag}>{lang}</TagLight>*/}
                                     {/*)}*/}
                                     {/*<div style={{flexBasis:"7rem",textAlign:"center"}}>*/}
                                       {/*<TagLight className={`leetcode-difficult-tags leetcode-${item.difficult}`}>{item.difficult}</TagLight>*/}
                                     {/*</div>*/}
                                    </div>
                                 }
                                 noCount={true}
                                 statusBarItem={item}
                                 singleRenderPropsOnHeader={[{
                                   val:'difficult',
                                   ele:'tag',
                                   getClassName:difficult=>`leetcode-difficult-tags leetcode-${difficult}`
                                 }]}
                                 multiRenderPropsOnHeader={[
                                   {val:'topicTags',ele:'tag',link:(tag)=>`${linkTo.myleetcode}/${tag}`},
                                   {val:'lang',ele:'tag'}
                                 ]}
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