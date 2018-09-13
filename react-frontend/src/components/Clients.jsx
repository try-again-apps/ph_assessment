import React, { PureComponent } from 'react';
import ReactTable from 'react-table';
import EditIcon from 'material-ui-icons/Edit';
import CloseIcon from 'material-ui-icons/Close';
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

class Clients extends PureComponent {
  state = {
    addMode: false
  };

  componentWillMount() {
    const { fetchClients } = this.props;
    fetchClients();
  }

  changeAddMode = value => () => this.setState({ addMode: value });

  renderOperations = id => (
    <div>
      <RaisedButton
        icon={<EditIcon />}
        containerElement={<Link to={`/client/${id}/edit`} />}
        onClick={e => e.stopPropagation()}
      />
      <RaisedButton
        icon={<CloseIcon />}
        onClick={event => {
          this.props.removeClient(id);
          event.stopPropagation();
        }}
      />
    </div>
  );

  onRowClick = (state, rowInfo, column, instance) => {
    const { showClientDetails } = this.props;
    return {
      onClick: () => showClientDetails({ id: rowInfo.original._id })
    };
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
        accessor: 'notesCount'
      },
      {
        Header: 'Created',
        id: 'createdAt',
        accessor: d => moment(d).format('MMM Do YY')
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
      <div>
        {addMode && <ClientForm onFinish={this.changeAddMode(false)} />}
        {!addMode && (
          <RaisedButton
            icon={<PersonAddIcon />}
            label="Add New"
            onClick={this.changeAddMode(true)}
          />
        )}
        <h2>Clients</h2>
        <ReactTable
          className="-striped -highlight"
          columns={columns}
          data={tableDigestable}
          defaultPageSize={10}
          noDataText="No clients found"
          getTrProps={this.onRowClick}
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
