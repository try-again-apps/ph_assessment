const API_PATH = 'http://localhost:3010/api/clients/';

const defaultConfig = data => ({
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, cors, *same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, same-origin, *omit
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
    // "Content-Type": "application/x-www-form-urlencoded",
  },
  redirect: 'follow', // manual, *follow, error
  referrer: 'no-referrer', // no-referrer, *client
  body: JSON.stringify(data) // body data type must match "Content-Type" header
});

export const fetchClients = (limit = 10) => {
  return fetch(`${API_PATH}/all`).then(res => res.json());
};

export const addClient = ({ name, description, status }) => {
  const config = {
    ...defaultConfig({ name, description, status }),
    method: 'POST'
  };
  return fetch(`${API_PATH}/add`, config).then(res => res.json());
};

export const removeClient = id => {
  const config = {
    ...defaultConfig({ id }),
    method: 'DELETE'
  };
  return fetch(`${API_PATH}/delete`, config);
};
