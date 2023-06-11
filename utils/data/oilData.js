import { clientCredentials } from '../client';

const getOils = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/oils`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleOil = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/oils/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export { getOils, getSingleOil };
