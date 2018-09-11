import React, { PureComponent } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { addClient } from '../actions/clients';

class Toolbar extends PureComponent {
  // addClient = () => console.info('add client');

  addClient = () => {
    addClient({
      name: 'Test',
      description: 'opis',
      status: 'prospective'
    });
  };

  render() {
    return (
      <div>
        <RaisedButton onClick={this.addClient} label="Add New" />
      </div>
    );
  }
}

export default Toolbar;
