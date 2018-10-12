import {fadeIn, spiral} from "./core";
import stopIfNeed from './stopIfNeed'

export default function checkForStop(name,arrs,precision,dom){
  const {cur,end,r}=arrs
  switch(name){
    case "explode":
      return stopIfNeed(cur,end,5)
    case 'spiral':
      return r<=1
    case 'fadein':
      return stopIfNeed(cur,end,precision)
    case 'domfadein':
      return +(dom.style.opacity)>=1
    default:
      return false
  }
}