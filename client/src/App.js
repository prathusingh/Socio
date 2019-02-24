import React, { Component } from "react";
import "./App.scss";
import Header from "./components/layout/header/Header";
import Landing from "./components/layout/landing/Landing";
import Footer from "./components/layout/footer/Footer";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Landing />
        <Footer />
      </div>
    );
  }
}

export default App;
