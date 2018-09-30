import React, { Component } from 'react';
import {Collapse} from 'antd';

const Panel = Collapse.Panel;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};

let mockObj={
  2018:[null,null,null,null,null,[null,null,1],[2,3,4,5]]
}


export default class Archive extends Component {
  render() {
    // const {mockObj}=this.state
   return (
     <Collapse bordered={false} defaultActiveKey={['1']}>
       { Object.keys(mockObj).map((year,i)=>(
         <Panel header={year+"年"} key={i+"年"} style={customPanelStyle}>
           {mockObj[year].map((month,i)=>{
             if(month && month.length>0){
               return (
                 <Collapse>
                   <Panel header={i+1+"月"} key={i+"月"} style={customPanelStyle}>
                     {month.map((day,i)=>{
                       return <div key={i+"日"}>{day}</div>
                     })}
                   </Panel>
                 </Collapse>
               )
             }
           })}
         </Panel>
       ))
       }
     </Collapse>
    )
  }
}

