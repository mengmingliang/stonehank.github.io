import React from 'react';

export default class NotFound extends React.Component {

  render() {
    return (
      <div>
        <div className="show">
          <span>Page</span>
          <span>Not</span>
          <span>Found</span>
        </div>
        <div className="show" id="spotlight">
          <div id="spotlightHelper">
            <span>Page</span>
            <span>Not</span>
            <span>Found</span>
          </div>
        </div>
      </div>
    )
  }
}

