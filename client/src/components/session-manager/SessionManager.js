import React from 'react';
import { SessionTimeoutModal } from '../modals/session-timeout/SessionTimeoutModal';
import { logoutUser } from '../../actions/authActions';

export class SessionManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      inactivityThreshold: 3600000, // 1 hour
      timer: undefined
    };
  }

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

  handleLogout = () => {
    localStorage.removeItem('jwtToken');
    this.props.dispatch(logoutUser());
    this.props.history.push('./login');
  };

  render() {
    return (
      <div>
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
