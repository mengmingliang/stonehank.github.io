
/* arr内部type
{ cur:Array[px,py],
  end:Array[px,py],
  color:Array[rgba1,rgba2,rgba3,rgba4],
  center:Array[x,y]
  speed:Number,
  needStop:Boolean,
  r:Number }
* */


/**
 *
 * @param assignedParticles
 * @param targetElementWidth
 * @param targetElementHeight
 * @param fineness
 * @returns {*}
 */
export default function spiralExplodeMotion(assignedParticles,targetElementWidth,targetElementHeight,fineness){
  let first=assignedParticles[0].sourceArr
  for(let i=0;i<first.length;i=i+fineness){
    let {cur}=first[i]
    first[i].cur=[cur[0]*1.5,cur[1]*1.5]
  }
  return assignedParticles
}

