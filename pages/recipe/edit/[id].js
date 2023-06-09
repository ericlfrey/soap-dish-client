import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getSingleRecipe } from '../../../utils/data/recipeData';
import { useAuth } from '../../../utils/context/authContext';
import RecipeForm from '../../../components/RecipeForm/RecipeForm';

export default function EditRecipePage() {
  const [recipe, setRecipe] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleRecipe(id, user.uid).then(setRecipe);
  }, [id, user.uid]);

  const totalOil = parseInt(recipe.recipe_oils?.reduce((a, b) => a + Number(b.amount), 0), 10);
  const oilList = recipe.recipe_oils?.map((recipeOil) => ({
    id: recipeOil.id,
    oilId: recipeOil.oil.id,
    name: recipeOil.oil.name,
    amount: recipeOil.amount,
    sap: recipeOil.oil.sap,
  }));

  return (
    <>
      <Head>
        <title>The Soap Dish | Edit {`${recipe.title}`}</title>
      </Head>
      <RecipeForm recipeObject={recipe} totalOil={totalOil} oilList={oilList} />
    </>
  );
}
