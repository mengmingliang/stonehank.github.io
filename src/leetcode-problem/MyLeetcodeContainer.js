import React from 'react'
import Loading from "../share-components/Loading";
import {objSortBy,objGroupBy} from '../utils'
import MyLeetcodeComponent from "./MyLeetcodeComponent";
// import {shallowEqual} from '../utils'

import '../css/leetcode.css'

const styles={
  defaultMargin:{margin: '24px 36px'},
}

export default class MyLeetcodeContainer extends React.Component{
  constructor(props){
    super(props)
    this.state={
      pageSize: 20,
      // 初始页数
      page: 1,
      renderContent:null,
      curSortedKey:'uniqueID',
      curSortedAsc:true
    }
    this.sortData=this.sortData.bind(this)
    this.handlePageChange=this.handlePageChange.bind(this)
    this.toggleSorted=this.toggleSorted.bind(this)
    this.toggleModeDataStructure=this.toggleModeDataStructure.bind(this)
  }
  groupData(groupKey,priorityProps){
    const {initLeetcodeData}=this.props
    let renderContent= objGroupBy(initLeetcodeData,groupKey,priorityProps)
    this.setState({
      renderContent
    })
  }

  toggleSorted(nextSortedKey){
    const {curSortedKey,curSortedAsc}=this.state
    let nextAsc=true
    if(curSortedKey===nextSortedKey )nextAsc=!curSortedAsc
    this.sortData(nextSortedKey,nextAsc)
  }

  sortData(nextSortedKey,nextAscend){
    const {initLeetcodeData}=this.props
    let renderContent= objSortBy(initLeetcodeData,nextSortedKey,nextAscend)
    this.setState({
      renderContent,
      curSortedKey:nextSortedKey,
      curSortedAsc:nextAscend
    })
  }
  handlePageChange(page) {
    this.setState({page})
  }

  toggleModeDataStructure(rendermodeProp){
    const {toggleRenderMode,leetcodeRenderMode}=this.props
    const {curSortedKey,sortedAsc}=this.props
    if(leetcodeRenderMode==="list"){
      this.groupData('relatedTags')
    }else{
      this.sortData(curSortedKey,sortedAsc)
    }
    toggleRenderMode(rendermodeProp)
  }


  shouldComponentUpdate(prevProps,prevState){
    const {curSortedKey,renderContent,page,curSortedAsc}=this.state
    return prevProps.leetcodeRenderMode!==this.props.leetcodeRenderMode
      || !renderContent
      || page!==prevState.page
      || curSortedAsc!==prevState.curSortedAsc
      || curSortedKey!==prevState.curSortedKey

  }

  componentDidUpdate(){
    const {leetcodeRenderMode,initLeetcodeData}=this.props
    if(!initLeetcodeData)return
    if(!leetcodeRenderMode)return
    if(this.state.renderContent)return
    let renderContent
    if(leetcodeRenderMode==="list")
      renderContent =objSortBy(initLeetcodeData,['uniqueID'],true)
    else
      renderContent=objGroupBy(initLeetcodeData,'relatedTags')
    this.totalPage=renderContent.length
    this.setState({
      renderContent
    })

  }


  componentDidMount(){
    const {leetcodeRenderMode,initLeetcodeData,fetchLeetcodeList}=this.props
    if(!initLeetcodeData){
      fetchLeetcodeList()
    }else{
      let renderContent
      if(leetcodeRenderMode==="list")
        renderContent =objSortBy(initLeetcodeData,['uniqueID'],true)
      else
        renderContent=objGroupBy(initLeetcodeData,'relatedTags')
      this.totalPage=renderContent.length
      this.setState({
        renderContent
      })
    }

  }
  render(){
    const {renderContent,page,pageSize,curSortedKey,curSortedAsc}=this.state
    const {initLeetcodeData,leetcodeRenderMode}=this.props

    return(
      <div style={styles.defaultMargin}>
        {
          renderContent
            ? <MyLeetcodeComponent page={page}
                                   pageSize={pageSize}
                                   initData={initLeetcodeData}
                                   toggleSorted={this.toggleSorted}
                                   totalPage={this.totalPage}
                                   curSortedKey={curSortedKey}
                                   curSortedAsc={curSortedAsc}
                                   leetcodeRenderMode={leetcodeRenderMode}
                                   handlePageChange={this.handlePageChange}
                                   toggleModeDataStructure={this.toggleModeDataStructure}
                                   renderContent={renderContent}/>
            : <Loading loading={true}
                       render_nums={1}
                       ske_title_width={"30%"}
                       ske_para_width={"50%"}
                       ske_para_rows={8} />
        }
      </div>
    )
  }
}


