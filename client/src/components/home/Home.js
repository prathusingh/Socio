import React from 'react';

import { logoutUser } from '../../actions/authActions';

export default class Home extends React.Component {
  handleLogout = () => {
    localStorage.removeItem('jwtToken');
    this.props.dispatch(logoutUser());
    this.props.history.push('./login');
  };

  render() {
    return (
      <div>
        <p>Welcome {this.props.auth.user.name} !</p>
        <button type="button" onClick={this.handleLogout}>
          Logout
        </button>
      </div>
    );
  }
}
