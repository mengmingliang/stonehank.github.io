import React from 'react';


export default class TextAreaComponent extends React.PureComponent {
  constructor(props){
    super(props)
    this.ref=React.createRef()
  }
  componentDidUpdate(prevProps){
    if(this.props.toggleTextAreaFocus!==prevProps.toggleTextAreaFocus){
      this.ref.current.focus()
    }
  }

  render() {
    const {
      commentContent,
      placeholder,
      contentOnChange,
    } = this.props;

    return <textarea ref={this.ref}
                     id="veditor"
                     className={"veditor vinput"}
                     placeholder={placeholder}
                     onChange={contentOnChange}
                     value={commentContent}
    />

  }
}
