
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
export default function spiralMotion(assignedParticles,targetElementWidth,targetElementHeight,fineness){
  for(let k=0;k<assignedParticles.length;k++){
    let curArrs=assignedParticles[k].sourceArr
    fineness=Math.floor(fineness)
    for(let i=0;i<curArrs.length;i=i+fineness){
      let {cur}=curArrs[i]
      // let angleInit=Math.floor(Math.random()*360)/360*2*Math.PI
      // let curXInit=r*Math.cos(angleInit)+(Math.random()-0.5)*100
      // let curYInit=r*Math.sin(angleInit)+(Math.random()-0.5)*100
      // curArrs[i].cur=[targetElementWidth/2+curXInit,targetElementHeight/2+curYInit]
      curArrs[i].cur=[cur[0],cur[1]]
      // if(k===0) curArrs[i].cur=[cur[0],cur[1]]
      // else curArrs[i].cur=[targetElementWidth/2,targetElementHeight/2]
      curArrs[i].circularSpeed*=3
    }
  }
  return assignedParticles
}

