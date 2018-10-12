
export default function lightDOMfadein(arrs,dom){
  // for(let i=0;i<arrs.length;i++){
  //   arrs[i].cur=[targetElementWidth/2,targetElementHeight/2]
  // }

  dom.style.display="block";
  dom.style.opacity=0;
  return arrs.slice(0,1)
}


