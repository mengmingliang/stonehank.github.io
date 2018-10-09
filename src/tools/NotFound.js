import React from 'react';

export default class NotFound extends React.Component {
  constructor(){
    super()
    // this.handleMouseMove=this.handleMouseMove.bind(this)
    this.spotLightRef = React.createRef()
    this.spotLightHelper=React.createRef()
    this.spotLightWrap=React.createRef()
  }

  // handleMouseMove(e){
  //   console.log(e.clientX,e.clientY)
  //   let wrap=this.spotLightWrap.current,
  //         wrapAttr=wrap.getBoundingClientRect(),
  //         wrapX=wrapAttr.x,wrapY=wrapAttr.y
  //       console.log(wrapAttr)
  //       let sl=this.spotLightRef.current,
  //         slAttr=sl.getBoundingClientRect(),
  //         slW=slAttr.width, slH=slAttr.height;
  //   console.log(wrapX,wrapY)
  // }

  componentDidUpdate(){

    let wrap=this.spotLightWrap.current;
      // wrapAttr=wrap.getBoundingClientRect(),
      // wrapX=wrapAttr.x,wrapY=wrapAttr.y


    let sl=this.spotLightRef.current,
      slAttr=sl.getBoundingClientRect();


    let slHelper=this.spotLightHelper.current;

    this.handleMouseMove=function(e){
      let slW=slAttr.width, slH=slAttr.height;
      let wrapX=wrap.offsetLeft,wrapY=wrap.offsetTop
      let curX=e.clientX-wrapX-slW/2,curY=e.clientY-wrapY-slH/2
      sl.style.transform=`translate3d(${curX}px,${curY}px,0)`
      slHelper.style.transform=`translate3d(${-curX}px,${-curY}px,0)`
    }
    document.addEventListener("mousemove",this.handleMouseMove)
  }
  componentDidMount(){
    const {changeBG}=this.props
    // console.log(changeBG)
    setTimeout(function () {
      changeBG("#000")
    },300)
  }
  componentWillUnmount(){
    const {changeBG}=this.props
    changeBG("#fff")
    document.removeEventListener("mousemove",this.handleMouseMove)
  }
  render() {
    return (
      <div className="spotLightWrap"
           ref={this.spotLightWrap}
          >
        <div className="show"  >
          <div>Page</div>
          <div>Not</div>
          <div>Found</div>
        </div>
        <div className="show" id="spotlight" ref={this.spotLightRef}>
          <div id="spotlightHelper"  ref={this.spotLightHelper}>
            <div>Page</div>
            <div>Not</div>
            <div>Found</div>
          </div>
        </div>
      </div>
    )
  }
}

