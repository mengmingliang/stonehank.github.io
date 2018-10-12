

export default function stopIfNeed(attr1,attr2,precision){
  let attr1X,attr1Y,attr2X,attr2Y
  if(Array.isArray(attr1)){attr1X=attr1[0];attr1Y=attr1[1]}
  else{ attr1X=attr1;attr1Y=0}
  if(Array.isArray(attr2)){attr2X=attr2[0];attr2Y=attr2[1]}
  else{ attr2X=attr2;attr2Y=0}
  if(Math.abs(Math.abs(attr1X)-Math.abs(attr2X))<=precision && Math.abs(attr1Y-attr2Y)<=precision){
    return true
  }
  return false
}