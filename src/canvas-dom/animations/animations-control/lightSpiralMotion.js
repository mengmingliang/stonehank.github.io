
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
 * @param arrs
 * @returns {*}
 */
export default function lightSpiralMotion(arrs){
  for(let i=0;i<arrs.length;i++){
    let {cur}=arrs[i]

    arrs[i].cur=[cur[0],cur[1]]

    arrs[i].circularSpeed*=1
  }
  return arrs
}

