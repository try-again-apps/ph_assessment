import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import PeopleIcon from 'material-ui-icons/People';
import HelpOutline from 'material-ui-icons/HelpOutline';
import ChatIcon from 'material-ui-icons/Chat';

const Navbar = () => (
  <div className="col-spacing-2">
    <RaisedButton
      containerElement={<Link to="/" />}
      label="Clients"
      icon={<PeopleIcon />}
    />
    <RaisedButton
      containerElement={<Link to="/notes" />}
      label="Notes (debug)"
      icon={<ChatIcon />}
    />
    <RaisedButton
      containerElement={<Link to="/about" />}
      label="About"
      icon={<HelpOutline />}
    />
  </div>
);

export default Navbar;
