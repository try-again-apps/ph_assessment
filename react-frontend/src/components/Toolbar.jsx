import React, { PureComponent } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PeopleIcon from 'material-ui-icons/People';
import PersonAddIcon from 'material-ui-icons/PersonAdd';
import HelpOutline from 'material-ui-icons/HelpOutline';

import { addClient } from './model';

class Toolbar extends PureComponent {
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
        <RaisedButton
          containerElement={<Link to="/" />}
          label="Clients"
          icon={<PeopleIcon />}
        />
        <RaisedButton
          icon={<PersonAddIcon />}
          label="Add New"
          onClick={this.addClient}
        />
        <RaisedButton
          containerElement={<Link to="/about" />}
          label="About"
          icon={<HelpOutline />}
        />
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
