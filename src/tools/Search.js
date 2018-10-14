import React from 'react';
import { Input} from 'antd';
import hljs from 'highlight.js'
import SearchDrawer from "./SearchDrawer"; // https://highlightjs.org/


const md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

const Search = Input.Search;
const styles={
  search:{ width: 256 }
}

export default class NotFound extends React.Component {
  constructor(){
    super()
    this.state={
      controlledValue:'',
      matchTags:null,
      matchArticles:null,
      drawShow:false
    }
    this.memory={}
    this.onChangeHandle=this.onChangeHandle.bind(this)
    this.onSearchHandle=this.onSearchHandle.bind(this)
    this.computeTagsMatch=this.computeTagsMatch.bind(this)
    this.computeArticleMatch=this.computeArticleMatch.bind(this)
    this.handleDrawerClose=this.handleDrawerClose.bind(this)
    this.clearSearchInput=this.clearSearchInput.bind(this)
  }

  handleDrawerClose(){
    this.setState({
      drawShow:false
    })
  }
  computeArticleMatch(patternValue){
    if(patternValue==="")return []
    if(this.memory[patternValue])return this.memory[patternValue]
    const {data}=this.props
    let matchResultObj={
      top:[],middle:[],bottom:[]
    }
    // ,reg=new RegExp(patternValue)
    // console.time(1)
    for(let i=0;i<data.length;i++){
      // let titleMatch=data[i].title.toLowerCase().match(reg) || []
      let titleMatchIndex=data[i].title.toLowerCase().indexOf(patternValue)
      let markdownSummary=md.render(data[i].summary)
      // let contentMatch=markdownSummary.toLowerCase().match(reg) || []
      let contentMatchIndex=markdownSummary.toLowerCase().indexOf(patternValue)
      let titlePrefix,titleAffix,titleFix,contentPrefix,contentAffix,contentFix
      // 存在关键字，分割(为了添加背景色)
      if(titleMatchIndex!==-1){
        titlePrefix=data[i].title.substr(0,titleMatchIndex)
        titleFix=data[i].title.substr(titleMatchIndex,patternValue.length)
        titleAffix=data[i].title.substr(titleMatchIndex+patternValue.length)
      }
      if(contentMatchIndex!==-1){
        contentPrefix=markdownSummary.substr(contentMatchIndex-50,50)
        contentFix=markdownSummary.substr(contentMatchIndex,patternValue.length)
        contentAffix=markdownSummary.substr(contentMatchIndex+patternValue.length,70)
      }
      // 搜索优先度
      // 1. title && summary
      // 2. title
      // 3. summary
      if(titleMatchIndex!==-1 && contentMatchIndex!==-1){
        matchResultObj.top.push({
          title:`<div>${titlePrefix}<span style="background:yellow">${titleFix}</span>${titleAffix}</div>`,
          matchContent:`<div>${contentPrefix}<span style="background:yellow">${contentFix}</span>${contentAffix}</div>`,
          sha:data[i].sha
        })
      }else if(titleMatchIndex!==-1){
        matchResultObj.middle.push({
          title:`<div>${titlePrefix}<span style="background:yellow">${titleFix}</span>${titleAffix}</div>`,
          matchContent:markdownSummary.substr(0,100),
          sha:data[i].sha
        })
      }else if(contentMatchIndex!==-1){
        matchResultObj.bottom.push({
          title:data[i].title,
          matchContent:`<div>${contentPrefix}<span style="background:yellow">${contentFix}</span>${contentAffix}</div>`,
          sha:data[i].sha
        })
      }
    }
    // console.timeEnd(1)
    let result=matchResultObj.top.concat(matchResultObj.middle,matchResultObj.bottom)
    this.memory[patternValue]=result
    return result
  }

  computeTagsMatch(patternValue){
    if(patternValue==="")return []
    const {tagsList}=this.props
    let matchResult=[]
    for(let i=0;i<tagsList.length;i++){
      let isMatch=tagsList[i].includes(patternValue)
      if(isMatch)matchResult.push(tagsList[i])
    }
    return matchResult
  }

  onSearchHandle(){
    // 如果有结果显示，没有则无
    const {controlledValue,matchTags,matchArticles}=this.state
    if((matchArticles && matchArticles.length >0) || (matchTags && matchTags.length >0)){
      this.setState({
        drawShow:true
      })
    }else if(controlledValue){
      this.onChangeHandle(null,controlledValue)
    }
  }

  onChangeHandle(ev,v){
    const value=v || ev.target.value
    const trimValue=value.trim().toLowerCase()
    let matchTags=this.computeTagsMatch(trimValue)
    let matchArticles=this.computeArticleMatch(trimValue)
    this.setState({
      matchTags:matchTags,
      matchArticles:matchArticles,
      controlledValue:value,
      drawShow:matchArticles.length>0 || matchTags.length>0
    })
  }

  clearSearchInput(){
    this.setState({
      matchTags:null,
      matchArticles:null,
      controlledValue:'',
      drawShow:false
    })
  }

  render() {

    const {controlledValue,matchTags,matchArticles,drawShow}=this.state

    return (
     <React.Fragment>
       <Search
         placeholder="tag/title/keywords"
         onChange={this.onChangeHandle}
         onSearch={this.onSearchHandle}
         enterButton
         value={controlledValue}
         style={styles.search}
       />
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

