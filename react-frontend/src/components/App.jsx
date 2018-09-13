import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';

// import logo from '../assets/logo.svg';
import './App.css';
import Toolbar from './Toolbar';
import Navbar from './Navbar';

const paperStyle = {
  padding: 16
};

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className="container">
        {/* <div className="App">
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
              <Link to="/">Clients</Link>
            </li>
          </ul> */}
          <Paper zDepth={4} style={paperStyle}>
            <Navbar />
          </Paper>
          <Paper zDepth={4} style={paperStyle}>
            {this.props.children}
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
