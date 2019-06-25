import React from 'react';

import { SessionManager } from '../session-manager/SessionManager';

export default class Home extends React.Component {
  /**
   * TODO: For any kind of user interaction We will reintialize the timer by calling startTimer()
   */

  render() {
    return (
      <div>
        <p>Welcome {this.props.auth.user.name} !</p>
        <SessionManager {...this.props} />
      </div>
    );
  }
}
