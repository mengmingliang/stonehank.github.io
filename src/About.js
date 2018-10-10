import React from 'react';




export default class About extends React.PureComponent {
  render() {
    const {aboutMe}=this.props
    return (

      <div>
        <p>{aboutMe}</p>
      </div>
    )
  }
}

