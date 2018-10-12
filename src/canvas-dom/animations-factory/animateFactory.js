import explodeMotion from './explodeMotion'
import fadeInMotion from './fadeInMotion'
import spiralExplodeMotion from './spiralExplodeMotion'

/**
 *
 * @param assignedParticles
 * @param allParticles
 * @param animateType
 * @param options
 * @returns {Array}
 */
export default function animateFactory(assignedParticles,allParticles,animateType,options){
  const {targetElementWidth,targetElementHeight,targetElementRealLeft,targetElementRealTop,canvasW,canvasH,fineness}=options
  let newArrs=[]
if(animateType==="spiral-explode")
    newArrs=spiralExplodeMotion(assignedParticles,targetElementWidth,targetElementHeight,fineness)
  else if (animateType==="explode")
    newArrs=explodeMotion(assignedParticles,targetElementWidth,targetElementHeight,fineness)
  else if (animateType==="fadein")
    newArrs=fadeInMotion(assignedParticles)
  return newArrs
}