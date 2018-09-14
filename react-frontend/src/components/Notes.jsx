import React, { PureComponent } from 'react';
import ReactTable from 'react-table';
import _remove from 'lodash/remove';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import CloseIcon from 'material-ui-icons/Close';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchNotes } from '../actions/notes';
import { removeNote } from './model';

const operationButtonStyle = {
  minWidth: 32,
  width: 32,
  height: 32,
  minHeight: 32
};

class Notes extends PureComponent {
  state = {
    notes: []
  };

  componentWillMount() {
    fetchNotes().then(json => this.setState({ notes: json }));
  }

  renderOperations = id => (
    <div className="col-spacing-2">
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

  render() {
    const { notes } = this.state;
    console.info(notes);

    const columns = [
      {
        Header: 'Content',
        accessor: 'content'
      },
      {
        Header: 'Client id',
        accessor: 'client'
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
        noDataText="No notes"
        showPagination={false}
      />
    );
  }
}

Notes.propTypes = {
  removeNote: PropTypes.func.isRequired
};

export default connect(
  null,
  { removeNote }
)(Notes);
