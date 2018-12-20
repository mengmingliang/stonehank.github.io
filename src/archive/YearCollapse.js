import React from 'react';
import {Collapse} from 'antd';
import MonthCollapse from "./MonthCollapse";
import ArchiveList from "./ArchiveList";

const Panel = Collapse.Panel;

const styles={
  yearStyle:{
    background: '#e1e1e1',
    borderRadius: 4,
    border: 0,
    overflow: 'hidden',
  },
  defaultMargin:{margin: '24px 36px'}
}

export default class YearCollapse extends React.Component {

  constructor(props) {
    super(props)
    const {activePanel} = props
    this.state = {
      curActivePanel: activePanel
    }
  }
  //取消其他非相关组件的渲染
  shouldComponentUpdate(nextProps,nextState){
    const {year,activePanel}=nextProps
    const {curActivePanel}=nextState
    return !activePanel.includes(year) && !curActivePanel.includes(year)
  }

  componentDidUpdate(){
    if(this.props.activePanel[0]!==this.state.curActivePanel[0]){
      // 防止动画效果被取消
      // setTimeout(()=>{
        this.setState({
          curActivePanel:this.props.activePanel
        })
      // },200)
    }
  }


  render() {
    const {monthList,activePanel,year,changeActiveYear,changeActiveMonth,archiveEachPage}=this.props
    // console.log(year,!year)
    return (
      <Collapse style={styles.defaultMargin} accordion
                bordered={false}
                activeKey={activePanel[0]}
                onChange={changeActiveYear}
      >
        { year!=="noDate"
          ? <Panel header={year + "年"} key={year + "年"} style={styles.yearStyle}>
              {monthList.map((dayList, j) => {
                if (dayList && dayList.length > 0) {
                  return <MonthCollapse key={j + 1 + "月"} dayList={dayList}
                                        month={j + 1}
                                        archiveEachPage={archiveEachPage}
                                        activePanel={activePanel}
                                        changeActiveMonth={changeActiveMonth}/>
                }
                return null
              })}
            </Panel>
          : <Panel header={"无时间归档"} style={styles.yearStyle} >
              <ArchiveList dayList={monthList} archiveEachPage={archiveEachPage}/>
            </Panel>
        }
      </Collapse>

    )
  }
}

