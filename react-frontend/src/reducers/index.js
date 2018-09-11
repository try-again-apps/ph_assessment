import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';

const clients = (state = Immutable.Map(), action) => {
  return state;
};

const rootReducer = combineReducers({
  clients
});

export default rootReducer;
