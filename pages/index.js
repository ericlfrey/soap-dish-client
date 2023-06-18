/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import { getUserRecipes } from '../utils/data/recipeData';
import { useAuth } from '../utils/context/authContext';
import styles from '../styles/PagesStyles.module.css';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getUserRecipes(user.uid).then(setRecipes);
  }, [user]);

  return (
    <>
      <Head>
        <title>The Soap Dish | Your Recipes</title>
      </Head>
      <h1 className={styles.pageHeading}>Your Recipes</h1>
      <div className={styles.recipeCardsDiv}>
        {recipes.map((recipe) => (
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
