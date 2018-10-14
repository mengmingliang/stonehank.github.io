
/**
 *
 * @param imgData
 * @param allParticles
 * @param fineness
 * @param boundaryX
 * @param boundaryY
 * @param canvasW
 * @param canvasH
 * @param targetElementWidth
 * @param targetElementHeight
 * @returns {Array}
 */

export default function fillAnimateArr(imgData,allParticles,fineness,targetElementWidth,targetElementHeight){
// console.time('fillArray')
  for (let py = 0; py < targetElementHeight; py += fineness) {
    for (let px = 0; px < targetElementWidth; px += fineness) {
      let rgba4 = (px + py * targetElementWidth) * 4 - 1
      if(rgba4<0)rgba4=3
      const rgba3=rgba4-1,rgba2=rgba3-1,rgba1=rgba2-1;
      const opacity = imgData.data[rgba4];
      if (opacity >0) {
        const opts={
          cur:[px,py],
          end:[px,py],
          color:[imgData.data[rgba1],imgData.data[rgba2],imgData.data[rgba3],imgData.data[rgba4]],
          vX:0,
          vY:0,
          center:[targetElementWidth/2,targetElementHeight/2],
          r:Math.sqrt((px-targetElementWidth/2)*(px-targetElementWidth/2)+(py-targetElementHeight/2)*(py-targetElementHeight/2)),
          linearVelocity:3+Math.random()*5,
          needStop:false,
          prevTime:0,
          accumulatedTime:0,
          rDecreaseSpeed:2+Math.random()*2
        }
        allParticles.push(opts)
      }
    }
  }
  // console.timeEnd('fillArray')
  return allParticles
}