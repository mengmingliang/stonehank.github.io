import React from 'react'
import ValineContext from './ValineContext'


export default class Valine extends React.Component{

  constructor(props){
    super(props)
    this.state={
      requireName:props.requireName==null ? true : props.requireName,
      requireEmail:props.requireEmail==null ? false : props.requireEmail,
      placeholder:props.placeholder==null ? '' : props.placeholder,
      AV:props.av,
      nest:props.nest==null ? true : props.nest,
      path:props.path ? decodeURI(props.path) : decodeURI(window.location.origin+window.location.pathname),
      pageSize:props.pageSize || 10,
      emptyTxt:props.emptyTxt==null ? '快来做第一个评论的人吧~' : props.emptyTxt,
      previewShow:props.previewShow==null ? true : props.previewShow,
    }
    this.countMap=new Map()
    this.fetchCount=this.fetchCount.bind(this)
    this.updateCounts=this.updateCounts.bind(this)
  }

  fetchCount(){
    const {path}=this.state
    return new Promise(resolve=>{
      if(this.countMap.has(path)){
        resolve(this.countMap.get(path))
      }else{
        let AV=window.AV
        new AV.Query('Comment')
          .matches('url',new RegExp(`${path.replace(/\//g,'\\/')}\\/?`))
          .count()
          .then((counts)=>{
            this.countMap.set(path,counts)
            resolve(counts)
          })
      }
    })
  }

  updateCounts(count){
    const {path}=this.state
    this.countMap.set(path,count)
  }


  render(){
    return (
      <ValineContext.Provider value={{fetchCount:this.fetchCount,updateCount:this.updateCounts,...this.state}}>
        {this.props.children}
      </ValineContext.Provider>
    )

  }
}