import React from 'react';
import { Divider,Tag,Card,Skeleton } from 'antd';

let ske_title_style={width:null}
let ske_para_style={width:null,rows:null}


export default class Loading extends React.PureComponent{
  render(){
    const {render_nums,ske_title_width,ske_para_rows,ske_para_width,loading}=this.props
    ske_title_style.width=ske_title_width
    ske_para_style.rows=ske_para_rows
    ske_para_style.width=ske_para_width
    return(
      Array(render_nums).fill(1).map((n,i)=>(
        <Skeleton key={i} active loading={loading} title={ske_title_style} paragraph={ske_para_style}/>
      ))
    )
  }
}