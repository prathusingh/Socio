import React, { Component } from 'react';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }
  render() {
    return (
      <form className="login">
        <input
          name="email"
          type="text"
          placeholder="email"
          value={this.state.email}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={this.state.password}
        />
        <button type="submit" name="login">
          Log in
        </button>
        <div className="login-extras">
          <input type="checkbox" name="remember" id="rememberMe" />
          <label for="rememberMe">Remember me</label>
          <span>.</span>
          <a href="#">Forgot passowrd?</a>
        </div>
      </form>
    );
  }
}
