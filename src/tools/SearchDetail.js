import React from 'react';
import { Input,List,Divider } from 'antd';
import Tag_Light from "./Tag_Light";
import hljs from 'highlight.js'
import {linkTo} from "../routes/linkPathList"; // https://highlightjs.org/
import Tags_Col from "../tools/Tags_Col";

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

    }

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


  render() {
    // console.log(this.props)
    console.log(this.props)
    // const {searchValue,matchTags,matchArticles}=this.state
    // console.log(matchArticles)
    return <div>1</div>
    // return (
    //   <React.Fragment>
    //     <div>{`Search:${searchValue}`}</div>
    //       <List
    //         style={{width:200}}
    //         size="small"
    //       >
    //         <Divider orientation={"left"} style={{fontSize:"smaller",fontWeight:"lighter" }}>标签</Divider>
    //         {matchTags.map((tag,i)=>(
    //           <Tags_Col key={i} tag={tag}/>
    //         ))}
    //         <Divider orientation={"left"} style={{fontSize:"smaller",fontWeight:"lighter" }}>文章</Divider>
    //         {matchArticles.map(article=>(
    //           <List.Item.Meta
    //             style={{border:"none"}}
    //             title={<div dangerouslySetInnerHTML={{__html: article.title}}/>}
    //             description={
    //               <div style={{background:"#f8f8f8"}} dangerouslySetInnerHTML={{__html: article.matchContent}}/>
    //             }
    //           >
    //           </List.Item.Meta>
    //         ))}
    //       </List>
    //
    //   </React.Fragment>
    // )
  }
}

