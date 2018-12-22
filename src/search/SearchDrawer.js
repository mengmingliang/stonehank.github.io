import React from 'react';
import { Drawer,Input } from 'antd';
import ListLazyScrollHOC from "../share-components/ListLazyScrollHOC";
import SearchDrawerComponent from "./SearchDrawerComponent";


const wrapperClassName='search-drawer'
const SearchScrollComponentLazyScroll=ListLazyScrollHOC(SearchDrawerComponent)


export default class SearchDrawer extends React.Component {
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

  render() {
    // console.log("searchDrawer render")
    const {
      matchTags,
      matchArticles,
      drawShow,
      handleDrawerClose,
      onChange,
      clearSearchInput,
      controlledValue,
      searchKeyword,
      getContentDetailPath,
      simpleSearchProps}=this.props
    const canShow=matchArticles && handleDrawerClose
    return (
      canShow
        ? <Drawer width={256}
                  title={
                    <Input addonBefore="搜索"
                           value={controlledValue}
                           onChange={onChange}/>
                  }
                  placement={"right"}
                  onClose={handleDrawerClose}
                  visible={drawShow}
                  wrapperClassName={wrapperClassName} >
            <SearchScrollComponentLazyScroll allData={matchArticles}
                                             getContentDetailPath={getContentDetailPath}
                                             simpleSearchProps={simpleSearchProps}
                                             wrapperEle={()=>document.getElementsByClassName(wrapperClassName)[0].getElementsByClassName("ant-drawer-wrapper-body")[0]}
                                             contentEle={()=>document.getElementsByClassName(wrapperClassName)[0].getElementsByClassName("ant-drawer-body")[0]}
                                             matchTags={matchTags}
                                             keyword={searchKeyword}
                                             clearSearchInput={clearSearchInput}
                                             canShow={canShow} />
          </Drawer>
        : null
    )
  }
}

