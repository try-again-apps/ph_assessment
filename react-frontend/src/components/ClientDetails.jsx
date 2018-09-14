import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import EditIcon from 'material-ui-icons/Edit';
import CloseIcon from 'material-ui-icons/Close';
import ChatIcon from 'material-ui-icons/Chat';
import { Link } from 'react-router';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import _remove from 'lodash/remove';

import './ClientDetails.css';
import { fetchClient } from '../actions/clients';
import { removeNote } from './model';

const operationButtonStyle = {
  minWidth: 32,
  width: 32,
  height: 32,
  minHeight: 32
};

class ClientDetails extends PureComponent {
  state = {};

  componentDidMount() {
    const {
      params: { id }
    } = this.props;
    fetchClient(id).then(json => this.setState({ ...json }));
  }

  renderOperations = id => (
    <div className="col-spacing-2">
      <RaisedButton
        className="small-button"
        icon={<EditIcon />}
        containerElement={<Link to={`/note/${id}/edit`} />}
        onClick={e => e.stopPropagation()}
        style={operationButtonStyle}
      />
      <RaisedButton
        icon={<CloseIcon />}
        onClick={event => {
          this.props.removeNote(id);
          _remove(this.state.notes, item => item._id === id);
          event.stopPropagation();
        }}
        style={operationButtonStyle}
      />
    </div>
  );

  renderNotes() {
    const { notes = [] } = this.state;
    if (notes.length === 0) {
      return 'No notes found';
    }

    const columns = [
      {
        Header: 'Content',
        accessor: 'content'
      },
      {
        Header: 'Operations',
        accessor: '_id',
        Cell: props => this.renderOperations(props.value),
        className: 'right',
        sortable: false
      }
    ];

    return (
      <ReactTable
        className="-striped -highlight"
        columns={columns}
        data={notes}
        defaultPageSize={notes.length}
        noDataText="No notes"
        showPagination={false}
      />
    );
  }

  render() {
    const { _id: id, name, status, details, createdAt } = this.state;
    const subtitle = `Created at: ${moment(createdAt).format(
      'MMM Do YY, HH:mm'
    )}`;
    return (
      <div className="row-spacing-2">
        <div className="col-spacing-2">
          <RaisedButton
            containerElement={<Link to={`/client/${id}/edit`} />}
            label="Edit"
            icon={<EditIcon />}
          />
          <RaisedButton
            containerElement={<Link to={`/client/${id}/addNote`} />}
            icon={<ChatIcon />}
            label="Add note"
            onClick={e => e.stopPropagation()}
          />
        </div>
        <Paper>
          <div className="details">
            <div className="name">{name}</div>
            <div className="subtitle">{subtitle}</div>
            <div>Status: {status}</div>
            <div>Details: {details || 'None'}</div>
            <div>Notes: {this.renderNotes()}</div>
          </div>
        </Paper>
      </div>
    );
  }
}

ClientDetails.propTypes = {
  params: PropTypes.object,

  removeNote: PropTypes.func.isRequired
};

export default connect(
  null,
  { removeNote }
)(ClientDetails);
