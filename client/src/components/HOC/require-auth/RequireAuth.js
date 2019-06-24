import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

export default ComposedComponent => {
  class Authentication extends React.Component {
    componentWillMount() {
      if (
        !this.props.auth.isAuthenticated &&
        localStorage.getItem('jwtToken') === null
      ) {
        this.props.history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (
        !nextProps.auth.isAuthenticated &&
        localStorage.getItem('jwtToken') === null
      ) {
        this.props.history.push('/');
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
