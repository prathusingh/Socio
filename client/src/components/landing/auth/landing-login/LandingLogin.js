import React, { Component } from 'react';
import './LandingLogin.scss';

export class LandingLogin extends Component {
  render() {
    return (
      <div className="landing-login">
        <input type="text" placeholder="email" />
        <input type="password" placeholder="password" />
        <button type="submit">Log in</button>
      </div>
    );
  }
}
