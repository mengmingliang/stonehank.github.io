import React from 'react';
const emojiData=require('./emoji.json');

export default class EmojiComponentShow extends React.PureComponent {

  render() {
    // console.log(1)
    const {show,contentOnChange}=this.props
    return (
      show
        ? <div className="vemojis">
          {
            Object.keys(emojiData).map(name=>
              <span title={name} key={name} className={"vemoji"} onClick={contentOnChange.bind(null,null,emojiData[name])}>{emojiData[name]}</span>
            )
          }
        </div>
        : null
    );
  }
}
