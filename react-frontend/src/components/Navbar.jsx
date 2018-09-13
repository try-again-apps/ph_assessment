import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import PeopleIcon from 'material-ui-icons/People';
import HelpOutline from 'material-ui-icons/HelpOutline';

const Navbar = () => (
  <div>
    <RaisedButton
      containerElement={<Link to="/" />}
      label="Clients"
      icon={<PeopleIcon />}
    />
    <RaisedButton
      containerElement={<Link to="/about" />}
      label="About"
      icon={<HelpOutline />}
    />
  </div>
);

export default Navbar;
