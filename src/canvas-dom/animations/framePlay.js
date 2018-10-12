import raf from 'raf'
import checkForExec from './animations-control/checkForExec'
import checkForStop from './animations-control/checkForStop'
import initMotion from './animations-control/initMotion'


export default function explodePlay(assignedParticles,allParticles,c_showMotion,ctx_showMotion,ctx_showMotion2,ctx_storeStatus,options,customAnime,dom,doneCallBack){
  const {canvasW,canvasH,targetElementRealTop,targetElementRealLeft,fineness,targetElementWidth,targetElementHeight} = options
  const {progress,name}=customAnime
  if(progress.length!==name.length || progress.length===0)throw new Error('customAnime is not Right!')
  let curProgressIdx=0
  let allParticlesIdx=0
  let _fineness=Math.ceil(fineness) || 2
  travser(allParticlesIdx)
  function travser(allParticlesIdx){
    let arrs=assignedParticles[allParticlesIdx].sourceArr
    let ctx=assignedParticles[allParticlesIdx].ctx
    let canvas=assignedParticles[allParticlesIdx].canvas
    let doneParticlesNum=0
    let rafID
    let msPerFrame=1000/60
    let curAnimateName=null
    let hasInitCurAnimate=false
    function startIfNeed(){
      rafID= raf(function playing(timestamp){
        if(doneParticlesNum>=arrs.length){
          if(allParticlesIdx<assignedParticles.length-1){
            allParticlesIdx++
            travser(allParticlesIdx)
            return
          }else{
            _fineness=Math.floor(_fineness-1)
            if(_fineness===0){
              raf.cancel(rafID)
              rafID=null
              dom.style.display='block'
              if(doneCallBack)doneCallBack()
              return
            }
            ctx_showMotion.clearRect(0,0,canvasW,canvasH)
            ctx_storeStatus.clearRect(0,0,canvasW,canvasH)
            // lastRenders(allParticles,ctx_storeStatus,targetElementRealLeft,targetElementRealTop,_fineness)
          }
        }else {
          doneParticlesNum = 0
          ctx.clearRect(0, 0, canvasW, canvasH)
          ctx.beginPath();
          for (let k = 0; k < arrs.length; k++) {
            let {end} = arrs[k]
            let endX = end[0], endY = end[1]
            if(curAnimateName && checkForStop(curAnimateName,arrs[k],1,dom)){
                arrs[k]['cur'] = [endX, endY]
                arrs[k]['needStop'] = true
                doneParticlesNum++
            }
            const currentTime = timestamp ||  Date.now()
            if(arrs[k].prevTime===0)arrs[k].prevTime=currentTime-msPerFrame
            const timeDelta = currentTime - arrs[k].prevTime;
            arrs[k].prevTime = currentTime;
            arrs[k].accumulatedTime = arrs[k].accumulatedTime + timeDelta;
            const framesToCatchUp = Math.floor(arrs[k].accumulatedTime / msPerFrame);
            for (let i = 0; i < framesToCatchUp; i++) {
              if(!progress[curProgressIdx]){
                if(allParticlesIdx===assignedParticles.length)return
                else progress[curProgressIdx]=assignedParticles.length
              }
              if(allParticlesIdx<Math.floor(progress[curProgressIdx])){
                curAnimateName=name[curProgressIdx] || 'domfadein'
                if(!hasInitCurAnimate){
                  hasInitCurAnimate=true
                  if(curAnimateName==='domfadein' && curProgressIdx===progress.length-1){
                    allParticlesIdx=assignedParticles.length-1
                  }
                  arrs=initMotion(curAnimateName,arrs,dom,targetElementWidth,targetElementHeight)
                }
                arrs[k]=checkForExec(curAnimateName,arrs[k],msPerFrame/1000,dom)
              }else{
                curProgressIdx++
                curAnimateName=null
                rafID=null
                startIfNeed()
                return
              }
            }
            arrs[k].accumulatedTime -= framesToCatchUp * msPerFrame;
            let {color} = arrs[k]
            let curX = arrs[k]['cur'][0], curY = arrs[k]['cur'][1]
            let [rgba1, rgba2, rgba3, rgba4] = color
            // ctx.save()
            ctx.fillStyle = `rgba(${rgba1}, ${rgba2}, ${rgba3},${rgba4}`
            if(curAnimateName==='explode' && Math.random()>0.99){
              ctx.moveTo(targetElementRealLeft + curX, targetElementRealTop + curY)
              ctx.lineTo(targetElementRealLeft + endX, targetElementRealTop + endY)
              ctx.strokeStyle=`rgba(${rgba1}, ${rgba2}, ${rgba3},0.3`
              ctx.stroke();
              continue
            }
            ctx.fillRect(targetElementRealLeft + curX, targetElementRealTop + curY, _fineness, _fineness);
            // ctx.restore()
          }
          ctx_showMotion.clearRect(0,0,canvasW,canvasH)
          ctx_showMotion.drawImage(canvas ,0, 0)


          /* extra Canvas */
          if(curAnimateName==='spiral' || curAnimateName==='explode'){
            ctx_showMotion2.fillStyle = 'rgba(255,255,255,0.2)';
            ctx_showMotion2.fillRect(0,0,canvasW,canvasW);
            ctx_showMotion2.drawImage(c_showMotion,0,0)
          }else{
            ctx_showMotion2.clearRect(0,0,canvasW,canvasH)
          }
        }
        raf(playing)
      })
      ctx_storeStatus.drawImage(c_showMotion,0,0)
    }
    startIfNeed()
  }
}
