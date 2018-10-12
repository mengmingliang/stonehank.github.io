export default function createAssignParticles(allParticles,fineness, targetElementWidth){
  console.time("createOffScreenCanvas")
  const eachPanelParticles=1000
  const minPanelSize=2
  const assignedParticles=[]
  fineness=Math.ceil(fineness)
  let panelsSize=Math.ceil((allParticles.length/fineness)/eachPanelParticles)
  if(panelsSize<minPanelSize)panelsSize=minPanelSize
  for(let i=0;i<panelsSize;i++){
    const  canvas = document.createElement('canvas');
    canvas.width=window.outerWidth
    canvas.height=window.outerHeight;
    const ctx=canvas.getContext('2d')
    ctx.globalCompositeOperation='destination-over'
    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    assignedParticles[i]={
      sourceArr:[],
      canvas,
      ctx,
    }
  }
  for(let i=0;i<allParticles.length;i++){
    if((Math.floor(i/targetElementWidth))%fineness!==0)continue
    // 从上到下顺序排序
    // let putInWhichPanel=Math.floor(i/eachPanelParticles)
    // 乱序
    const putInWhichPanel=Math.floor(Math.random()*(panelsSize-0.01))

    assignedParticles[putInWhichPanel].sourceArr.push(allParticles[i])

  }
  console.timeEnd("createOffScreenCanvas")
  return assignedParticles
}