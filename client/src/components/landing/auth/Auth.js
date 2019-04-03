import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { LandingLogin } from './landing-login/LandingLogin';
import keys from '../../../config/keys';
import './Auth.scss';

export class Auth extends Component {
  googleResponse = response => {
    alert('hola');
    console.log(response);
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
    fetch('http://localhost:8000/api/users/auth/google/token', options).then(
      r => {
        console.log(r);
      }
    );
  };

  onFailure = err => {
    console.log(err);
  };
  render() {
    return (
      <div className="auth">
        <LandingLogin />
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
