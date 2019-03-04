import React, { Component } from 'react';
import { LandingLogin } from './landing-login/LandingLogin';
import './Auth.scss';

export class Auth extends Component {
  render() {
    return (
      <div className="auth">
        <LandingLogin />
        <div className="auth-buttons">
          <button name="Login" type="button">
            Log in
          </button>
          <button name="Signup" type="button">
            Sign up
          </button>
        </div>
      </div>
    );
  }
}
