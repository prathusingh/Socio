import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { logoutUser } from '../../actions/authActions';

class Feed extends React.Component {
  handleLogout = () => {
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

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

Feed.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Feed);
