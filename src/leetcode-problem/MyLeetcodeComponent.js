import React from 'react'
import TagsBlock from "../share-components/TagsBlock";
import {Button, Icon,Layout,List} from 'antd';
import ArticleListCard from "../share-components/ArticleListCard";
import SearchContainer from "../search/SearchContainer";
import defaultProps from "./listCardDefaultProps";

const { Content} = Layout;
const styles={
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
    const {leetcodeRenderMode,read_content_path,toggleModeDataStructure,renderContent,page,pageSize,handlePageChange,totalPage,toggleSorted}=this.props
    const listPageSetting={
      style:styles.list_pagi_style,
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
          ? <div>
            <SearchContainer data={renderContent}
                             id={"slide-checkbox2"}
                             getContentDetailPath={defaultProps.getContentDetailPath}
                             simpleSearchProps={['title']}
                             placeholder={"leetcode题目查询"}
                             // complicateSearchProps={[{globalProp:'content'}]}
                             read_content_path={read_content_path}
                                  />
            <List split={false}
                  header={
                    <div>
                      <Button onClick={()=>{toggleSorted('uniqueID')}}>id</Button>
                      {/*<Button onClick={()=>{toggleSorted('lang')}}>language</Button>*/}
                      <Button onClick={()=>{toggleSorted('difficultNum')}}>difficult</Button>
                    </div>
                  }
                  pagination={listPageSetting} >
              { renderContent.slice((page-1)*pageSize,page*pageSize).map((item,i)=>(
                <ArticleListCard key={i}
                                 cardStyle={styles.card}
                                 title={
                                   <div style={{display:"flex"}}>
                                     <b>{item.uniqueID}、{item.title}</b>
                                   </div>
                                 }
                                 curPropsData={item}
                                 oneRow={true}
                                 getContentDetailPath={defaultProps.getContentDetailPath}
                                 singleRenderPropsOnHeader={defaultProps.singleRenderPropsOnHeader}
                                 multiRenderPropsOnHeader={defaultProps.multiRenderPropsOnHeader}
                                 showComment={false}
                  />
                ))}
              </List>
            </div>
          : <TagsBlock articles={renderContent}
                       linkToProps={"myleetcode"}
                       showCount={true}
                       renderType={"card"} />
        }
      </Content>
    )
  }


}