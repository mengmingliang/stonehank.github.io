import React from 'react';
import { Input,Switch,Badge,Modal} from 'antd';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import SearchDrawer from "./SearchDrawer"; // https://highlightjs.org/
import {withOutImgHTML} from '../utils'
import SlideCheckBox from "./SlideCheckBox";

hljs.registerLanguage('javascript', javascript);
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
const confirm = Modal.confirm;
const {Search,Group} = Input;
const styles={
  search:{ width: 256 }
}

export default class SearchContainer extends React.Component {
  constructor(){
    super()
    this.state={
      controlledValue:'',
      matchTags:null,
      matchArticles:null,
      drawShow:false,
      data:null,
      globalSearch:false,
      globalFetching:false,
    }
    this.globalMem={}
    this.localMem={}
    this.onChangeHandle=this.onChangeHandle.bind(this)
    this.onSearchHandle=this.onSearchHandle.bind(this)
    this.computeTagsMatch=this.computeTagsMatch.bind(this)
    this.computeArticleMatch=this.computeArticleMatch.bind(this)
    this.handleDrawerClose=this.handleDrawerClose.bind(this)
    this.clearSearchInput=this.clearSearchInput.bind(this)
    this.toggleGlobalSearch=this.toggleGlobalSearch.bind(this)
    this.fetchGlobal=this.fetchGlobal.bind(this)
    this.showConfirm=this.showConfirm.bind(this)
  }

  handleDrawerClose(){
    this.setState({
      drawShow:false
    })
  }
  computeArticleMatch(patternValue){
    if(patternValue==="")return []
    const {data,globalSearch}=this.state
    if(globalSearch && this.globalMem[patternValue] ){
      // console.log("glo mem")
      return this.globalMem[patternValue]
    }
    if(!globalSearch && this.localMem[patternValue] ){
      // console.log("loc mem")
      return this.localMem[patternValue]
    }
    let matchResultObj={
      top:[],middle:[],bottom:[]
    }
    // ,reg=new RegExp(patternValue)
    // console.time(1)
    for(let i=0;i<data.length;i++){
      // let titleMatch=data[i].title.toLowerCase().match(reg) || []
      let titleMatchIndex=data[i].title.toLowerCase().indexOf(patternValue)
      let markdownSummary=md.render(globalSearch?data[i].content:data[i].summary)
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
        const lo=50,hi=100
        // console.log(markdownSummary)
        markdownSummary=withOutImgHTML(patternValue,markdownSummary.substring(contentMatchIndex-lo,contentMatchIndex+hi))
        // console.log(markdownSummary)
        // console.log(patternValue.length)
        let newIndex=markdownSummary.toLowerCase().indexOf(patternValue)
        // console.log(newIndex)
        // console.log(patternValue,markdownSummary.substr(contentMatchIndex+lo,patternValue.length+hi))
        contentPrefix=markdownSummary.substr(0,newIndex)
        contentFix=markdownSummary.substr(newIndex,patternValue.length)
        contentAffix=markdownSummary.substr(newIndex+patternValue.length)
        // contentPrefix=markdownSummary.substr(contentMatchIndex-50,50)
        // contentFix=markdownSummary.substr(contentMatchIndex,patternValue.length)
        // contentAffix=markdownSummary.substr(contentMatchIndex+patternValue.length,70)
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
    globalSearch?this.globalMem[patternValue]=result:this.localMem[patternValue]=result
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

  toggleGlobalSearch(){
    const {globalSearch,data}=this.state
    if(!globalSearch && !data[0].content)this.showConfirm()
    else{
      this.setState(prevState=>({
        globalSearch:!prevState.globalSearch,
      }))
    }
  }
  fetchGlobal(){
    const {data}=this.state
    let fetchQueue=[]
    for(let i=0;i<data.length;i++){
      fetchQueue[i]=import(
        /* webpackMode: "lazy-once" */
        `../asset/${data[i].sha}.json`)
        .then(obj=>{
          data[i].content=obj.content
      })
    }
    Promise.all(fetchQueue).then(()=>{
      this.setState({
        globalFetching:false,
        data:data
      })
    })
  }

  showConfirm() {
    confirm({
      title: '确定使用全局搜索？',
      content: '全局搜索会一次性加载所有内容，将会消耗额外流量',
      onOk:()=>{
        this.fetchGlobal()
        this.setState(prevState=>({
          globalSearch:!prevState.globalSearch,
          globalFetching:true
        }))
      },
      onCancel() {
      },
    });
  }

  componentDidUpdate(){
    const {data}=this.props
    if(this.state.data || !data)return
    this.setState({
      data:data
    })
  }
  render() {
    const {controlledValue,matchTags,matchArticles,drawShow,globalFetching,globalSearch}=this.state
    return (
     <React.Fragment>
       <div style={{display:"flex",flexFlow:"column",justifyContent:"center",height:"100%"}}>
           <Search
             addonBefore={
               <span style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', marginLeft: -11}}>
           <Badge count={"?"}
                  title={"局部搜索只搜素标签，标题和摘要，无额外加载.\n全局搜索搜索全部内容，会有额外加载."}
                  style={{ backgroundColor: '#b8b8b8', color: '#fff',transform:"scale(0.7)",transformOrigin:"center",fontSize:"medium"}} />
                 <SlideCheckBox
                   style={{marginRight: -11}}
                   checkedChildren="全局"
                   unCheckedChildren="局部"
                   size={{height:30,width:50}}
                   checkBoxChange={this.toggleGlobalSearch}
                   isChecked={globalSearch}
                   id={"slide-checkbox1"} />
         </span>

             }
             placeholder="tag/title/keywords"
             onChange={this.onChangeHandle}
             onSearch={this.onSearchHandle}
             enterButton
             value={controlledValue}
             style={styles.search}
           />
         {/*</Group>*/}


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

