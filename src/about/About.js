import React from 'react';
import  init from "../canvas-dom/index"

const styles={
  wrap:{position:"relative",top:0,left:0,bottom:0,right:0,margin:"0 auto",color:"white"},
  show:{textShadow:"1px 1px 1px,-1px 1px 2px",fontSize:"1.5rem",lineHeight:1.5}
}

export default class About extends React.PureComponent {
  constructor(){
    super()
    this.textRef=React.createRef()
  }

  componentDidMount(){
    try {
      setTimeout(()=>{
      this.start = init(this.textRef.current, document.body.clientWidth , document.body.clientHeight - 64, document.getElementById("wrap"))

        this.start(()=>{
          this.textRef.current.style.color="black"
        })

      },100)
    }catch(err){
      // doNothing
    }
  }
  render() {
    const {aboutMe}=this.props
    return (
      <div id="wrap" style={styles.wrap} >
      <div className="about" style={styles.show} ref={this.textRef} >
        {aboutMe}
      </div>
      </div>
    )
  }
}

