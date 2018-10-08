import React from 'react';
import {Skeleton,Collapse,List,Button,Col,Tag,Icon} from 'antd';
import ArchiveList from './ArchiveList'


const Panel = Collapse.Panel;

const styles={
  monthStyle:{
    background: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
  }
}

export default class MonthCollapse extends React.Component {

  constructor(props) {
    super(props)
    const {activePanel} = props
    this.state = {
      curActivePanel: activePanel
    }
  }

  // 取消其他非相关组件的渲染
  shouldComponentUpdate(nextProps,nextState){
    const {month,activePanel}=nextProps
    const {curActivePanel}=nextState
    return !activePanel.includes(month) && !curActivePanel.includes(month)
  }

  componentDidUpdate(){
    if(this.props.activePanel[1]!==this.state.curActivePanel[1]){
      // 防止动画效果被取消
      setTimeout(()=>{
        this.setState({
          curActivePanel:this.props.activePanel
        })
      },500)
    }
  }
  render() {
    const {dayList,activePanel,changeActiveMonth,month}=this.props
    return (
        <Collapse accordion
                  activeKey={activePanel[1]}
                  onChange={changeActiveMonth}
        >
                <Panel header={month+"月"} key={month+"月"} style={styles.monthStyle}>
                  <ArchiveList dayList={dayList} />
                </Panel>

        </Collapse>
    )
  }
}

