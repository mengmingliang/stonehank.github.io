import {circleMove} from "../../utils/circle";
import {circleMoveMutateR} from "../../utils/circle";

export function explode(arr,timestamp){
  // const {cur,vX,vY,needStop,end}=arr
  // if(needStop)return arr
  // arr.vX=(end[0]-cur[0])*5
  // arr.vY=(end[1]-cur[1])*5
  // arr.cur[0]+=vX*timestamp
  // arr.cur[1]+=vY*timestamp
  // return arr
  let {cur,vX,vY,needStop,end}=arr
  if(needStop)return arr
  let stiff=120,damping=35
  const FspringX = -stiff * (cur[0] - end[0]);
  const FdamperX = -damping * vX;
  const aX = FspringX + FdamperX
  const FspringY = -stiff * (cur[1] - end[1]);
  const FdamperY = -damping * vY;
  const aY = FspringY + FdamperY
  arr.vX=vX + aX * timestamp;
  arr.vY=vY + aY * timestamp;
  arr.cur[0]+=arr.vX*timestamp
  arr.cur[1]+=arr.vY*timestamp
  return arr
}
// shoot..
// let vRate=(w/2-Math.abs(cur[0]-w/2))/3000+Math.random()*30
// // let vRate=
// arr.vX=(end[0]-cur[0]>0)?50+(end[0]-cur[0])*vRate:-50+(end[0]-cur[0])*vRate
// arr.vY=(end[1]-cur[1]>0)?50+(end[1]-cur[1])*vRate:-50+(end[1]-cur[1])*vRate

export function circle(arr){
  let {cur,center,speed,needStop,R}=arr
  if(needStop)return arr
  const angle=speed/R
  const newPoint=circleMove(cur,center,angle,false);
  arr['cur']=[newPoint[0],newPoint[1]]
  return arr
}



export function spiral(arr,minR=0,linearV,gravity){
  const {cur,center,linearVelocity,needStop,r,rDecreaseSpeed}=arr
  if(linearV==null)linearV=linearVelocity
  if(gravity==null)gravity=rDecreaseSpeed
  if(needStop)return arr
  const oldR=r
  const expand=Math.abs(gravity)
  const shrink= expand*-1
  if(minR<=r){
    if(r>=0 && gravity>0) gravity=shrink
    else gravity=expand
  }
  arr.r+=gravity
  // arr.rDecreaseSpeed=gravity
  if(arr.r<0)arr.r=0
  const angle=linearV/r
  const newPoint=circleMoveMutateR(cur,center,angle,false,oldR,arr.r);
  arr['end']=center
  arr['cur']=[newPoint[0],newPoint[1]]
  return arr
}

/**
 * 喷洒
 * cur为中心
 * end为pxpy
 * @param arr
 * @param timestamp
 * @returns {*}
 */
export function spary(arr,timestamp){
  let {cur,vX,vY,needStop,end}=arr
  if(needStop)return arr
  arr.vX=(end[0]-cur[0])*5
  arr.vY=(end[1]-cur[1])*5
  arr.cur[0]+=vX*timestamp
  arr.cur[1]+=vY*timestamp
  return arr
}

/**
 * 淡入效果，无动画直接渲染
 * end为pxpy
 * 无cur要求
 * @param arr
 * @returns {*}
 */
export function fadeIn(arr){
  let {end}=arr
  arr['cur']=end
  return arr
}