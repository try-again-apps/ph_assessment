import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import EditIcon from 'material-ui-icons/Edit';
import { Link } from 'react-router';

import { fetchClient } from '../actions/clients';

class ClientDetails extends PureComponent {
  state = {};

  componentDidMount() {
    const {
      params: { id }
    } = this.props;
    fetchClient(id).then(json => this.setState({ ...json }));
  }

  renderNotes() {
    return 'TODO: !!!!!!!';
  }

  render() {
    const { _id, name, status, details, createdAt } = this.state;
    const subtitle = `Created at: ${moment(createdAt).format(
      'MMM Do YY, HH:mm'
    )}`;
    return (
      <div>
        <RaisedButton
          containerElement={<Link to={`/client/${_id}/edit`} />}
          label="Edit"
          icon={<EditIcon />}
        />
        <Card>
          <CardTitle title={name} subtitle={subtitle} />
          <CardText>Status: {status}</CardText>
          <CardText>Details: {details || 'None'}</CardText>
          <CardText>Notes: {this.renderNotes()}</CardText>
        </Card>
      </div>
    );
  }
}

ClientDetails.propTypes = {
  params: PropTypes.object
};

export default ClientDetails;
