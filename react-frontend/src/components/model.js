import { createAction, enumerable } from '../utils';
import {
  addClient as addClientTask,
  fetchClients as fetchClientsTask,
  removeClient as removeClientTask
} from '../actions/clients';

export const getClients = state => state.get('clients');

export const ActionTypes = enumerable(
  'CLIENT_ADD_FAILURE',
  'CLIENT_ADD_REQUEST',
  'CLIENT_ADD_SUCCESS',
  'CLIENT_REMOVE_FAILURE',
  'CLIENT_REMOVE_REQUEST',
  'CLIENT_REMOVE_SUCCESS',
  'CLIENTS_FETCH_FAILURE',
  'CLIENTS_FETCH_REQUEST',
  'CLIENTS_FETCH_SUCCESS'
);

export const addClientFailure = err =>
  createAction(ActionTypes.CLIENT_ADD_FAILURE, { err });
export const addClientRequest = () =>
  createAction(ActionTypes.CLIENT_ADD_REQUEST);
export const addClientSuccess = data =>
  createAction(ActionTypes.CLIENT_ADD_SUCCESS, { data });

export const removeClientRequest = () =>
  createAction(ActionTypes.CLIENT_REMOVE_REQUEST);
export const removeClientSuccess = id =>
  createAction(ActionTypes.CLIENT_REMOVE_SUCCESS, { id });
export const removeClientFailure = err =>
  createAction(ActionTypes.CLIENT_REMOVE_FAILURE, { err });

export const fetchClientsRequest = () =>
  createAction(ActionTypes.CLIENTS_FETCH_REQUEST);
export const fetchClientsSuccess = data =>
  createAction(ActionTypes.CLIENTS_FETCH_SUCCESS, { data });
export const fetchClientsFailure = err =>
  createAction(ActionTypes.CLIENTS_FETCH_FAILURE, { err });

export const addClient = data => dispatch => {
  dispatch(addClientRequest());
  return addClientTask(data)
    .then(res => dispatch(addClientSuccess(res)))
    .catch(err => dispatch(addClientFailure(err)));
};

export const removeClient = id => dispatch => {
  dispatch(removeClientRequest());
  return removeClientTask(id)
    .then(_ => dispatch(removeClientSuccess(id)))
    .catch(err => removeClientFailure(err));
};

export const fetchClients = options => dispatch => {
  dispatch(fetchClientsRequest());
  return fetchClientsTask()
    .then(res => dispatch(fetchClientsSuccess(res)))
    .catch(err => fetchClientsFailure(err));
};