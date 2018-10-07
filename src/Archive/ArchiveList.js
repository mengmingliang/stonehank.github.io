import React, {Component} from 'react';
import {Pagination, Spin, Button, Anchor, Skeleton, Collapse, List, Affix, Col, Tag, Icon} from 'antd';
import {Link, navigate} from "@reach/router"
import ArticleStatusBar from "../ArticleStatusBar"
import {Layout} from "antd/lib/index";
import Loading from "../Loading";
import {linkTo} from "../linkPathList";



const styles={
  loadMore:{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }
}

export default class ArchiveList extends React.Component {

  constructor(){
    super()
    this.state={
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
      if(Array.isArray(arr[i])){
        let subResult=this.getApartOfData(arr[i],n)
        n-=subResult.length
        result.concat(subResult)
        console.log(subResult)
      }
      else if(arr[i] && n--)result.push(arr[i])
    }
    this.loadedIndex=i
    return result
  }
  onLoadMore(){
    const {dayList}=this.props
    // todo 5是默认加载数量，可转换为配置
    const newLoadedList=this.state.loadedList.concat(this.getApartOfData(dayList,5))
    dayList.loadedLength=newLoadedList.length
    this.setState({
      loadedList:newLoadedList,
      listLoading:true
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
    const {dayList}=this.props
    // dayList是数组，遍历时不会遍历到它的自定义属性
    // todo 5是默认加载数量，可转换为配置
    dayList.loadedLength= dayList.loadedLength || 5
    this.setState({
      loadedList:this.state.loadedList.concat(this.getApartOfData(dayList,dayList.loadedLength))
    })
  }
  render() {
    const {dayList}=this.props
    console.log(dayList)
    const loadMore = (
      <div style={styles.loadMore}>
        {this.loadedIndex < dayList.length ?
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
            <Loading key={k}
                     loading={listLoading && k>=context.length-5}
                     render_nums={1}
                     ske_title_width={"20%"}
                     ske_para_width={40+Math.random()*30+"%"}
                     ske_para_rows={1}
            >
            <List.Item >
              <List.Item.Meta
                title={<Link to={`${linkTo.articles}/${day.title}`}>
                  <div>{day.title}</div>
                </Link>}
                description={
                  <ArticleStatusBar article={day}/>
                }
              />
            </List.Item>
            </Loading>
          )
        })}
      </List>
    )
  }
}

