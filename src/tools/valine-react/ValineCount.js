import React from 'react'
import ValineContext from './ValineContext'
import ValineGetCount from "./ValineGetCount";



export default class ValineCount extends React.Component{


  render(){
    console.log(this.props.path)
    return (
      <ValineContext.Consumer>
        {contextProps=>{
            const {fetchCount,...otherPorps}=contextProps
            return <ValineGetCount fetchCount={fetchCount} path={this.props.path}/>
          }
        }
      </ValineContext.Consumer>
    )

  }
}