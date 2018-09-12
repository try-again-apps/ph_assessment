import React, { PureComponent } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addClient } from './model';

class Toolbar extends PureComponent {
  // addClient = () => console.info('add client');

  addClient = () => {
    this.props.addClient({
      name: 'Test',
      description: 'opis',
      status: 'prospective'
    });
  };

  render() {
    return (
      <div>
        <RaisedButton containerElement={<Link to="/" />} label="Home" />
        <RaisedButton onClick={this.addClient} label="Add New" />
        <RaisedButton containerElement={<Link to="/about" />} label="About" />
      </div>
    );
  }
}

Toolbar.propTypes = {
  addClient: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    addClient
  }
)(Toolbar);
