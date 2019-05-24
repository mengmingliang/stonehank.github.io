import React from 'react'

export default class ValineGetCount extends React.Component{

  constructor(props){
    super(props)
    this.state={
      counts:'获取中',
      path:props.path==null ? decodeURI(window.location.origin+window.location.pathname) : props.path
    }
  }


  componentDidMount(){
    this.props.fetchCount(this.state.path)
      .then(counts=>{
        this.setState({
          counts
        })
      })
  }


  render(){
    return <span>{this.state.counts}</span>
  }
}