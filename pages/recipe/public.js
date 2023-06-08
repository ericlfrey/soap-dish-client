import React, { useEffect, useState } from 'react';
import { getPublicRecipes } from '../../utils/data/recipeData';

export default function PublicViewPage() {
  const [publicRecipes, setPublicRecipes] = useState([]);

  useEffect(() => {
    getPublicRecipes().then(setPublicRecipes);
  }, []);

  return (
    <>
      <h1>PublicViewPage</h1>
      <div>
        {publicRecipes.map((recipe) => <h1 key={recipe.id}>{recipe.title}</h1>)}
      </div>
    </>
  );
}
