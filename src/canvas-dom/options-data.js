

export default function calcProps( targetElement) {
  const fineness =1;
  const targetElementWidth = targetElement.offsetWidth,
    targetElementHeight = targetElement.offsetHeight,
    targetElementLeft = targetElement.offsetLeft,
    targetElementTop = targetElement.offsetTop

  const targetElementRealTop = targetElementTop ,
    targetElementRealLeft = targetElementLeft ;
  return {targetElementRealTop,targetElementRealLeft,targetElementWidth,targetElementHeight,fineness}
}
