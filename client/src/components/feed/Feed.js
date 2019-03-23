import React from 'react';
import { connect } from 'react-redux';

class Feed extends React.Component {
  render() {
    return <p>Welcome {this.props.auth.user.name} !</p>;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Feed);
