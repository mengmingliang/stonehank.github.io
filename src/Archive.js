import React, { Component } from 'react';
import {Skeleton,Collapse,List,Row,Col,Tag,Icon} from 'antd';

const Panel = Collapse.Panel;


const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8}} />
    {text}
  </span>
);

const yearStyle = {
  // width:"80%",
  background: '#f7f7f7',
  borderRadius: 4,
  border: 0,
  overflow: 'hidden',
};
const monthStyle={
  background: '#fdfdfd',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
}



export default class Archive extends Component {
  constructor(){
    super()
    this.state={
      contentLoading:true,
      articles:null
    }
  }
  static getDerivedStateFromProps(props){
    const {articles}=props
    if(!articles)return null
    return {
      articles,
      contentLoading:false
    }
  }
  render() {
    const {articles,contentLoading}=this.state
    return contentLoading ?
      <Skeleton active loading={contentLoading} title={{width: "30%"}} paragraph={{rows: 6, width: "50%"}}/> :
      <Collapse style={{margin: '24px 36px'}} accordion bordered={false} defaultActiveKey={['2018年']}>
        { Object.keys(articles).map((year)=>(
          <Panel header={year+"年"} key={year+"年"} style={yearStyle}>
            <Collapse accordion>
              {articles[year].map((month,j)=>{
                if(month && month.length>0){
                  return (
                    <Panel header={j+1+"月"} key={j+1+"月"} style={monthStyle}>
                      <List itemLayout="vertical ">
                        {month.map((day,k)=>{
                          if(day==null)return
                          return (
                            <List.Item key={k+"日"}>
                              <List.Item.Meta
                                title={<span>{day.title}</span>}
                                description={
                                  <Row type="flex" gutter={20}>
                                    <Col>{day.createdTime}</Col>
                                      <Col>
                                        {
                                          day.label.map((t,i) => {
                                            return <Tag key={i}>{t}</Tag>
                                          })
                                        }
                                      </Col>
                                     <Col style={{textAlign: "center"}}><IconText type="message" text="2"/></Col>
                                   </Row>
                                }
                              />
                            </List.Item>
                          )
                        })}
                        </List>
                    </Panel>
                  )
                }
              })}
              </Collapse>
          </Panel>
        ))}
        </Collapse>
  }
}

