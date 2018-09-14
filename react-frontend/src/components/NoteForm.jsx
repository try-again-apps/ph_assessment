import React, { PureComponent } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CloseIcon from 'material-ui-icons/Close';
import Paper from 'material-ui/Paper';

import { addNote, updateNote } from './model';
import { fetchNote } from '../actions/notes';

class NoteForm extends PureComponent {
  state = {
    content: ''
  };

  componentDidMount() {
    const { params: { noteId } = {} } = this.props;
    if (noteId) {
      fetchNote(noteId).then(json => this.setState({ ...json }));
    }
  }

  onSave = () => {
    const {
      addNote,
      params: { clientId, noteId } = {},
      updateNote
    } = this.props;
    const { content, client } = this.state;
    if (noteId) {
      console.info(content, client);
      updateNote({ noteId, content, clientId: client });
    } else {
      addNote({ clientId, content });
    }
  };

  onChangeContent = event => {
    this.setState({ content: event.target.value });
  };

  render() {
    const { params: { clientId, noteId } = {} } = this.props;
    const cancelLinkTo = `/client/${clientId || this.state.client}`;
    const title = `${noteId ? 'Edit' : 'Add'} note`;
    return (
      <div className="row-spacing-2">
        <div className="col-spacing-2">
          <RaisedButton
            containerElement={<Link to={cancelLinkTo} />}
            label="Cancel"
            icon={<CloseIcon />}
          />
          <RaisedButton label="Save" onClick={this.onSave} />
        </div>
        <Paper>
          <div className="inner-container">
            <h2>{title}</h2>
            <TextField
              hintText="Note"
              multiLine
              onChange={this.onChangeContent}
              rows={5}
              value={this.state.content}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

NoteForm.propTypes = {
  params: PropTypes.object,

  addNote: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    addNote,
    updateNote
  }
)(NoteForm);
