import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';

import { setCurrentUser } from '../../../actions/authActions';

export default ComposedComponent => {
  class Authentication extends React.Component {
    componentWillMount() {
      this.checkAuthentication();
    }

    componentWillUpdate(nextProps) {
      this.checkAuthentication();
    }

    checkAuthentication() {
      if (
        !this.props.auth.isAuthenticated &&
        localStorage.getItem('jwtToken') === null
      ) {
        this.props.history.push('/');
      } else {
        // if the token is valid but user hit the url directly
        // then set the current user from token
        if (
          localStorage.getItem('jwtToken') !== null &&
          !this.props.auth.isAuthenticated
        ) {
          const token = localStorage.getItem('jwtToken');
          // decode token
          const decoded = jwt_decode(token);

          // set current user
          this.props.dispatch(setCurrentUser(decoded));
        }
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return {
      ...state
    };
  };

  return connect(mapStateToProps)(withRouter(Authentication));
};
