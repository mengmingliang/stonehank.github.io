import React from 'react';
import { Modal,message} from 'antd';
import SearchDrawer from "./SearchDrawer";
import {inHTMLTag,searchPrecision} from '../utils/index'
import SearchConfirmSize from "./SearchConfirmSize";
import SearchComponent from "./SearchComponentHOC";

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
    if (globalSearch && this.globalMem[patternValue]) {
      return this.globalMem[patternValue]
    }
    if (!globalSearch && this.localMem[patternValue]) {
      return this.localMem[patternValue]
    }
    let matchResultObj = {
      _first:[],_second:[],_third:[],_forth: [], _fifth: [], _sixth: []
    }
    for (let i = 0; i < data.length; i++) {
      let isPrec={
        content:false,
        title:false,
        date:false
      }

      let markdownSummary = globalSearch ? data[i].content : data[i].summary
      let markdownTitle = data[i].title
      let markdownCreatedTime=data[i].createdTime
      let lowerCaseTitle=markdownTitle.toLowerCase()
      let lowerCaseSummary=markdownSummary.toLowerCase()
      let lowerCaseDate=markdownCreatedTime.toLowerCase()


      function searchCore(pattern,content,isPrecName,fromIndex){
        let matchIndex,precisionIndex=searchPrecision(pattern,content,fromIndex)
        if(precisionIndex===null)matchIndex= -1
        else if(precisionIndex!==-1){isPrec[isPrecName]=true;matchIndex=precisionIndex}
        else matchIndex = content.indexOf(patternValue,fromIndex)
        return matchIndex
      }

      let titleMatchIndex=searchCore(patternValue,lowerCaseTitle,'title'),
        contentMatchIndex=searchCore(patternValue,lowerCaseSummary,'content'),
        dateMatchIndex=searchCore(patternValue,lowerCaseDate,'date')

      let titlePrefix, titleAffix, titleFix, contentPrefix, contentAffix, contentFix, datePrefix, dateAffix, dateFix
      // 存在关键字，分割(为了添加背景色)
      if(dateMatchIndex !== -1){
        datePrefix = data[i].createdTime.substr(0, dateMatchIndex)
        dateFix = data[i].createdTime.substr(dateMatchIndex, patternValue.length)
        dateAffix = data[i].createdTime.substr(dateMatchIndex + patternValue.length)
      }

      if (titleMatchIndex !== -1) {
        titlePrefix = data[i].title.substr(0, titleMatchIndex)
        titleFix = data[i].title.substr(titleMatchIndex, patternValue.length)
        titleAffix = data[i].title.substr(titleMatchIndex + patternValue.length)
      }
      if (contentMatchIndex !== -1) {
        const lo = 50, hi = 100
        let contentMatchPart=lowerCaseSummary.substring(contentMatchIndex - lo, contentMatchIndex + hi)
        // 去除tag内部内容
        while(inHTMLTag(patternValue,contentMatchPart.toLowerCase(),Math.min(contentMatchIndex,lo))){
            isPrec['content']=false
            contentMatchIndex=searchCore(patternValue,lowerCaseSummary,'content',contentMatchIndex+patternValue.length)
            if(contentMatchIndex!==-1)contentMatchPart=markdownSummary.substring(contentMatchIndex - lo, contentMatchIndex + hi)
            else break
        }
        if(contentMatchIndex===-1){continue}

        contentPrefix = markdownSummary.substring(contentMatchIndex-lo, contentMatchIndex)
        contentFix = markdownSummary.substr(contentMatchIndex, patternValue.length)
        contentAffix = markdownSummary.substr(contentMatchIndex + patternValue.length,hi)
      }

      // 添加颜色html
      function addMatchColor(prefix,match,affix){
        return `<span>${prefix}<span style="background:yellow">${match}</span>${affix}</span>`
      }

      let finalMatchDate=
        dateMatchIndex===-1
          ? data[i].createdTime
          : addMatchColor(datePrefix,dateFix,dateAffix)


      let finalMatchTitle=
        titleMatchIndex===-1
          ? data[i].title
          : addMatchColor(titlePrefix,titleFix,titleAffix)

      let finalMatchContent=
        contentMatchIndex===-1
          ? markdownSummary.substr(0, 100)
          : addMatchColor(contentPrefix,contentFix,contentAffix)

      let resultObj={
        title:finalMatchTitle,
        matchContent:finalMatchContent,
        uniqueID:data[i].uniqueID,
        createdTime:finalMatchDate
      }
      // 搜索优先度
      // 1. titlePre && contentPre && datePre
      // 2. titlePre || datePre
      // 3. contentPre
      // 4. title && summary && date
      // 5. title || date
      // 6. summary

      let titleIsPrec=isPrec.title,contentIsPrec=isPrec.content,dateIsPrec=isPrec.date

      if(titleIsPrec && contentIsPrec && dateIsPrec) matchResultObj._first.push(resultObj)
      else if(titleIsPrec || dateIsPrec) matchResultObj._second.push(resultObj)
      else if(contentIsPrec) matchResultObj._third.push(resultObj)
      else if (titleMatchIndex !== -1 && contentMatchIndex !== -1 && dateMatchIndex !== -1) matchResultObj._forth.push(resultObj)
      else if (titleMatchIndex !== -1 || dateMatchIndex !== -1) matchResultObj._fifth.push(resultObj)
      else if (contentMatchIndex !== -1) matchResultObj._sixth.push(resultObj)
    }
    let result = matchResultObj._first.concat(matchResultObj._second,matchResultObj._third,matchResultObj._forth,matchResultObj._fifth, matchResultObj._sixth)
    globalSearch ? this.globalMem[patternValue] = result : this.localMem[patternValue] = result
    // console.timeEnd(2)
    // console.log(time)
    // console.log(this.globalMem,this.localMem)
    return result
  }

  computeTagsMatch(patternValue) {
    if (patternValue === "") return []
    const {tagsList} = this.props
    let matchResult = []
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
    const {read_blog_path}=this.props
    let fetchQueue = []
    for (let i = 0; i < data.length; i++) {
      fetchQueue[i] = import(
        /* webpackMode: "lazy-once" */
        /* webpackInclude: /\.json$/ */
        /* webpackExclude: /_blog-data\.json$/ */
        /* webpackChunkName: "global-search" */
        `../${read_blog_path}/${data[i].uniqueID}.json`)
        .then(({default:obj}) => {
          data[i].content = obj.content
        })
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
  }

  render() {
    const {controlledValue,searchKeyword, matchTags, matchArticles, drawShow, globalFetching, globalSearch} = this.state
    return (
      <React.Fragment>
        <SearchComponent globalFetching={globalFetching}
                         globalSearch={globalSearch}
                         controlledValue={controlledValue}
                         onChangeHandle={this.onChangeHandle}
                         onSearchHandle={this.onSearchHandle}
                         toggleGlobalSearch={this.toggleGlobalSearch} />
        <SearchDrawer matchTags={matchTags}
                      controlledValue={controlledValue}
                      searchKeyword={searchKeyword}
                      matchArticles={matchArticles}
                      drawShow={drawShow}
                      onChange={this.onChangeHandle}
                      clearSearchInput={this.clearSearchInput}
                      handleDrawerClose={this.handleDrawerClose}/>
      </React.Fragment>
    )
  }
}

