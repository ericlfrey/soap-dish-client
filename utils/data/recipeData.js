import { clientCredentials } from '../client';

const getUserRecipes = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/recipes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
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
const getPublicRecipes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/recipes/public`, {
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

const getSingleRecipe = (id, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/recipes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const createRecipe = (recipe) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${recipe.uid}`,
    },
    body: JSON.stringify(recipe),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateRecipe = (recipe) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/recipes/${recipe.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteRecipe = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/recipes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getUserRecipes,
  getPublicRecipes,
  getSingleRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
