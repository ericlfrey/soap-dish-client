/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getFavoriteRecipes } from '../../utils/data/recipeData';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { useAuth } from '../../utils/context/authContext';

export default function FavoritesViewPage() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const { user } = useAuth();

  const getAllFavoriteRecipes = () => {
    getFavoriteRecipes(user.uid).then(setFavoriteRecipes);
  };

  useEffect(() => {
    getAllFavoriteRecipes();
  }, []);

  return (
    <>
      <h1>User Favorites</h1>
      <div className="recipeCardsDiv">
        {favoriteRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            description={recipe.description}
            uid={recipe.maker?.uid}
            onUpdate={getAllFavoriteRecipes}
          />
        ))}
      </div>
    </>
  );
}
