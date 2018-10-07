import React from 'react';
import {Skeleton,Collapse,List,Button,Col,Tag,Icon} from 'antd';
import ArticleStatusBar from "./ArticleStatusBar"
import {Link} from "@reach/router"
import ArchiveList from './ArchiveList'
import Loading from "./Loading";



const Panel = Collapse.Panel;

const styles={
  yearStyle:{
    // width:"80%",
    background: '#e1e1e1',
    borderRadius: 4,
    border: 0,
    overflow: 'hidden',
  },
  monthStyle:{
    background: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
  },
  defaultMargin:{margin: '24px 36px'}
}
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
  static getDerivedStateFromProps(nextProps){
    const {articles}=nextProps
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
      <Collapse style={styles.defaultMargin} accordion
                bordered={false}
                activeKey={activePanel[0]}
                onChange={this.changeActiveYear}
      >
        { Object.keys(articles).map((year)=>(
          <Panel header={year+"年"} key={year+"年"} style={styles.yearStyle}>
            <Collapse accordion
                      activeKey={activePanel[1]}
                      onChange={this.changeActiveMonth}
            >
              {articles[year].map((month,j)=>{
                if(month && month.length>0){
                  return (
                    <Panel header={j+1+"月"} key={j+1+"月"} style={styles.monthStyle}>
                      <ArchiveList month={month} />
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

