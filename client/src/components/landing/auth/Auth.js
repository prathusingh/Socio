import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { LandingLoginForm } from './landing-login/LandingLogin';
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
        <div className="login">
          <Link to="/login">
            <button name="Login" type="button" className="small-btn">
              Log in
            </button>
          </Link>
        </div>
        <div className="signup">
          <section>
            <h2>Embrace your daily routine outside work !</h2>
            <h3>Join Socio today.</h3>
            <Link to="/signup">
              <button name="Signup" type="button" className="wide-btn">
                Sign up
              </button>
            </Link>
          </section>
        </div>
        <div className="google-login">
          <GoogleLogin
            clientId={process.env.GOOGLE_CLIENT_ID}
            buttonText="Continue with Google"
            onSuccess={this.googleResponse}
            onFailure={this.onFailure}
          />
        </div>
      </div>
    );
  }
}

export default connect()(withRouter(Auth));
