import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import Immutable from 'immutable';
import 'react-table/react-table.css';

import './index.css';
import App from './components/App';
import About from './components/About';
import Clients from './components/Clients';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';

const store = configureStore(Immutable.Map());

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Clients} />
        <Route path="/about" component={About} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
