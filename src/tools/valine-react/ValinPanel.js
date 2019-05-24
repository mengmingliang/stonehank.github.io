import React from 'react'
import ValineContext from './ValineContext'
import ValineContainer from "./ValineContainer";


export default class ValinPanel extends React.Component{

  constructor(props){
    super(props)
    this.state={
      AV:window.AV,
      path:props.path==null ? decodeURI(window.location.origin+window.location.pathname) : props.path
    }
  }

  // componentDidMount(){
  //   const {AV}=this.state
  //   if(!AV){
  //     import('leancloud-storage').then(module=>{
  //       window.AV=module.default
  //       this.setState({
  //         AV:window.AV
  //       })
  //     })
  //   }
  // }

  render(){
    return (
      <ValineContext.Consumer>
        {contextProps=>{
          const {path,AV}=this.state
          const {fetchCount,updateCount,...otherPorps}=contextProps
          return <ValineContainer path={path} fetchCount={fetchCount} updateCount={updateCount} av={AV} {...otherPorps}/>
        }}
      </ValineContext.Consumer>
    )

  }
}