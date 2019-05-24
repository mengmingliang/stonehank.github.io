import React from 'react'


export default class FetchCount extends React.Component{

  componentDidMount(){
    new Promise(resolve=>{
      if(!window.AV){
        import('leancloud-storage').then(module=>{
          window.AV=module.default
          resolve()
        })
      }else{
        resolve()
      }
    }).then(()=>{
      
    })

  }

  render(){
    return <span></span>
  }
}