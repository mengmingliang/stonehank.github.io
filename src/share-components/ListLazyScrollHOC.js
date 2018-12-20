import React from 'react'


export default function ListLazyScrollHOC(Component) {
  return class ListLazyScroll extends React.Component {
    static defaultProps={
      delay:0,
      renderNumber:5,
      offset:250,
      useWindow:false
    }
    constructor(props) {
      super(props)
      this.state = {
        lazyRenderData: [],
        renderIndex: 0,
        hasMore: null,
        curAllData:null,
        curKeyword:null,
        reset:true
      }
      this.updateRenderNumber = this.updateRenderNumber.bind(this)
      this.scrollHandle = this.scrollHandle.bind(this)
      this.startReg=this.startReg.bind(this)
    }


    updateRenderNumber() {
      if (!this.state.hasMore) return
      const {allData,renderNumber} = this.props
      this.setState((prevState) => {
        const {lazyRenderData, renderIndex} = prevState
        return {
          lazyRenderData: lazyRenderData.concat(allData.slice(renderIndex, renderIndex + renderNumber)),
          renderIndex: renderIndex + renderNumber,
          hasMore: allData.length - renderIndex > renderNumber,
          reset:false
        }
      })
    }

    startReg(){
      const {useWindow,wrapperEle,contentEle,allData,renderNumber,keyword}=this.props
      Promise.resolve().then(()=>{
        if(useWindow){
          this.wrapperEle= document.documentElement || document.body.parentNode || document.body
          this.scroller=window
        } else {
          this.wrapperEle = wrapperEle()
          this.scroller=this.wrapperEle
        }
        this.contentEle = contentEle()
        this.setState({
          lazyRenderData: [].concat(allData.slice(0, renderNumber)),
          renderIndex: renderNumber,
          hasMore: allData.length  > renderNumber ,
          curAllData:allData,
          curKeyword:keyword,
          reset:true
        },()=>this.updateRenderNumber())
      })
    }


    scrollHandle() {
      const {delay,offset}=this.props
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const scrollHeight = this.contentEle.scrollHeight
        if (scrollHeight - this.wrapperEle.clientHeight - this.wrapperEle.scrollTop <= offset) {
          this.scroller.removeEventListener('scroll', this.scrollHandle)
          this.updateRenderNumber()
        }
      }, delay)
    }



    static getDerivedStateFromProps(props,state){
      const {allData,keyword,renderNumber} = props
      if(!state.curAllData || state.curAllData.length!==allData.length || state.curKeyword!==keyword){
        return {
          lazyRenderData: [].concat(allData.slice(0, renderNumber)),
          renderIndex: renderNumber,
          hasMore: allData.length  > renderNumber ,
          curAllData:allData,
          curKeyword:keyword,
          reset:true
        }
      }
      return null
    }

    shouldComponentUpdate(nextProps,nextState) {
      const {allData, keyword} = this.props
      const {renderIndex,lazyRenderData}=this.state
      return renderIndex !== nextState.renderIndex ||
        lazyRenderData !== nextState.lazyRenderData ||
        allData.length !== nextProps.allData.length ||
        keyword !== nextProps.keyword
    }
    componentDidUpdate(){
      if(!this.wrapperEle || !this.contentEle ||!this.scroller)return
      if(!this.state.hasMore)return
      this.scroller.addEventListener('scroll', this.scrollHandle)
      if(this.state.reset)this.wrapperEle.scrollTo(0, 0)
    }

    componentWillUnmount() {
      if(this.scroller ) this.scroller.removeEventListener('scroll', this.scrollHandle)
      this.wrapperEle = null
      this.contentEle = null
      clearTimeout(this.timer)
    }
    render(){
      // console.log('render')
      const {allData,wrapperEle,contentEle,keyword,...otherProps}=this.props
      const {lazyRenderData}=this.state
      return (
        <Component  startReg={this.startReg} lazyRenderData={lazyRenderData} {...otherProps} />
      )
    }
  }
}


