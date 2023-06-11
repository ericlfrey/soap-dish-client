import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import { getUserRecipes } from '../utils/data/recipeData';
import { useAuth } from '../utils/context/authContext';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const { user } = useAuth();

  const getAllUserRecipes = () => {
    getUserRecipes(user.uid).then(setRecipes);
  };

  useEffect(() => {
    getAllUserRecipes();
  }, [user]);

  return (
    <>
      <h1>User Recipes</h1>
      <div className="recipeCardsDiv">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            description={recipe.description}
            uid={recipe.maker?.uid}
            onUpdate={getAllUserRecipes}
          />
        ))}
      </div>
    </>
  );
}
