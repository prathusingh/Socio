import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { LandingLoginForm } from './landing-login/LandingLogin';
import keys from '../../../config/keys';
import { loginGoogleAuthUser } from '../../../actions/authActions';
import './Auth.scss';

class Auth extends Component {
  googleResponse = response => {
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.accessToken }, null, 2)],
      { type: 'application/json' }
    );
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    };

    this.props.dispatch(loginGoogleAuthUser(options, this.props.history));
  };

  onFailure = err => {
    console.log(err);
  };
  render() {
    return (
      <div className="auth">
        <LandingLoginForm />
        <div className="auth-buttons">
          <Link to="/login">
            <button name="Login" type="button">
              Log in
            </button>
          </Link>
          <Link to="/signup">
            <button name="Signup" type="button">
              Sign up
            </button>
          </Link>
        </div>
        <GoogleLogin
          clientId={keys.GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={this.googleResponse}
          onFailure={this.onFailure}
        />
      </div>
    );
  }
}

export default connect()(withRouter(Auth));
