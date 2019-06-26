import React from 'react';
import IdleTimer from 'react-idle-timer';

import { SessionTimeoutModal } from '../modals/session-timeout/SessionTimeoutModal';
import { logoutUser } from '../../actions/authActions';
import constants from '../../utils/constants';

export class SessionManager extends React.Component {
  constructor(props) {
    super(props);
    this.idleTimer = null;
    this.onAction = this._onAction.bind(this);
    this.onActive = this._onActive.bind(this);
    this.onIdle = this._onIdle.bind(this);
    this.state = {
      show: false,
      timer: undefined
    };
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

  _onAction(e) {
    console.log('user did something', e);
  }

  _onActive(e) {
    console.log('user is active', e);
    console.log('time remaining', this.idleTimer.getRemainingTime());
  }

  _onIdle(e) {
    console.log('user is idle', e);
    console.log('last active', this.idleTimer.getLastActiveTime());
    this.showModal();
  }

  render() {
    return (
      <div>
        <IdleTimer
          ref={ref => {
            this.idleTimer = ref;
          }}
          element={document}
          onActive={this.onActive}
          onIdle={this.onIdle}
          onAction={this.onAction}
          debounce={250}
          timeout={constants.userInactivityThreshold}
        />
        <button type="button" onClick={this.handleLogout}>
          Logout
        </button>
        <SessionTimeoutModal
          show={this.state.show}
          handleContinue={this.hideModal}
          handleLogout={this.handleLogout}
        >
          <p>You are being timedoff due to inactivity.</p>
          <p>Please choose to stay signed in or to logoff.</p>
          <p>Otherwise, you will logoff automatically.</p>
        </SessionTimeoutModal>
      </div>
    );
  }
}
