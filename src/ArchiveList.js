import React, {Component} from 'react';
import {Pagination, Spin, Button, Anchor, Skeleton, Collapse, List, Affix, Col, Tag, Icon} from 'antd';
import {Link, navigate} from "@reach/router"
import ArticleStatusBar from "./ArticleStatusBar"
import {Layout} from "antd/lib/index";


// const {Link : AntdLink} =Anchor
const Panel = Collapse.Panel;

const {Header, Content, Footer, Sider} = Layout;



export default class ArchiveList extends React.Component {

  constructor(){
    super()
    this.state={
      // loadedIndex:0,
      loadedList:[],
      listLoading:true
    }
    this.loadedIndex=0
    this.onLoadMore=this.onLoadMore.bind(this)
    this.getApartOfData=this.getApartOfData.bind(this)
  }
  getApartOfData(arr,numOfApart){
    let n=numOfApart,result=[],i=this.loadedIndex
    for(;i<arr.length;i++){
      if(n===0){this.loadedIndex=i;return result}
      if(arr[i] && n--)result.push(arr[i])
    }
    this.loadedIndex=i
    return result
  }
  onLoadMore(){
    const {month}=this.props
    // const {loadedIndex}=this.state
    this.setState({
      loadedList:this.state.loadedList.concat(this.getApartOfData(month,5)),
      listLoading:true
      // loadedIndex:this.loadedIndex
    })
  }
  componentDidUpdate(){
    if(!this.state.listLoading)return
    setTimeout(()=>{
      this.setState({
        listLoading:false
      })
    },300)
  }
  componentDidMount(){
    const {month}=this.props
    this.setState({
      loadedList:this.state.loadedList.concat(this.getApartOfData(month,5))
      // loadedIndex:this.loadedIndex
    })
  }
  render() {
    const {month}=this.props
    const loadMore = (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        {this.loadedIndex < month.length ?
          <Button onClick={this.onLoadMore}>loading more</Button> :
          <Button disabled>没有更多了</Button>
        }

      </div>
    )
    const {loadedList,listLoading} = this.state
    return (
      <List itemLayout="vertical "
            loadMore={loadMore}>
        {loadedList.map((day,k,context)=>{
          if(day==null)return
          return (
            <Skeleton key={k+"日"} title={{width:"20%"}}
                      paragraph={{rows:1,width:40+Math.random()*30+"%"}}
                      loading={listLoading && k>=context.length-5} active>
            <List.Item >
              <List.Item.Meta
                title={<Link to={`/articles/${day.title}`}>
                  <div>{day.title}</div>
                </Link>}
                description={
                  <ArticleStatusBar article={day}/>
                }
              />
            </List.Item>
            </Skeleton>
          )
        })}
      </List>
    )
  }
}

