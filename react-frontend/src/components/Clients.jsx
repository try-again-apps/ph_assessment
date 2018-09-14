import React, { PureComponent } from 'react';
import ReactTable from 'react-table';
import EditIcon from 'material-ui-icons/Edit';
import CloseIcon from 'material-ui-icons/Close';
import ChatIcon from 'material-ui-icons/Chat';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import PersonAddIcon from 'material-ui-icons/PersonAdd';
import { Link } from 'react-router';

import {
  fetchClients,
  removeClient,
  getClients,
  showClientDetails
} from './model';
import ClientForm from './ClientForm';
import FilterPicker from './FilterPicker';

const operationButtonStyle = {
  minWidth: 32,
  width: 32,
  height: 32,
  minHeight: 32
};

class Clients extends PureComponent {
  state = {
    addMode: false,
    sortBy: 'name',
    sortOrder: 'asc'
  };

  componentWillMount() {
    const { fetchClients } = this.props;
    fetchClients();
  }

  changeAddMode = value => () => this.setState({ addMode: value });

  renderOperations = id => (
    <div className="col-spacing-2">
      <RaisedButton
        icon={<ChatIcon />}
        containerElement={<Link to={`/client/${id}/addNote`} />}
        onClick={e => e.stopPropagation()}
        style={operationButtonStyle}
      />
      <RaisedButton
        className="small-button"
        icon={<EditIcon />}
        containerElement={<Link to={`/client/${id}/edit`} />}
        onClick={e => e.stopPropagation()}
        style={operationButtonStyle}
      />
      <RaisedButton
        icon={<CloseIcon />}
        onClick={event => {
          this.props.removeClient(id);
          event.stopPropagation();
        }}
        style={operationButtonStyle}
      />
    </div>
  );

  onRowClick = (state, rowInfo, column, instance) => {
    const { showClientDetails } = this.props;
    return {
      onClick: () => showClientDetails({ id: rowInfo.original._id })
    };
  };

  onFilterChange = value => {
    const { fetchClients } = this.props;
    const { sortBy, sortOrder } = this.state;
    const filterBy = value;
    this.setState({ filterBy });
    fetchClients({ filterBy, sortOrder, sortBy });
  };

  onSortChange = sorted => {
    const [{ id, desc }] = sorted;
    const { fetchClients } = this.props;
    const { filterBy } = this.state;
    const sortBy = id;
    const sortOrder = desc ? 'desc' : 'asc';
    this.setState({ sortBy, sortOrder });
    fetchClients({ filterBy, sortOrder, sortBy });
  };

  renderToolbar = () => {
    return (
      <div className="row">
        <div>
          <RaisedButton
            icon={<PersonAddIcon />}
            label="Add New"
            onClick={this.changeAddMode(true)}
          />
        </div>
        <FilterPicker onChange={this.onFilterChange} />
      </div>
    );
  };

  render() {
    const { clients } = this.props;
    const { addMode } = this.state;

    const columns = [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Status',
        accessor: 'status'
      },
      {
        Header: 'Notes count',
        id: 'notes',
        accessor: d => d.notes.length
      },
      {
        Header: 'Created',
        id: 'createdAt',
        accessor: d => moment(d.createdAt).format('MMM Do YY, HH:mm')
      },
      {
        Header: 'Operations',
        accessor: '_id',
        Cell: props => this.renderOperations(props.value),
        className: 'right',
        sortable: false
      }
    ];

    const tableDigestable = clients.reduce((memo, data) => {
      memo.push(data.toJS());
      return memo;
    }, []);

    return (
      <div className="row-spacing-2">
        {addMode && <ClientForm onFinish={this.changeAddMode(false)} />}
        {!addMode && this.renderToolbar()}
        <h2>Clients</h2>
        <ReactTable
          className="-striped -highlight"
          columns={columns}
          data={tableDigestable}
          defaultPageSize={10}
          noDataText="No clients found"
          getTrProps={this.onRowClick}
          onSortedChange={sorted => this.onSortChange(sorted)}
        />
      </div>
    );
  }
}

Clients.propTypes = {
  clients: ImmutablePropTypes.map.isRequired,

  fetchClients: PropTypes.func.isRequired,
  removeClient: PropTypes.func.isRequired,
  showClientDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  clients: getClients(state)
});

export default connect(
  mapStateToProps,
  {
    fetchClients,
    removeClient,
    showClientDetails
  }
)(Clients);
