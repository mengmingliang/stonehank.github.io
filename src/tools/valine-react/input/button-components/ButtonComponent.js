import React from 'react';
import EmojiComponent from "./emoji/EmojiComponent";
import PreviewComponent from "./preview/PreviewComponent";


export default class ButtonComponent extends React.PureComponent {

  render() {
    const {previewShow,togglePreviewShow}=this.props
    return (
      <div className={"vctrl"}>
        <EmojiComponent toggleEmojiShow={this.toggleEmojiShow}/>
        <PreviewComponent previewShow={previewShow} togglePreviewShow={togglePreviewShow}/>
      </div>

    );
  }
}
