import React from 'react';
import Loading from "../tools/Loading";
import YearCollapse from "./YearCollapse";

export default class Archive extends React.Component {
  constructor(props){
    super(props)
    const {articles}=props
    this.state={
      contentLoading:true,
      // articles:null,
      listRenderLoading:true,
      activePanel:(articles && articles.activePanel) || ["2018年",""]
    }
    this.changeActiveYear=this.changeActiveYear.bind(this)
    this.changeActiveMonth=this.changeActiveMonth.bind(this)
  }
  changeActiveYear(activeY){
    const {articles}=this.props
    let newActPan=this.state.activePanel.slice(0)
    newActPan[0]=activeY
    articles.activePanel=newActPan
    this.setState({
      activePanel:newActPan
    })
  }
  changeActiveMonth(activeM){
    const {articles}=this.props
    let newActPan=this.state.activePanel.slice(0)
    newActPan[1]=activeM
    articles.activePanel=newActPan
    this.setState({
      activePanel:newActPan
    })
  }


  // todo 是否需要配置state保存articles，取决于外部更新是否频繁
  // 此组件默认每次渲染，具体拦截在YearCollapse
  static getDerivedStateFromProps(nextProps){
    const {articles}=nextProps
    console.log(articles)
    if(!articles)return null
    return {
      // articles,
      contentLoading:false
    }
  }
  render() {

    const {contentLoading,activePanel}=this.state
    const {articles}=this.props
    return contentLoading ?
      <Loading loading={contentLoading} render_nums={1} ske_title_width={"30%"} ske_para_width={"50%"} ske_para_rows={10} /> :
      <React.Fragment>
        {Object.keys(articles).map((year) => {
          const monthList=articles[year]
          return (
            <YearCollapse monthList={monthList} year={year}
                          activePanel={activePanel}
                          changeActiveYear={this.changeActiveYear}
                          changeActiveMonth={this.changeActiveMonth} />
          )
        })}
      </React.Fragment>
  }
}

