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
  searchWrap: {display: "flex"},
  slideCheckBox:{marginRight: -11}
}

// export default function SearchComponentHOC(Component){
  export default class SearchInputComponent extends React.Component{
    static defaultProps={
      placeholder:"tag/title/keywords"
    }
    render() {
      const {
        globalFetching,
        globalSearch,
        onChangeHandle,
        onSearchHandle,
        controlledValue,
        toggleGlobalSearch,
        id,
        needGlobalMode,
        placeholder}=this.props
      // console.log(otherProps)
      return (
        <div style={styles.searchWrap}>
          <Search
            addonBefore={
                  needGlobalMode
                    ? <span style={styles.searchAddon}>
                    <Badge count={"?"}
                           title={"局部搜索只搜素标签，标题和摘要，无额外加载.\n全局搜索搜索全部内容，会有额外加载."}
                           style={styles.badge}/>
                    <SlideCheckBox style={styles.slideCheckBox}
                                   checkedChildren={
                                     <span>全局
                                     <span style={styles.spinWrap}>
                                       <Spin spinning={globalFetching}/>
                                     </span>
                                   </span>
                                   }
                                   unCheckedChildren={
                                     <span>
                                     <span style={styles.spinWrap}>
                                       <Spin spinning={globalFetching}/>
                                     </span>局部
                                   </span>
                                   }
                                   size={styles.slideSize}
                                   checkBoxChange={toggleGlobalSearch}
                                   isDisabled={globalFetching}
                                   isChecked={globalSearch}
                                   id={id} />
                  </span>
                    : null
            }
            placeholder={placeholder}
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
// }




