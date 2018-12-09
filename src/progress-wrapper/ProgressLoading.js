import React from "react";
import raf from 'raf'
import Loading from "../share-components/Loading";


const rootElement = document.getElementById("root");
const frameTime=1000/60


export default class ProgressLoading extends React.Component{
  constructor(){
    super()
    this.pos=0
    this.realPos=window.outerWidth
    this.destPos=this.realPos*0.9
    this.speed=0
    this.lastTime=0
    this.reading=this.reading.bind(this)
  }

  reading(){
    this.timer=raf((timeStamp)=>{
      const timeGap=timeStamp-this.lastTime
      this.lastTime=timeStamp

      if(timeGap>frameTime*10){
        raf.cancel(this.timer)
        return this.reading()
      }
      const forwardForce = 25 * (this.destPos-this.pos);
      const backwardForce = 20 * this.speed;
      const forceGap = forwardForce - backwardForce;
      const newSpeed = this.speed + forceGap * frameTime/1000;
      this.pos+=newSpeed * frameTime/1000;
      this.loadEl.style.transform=`translateX(${-this.realPos+this.pos}px)`
      this.reading()
    })
  }

  componentDidMount(){
    this.loadEl=document.createElement("div")
    this.loadEl.id='progressLoading'
    this.loadEl.style.cssText='width:100%;height:5px;background:lightgreen;transform:translateX(-100%);'
    document.body.insertBefore(this.loadEl,rootElement)
    this.reading()
  }
  componentWillUnmount(){
    this.loadEl.style.transform="translateX(0)"
    raf.cancel(this.timer)
  }
  render(){
    return (
      <Loading loading={true} render_nums={3}
               ske_title_width={`${20+Math.floor(Math.random()*10)}%`}
               ske_para_width={`${50+Math.floor(Math.random()*30)}%`} ske_para_rows={3} />
    )
  }
}