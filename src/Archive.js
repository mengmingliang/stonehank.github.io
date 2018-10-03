import React, { Component } from 'react';
import {Skeleton,Collapse,List,Button,Col,Tag,Icon} from 'antd';
import ArticleStatusBar from "./ArticleStatusBar"
import {Link} from "@reach/router"
import ArchiveList from './ArchiveList'



const Panel = Collapse.Panel;
const yearStyle = {
  // width:"80%",
  background: '#e1e1e1',
  borderRadius: 4,
  border: 0,
  overflow: 'hidden',
};
const monthStyle={
  background: '#f0f0f0',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
}

/* todo test */
function getApartOfData(arr,numOfApart){
  let n=numOfApart,result=[],i=arr.loadedIndex||0
  for(;i<arr.length;i++){
    if(n===0){arr.loadedIndex=i;return result}
    if(arr[i] && n--)result.push(arr[i])
  }
  arr.loadedIndex=i
  return result
}


export default class Archive extends Component {
  constructor(){
    super()
    this.state={
      contentLoading:true,
      articles:null,
      listRenderLoading:true
    }
    this.startIndex=0
    this.onLoadMore=this.onLoadMore.bind(this)
  }
  onLoadMore(){
    const {articles}=this.state
    this.startIndex+=10
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
    const loadMore =
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        <Button onClick={this.onLoadMore}>loading more</Button>
      </div>
    const {articles,contentLoading,listRenderLoading}=this.state

    return contentLoading ?
      <Skeleton active loading={contentLoading} title={{width: "30%"}} paragraph={{rows: 10, width: "50%"}}/> :
      <Collapse style={{margin: '24px 36px'}} accordion bordered={false} defaultActiveKey={['2018年']}>
        { Object.keys(articles).map((year)=>(
          <Panel header={year+"年"} key={year+"年"} style={yearStyle}>
            <Collapse accordion>
              {articles[year].map((month,j)=>{
                if(month && month.length>0){
                  return (
                    <Panel header={j+1+"月"} key={j+1+"月"} style={monthStyle}>
                      <ArchiveList month={month}/>
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

