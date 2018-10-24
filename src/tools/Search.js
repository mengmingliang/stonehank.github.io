import React from 'react';
import {Input, Badge, Modal, Spin} from 'antd';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import SearchDrawer from "./SearchDrawer"; // https://highlightjs.org/
import {withOutImgHTML,inHTMLTag,isMatchPrecision} from '../utils'
import SlideCheckBox from "./SlideCheckBox";

hljs.registerLanguage('javascript', javascript);
const md = require('markdown-it')({
  highlight: function (str, lang) {
    // console.log(str,lang)
    if(lang==="search-result"){
      console.log(str)
    }
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>';
      } catch (__) {
      }
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});
const confirm = Modal.confirm;
const {Search} = Input;
const styles = {
  search: {width: 256},
  slideSize: {height: 30, width: 50},
  spinWrap: {position: "absolute"},
  badge: {backgroundColor: '#b8b8b8',color: '#fff', transform: "scale(0.7)", transformOrigin: "center", fontSize: "medium"},
  searchAddon: {display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', marginLeft: -11},
  searchWrap: {display: "flex", alignSelf:"center",flex:1},
  slideCheckBox:{marginRight: -11}
}

export default class SearchContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      controlledValue: '',
      matchTags: null,
      matchArticles: null,
      drawShow: false,
      data: null,
      globalSearch: false,
      globalFetching: false,
    }
    this.globalMem = {}
    this.localMem = {}
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

  computeArticleMatch(patternValue) {
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
      let contentIsPrec=false,titleIsPrec=false
      // let titleMatch=data[i].title.toLowerCase().match(reg) || []
      let titleMatchIndex = data[i].title.toLowerCase().indexOf(patternValue)
      let markdownSummary = md.render(globalSearch ? data[i].content : data[i].summary)
      // let contentMatch=markdownSummary.toLowerCase().match(reg) || []
      let contentMatchIndex = markdownSummary.toLowerCase().indexOf(patternValue)

      let titlePrefix, titleAffix, titleFix, contentPrefix, contentAffix, contentFix
      // 存在关键字，分割(为了添加背景色)
      if (titleMatchIndex !== -1) {
        if(isMatchPrecision(patternValue,data[i].title))titleIsPrec=true
        titlePrefix = data[i].title.substr(0, titleMatchIndex)
        titleFix = data[i].title.substr(titleMatchIndex, patternValue.length)
        titleAffix = data[i].title.substr(titleMatchIndex + patternValue.length)
      }
      if (contentMatchIndex !== -1) {
        const lo = 50, hi = 100
        let contentMatchPart=markdownSummary.substring(contentMatchIndex - lo, contentMatchIndex + hi)
        let newIndex
        // 去除tag内部内容
        while(inHTMLTag(patternValue,contentMatchPart)){
          // console.log(contentMatchIndex)
          contentMatchIndex=markdownSummary.toLowerCase().indexOf(patternValue,contentMatchIndex+patternValue.length)
          if(contentMatchIndex!==-1)contentMatchPart=markdownSummary.substring(contentMatchIndex - lo, contentMatchIndex + hi)
          else break
        }
        if(contentMatchIndex===-1){continue}
        // 去除图片
        contentMatchPart = withOutImgHTML(contentMatchPart)
        // console.log(contentMatchIndex)
        if(isMatchPrecision(patternValue,contentMatchPart))contentIsPrec=true

        newIndex = contentMatchPart.toLowerCase().indexOf(patternValue)

        contentPrefix = contentMatchPart.substr(0, newIndex)
        contentFix = contentMatchPart.substr(newIndex, patternValue.length)
        contentAffix = contentMatchPart.substr(newIndex + patternValue.length)

      }

      let finalMatchTitle=titleMatchIndex===-1? data[i].title :
        `<div>${titlePrefix}<span style="background:yellow">${titleFix}</span>${titleAffix}</div>`
      if(data[i].title==="react-transition-group"){
        // console.log(titleMatchIndex,titleIsPrec,contentMatchIndex,contentIsPrec)
      }
      let finalMatchContent=contentMatchIndex===-1? markdownSummary.substr(0, 100):
        `<div>${contentPrefix}<span style="background:yellow">${contentFix}</span>${contentAffix}</div>`
      let resultObj={
        title:finalMatchTitle,
        matchContent:finalMatchContent,
        sha:data[i].sha
      }
      // 搜索优先度
      // 1. titlePre && contentPre
      // 2. titlePre
      // 3. contentPre
      // 4. title && summary
      // 5. title
      // 6. summary

      if(titleIsPrec && contentIsPrec) matchResultObj._first.push(resultObj)
      else if(titleIsPrec) matchResultObj._second.push(resultObj)
      else if(contentIsPrec) matchResultObj._third.push(resultObj)
      else if (titleMatchIndex !== -1 && contentMatchIndex !== -1) matchResultObj._forth.push(resultObj)
      else if (titleMatchIndex !== -1) matchResultObj._fifth.push(resultObj)
      else if (contentMatchIndex !== -1) matchResultObj._sixth.push(resultObj)
    }
    // console.timeEnd(1)
    let result = matchResultObj._first.concat(matchResultObj._second,matchResultObj._third,matchResultObj._forth,matchResultObj._fifth, matchResultObj._sixth)
    globalSearch ? this.globalMem[patternValue] = result : this.localMem[patternValue] = result
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
    const {controlledValue, matchTags, matchArticles} = this.state
    if ((matchArticles && matchArticles.length > 0) || (matchTags && matchTags.length > 0)) {
      this.setState({
        drawShow: true
      })
    } else if (controlledValue) {
      this.onChangeHandle(null, controlledValue)
    }
  }

  onChangeHandle(ev, v) {
    const value = v || ev.target.value
    const trimValue = value.trim().toLowerCase()
    let matchTags = this.computeTagsMatch(trimValue)
    let matchArticles = this.computeArticleMatch(trimValue)
    this.setState({
      matchTags: matchTags,
      matchArticles: matchArticles,
      controlledValue: value,
      drawShow: matchArticles.length > 0 || matchTags.length > 0
    })
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
    if (!globalSearch && !data[0].content) this.showConfirm()
    else {
      this.setState(prevState => ({
        globalSearch: !prevState.globalSearch,
      }))
    }
  }

  fetchGlobal() {
    const {data} = this.state
    let fetchQueue = []
    for (let i = 0; i < data.length; i++) {
      fetchQueue[i] = import(
        /* webpackMode: "lazy-once" */
        /* webpackExclude: /_blog-data\.json$/ */
        /* webpackChunkName: "global-search" */
        `../asset/${data[i].sha}.json`)
        .then(obj => {
          data[i].content = obj.content
        })
    }
    Promise.all(fetchQueue).then(() => {
      this.setState({
        globalFetching: false,
        data: data
      })
    })
  }

  showConfirm() {
    confirm({
      title: '确定使用全局搜索？',
      content: '全局搜索会一次性加载所有内容，将会消耗额外流量',
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

  render() {
    const {controlledValue, matchTags, matchArticles, drawShow, globalFetching, globalSearch} = this.state
    return (
      <React.Fragment>
        <div style={styles.searchWrap}>
          <Search
            addonBefore={
              <span style={styles.searchAddon}>
              <Badge count={"?"}
                     title={"局部搜索只搜素标签，标题和摘要，无额外加载.\n全局搜索搜索全部内容，会有额外加载."}
                     style={styles.badge}/>
              <SlideCheckBox
                style={styles.slideCheckBox}
                checkedChildren={
                  <span>
                    全局
                    <span style={styles.spinWrap}>
                      <Spin spinning={globalFetching}/>
                    </span>
                  </span>
                }
                unCheckedChildren={
                  <span>
                    <span style={styles.spinWrap}>
                      <Spin spinning={globalFetching}/>
                    </span>
                    局部
                  </span>
                }
                size={styles.slideSize}
                checkBoxChange={this.toggleGlobalSearch}
                isDisabled={globalFetching}
                isChecked={globalSearch}
                id={"slide-checkbox1"}/>
              </span>
            }
            placeholder="tag/title/keywords"
            onChange={this.onChangeHandle}
            onSearch={this.onSearchHandle}
            enterButton
            value={controlledValue}
            style={styles.search}
          />
        </div>
        <SearchDrawer matchTags={matchTags}
                      searchKeyword={controlledValue}
                      matchArticles={matchArticles}
                      drawShow={drawShow}
                      clearSearchInput={this.clearSearchInput}
                      handleDrawerClose={this.handleDrawerClose}/>
      </React.Fragment>
    )
  }
}

