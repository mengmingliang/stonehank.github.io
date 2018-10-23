import React from 'react';



export default class SlideCheckBox extends React.PureComponent{
  constructor(){
    super()
    this.cancelBubble=this.cancelBubble.bind(this)
    this.checkBoxChange=this.checkBoxChange.bind(this)
  }
  cancelBubble(e){
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation();
  }
  checkBoxChange(){
    const {checkBoxChange}=this.props
    checkBoxChange()
  }
  render(){
    const {checkedChildren,unCheckedChildren,id,isChecked,size,style}=this.props
    let customSize,widthVU,heightVU,heightValue,widthValue,widthUnit,heightUnit,slideW,slideH;
    if(size){
      customSize=true
      let {width,height}=size
      if(!width && !height)customSize=false
      else{
        if(typeof width==="number")width+="px"
        if(typeof height==="number")height+="px"
        widthVU=width.match(/'?"?`?(\d+\.?\d*)(px|rem|em|vh|vw|[a-z]*)/)||[]
        widthValue=widthVU[1];
        widthUnit=widthVU[2]||0;
        heightVU=height.match(/'?"?`?(\d+\.?\d*)(px|rem|em|vh|vw|[a-z]*)/)||[]
        heightValue=heightVU[1];
        heightUnit=heightVU[2]||0;
        slideW=width || heightValue*5/2+heightUnit;
        slideH=height|| widthValue*2/5+widthUnit
      }
    }
    console.log(slideH)
    return (
      <div style={Object.assign({height:slideH},style)}>
        <input className='inputCheckBox' id={id}  type="checkbox" checked={!!isChecked}
               onClick={this.cancelBubble} onChange={this.checkBoxChange}/>
        <label className="slide-checkbox"
               style={customSize?{width:slideW,height:slideH}:null}
               htmlFor={id}  onClick={this.cancelBubble}>
          {isChecked ?
            checkedChildren ?
              <span  style={{lineHeight:heightValue?slideH:null,fontSize:heightValue?heightValue/4:"1rem"}} className="checkbox-checked-caption">{checkedChildren}</span> :
              null :
            unCheckedChildren ?
              <span  style={{lineHeight:heightValue?slideH:null,fontSize:heightValue?heightValue/4:"1rem"}} className="checkbox-unchecked-caption">{unCheckedChildren}</span> :
              null
          }
        </label>
      </div>
    )
  }
}

