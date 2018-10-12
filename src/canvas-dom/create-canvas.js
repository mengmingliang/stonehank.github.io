
function create(targetW,targetH,width,height,composite='source-over'){
  const c=document.createElement("canvas")
  c.style.cssText=`position:absolute;top:0;left:0;`
  // c.style=style
  c.width=width;
  c.height=height;
  const ctx = c.getContext('2d');
  ctx.globalCompositeOperation=composite
  ctx.globalAlpha=1
  ctx.imageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  return {c,ctx}
}

export default function createCanvas(targetW,targetH,width,height,context=document.body){

  const {c:c_showMotion,ctx:ctx_showMotion}=create(targetW,targetH,width,height)
  const {c:c_storeStatus,ctx:ctx_storeStatus}=create(targetW,targetH,width,height)
  const {c:c_showMotion2,ctx:ctx_showMotion2}= create(targetW,targetH,width,height)

  context.appendChild(c_showMotion)
  context.appendChild(c_storeStatus)
  context.appendChild(c_showMotion2)

  return {c_showMotion,ctx_showMotion,c_showMotion2,ctx_showMotion2,c_storeStatus,ctx_storeStatus}

}