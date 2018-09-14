import React, { PureComponent } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

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
      if (onFinish) {
        onFinish();
      }
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
    const { name, status, details } = this.state;
    const { params: { id } = {}, onFinish } = this.props;
    const cancelLinkTo = onFinish ? '' : id ? `/client/${id}` : '/';
    const title = `${id ? 'Edit' : 'Add'} client`;
    return (
      <div className="row-spacing-2">
        <div className="col-spacing-2">
          <RaisedButton
            containerElement={<Link to={cancelLinkTo} />}
            label="Cancel"
            onClick={onFinish}
          />
          <RaisedButton label="Save" onClick={this.onSave} />
        </div>
        <Paper>
          <div className="inner-container column">
            <h2>{title}</h2>
            <TextField
              hintText="Name"
              onChange={this.onChangeName}
              value={name}
            />
            <DropDownMenu
              autoWidth={false}
              onChange={this.onChangeStatus}
              style={{ width: 256 }}
              value={status}
            >
              <MenuItem value={'prospective'} primaryText="prospective" />
              <MenuItem value={'current'} primaryText="current" />
              <MenuItem value={'non-active'} primaryText="non-active" />
            </DropDownMenu>
            <TextField
              hintText="Details"
              onChange={this.onChangeDetails}
              value={details}
            />
          </div>
        </Paper>
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
