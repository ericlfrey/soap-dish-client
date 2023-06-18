/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getFavoriteRecipes } from '../../utils/data/recipeData';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { useAuth } from '../../utils/context/authContext';
import styles from '../../styles/PagesStyles.module.css';

export default function FavoritesViewPage() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getFavoriteRecipes(user.uid).then(setFavoriteRecipes);
  }, []);

  return (
    <>
      <Head>
        <title>The Soap Dish | Favorites</title>
      </Head>
      <h1 className={styles.pageHeading}>Favorites</h1>
      <div className={styles.recipeCardsDiv}>
        {favoriteRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            description={recipe.description}
          />
        ))}
      </div>
    </>
  );
}
