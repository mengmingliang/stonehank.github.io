import {spiral} from "../core";
// import {circleMoveMutateR} from '../../../utils/circle'
function check(rec,exp){
  let recX,recY,expX,expY
  if(Array.isArray(rec) && Array.isArray(exp)){
    recX=rec[0];recY=rec[1];
    expX=exp[0];expY=exp[1]
  }else{
    recX=rec;recY=0;
    expX=exp;expY=0
  }
  return Math.abs(recX-expX)<0.01 && Math.abs(recY-expY)<0.01
}
function creatArr(px,py,linearVelocity,rDecreaseSpeed){
  return {
    cur:[px,py],
    center:[0,0],
    linearVelocity,
    r:Math.sqrt((px)*(px)+(py)*(py)),
    rDecreaseSpeed
  }
}

test('r is right', () => {
  let px=72,py=25,linearVelocity=1,rDecreaseSpeed=5
  let arr=creatArr(px,py,linearVelocity,rDecreaseSpeed)
  let testNum=1000
  for(let i=0;i<testNum;i++){
    if(i===16)
    arr=spiral(arr,1,0)
    const {cur,r,center}=arr
    // if(isNaN(Math.sqrt(Math.pow(cur[0]-center[0],2)+Math.pow(cur[1]-center[1],2)).toFixed(2)))
      // debugger
    expect(r.toFixed(2)).toBe(Math.sqrt(Math.pow(cur[0]-center[0],2)+Math.pow(cur[1]-center[1],2)).toFixed(2));
  }
});

test('r must greater than minR', () => {
  let px=72,py=25,circularSpeed=14,rDecreaseSpeed=9,minR=20
  let arr=creatArr(px,py,circularSpeed,rDecreaseSpeed)
  let testNum=1
  for(let i=0;i<testNum;i++){
    arr=spiral(arr,1,minR*Math.sqrt(i))
    const {r}=arr
    expect(r>=minR).toBe(true);
  }
});