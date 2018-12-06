import React from 'react';

export default class NotFound extends React.Component {
  constructor(){
    super()
    this.throttleFlag=false
    this.throttle=this.throttle.bind(this)
    this.spotLightRef = React.createRef()
    this.spotLightHelper=React.createRef()
    this.spotLightWrap=React.createRef()
  }
   throttle(func){
    if(this.throttleFlag){return}
    clearTimeout(this.throttleTimer)
    this.throttleFlag=true;
     this.throttleTimer=setTimeout(()=>{
      func()
      this.throttleFlag=false;
    },3000)
  };
  componentDidUpdate(){

    let wrap=this.spotLightWrap.current;

    let sl=this.spotLightRef.current,
      slAttr=sl.getBoundingClientRect();

    let slHelper=this.spotLightHelper.current;

    this.handleMouseMove=(e)=>{
      let slW=slAttr.width, slH=slAttr.height;
      let wrapX=wrap.offsetLeft,wrapY=wrap.offsetTop
      let curX=e.clientX-wrapX-slW/2,curY=e.clientY-wrapY-slH/2
      sl.style.cssText=`animation:unset;transform:translate3d(${curX}px,${curY}px,0`
      slHelper.style.cssText=`animation:unset;transform:translate3d(${-curX}px,${-curY}px,0`
      this.throttle(()=>{
        sl.style.cssText=``
        slHelper.style.cssText=``
      })
    }

    document.addEventListener("mousemove",this.handleMouseMove)
  }
  componentDidMount(){
    const {changeBG}=this.props
    // setTimeout(function () {
    changeBG("#000")
    // },300)
  }
  componentWillUnmount(){
    const {changeBG}=this.props
    changeBG("#fff")
    document.removeEventListener("mousemove",this.handleMouseMove)
  }
  render() {
    return (
      <div className="spotLightWrap"
           ref={this.spotLightWrap}>
        <div className="show">
          <div>Page</div>
          <div>Not</div>
          <div>Found</div>
        </div>
        <div className="show"
             id="spotlight"
             ref={this.spotLightRef}>
          <div id="spotlightHelper"
               ref={this.spotLightHelper}>
            <div>Page</div>
            <div>Not</div>
            <div>Found</div>
          </div>
        </div>
      </div>
    )
  }
}

