import React, { PureComponent } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addClient, updateClient } from './model';
import { fetchClient } from '../actions/clients';

class ClientForm extends PureComponent {
  state = {
    name: '',
    details: '',
    status: 'prospective'
  };

  componentDidMount() {
    const { params: { id } = {} } = this.props;
    if (id) {
      fetchClient(id).then(json => this.setState({ ...json }));
    }
  }

  onSave = () => {
    const {
      addClient,
      params: { id } = {},
      updateClient,
      onFinish
    } = this.props;
    const { name, details, status } = this.state;
    if (id) {
      updateClient({ id, name, details, status });
    } else {
      addClient({ name, details, status });
      onFinish();
    }
  };

  onChangeStatus = (event, index, value) => this.setState({ status: value });

  onChangeName = event => {
    this.setState({ name: event.target.value });
  };

  onChangeDetails = event => {
    this.setState({ details: event.target.value });
  };

  render() {
    const { params: { id } = {}, onFinish } = this.props;
    const cancelLinkTo = onFinish ? '' : id ? `/client/${id}` : '/';
    const title = `${id ? 'Edit' : 'Add'} client`;
    return (
      <div className="column">
        <h3>{title}</h3>
        <TextField
          hintText="Name"
          onChange={this.onChangeName}
          value={this.state.name}
        />
        <DropDownMenu
          value={this.state.status}
          onChange={this.onChangeStatus}
          autoWidth={false}
        >
          <MenuItem value={'prospective'} primaryText="prospective" />
          <MenuItem value={'current'} primaryText="current" />
          <MenuItem value={'non-active'} primaryText="non-active" />
        </DropDownMenu>
        <TextField
          hintText="Details"
          onChange={this.onChangeDetails}
          value={this.state.details}
        />
        <div>
          <RaisedButton
            containerElement={<Link to={cancelLinkTo} />}
            label="Cancel"
            onClick={onFinish}
          />
          <RaisedButton label="Save" onClick={this.onSave} />
        </div>
      </div>
    );
  }
}

ClientForm.propTypes = {
  params: PropTypes.object,

  addClient: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired,
  onFinish: PropTypes.func
};

export default connect(
  null,
  {
    addClient,
    updateClient
  }
)(ClientForm);
