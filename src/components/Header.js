import React, { Component } from 'react';
import logo from '../image/logo.svg';
import './Header.css';

 class Header extends Component {
  render() {
    return (
      <div className="Header ">
        <header className="Header-header">
          <img src={logo} className="Header-logo" alt="logo" />
          <h1 className="Header-title">Welcome to React</h1>
        </header>
      </div>    
    );
  }
}

export default Header;
