

/* arr内部type
{ cur:Array[px,py],
  end:Array[px,py],
  color:Array[rgba1,rgba2,rgba3,rgba4],
  center:Array[x,y]
  speed:Number,
  needStop:Boolean,
  R:Number }
* */


/**
 * 计算当前螺旋动画所需要的参数
 * @param assignedParticles
 * @param targetElementWidth
 * @param targetElementHeight
 * @param fineness
 * @returns {*}
 */
export default function lightExplodeMotion(arrs,targetElementWidth,targetElementHeight){

  for(let i=0;i<arrs.length;i++){
    arrs[i].cur=[targetElementWidth/2,targetElementHeight/2]
  }
  return arrs
}



