import React from 'react';
import NavSiderComponent from "./NavSiderComponent";

export default class NavSiderContainer extends React.PureComponent {
  constructor(props){
    super(props)
    this.state={
      selectedKey:props.selectedKey||"/home",
      collapse:false,
      collapsible:false
    }
    this.toggleCollapse=this.toggleCollapse.bind(this)
    this.toggleCollapsible=this.toggleCollapsible.bind(this)
  }
  toggleCollapsible(breakPoint){
      this.setState({
        collapse:breakPoint,
        collapsible:breakPoint
      })
  }
  toggleCollapse(){
    if(this.state.collapsible)
    this.setState(prevS=>({
      collapse:!prevS.collapse
    }))
  }

  static getDerivedStateFromProps(nextProps,prevState){
    if(nextProps.selectedKey===prevState.selectedKey)return null
    return {
      selectedKey:nextProps.selectedKey
    }
  }
  render() {
    const {bio,avatar,username}=this.props
      const {selectedKey,collapse,collapsible}=this.state
    return (
      <NavSiderComponent bio={bio}
                         avatar={avatar}
                         username={username}
                         selectedKey={selectedKey}
                         collapse={collapse}
                         collapsible={collapsible}
                         toggleCollapse={this.toggleCollapse}
                         toggleCollapsible={this.toggleCollapsible}
      />
    );
  }
}
