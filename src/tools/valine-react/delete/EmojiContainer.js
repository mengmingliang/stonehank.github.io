import React from 'react';
import EmojiComponent from "../textArea/button-components/emoji/EmojiComponent";



export default class EmojiContainer extends React.Component {
  constructor(props){
    super(props)
    this.state={
      show:false
    }
    this.handleToggle=this.handleToggle.bind(this)
  }

  handleToggle(){
    this.setState((prevState)=>({
      show:!prevState.show
    }))
  }

  render() {
    const {show} = this.state;
    const {contentOnChange}=this.props
    return (
      <EmojiComponent show={show}
                      contentOnChange={contentOnChange}
                      handleToggle={this.handleToggle} />
    );
  }
}
