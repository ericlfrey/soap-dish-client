import React, { useEffect, useState } from 'react';
import { getPublicRecipes } from '../../utils/data/recipeData';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

export default function PublicViewPage() {
  const [publicRecipes, setPublicRecipes] = useState([]);

  const getAllPublicRecipes = () => {
    getPublicRecipes().then(setPublicRecipes);
  };

  useEffect(() => {
    getAllPublicRecipes();
  }, []);

  return (
    <>
      <h1>Public Recipes</h1>
      <div className="recipeCardsDiv">
        {publicRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            description={recipe.description}
            uid={recipe.maker?.uid}
            onUpdate={getAllPublicRecipes}
          />
        ))}
      </div>
    </>
  );
}
