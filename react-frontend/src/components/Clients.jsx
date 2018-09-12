import React, { PureComponent } from 'react';
import ReactTable from 'react-table';
import EditIcon from 'material-ui-icons/Edit';
import CloseIcon from 'material-ui-icons/Close';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';

import { addClient, fetchClients, removeClient, getClients } from './model';

const data = [
  {
    name: 'Tanner Linsley',
    status: 'prospective',
    createdAt: '2018.07.09',
    commentsCount: 42,
    _id: 2
  },
  {
    name: 'Testter Weird',
    status: 'active',
    createdAt: '2017.01.01', // use moment here
    commentsCount: 1,
    _id: 22
  }
];

class Clients extends PureComponent {
  componentWillMount() {
    const { fetchClients } = this.props;
    fetchClients();
  }

  render() {
    const { clients } = this.props;

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
        Header: 'Comments count',
        accessor: 'commentsCount'
      },
      {
        Header: 'Created',
        id: 'createdAt',
        accessor: d => moment(d).format('MMM Do YY')
      },
      {
        Header: 'Operations',
        accessor: '_id',
        Cell: props => (
          <div>
            <RaisedButton icon={<EditIcon />} />
            <RaisedButton
              icon={<CloseIcon />}
              onClick={() => {
                console.info(props.value);
                this.props.removeClient(props.value);
              }}
            />
          </div>
        ),
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
        <div>test clients</div>
        <ReactTable
          className="-striped -highlight"
          columns={columns}
          data={tableDigestable}
          defaultPageSize={10}
          noDataText="No clients found"
        />
      </div>
    );
  }
}

Clients.propTypes = {
  clients: ImmutablePropTypes.map.isRequired,

  fetchClients: PropTypes.func.isRequired,
  removeClient: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  clients: getClients(state)
});

export default connect(
  mapStateToProps,
  {
    addClient,
    fetchClients,
    removeClient
  }
)(Clients);
