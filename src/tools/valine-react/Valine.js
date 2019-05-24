import React from 'react'
import ValineContext from './ValineContext'


export default class Valine extends React.Component{

  constructor(props){
    super(props)
    this.state={
      AV:null,
      requireName:props.requireName==null ? true : props.requireName,
      requireEmail:props.requireEmail==null ? false : props.requireEmail,
      placeholder:props.placeholder==null ? '' : props.placeholder,
      nest:props.nest==null ? true : props.nest,
      pageSize:props.pageSize || 10,
      emptyTxt:props.emptyTxt==null ? '快来做第一个评论的人吧~' : props.emptyTxt,
      previewShow:props.previewShow==null ? true : props.previewShow,
    }
    this.countMap=new Map()
    this.fetchCount=this.fetchCount.bind(this)
    this.updateCounts=this.updateCounts.bind(this)
  }

  fetchCount(path){
    return new Promise(resolve=>{
      if(this.countMap.has(path)){
        resolve(this.countMap.get(path))
      }else{
        let AV=window.AV
        if(!AV)return
        new AV.Query('Comment')
          .equalTo('uniqStr',path)
          .count()
          .then((counts)=>{
            this.countMap.set(path,counts)
            resolve(counts)
          })
      }
    })
  }

  updateCounts(path,count){
    this.countMap.set(path,count)
  }

  componentDidMount(){
    const {appId,appKey}=this.props
    const {AV}=this.state
    if(!AV){
      import('leancloud-storage').then(module=>{
        window.AV=module.default
        window.AV.init({appId,appKey})
        this.setState({
          AV:window.AV
        })
      })
    }
  }

  render(){
    const {appId,appKey}=this.props
    return (
      <ValineContext.Provider value={{appId,appKey,fetchCount:this.fetchCount,updateCount:this.updateCounts,...this.state}}>
        {this.props.children}
      </ValineContext.Provider>
    )

  }
}