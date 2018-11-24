import React from 'react';
import { Drawer,Input } from 'antd';
import SearchDrawerListLazyScroll from './SearchDrawerListLazyScroll'


const wrapperClassName='search-drawer'

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
    const {matchTags,matchArticles,drawShow,handleDrawerClose,onChange,clearSearchInput,controlledValue,searchKeyword}=this.props
    const canShow=matchArticles && handleDrawerClose
    return (
      canShow ?
      <Drawer
        width={256}
        title={<Input addonBefore="搜索" value={controlledValue} onChange={onChange}/>}
        placement={"right"}
        onClose={handleDrawerClose}
        visible={drawShow}
        wrapperClassName={wrapperClassName}
      >
        <SearchDrawerListLazyScroll matchArticles={matchArticles}
                                    matchTags={matchTags}
                                    searchKeyword={searchKeyword}
                                    clearSearchInput={clearSearchInput}
                                    wrapperClassName={wrapperClassName}
                                    canShow={canShow} />
      </Drawer> :
        null
    )
  }
}

