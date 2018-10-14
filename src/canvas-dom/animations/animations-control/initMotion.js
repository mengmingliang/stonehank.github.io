import lightExplodeMotion from './lightExplodeMotion'
import lightSpiralMotion from './lightSpiralMotion'
import lightFadeInMotion from './lightFadeInMotion'
import lightDOMfadein from './lightDOMfadein'

export default function initMotion(name,arrs,dom,targetElementWidth,targetElementHeight){
  switch(name){
    case "explode":
      return lightExplodeMotion(arrs,targetElementWidth,targetElementHeight)
    case 'spiral':
      return lightSpiralMotion(arrs)
    case 'fadein':
      return lightFadeInMotion(arrs)
    case 'domfadein':
      return lightDOMfadein(arrs,dom)
    default:
      return false
  }
}