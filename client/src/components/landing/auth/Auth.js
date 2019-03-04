import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LandingLogin } from './landing-login/LandingLogin';
import './Auth.scss';

export class Auth extends Component {
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
          <button name="Signup" type="button">
            Sign up
          </button>
        </div>
      </div>
    );
  }
}
