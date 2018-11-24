import React from 'react'
import { List,Divider,Row } from 'antd';
import CardPure from "./CardPure";
import TagsCol from "./TagsCol";

const renderNumber=3
const styles={
  divider:{fontSize:"smaller",fontWeight:"lighter" },
  card_pure_body:{padding:12},
  summary:{marginTop: 6, fontSize: "small", opacity: '0.7'},
  card:{margin:"15px 0"},
}

export default class SearchDrawerListLazyScroll extends React.Component {
  constructor(props){
    super(props)
    const {matchArticles}=props
    this.state = {
      renderArticles: [],
      renderIndex:0,
      hasMore: matchArticles.length > renderNumber,
      searchKeyword:null
    }
    this.rootNode=document.getElementsByClassName(props.wrapperClassName)[0]
    this.updateRenderNumber=this.updateRenderNumber.bind(this)
    this.scrollHandle=this.scrollHandle.bind(this)
  }


  updateRenderNumber(restart){
    if(!this.state.hasMore && !restart){
      this.warpperEle.removeEventListener('scroll', this.scrollHandle)
      return
    }
    if(restart)this.warpperEle.scrollTo(0,0)
    const {matchArticles,searchKeyword}=this.props
    this.setState((prevState)=>{
      const {renderArticles,renderIndex}=prevState
      let _renderIndex=restart?0:renderIndex
      let _renderArticles=restart?[]:renderArticles
      return {
        renderArticles:_renderArticles.concat(matchArticles.slice(_renderIndex,_renderIndex+renderNumber)),
        renderIndex:_renderIndex+renderNumber,
        hasMore:matchArticles.length-_renderIndex > renderNumber || restart,
        searchKeyword:searchKeyword
      }
    })
  }

  // debounce 200
  scrollHandle(){
    clearTimeout(this.timer)
    this.timer=setTimeout(()=>{
      const scrollHeight=this.contentEle.scrollHeight || this.contentEle.clientHeight
      if(scrollHeight -window.innerHeight-this.warpperEle.scrollTop <=250 )
        this.updateRenderNumber()
      // alert(scrollHeight+'..'+this.warpperEle.scrollTop+'...'+window.innerHeight)
    },300)
  }

  shouldComponentUpdate(props,state){
    const {matchArticles,matchTags,searchKeyword}=this.props
    // console.log(props.matchArticles,matchArticles.length )
    return this.state.renderIndex!==state.renderIndex ||
      this.state.renderArticles !== state.renderArticles ||
      searchKeyword!==props.searchKeyword ||
      matchArticles.length !== props.matchArticles.length  ||
      matchTags.length !== props.matchTags.length

  }


  componentDidUpdate(props){
    const {matchArticles,matchTags,searchKeyword}=this.props
    if(matchArticles.length === props.matchArticles.length  &&
      matchTags.length === props.matchTags.length &&
      searchKeyword===this.state.searchKeyword)
      return
    this.warpperEle.removeEventListener('scroll', this.scrollHandle)
    this.warpperEle.addEventListener('scroll', this.scrollHandle)
    this.updateRenderNumber(true)
  }
  componentDidMount() {
    // this.documentHeight= window.innerHeight ||document.documentElement.clientHeight || document.body.clientHeight
    this.warpperEle=this.rootNode.getElementsByClassName("ant-drawer-wrapper-body")[0]
    this.contentEle=this.rootNode.getElementsByClassName("ant-drawer-body")[0]
    this.updateRenderNumber(true)
    this.warpperEle.addEventListener('scroll', this.scrollHandle)
  }

  componentWillUnmount(){
    this.warpperEle.removeEventListener('scroll', this.scrollHandle)
  }

  render() {
    // console.log(this.props.searchKeyword,this.state.searchKeyword)
    const {matchTags,clearSearchInput}=this.props
    const {renderArticles}=this.state
    return (
      <List
        size="small"
      >
        <Divider orientation={"left"} style={styles.divider}>标签</Divider>
        <Row type="flex"
             justify="start"
             gutter={6}
        >
          {matchTags.map((tag,i) => {
            return (
              <TagsCol key={i} tag={tag}/>
            )
          })}
        </Row>

        <Divider orientation={"left"} style={styles.divider}>文章</Divider>
        {renderArticles.map((item,i)=>(
          <CardPure key={i} hoverable
                    bordered={false}
                    style={styles.card}
                    bodyStyle={styles.card_pure_body}
                    statusBarItem={item}
                    noCount={true}
                    title={<div dangerouslySetInnerHTML={{__html: item.title}}/>}
                    summary={<div style={styles.summary}
                                  dangerouslySetInnerHTML={{__html: item.matchContent}}/>}
                    beforeNavigate={clearSearchInput}
          />
        ))}
      </List>
    );
  }
}