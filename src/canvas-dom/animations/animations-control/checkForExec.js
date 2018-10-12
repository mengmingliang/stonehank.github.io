import {spiral,fadeIn,explode} from './core'
let lastOpacity=0

export default function checkForExec(name,arrs,time,dom) {
  switch(name){
    case "explode":
      arrs=explode(arrs,time)
      break;
    case 'spiral':
      arrs=spiral(arrs,0)
      break
    case 'fadein':
      arrs=fadeIn(arrs)
      break;
    case 'domfadein':
      if(dom.style.opacity==='0' && lastOpacity>=1)lastOpacity=0
      lastOpacity+=0.01
      dom.style.opacity=lastOpacity
      break;
    default:
      return arrs
  }
  return arrs
}