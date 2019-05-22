import React from 'react';
import EditAreaComponent from "./edit-components/EditAreaComponent";
import ButtonContainer from "./button-components/ButtonContainer";


export default class InputComponent extends React.Component {
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
    const { link,email,nickName,commentContent,emailOnChange,avatarSrc,requireName,requireEmail,
      GRAVATAR_URL, placeholder,submitBtnDisable,toggleTextAreaFocus,
      previewShow, linkOnChange,contentOnChange,nameOnChange,handleOnSubmit,
      togglePreviewShow,avatarOnChange} = this.props;
    return (
      <React.Fragment>
        <EditAreaComponent link={link}
                           email={email}
                           nickName={nickName}
                           avatarSrc={avatarSrc}
                           requireName={requireName}
                           requireEmail={requireEmail}
                           GRAVATAR_URL={GRAVATAR_URL}
                           toggleTextAreaFocus={toggleTextAreaFocus}
                           emailOnChange={emailOnChange}
                           linkOnChange={linkOnChange}
                           nameOnChange={nameOnChange}
                           avatarOnChange={avatarOnChange}
        />
        <div className="vedit">
          <textarea ref={this.ref} id="veditor" className={"veditor vinput"} placeholder={placeholder} onChange={contentOnChange} value={commentContent}/>
          <ButtonContainer contentOnChange={contentOnChange}
                           previewShow={previewShow}
                           commentContent={commentContent}
                           togglePreviewShow={togglePreviewShow}
                           submitBtnDisable={submitBtnDisable}
                           handleOnSubmit={handleOnSubmit}
          />
        </div>
      </React.Fragment>
    );
  }
}
          