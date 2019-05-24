import React from 'react'
import ValineContext from './ValineContext'
import ValineContainer from "./ValineContainer";


export default class ValinPanel extends React.Component{

  render(){
    return (
      <ValineContext.Consumer>
        {props=>{
          const {fetchCount,path,...otherPorps}=props
          return <ValineContainer updateCount={updateCount} {...otherPorps}/>
        }}
      </ValineContext.Consumer>
    )

  }
}