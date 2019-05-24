import React from 'react';
import EditAreaComponent from "./edit-components/EditAreaComponent";
import ButtonContainer from "./button-components/ButtonContainer";
import TextAreaComponent from "./edit-components/TextAreaComponent";


export default class InputComponent extends React.PureComponent {


  render() {
    const {
      link,
      email,
      nickName,
      commentContent,
      emailOnChange,
      avatarSrc,
      requireName,
      requireEmail,
      GRAVATAR_URL,
      placeholder,
      submitBtnDisable,
      toggleTextAreaFocus,
      previewShow,
      linkOnChange,
      contentOnChange,
      nameOnChange,
      handleOnSubmit,
      togglePreviewShow,
      avatarOnChange
    } = this.props;
    return (
      <React.Fragment>
        <EditAreaComponent link={link}
                           email={email}
                           nickName={nickName}
                           avatarSrc={avatarSrc}
                           requireName={requireName}
                           requireEmail={requireEmail}
                           GRAVATAR_URL={GRAVATAR_URL}
                           emailOnChange={emailOnChange}
                           linkOnChange={linkOnChange}
                           nameOnChange={nameOnChange}
                           avatarOnChange={avatarOnChange}
        />
        <div className="vedit">
          <TextAreaComponent toggleTextAreaFocus={toggleTextAreaFocus}
                             commentContent={commentContent}
                             placeholder={placeholder}
                             contentOnChange={contentOnChange}
          />
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
          