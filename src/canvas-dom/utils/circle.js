
/**
 * 已知点和圆心和弧度，求终点
 * @param start 初始点
 * @param center 圆点
 * @param angle 弧度
 * @param clockWise 是否顺时针
 * @returns {*[]}
 */
export function circleMove(start,center,angle,clockWise){
  let a=center[0],b=center[1],
    x0=start[0],y0=start[1]
  if(!clockWise)angle*=-1
  // let x=x0*Math.cos(angle)-y0*Math.sin(angle)
  // let y=x0*Math.sin(angle)+y0*Math.cos(angle)
  let x=a+(x0-a)*Math.cos(angle)-(y0-b)*Math.sin(angle)
  let y=b+(x0-a)*Math.sin(angle)+(y0-b)*Math.cos(angle)
  return [x,y]
}

export function circleMoveMutateR(start,center,angle,clockWise,oldR,newR){
  if(newR===0)return center
  let rate=newR/oldR
  let newStart=[(start[0]-center[0])*rate+center[0],(start[1]-center[1])*rate+center[1]]
  return circleMove(newStart,center,angle,clockWise)
}


// export function circleMoveMutateR(start,center,angle,clockWise,oldR,newR){
//   if(newR===0)return center
//   let a=center[0],b=center[1],
//     x0=start[0]-a,y0=start[1]-b
//   y0=y0*newR/oldR
//   if(x0<0)y0*=-1
//   let _angle=Math.asin(y0/newR)
//   if(!clockWise)_angle-=angle
//   else _angle+=angle
//   // _angle%=360
//   let x=a+newR*Math.cos(_angle)
//   let y=b+newR*Math.sin(_angle)
//   if(Number.isNaN(x))debugger
//   return [x,y]
// }


/**
 *  判断任意点是否在三角形内部
 * @param triA 三角形点1
 * @param triB 三角形点2
 * @param triC 三角形点3
 * @param anyPoint 任意点
 * @returns {boolean}
 */
export function pointInTriangle(triA,triB,triC,anyPoint){
  let x1=triA[0],x2=triB[0],x3=triC[0],x=anyPoint[0],
    y1=triA[1],y2=triB[1],y3=triC[1],y=anyPoint[1]
  if(((x-x1)*(y2-y1) - (y-y1)*(x2-x1))*((x3-x1)*(y2-y1) - (y3-y1)*(x2-x1)) >=0
    && ((x-x1)*(y3-y1) - (y-y1)*(x3-x1))*((x2-x1)*(y3-y1) - (y2-y1)*(x3-x1)) >=0
    && ((x-x2)*(y3-y2) - (y-y2)*(x3-x2))*((x1-x2)*(y3-y2) - (y1-y2)*(x3-x2)) >=0
  ){
    return true
  }
  return false
}

/**
 * 已知圆上2点和半径r，求圆心
 * @param a 圆上点1
 * @param b 圆上点2
 * @param r 半径
 * @param someFlag 正反参数
 * @returns {*[]}
 */
// export function circleCenter(a,b,r,someFlag) {
//   let x1=a[0],x2=b[0],
//     y1=a[1],y2=b[1];
//   let c1 = (x2*x2 - x1*x1 + y2*y2 - y1*y1) / (2 *(x2 - x1));
//   let c2 = (y2 - y1) / (x2 - x1);
//   let A = (c2*c2 + 1);
//   let B = (2 * x1*c2 - 2 * c1*c2 - 2 * y1);
//   let C = x1*x1 - 2 * x1*c1 + c1*c1 + y1*y1 - r*r;
//   let y = (-B + (Math.sqrt(B*B - 4 * A*C)*(someFlag?-1:1))) / (2 * A);
//   let x = c1 - c2 * y;
//   // console.log(x,y)
//   return [x,y]
// }