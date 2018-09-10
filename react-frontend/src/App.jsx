import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            {'Welcome to "All I could do in free time I\'ve had"'}
          </h1>
        </header>
        <p className="App-intro">
          {"Sorry I'm not a designer. That is why it looks this way :/"}
        </p>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
