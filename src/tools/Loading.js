import React from 'react';
import { Skeleton } from 'antd';

let ske_title_style={}
let ske_para_style={}


export default class Loading extends React.PureComponent{
  render(){
    const {render_nums,ske_title_width,ske_para_rows,ske_para_width,loading,avatar}=this.props
    ske_title_style.width=ske_title_width
    ske_para_style.rows=ske_para_rows
    ske_para_style.width=ske_para_width
    return(
      Array.from({length:render_nums}).map((n,i)=>(
        <Skeleton key={i}
                  active
                  avatar={avatar}
                  loading={loading}
                  title={ske_title_style}
                  paragraph={ske_para_style}
        >
          {this.props.children}
        </Skeleton>
      ))
    )
  }
}