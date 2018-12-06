import React from 'react';
import {Input, Badge, Spin} from 'antd';
import SlideCheckBox from "../tools/SlideCheckBox";

const {Search} = Input;

const styles = {
  search: {width: 256},
  slideSize: {height: 30, width: 50},
  spinWrap: {position: "absolute"},
  badge: {backgroundColor: '#b8b8b8',color: '#fff', transform: "scale(0.7)", transformOrigin: "center", fontSize: "medium"},
  searchAddon: {display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', marginLeft: -11},
  searchWrap: {display: "flex", alignSelf:"center"},
  slideCheckBox:{marginRight: -11}
}

export default class SearchComponent extends React.Component {

  render() {
    const {globalFetching,globalSearch,onChangeHandle,onSearchHandle,controlledValue,toggleGlobalSearch}=this.props
    return (
        <div style={styles.searchWrap}>
          <Search
            addonBefore={
              <span style={styles.searchAddon}>
              <Badge count={"?"}
                     title={"局部搜索只搜素标签，标题和摘要，无额外加载.\n全局搜索搜索全部内容，会有额外加载."}
                     style={styles.badge}/>
              <SlideCheckBox
                style={styles.slideCheckBox}
                checkedChildren={
                  <span>
                    全局
                    <span style={styles.spinWrap}>
                      <Spin spinning={globalFetching}/>
                    </span>
                  </span>
                }
                unCheckedChildren={
                  <span>
                    <span style={styles.spinWrap}>
                      <Spin spinning={globalFetching}/>
                    </span>
                    局部
                  </span>
                }
                size={styles.slideSize}
                checkBoxChange={toggleGlobalSearch}
                isDisabled={globalFetching}
                isChecked={globalSearch}
                id={"slide-checkbox1"} />
              </span>
            }
            placeholder="tag/title/keywords"
            onChange={onChangeHandle}
            onSearch={onSearchHandle}
            enterButton
            value={controlledValue}
            style={styles.search}
          />
        </div>

    )
  }
}

