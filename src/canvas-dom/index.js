import createCanvas from "./create-canvas"
import calcProps from './options-data'
import fillAnimateArr from "./fill-animate-arr"
import animateFactory from "./animations-factory/animateFactory"
import createAssignParticles from './createAssignParticles'
import framePlay from './animations/framePlay'

let isAnimating=false

export default function init( targetElement,canvasW,canvasH,context,animateType='spiral-explode') {

  const calc_props = calcProps( targetElement)
  const options=Object.assign(calc_props,{canvasW,canvasH})
  const {targetElementRealTop,targetElementRealLeft,targetElementWidth,targetElementHeight,fineness} = options
  const {c_showMotion,ctx_showMotion,ctx_showMotion2,ctx_storeStatus}=createCanvas(targetElementWidth,targetElementHeight,canvasW,canvasH,context)

  let data = `<svg xmlns="http://www.w3.org/2000/svg" width="${targetElementWidth}" height="${targetElementHeight}" >
                    <foreignObject width="100%" height="100%" >
                      <div xmlns="http://www.w3.org/1999/xhtml">
                          ${targetElement.outerHTML}
                      </div>
                    </foreignObject>
                  </svg>`;
  let assignedParticles=[]
  let allParticles=[]
  return function(willAnimate,animated){
    let img = new Image();
    img.style.cssText=`position:absolute;top:${targetElementRealTop}px;left:${targetElementRealLeft}px;width:${targetElementWidth}px;height:${targetElementHeight}px`
    if(targetElement.nodeName==="IMG"){
      data=targetElement.src
      img.src=data
    }else{
      let svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
      let fr=new FileReader()
      fr.readAsDataURL(svg)
      fr.onload=function(){
        img.src = fr.result
      }
    }
    img.onload=function(){
      ctx_showMotion.drawImage(img, targetElementRealLeft, targetElementRealTop,targetElementWidth,targetElementHeight);
      let imgData = ctx_showMotion.getImageData(targetElementRealLeft, targetElementRealTop, targetElementWidth, targetElementHeight);
      targetElement.style.display='none'
      if(willAnimate)willAnimate()
      if(allParticles.length===0)
      allParticles=fillAnimateArr(imgData,[],1,targetElementWidth, targetElementHeight)
      if(assignedParticles.length===0){
        assignedParticles=createAssignParticles(allParticles,fineness, targetElementWidth)
        if(assignedParticles.length===0){
          targetElement.style.display='block'
          if(animated)animated()
          return
        }
        assignedParticles=animateFactory(assignedParticles,allParticles,animateType,options)
      }
      ctx_showMotion.clearRect(0,0,canvasW,canvasH)
      ctx_storeStatus.clearRect(0,0,canvasW,canvasH)
      framePlay(assignedParticles,allParticles,c_showMotion,ctx_showMotion,ctx_showMotion2,ctx_storeStatus,options,{
        progress:[1,2],
        name:['spiral','explode']
      },targetElement,()=>{
        isAnimating=false
        setTimeout(()=>{
          targetElement.style.display='block'
          ctx_showMotion.clearRect(0,0,canvasW,canvasH)
          ctx_showMotion2.clearRect(0,0,canvasW,canvasH)
          ctx_storeStatus.clearRect(0,0,canvasW,canvasH)
          if(animated)animated()
        },0)
      })
    }
  }

}

