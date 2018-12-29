import React from 'react';
import { Modal,message} from 'antd';
import SearchDrawer from "./SearchDrawer";
import {inHTMLTag,searchPrecision,ignoreInterceptTags} from '../utils/index'
import SearchConfirmSize from "./SearchConfirmSize";
import SearchInputComponent from "./SearchInputComponent";
// import SlideCheckBox from "../tools/SlideCheckBox";

// const SearchComponent=SearchComponentHOC(SlideCheckBox)

const confirm = Modal.confirm;

export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      controlledValue: '',
      searchKeyword:'',
      matchTags: null,
      matchArticles: null,
      drawShow: false,
      data: null,
      globalSearch: false,
      globalFetching: false
    }
    // 储存全局搜索结果
    this.globalMem = {}
    // 储存局部搜索结果
    this.localMem = {}
    // 记录上一次更新前是否全局状态
    this.lastIsGlobal=false
    this.onChangeHandle = this.onChangeHandle.bind(this)
    this.onSearchHandle = this.onSearchHandle.bind(this)
    this.computeTagsMatch = this.computeTagsMatch.bind(this)
    this.computeArticleMatch = this.computeArticleMatch.bind(this)
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
    this.clearSearchInput = this.clearSearchInput.bind(this)
    this.toggleGlobalSearch = this.toggleGlobalSearch.bind(this)
    this.fetchGlobal = this.fetchGlobal.bind(this)
    this.showConfirm = this.showConfirm.bind(this)
  }

  handleDrawerClose() {
    this.setState({
      drawShow: false
    })
  }

  // no throttle:  150ms, 300ms
  // 4x: 900ms, 2000ms

  // pre to Html
  // no throttle: 121ms, 215ms
  // 4x 433ms, 647ms
  // patternValue 已经转换为小写
  computeArticleMatch(patternValue) {
    // console.time(2)
    if (patternValue === "") return []
    const {data, globalSearch} = this.state
    const {simpleSearchProps,complicateSearchProps}=this.props
    if (globalSearch && this.globalMem[patternValue]) {
      return this.globalMem[patternValue]
    }
    if (!globalSearch && this.localMem[patternValue]) {
      return this.localMem[patternValue]
    }

    let finalMathResultArr=[]
    function searchCore(pattern,content,precisionMatchArr,propIdx,fromIndex){
      let matchIndex,precisionIndex=searchPrecision(pattern,content,fromIndex)
      if(precisionIndex===null)matchIndex= -1
      else if(precisionIndex!==-1){precisionMatchArr[propIdx]=1;matchIndex=precisionIndex}
      else matchIndex = content.indexOf(patternValue,fromIndex)
      return matchIndex
    }

    function simpleSplit(obj,curProp,matchIdx,patternValue){
      let prefix=null,match=null,affix=null
      if (matchIdx === -1) return [prefix,match,affix]
      prefix = obj[curProp].substr(0, matchIdx)
      match = obj[curProp].substr(matchIdx, patternValue.length)
      affix = obj[curProp].substr(matchIdx + patternValue.length)
      return [prefix,match,affix]
    }
    function complicateSplit(obj,curProp,precisionMatchArr,propIdx,matchIdx,patternValue){
      let prefix=null,match=null,affix=null
      if (matchIdx !== -1) {
        const lo = 50, hi = 100
        let contentMatchPart=obj[curProp].toLowerCase().substring(matchIdx - lo, matchIdx + hi)
        // 去除tag内部内容
        while(inHTMLTag(patternValue,contentMatchPart.toLowerCase(),Math.min(matchIdx,lo))){
          precisionMatchArr[propIdx]=0
          matchIdx=searchCore(patternValue,obj[curProp].toLowerCase(),precisionMatchArr,propIdx,matchIdx+patternValue.length)
          if(matchIdx!==-1)contentMatchPart=obj[curProp].substring(matchIdx - lo, matchIdx + hi)
          else break
        }
        // console.log(matchIdx,obj[curProp])
        if(matchIdx===-1)return [prefix,match,affix,matchIdx]
        // console.log(matchIdx,lo)
        prefix = obj[curProp].substring(matchIdx-lo, matchIdx)
        match = obj[curProp].substr(matchIdx, patternValue.length)
        affix = obj[curProp].substr(matchIdx + patternValue.length,hi)
      }
      return [prefix,match,affix,matchIdx]
    }

    // 添加颜色html
    function addMatchColor(prefix,match,affix){
      // console.log(prefix,match,affix)
      prefix=ignoreInterceptTags(prefix)
      return `<span>${prefix}<span style="background:yellow">${match}</span>${affix}</span>`
    }


    for (let index = 0; index < data.length; index++) {

      let curData=data[index]
      let precisionMatchArr=Array(simpleSearchProps?simpleSearchProps.length:0 +
        complicateSearchProps?complicateSearchProps.length:0).fill(0)
      let weightPoint=0
      let curResultObj={uniqueID:curData['uniqueID']}
      let normalMatchArr=[]
      if(simpleSearchProps){
        for(let i=0;i<simpleSearchProps.length;i++){
          let curProp,initProp
          let curProps=simpleSearchProps[i]
          if(typeof curProps==="string"){
            curProp=curProps
            initProp=curProps
          }
          else{
            let {prop,globalProp}=curProps
            if(globalProp && globalSearch)curProp=globalProp
            else curProp=prop
            initProp=prop
          }
          let lowerCase=curData[curProp].toLowerCase()
          let matchIdx=searchCore(patternValue,lowerCase,precisionMatchArr,i)
          let [prefix,match,affix]=simpleSplit(curData,curProp,matchIdx,patternValue)
          let finalMatchDate= matchIdx===-1
            ? curData[curProp]
            : addMatchColor(prefix,match,affix)
          if(matchIdx!==-1){
            normalMatchArr[i]=1
          }else{
            normalMatchArr[i]=0
          }
          curResultObj=Object.assign(curResultObj,{[initProp]:finalMatchDate})
        }
      }
      if(complicateSearchProps){
        for(let j=0;j<complicateSearchProps.length;j++){
          let complicateProp
          let complicateProps=complicateSearchProps[j]
          if(typeof complicateProps==="string")complicateProp=complicateProps
          else{
            let {prop,globalProp}=complicateProps
            if(globalProp && globalSearch)complicateProp=globalProp
            else complicateProp=prop
          }
          if(!complicateProp)continue
          let lowerCase=curData[complicateProp].toLowerCase()
          let matchIdx=searchCore(patternValue,lowerCase,precisionMatchArr,simpleSearchProps.length+j)

          let [prefix,match,affix,newMatchIdx]=complicateSplit(curData,complicateProp,precisionMatchArr,simpleSearchProps.length+j,matchIdx,patternValue)

          let finalMatchDate= newMatchIdx===-1
            ? curData[complicateProp].substring(0,100)
            : addMatchColor(prefix,match,affix)


          if(newMatchIdx!==-1){
            normalMatchArr[simpleSearchProps.length+j]=1
          }else{
            normalMatchArr[simpleSearchProps.length+j]=0
          }
          curResultObj=Object.assign(curResultObj,{matchContent:finalMatchDate})
        }
      }

      let curWeight=10000
      let normalWeight=500
      // console.log(precisionMatchArr)
      for(let i=0;i<precisionMatchArr.length;i++){
        if(precisionMatchArr[i]===1){
          weightPoint+=curWeight/Math.pow(2,i)
        }
      }
      for(let i=0;i<normalMatchArr.length;i++){
        if(normalMatchArr[i]===1){
          weightPoint+=normalWeight/Math.pow(2,i)
        }
      }
      if(weightPoint!==0) finalMathResultArr.push([weightPoint,curResultObj])


    }
    let result=finalMathResultArr.sort((a,b)=>b[0]-a[0]).map(arr=>arr[1])
    globalSearch ? this.globalMem[patternValue] = result : this.localMem[patternValue] = result
    // console.timeEnd(2)
    // console.log(result,finalMathResultArr)
    return result
  }

  computeTagsMatch(patternValue) {
    if (patternValue === "") return []
    const {tagsList} = this.props
    let matchResult = []
    if(!Array.isArray(tagsList))return matchResult
    for (let i = 0; i < tagsList.length; i++) {
      let isMatch = tagsList[i].includes(patternValue)
      if (isMatch) matchResult.push(tagsList[i])
    }
    return matchResult
  }

  onSearchHandle() {
    // 如果有结果显示，没有则无
    const {controlledValue, matchTags, matchArticles,globalSearch} = this.state
    if(matchArticles && matchTags && this.lastIsGlobal===globalSearch){
      this.checkIfNeedShowNotFound(matchArticles,matchTags,controlledValue)
      if(matchArticles.length > 0 ||  matchTags.length > 0){
        this.setState({
          drawShow: true
        })
      }
    }else if (controlledValue) {
      this.onChangeHandle(null, controlledValue)
    }
  }

  checkIfNeedShowNotFound(matchArticles,matchTags,searchWords){
    if(matchArticles.length===0 && matchTags.length===0 && searchWords!=='')
      message.info(`找不到 ${this.state.controlledValue} `,1)
  }

  // throttling 300ms
  onChangeHandle(ev, v) {
    // 每次查找时先改变上一次global状态
    this.lastIsGlobal=this.state.globalSearch
    const value = v || ev.target.value
    this.setState({
      controlledValue: value,
    })
    clearTimeout(this.timer)
    this.timer=setTimeout(()=>{
      const trimValue = value.trim().toLowerCase()
      let matchTags=this.computeTagsMatch(trimValue)
      let matchArticles = this.computeArticleMatch(trimValue)
      this.checkIfNeedShowNotFound(matchArticles,matchTags,value)
      this.setState({
        matchTags: matchTags,
        matchArticles: matchArticles,
        searchKeyword: value,
        drawShow: matchArticles.length > 0 || matchTags.length > 0
      })
    },300)
  }

  clearSearchInput() {
    this.setState({
      matchTags: null,
      matchArticles: null,
      controlledValue: '',
      drawShow: false
    })
  }

  toggleGlobalSearch() {
    const {globalSearch, data} = this.state
    if (!globalSearch && data && !data[0].content) this.showConfirm()
    else {
      this.setState(prevState => ({
        globalSearch: !prevState.globalSearch,
      }))
    }
  }

  fetchGlobal() {
    const {data} = this.state
    const {read_content_path}=this.props
    let fetchQueue = []

    for (let i = 0; i < data.length; i++) {
      if(read_content_path.includes('leetcode')){
        fetchQueue[i] = import(
          /* webpackMode: "lazy-once" */
          /* webpackInclude: /\.json$/ */
          /* webpackExclude: /_.*-list\.json$/ */
          /* webpackChunkName: "leetcode-global-search" */
          `../asset/leetcode/${data[i].uniqueID}.json`)
          .then(({default:obj}) => {
            data[i].content = obj.content
          })
      }else if(read_content_path.includes("blog")){
        fetchQueue[i] = import(
          /* webpackMode: "lazy-once" */
          /* webpackInclude: /\.json$/ */
          /* webpackExclude: /_.*-list\.json$/ */
          /* webpackChunkName: "blog-global-search" */
          `../asset/blog/${data[i].uniqueID}.json`)
          .then(({default:obj}) => {
            data[i].content = obj.content
          })
      }
    }
    Promise.all(fetchQueue).then(() => {
      this.setState({
        globalFetching: false,
        data: data
      })
    }).catch(e=>{
      console.warn(e)
      this.setState({
        globalFetching: false,
        data: data
      })
    })
  }

  showConfirm() {
    confirm({
      title: '确定使用全局搜索？',
      content: <SearchConfirmSize  />,
      onOk: () => {
        this.fetchGlobal()
        this.setState(prevState => ({
          globalSearch: !prevState.globalSearch,
          globalFetching: true
        }))
      },
      onCancel() {
      },
    });
  }

  componentDidUpdate() {
    const {data} = this.props
    if (this.state.data || !data) return
    this.setState({
      data: data
    })
  }

  componentWillUnmount(){
    clearTimeout(this.timer)
    this.timer=null
    this.globalMem = null
    this.localMem = null
  }

  render() {
    const {controlledValue,searchKeyword, matchTags, matchArticles, drawShow, globalFetching, globalSearch} = this.state
    const {simpleSearchProps,getContentDetailPath,id,needGlobalMode,placeholder}=this.props
    return (
      <React.Fragment>
        <SearchInputComponent globalFetching={globalFetching}
                              globalSearch={globalSearch}
                              id={id}
                              needGlobalMode={needGlobalMode}
                              placeholder={placeholder}
                              controlledValue={controlledValue}
                              onChangeHandle={this.onChangeHandle}
                              onSearchHandle={this.onSearchHandle}
                              toggleGlobalSearch={this.toggleGlobalSearch} />
        <SearchDrawer matchTags={matchTags}
                      controlledValue={controlledValue}
                      searchKeyword={searchKeyword}
                      matchArticles={matchArticles}
                      drawShow={drawShow}
                      getContentDetailPath={getContentDetailPath}
                      simpleSearchProps={simpleSearchProps}
                      onChange={this.onChangeHandle}
                      clearSearchInput={this.clearSearchInput}
                      handleDrawerClose={this.handleDrawerClose}/>
      </React.Fragment>
    )
  }
}

