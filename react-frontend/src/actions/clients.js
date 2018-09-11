export const fetchClients = (limit = 10) => {
  return fetch('http://localhost:3010/api/clients/all');
};

export const addClient = ({ name, description, status }) => {
  const body = JSON.stringify({ name, description, status });
  const config = { method: 'POST', body };
  return fetch('http://localhost:3010/api/clients/add', config)
    .then(res => console.info(res))
    .catch(err => console.info(err));
};
