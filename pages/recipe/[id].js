/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import RecipeDetails from '../../components/RecipeDetails/RecipeDetails';
import { getSingleRecipe } from '../../utils/data/recipeData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewRecipePage() {
  const [recipe, setRecipe] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleRecipe(id, user.uid).then(setRecipe);
  }, []);

  return (
    <>
      <Head>
        <title>The Soap Dish | {`${recipe.title}`}</title>
      </Head>
      <RecipeDetails id={Number(id)} />
    </>
  );
}
