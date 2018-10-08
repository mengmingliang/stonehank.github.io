import React from 'react';
import { Input,List,Divider } from 'antd';
import Tag_Light from "./Tag_Light";
import hljs from 'highlight.js'
import {navigate} from "@reach/router"
import {linkTo} from "../routes/linkPathList"; // https://highlightjs.org/


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


export default class NotFound extends React.Component {
  constructor(){
    super()
    this.state={
      controlledValue:'',
      hasMatch:false,
      matchTags:null,
      matchArticles:null
    }
    this.onChangeHandle=this.onChangeHandle.bind(this)
    this.onSearchHandle=this.onSearchHandle.bind(this)
    this.computeTagsMathch=this.computeTagsMathch.bind(this)
    this.computeArtcileMathch=this.computeArtcileMathch.bind(this)
  }

  computeArtcileMathch(patternValue){
    if(patternValue==="")return []
    const {data}=this.props
    let matchResultObj={
      top:[],middle:[],bottom:[]
    },reg=new RegExp(patternValue)

    for(let i=0;i<data.length;i++){
      let titleMatch=data[i].title.toLowerCase().match(reg) || []
      let markdownSummary=md.render(data[i].summary)
      let contentMatch=markdownSummary.toLowerCase().match(reg) || []
      let titlePrefix,titleAffix,titleFix,contentPrefix,contentAffix,contentFix
      // 存在关键字，分割(为了添加背景色)
      if(titleMatch.index){
        titlePrefix=data[i].title.substr(0,titleMatch.index)
        titleFix=data[i].title.substr(titleMatch.index,patternValue.length)
        titleAffix=data[i].title.substr(titleMatch.index+patternValue.length)
      }
      if(contentMatch.index){
        contentPrefix=markdownSummary.substr(contentMatch.index-50,50)
        contentFix=markdownSummary.substr(contentMatch.index,patternValue.length)
        contentAffix=markdownSummary.substr(contentMatch.index+patternValue.length,70)
      }
      // 两者都存在最优先，其次是title存在，最后是summary存在
      if(titleMatch.index && contentMatch.index){
        matchResultObj.top.push({
          title:`<div>${titlePrefix}<span style="background:yellow">${titleFix}</span>${titleAffix}</div>`,
          matchContent:`<div>${contentPrefix}<span style="background:yellow">${contentFix}</span>${contentAffix}</div>`
        })
      }else if(titleMatch.index){
        matchResultObj.middle.push({
          title:`<div>${titlePrefix}<span style="background:yellow">${titleFix}</span>${titleAffix}</div>`,
          matchContent:markdownSummary.substr(0,100)
        })
      }else if(contentMatch.index){
        matchResultObj.bottom.push({
          title:data[i].title,
          matchContent:`<div>${contentPrefix}<span style="background:yellow">${contentFix}</span>${contentAffix}</div>`
        })
      }
    }

    return matchResultObj.top.concat(matchResultObj.middle,matchResultObj.bottom)
  }

  computeTagsMathch(patternValue){
    if(patternValue==="")return []
    const {tagsList}=this.props
    let matchResult=[]
    for(let i=0;i<tagsList.length;i++){
      let isMatch=tagsList[i].includes(patternValue)
      if(isMatch)matchResult.push(tagsList[i])
    }
    return matchResult
  }

  onChangeHandle(ev){
    const value=ev.target.value
    const trimValue=value.trim().toLowerCase()
    let matchTags=this.computeTagsMathch(trimValue)
    let matchArticles=this.computeArtcileMathch(trimValue)
    // console.log(matchTags)
    this.setState({
      matchTags:matchTags,
      matchArticles:matchArticles,
      controlledValue:value,
      hasMatch:matchArticles.length>0 || matchTags.length>0
    })
  }
  onSearchHandle(value){
    const {matchArticles,matchTags}=this.state
    // const value=ev.target.value
    navigate(`/search/${value}`)
    this.setState({
      controlledValue:'',
      hasMatch:false
    })
  }

  render() {
    // console.log(this.props)
    const {controlledValue,hasMatch,matchTags,matchArticles}=this.state
    // console.log(matchArticles)
    return (
     <React.Fragment>
       <Search
         placeholder="tag/keyword/article"
         onChange={this.onChangeHandle}
         onSearch={this.onSearchHandle}
         value={controlledValue}
         style={{ width: 200 }}
       />
       { hasMatch ?
         <List
           style={{width:200}}
           size="small"
         >
           <Divider orientation={"left"} style={{fontSize:"smaller",fontWeight:"lighter" }}>标签</Divider>
           {matchTags.map((tag,i)=>(
             <List.Item key={i} style={{border:"none"}}>
               <Tag_Light>{tag}</Tag_Light>
             </List.Item>
           ))}
           <Divider orientation={"left"} style={{fontSize:"smaller",fontWeight:"lighter" }}>文章</Divider>
           {matchArticles.map((article,i)=>(
             <List.Item.Meta
               key={i}
               style={{border:"none"}}
               title={<div dangerouslySetInnerHTML={{__html: article.title}}/>}
               description={
                 <div style={{background:"#f8f8f8"}} dangerouslySetInnerHTML={{__html: article.matchContent}}/>
               }
             >
             </List.Item.Meta>
           ))}
         </List>:
         null
       }

     </React.Fragment>
    )
  }
}

