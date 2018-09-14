import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import Immutable from 'immutable';
import { syncHistoryWithStore } from 'react-router-redux';
import 'react-table/react-table.css';

import './index.css';
import App from './components/App';
import About from './components/About';
import Clients from './components/Clients';
import ClientForm from './components/ClientForm';
import ClientDetails from './components/ClientDetails';
import Notes from './components/Notes';
import NoteForm from './components/NoteForm';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';

const store = configureStore(Immutable.Map(), browserHistory);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: state => state.get('routing').toJS()
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Clients} />
        <Route path="/about" component={About} />
        <Route path="/client/:id" component={ClientDetails} />
        <Route path="/client/:id/edit" component={ClientForm} />
        <Route path="/client/:clientId/addNote" component={NoteForm} />
        <Route path="/notes" component={Notes} />
        <Route path="/note/:noteId/edit" component={NoteForm} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
