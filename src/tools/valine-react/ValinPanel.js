import React from 'react'
import ValineContext from './ValineContext'
import ValineContainer from "./ValineContainer";


export default class ValinPanel extends React.Component{




  render(){
    if(!window.AV){

    }
    import('leancloud-storage')
      .then(obj=>{

      })
    return (
      <ValineContext.Consumer>
        {props=>{
          const {fetchCount,updateCount,...otherPorps}=props
          return <ValineContainer updateCount={updateCount} {...otherPorps}/>
        }}
      </ValineContext.Consumer>
    )

  }
}