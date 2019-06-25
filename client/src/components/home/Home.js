import React from 'react';

import { logoutUser } from '../../actions/authActions';
import { SessionTimeoutModal } from '../modals/session-timeout/SessionTimeoutModal';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      inactivityThreshold: 10000,
      timer: undefined
    };
  }

  handleLogout = () => {
    localStorage.removeItem('jwtToken');
    this.props.dispatch(logoutUser());
    this.props.history.push('./login');
  };

  startTimer() {
    if (typeof this.state.timer !== 'undefined') {
      clearTimeout(this.state.timer);
    }
    const newTimer = setTimeout(() => {
      this.showModal();
    }, this.state.inactivityThreshold);

    this.setState({ timer: newTimer });
  }

  componentWillMount() {
    this.startTimer();
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  /**
   * TODO: For any kind of user interaction We will reintialize the timer by calling startTimer()
   */

  render() {
    return (
      <div>
        <p>Welcome {this.props.auth.user.name} !</p>
        <button type="button" onClick={this.handleLogout}>
          Logout
        </button>
        <SessionTimeoutModal
          show={this.state.show}
          handleContinue={this.hideModal}
          handleLogout={this.handleLogout}
          inactivityThreshold={this.inactivityThreshold}
        >
          <p>You are being timedoff due to inactivity.</p>
          <p>Please choose to stay signed in or to logoff.</p>
          <p>Otherwise, you will logoff automatically.</p>
        </SessionTimeoutModal>
      </div>
    );
  }
}
