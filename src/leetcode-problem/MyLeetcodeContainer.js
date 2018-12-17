import React,{useState,useEffect} from 'react'
import Loading from "../share-components/Loading";
import {objSortBy,objGroupBy} from '../utils'
import MyLeetcodeComponent from "./MyLeetcodeComponent";
// import {navigate} from "@reach/router/index";


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
      initState:null
    }
    this.sortData=this.sortData.bind(this)
    this.fetchResource=this.fetchResource.bind(this)
    this.handlePageChange=this.handlePageChange.bind(this)
    this.toggleModeDataStructure=this.toggleModeDataStructure.bind(this)
  }
  groupData(groupKey,priorityProps){
    const {initData}=this.state
    let renderContent= objGroupBy(initData,groupKey,priorityProps)
    this.setState({
      renderContent
    })
  }

  sortData(sortKey,ascend){
    const {initData}=this.state
    let renderContent= objSortBy(initData,sortKey,ascend)
    this.setState({
      renderContent
    })
  }
  handlePageChange(page) {
    this.setState({page})
    // navigate(`/myleetcode/page/${page}`)
  }

  toggleModeDataStructure(rendermodeProp){
    const {toggleRenderMode,leetcodeRenderMode}=this.props
    if(leetcodeRenderMode==="list"){
      this.groupData('topicTags','translatedName')
    }else{
      this.sortData('frontEndId',true)
    }
    toggleRenderMode(rendermodeProp)
  }

  fetchResource(){
    const {read_leetcode_path}=this.props
    return import(
      /* webpackChunkName: "leetcode-list" */
      `../${read_leetcode_path}/_leetcode-list.json`
      )
  }
  componentDidMount(){
    const {leetcodeRenderMode}=this.props
    this.fetchResource().then((module)=>{
      let data=module.default
      let renderContent
      if(leetcodeRenderMode==="list")
        renderContent =objSortBy(data,['frontEndId'],true)
      else
        renderContent=objGroupBy(data,'topicTags','translatedName')
      this.totalPage=renderContent.length
      this.setState({
        renderContent,
        initData:data
      })
    })
  }
  render(){
    const {renderContent,page,pageSize,initData}=this.state
    const {leetcodeRenderMode}=this.props
    // console.log(renderContent)
    return(
      <div style={styles.defaultMargin}>
        {
          renderContent
            ? <MyLeetcodeComponent page={page}
                                   pageSize={pageSize}
                                   initData={initData}
                                   totalPage={this.totalPage}
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


// export default function MyLeetcodeContainer(props){
//   const [renderContent,setRenderContent]=useState(null)
//   const [initData,setData]=useState(null)
//
//   useEffect(()=>{
//     fetchResource().then((module)=>{
//       let data=module.default
//       let renderContent=objGroupBy(data,'topicTags','translatedName')
//       setData(data)
//       setRenderContent(renderContent)
//     })
//   },[])
//   function sortData(sortKey,ascend){
//     let renderContent= objSortBy(initData,sortKey,ascend)
//     setRenderContent(renderContent)
//   }
//
//   function fetchResource(){
//     const {read_leetcode_path}=props
//     return import(
//       /* webpackChunkName: "leetcode-list" */
//       `../${read_leetcode_path}/_leetcode-list.json`
//       )
//   }
//   console.log(renderContent)
//   return (
//     renderContent
//       ? <MyLeetcodeComponent renderContent={renderContent}/>
//       : <Loading loading={true}
//                  render_nums={1}
//                  ske_title_width={"30%"}
//                  ske_para_width={"50%"}
//                  ske_para_rows={8} />
//   )
// }