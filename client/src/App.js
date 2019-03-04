import React, { Component } from 'react';
import './App.scss';
import { About } from './components/landing/about/About';
import { Auth } from './components/landing/auth/Auth';
import { Footer } from './components/landing/footer/Footer';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="landing">
          <About />
          <Auth />
        </div>
        <Footer />
      </div>
    );
  }
}
