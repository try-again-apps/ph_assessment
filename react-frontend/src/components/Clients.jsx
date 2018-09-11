import React, { PureComponent } from 'react';
import ReactTable from 'react-table';
import EditIcon from 'material-ui-icons/Edit';
import CloseIcon from 'material-ui-icons/Close';
import RaisedButton from 'material-ui/RaisedButton';

import { fetchClients } from '../actions/clients';

const data = [
  {
    name: 'Tanner Linsley',
    status: 'prospective',
    createdAt: '2018.07.09',
    commentsCount: 42,
    operations: 2
  },
  {
    name: 'Testter Weird',
    status: 'active',
    createdAt: '2017.01.01', // use moment here
    commentsCount: 1,
    operations: 22
  }
];

class Clients extends PureComponent {
  componentWillMount() {
    fetchClients();
  }

  render() {
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
        accessor: 'createdAt'
      },
      {
        Header: 'Operations',
        accessor: 'operations',
        Cell: props => (
          <div>
            <RaisedButton icon={<EditIcon />} />
            <RaisedButton icon={<CloseIcon />} />
          </div>
        ),
        className: 'right',
        sortable: false
      }
    ];

    return (
      <div>
        <div>test clients</div>
        <ReactTable
          className="-striped -highlight"
          data={data}
          defaultPageSize={10}
          columns={columns}
        />
      </div>
    );
  }
}

export default Clients;
