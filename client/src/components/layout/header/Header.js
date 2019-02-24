import React, { Component } from 'react';
import './Header.scss';

class Header extends Component {
  render() {
    return (
      <div className='header'>
        <div className='email'>
          <label for='email'>Email: </label>
          <input type='email' name='email' />
        </div>
        <div className='password'>
          <label for='password'>Password: </label>
          <input type='password' name='password' />
        </div>
        <input type='submit' name='submit' value='Login' />
      </div>
    );
  }
}

export default Header;
