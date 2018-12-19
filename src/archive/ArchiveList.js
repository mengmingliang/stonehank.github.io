import React from 'react';
import { Button, List} from 'antd';
import {Link} from "@reach/router"
// import ArticleStatusBar from "../home-article/ArticleStatusBar"
import Loading from "../share-components/Loading";
import {linkTo} from "../routes/linkPathList";
import ArticleHeaderProps from "../share-components/ArticleHeaderProps";



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
      }
      else if(arr[i] && n--)result.push(arr[i])
    }
    this.loadedIndex=i
    return result
  }
  onLoadMore(){
    const {dayList,archiveEachPage}=this.props
    const newLoadedList=this.state.loadedList.concat(this.getApartOfData(dayList,archiveEachPage))
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
    const {dayList,archiveEachPage}=this.props
    // dayList是数组，遍历时不会遍历到它的自定义属性
    dayList.loadedLength= dayList.loadedLength || archiveEachPage || 5
    this.setState({
      loadedList:this.state.loadedList.concat(this.getApartOfData(dayList,dayList.loadedLength))
    })
  }
  render() {
    const {dayList}=this.props
    // console.log(dayList)
    const loadMore = (
      <div style={styles.loadMore}>
        {this.loadedIndex < dayList.length ?
          <Button onClick={this.onLoadMore}> ▪ ▪ ▪ </Button> :
          <Button disabled>没有更多了</Button>
        }

      </div>
    )
    const {loadedList,listLoading} = this.state
    const {archiveEachPage}=this.props
    return (
      <List itemLayout="vertical "
            loadMore={loadMore}>
        {loadedList.map((day,k,context)=>{
          if(day==null)return null
          return (
            <Loading key={k}
                     loading={listLoading && k>=context.length-archiveEachPage}
                     render_nums={1}
                     ske_title_width={"20%"}
                     ske_para_width={40+Math.random()*30+"%"}
                     ske_para_rows={1}
            >
            <List.Item >
              <List.Item.Meta
                title={<Link to={`${linkTo.articles}/${day.uniqueID}`}>
                  <div>{day.title}</div>
                </Link>}
                description={
                  <ArticleHeaderProps curContentData={day}
                                      singleRenderPropsOnHeader={[
                                        {val:'createdTime'}
                                        ]}
                                      multiRenderPropsOnHeader={[
                                        {val:'relatedTags',ele:'tag',link:(tag)=>`${linkTo.category}/${tag}`},
                                      ]}
                                      showComment={{title:'title',sha:'uniqueID'}} />
                  // <ArticleStatusBar createdTime={"createdTime"}
                  //                   label={"label"}
                  //                   labelLinkPath={"category"}
                  //                   article={day}/>
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

