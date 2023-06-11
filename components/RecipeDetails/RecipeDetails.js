import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSingleRecipe } from '../../utils/data/recipeData';
import { useAuth } from '../../utils/context/authContext';

export default function RecipeDetails({ id }) {
  const [recipe, setRecipe] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    getSingleRecipe(id, user.uid).then(setRecipe);
  }, [id, user]);

  return (
    <>
      <h1>Recipe Details Page</h1>
      <h3>{recipe.title}</h3>
    </>
  );
}

RecipeDetails.propTypes = {
  id: PropTypes.number.isRequired,
};
