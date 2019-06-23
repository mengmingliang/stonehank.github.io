import React from 'react'
import TagsBlock from "../share-components/TagsBlock";
import {Button, Icon,Layout,List} from 'antd';
import ArticleListCard from "../share-components/ArticleListCard";
import defaultProps from "./listCardDefaultProps";

const { Content} = Layout;
const styles={
  card:{margin:"0"},
  cardBody:{padding:"10px"},
  list_pagi_style:{textAlign: 'center',marginBottom:"1rem"},
  tag:{ lineHeight: '1rem'},
  sortIcon:{flex:1,textAlign:"right",fontSize: '1.2rem'}
}
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_866706_ebkjjbarabt.js',
});


export default class MyLeetcodeComponent extends React.Component{


  componentDidMount() {
    Promise.resolve().then(()=>{
      window.scrollTo(0, 0);
    })

  }
  render(){
    const {leetcodeRenderMode,toggleModeDataStructure,renderContent,
      page,pageSize,handlePageChange,totalPage,toggleSorted,curSortedKey,curSortedAsc}=this.props
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
            <List split={false}
                  header={
                    <div>
                      <div style={{display:'flex',justifyContent:'space-between',padding:"0 5px"}}>
                        <Button style={{flex:2,padding:0}} size={"small"} onClick={()=>{toggleSorted('uniqueID')}}>
                          <div style={{ display:'flex',padding:"0 2px"}}>
                            <span style={{flex:1,textAlign:"left"}}>序号</span>
                            <IconFont type={(curSortedKey==="uniqueID" && curSortedAsc)
                              ? "icon-sort-invertedorder-copy" : (curSortedKey==="uniqueID" && !curSortedAsc)
                                ? "icon-sort-invertedorder" : "icon-sort-invertedorder1"} style={styles.sortIcon}/>
                          </div>
                        </Button>
                        <div style={{flex:5,display:'flex'}}>
                          <Button style={{flexBasis: 100,padding:0}} size={"small"} onClick={()=>{toggleSorted('difficultNum')}}>
                            <div style={{ display:'flex',padding:"0 2px"}}>
                              <span style={{flex:1,textAlign:"left"}}>难度</span>
                              <IconFont type={(curSortedKey==="difficultNum" && curSortedAsc)
                                ? "icon-sort-invertedorder-copy" : (curSortedKey==="difficultNum" && !curSortedAsc)
                                  ? "icon-sort-invertedorder" : "icon-sort-invertedorder1"} style={styles.sortIcon}/>
                            </div>
                          </Button>
                          <div style={{flex:3,display:'flex'}}>
                            <Button style={{flex:1,padding:0}} size={"small"} onClick={()=>{toggleSorted('relatedTags')}}>
                              <div style={{ display:'flex',padding:"0 2px"}}>
                                <span style={{flex:1,textAlign:"left"}}>话题</span>
                                <IconFont type={(curSortedKey==="relatedTags" && curSortedAsc)
                                  ? "icon-sort-invertedorder-copy" : (curSortedKey==="relatedTags" && !curSortedAsc)
                                    ? "icon-sort-invertedorder" : "icon-sort-invertedorder1"} style={styles.sortIcon}/>
                              </div>
                            </Button>
                            <span style={{flex:1}}>语言</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  }
                  pagination={listPageSetting} >
              { renderContent.slice((page-1)*pageSize,page*pageSize).map((item,i)=>(
                <ArticleListCard key={i}
                                 cardStyle={styles.card}
                                 bodyStyle={styles.cardBody}
                                 title={
                                   <div style={{display:"flex"}}>
                                     <b>{item.title}</b>
                                   </div>
                                 }
                                 curPropsData={item}
                                 oneRow={true}
                                 getContentDetailPath={defaultProps.getContentDetailPath}
                                 singleRenderPropsOnHeader={defaultProps.singleRenderPropsOnHeader}
                                 multiRenderPropsOnHeader={defaultProps.multiRenderPropsOnHeader}
                                 // showComment={true}
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