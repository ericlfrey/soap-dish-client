import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UpdateRecipeForm from '../../../components/NewRecipeForm/UpdateRecipeForm';
import { getSingleRecipe } from '../../../utils/data/recipeData';
import { useAuth } from '../../../utils/context/authContext';

export default function EditRecipePage() {
  const [recipe, setRecipe] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleRecipe(id, user.uid).then(setRecipe);
  }, [id, user.uid]);

  const totalOil = parseInt(recipe.recipe_oils?.reduce((a, b) => a + b.amount, 0), 10);
  const oilList = recipe.recipe_oils?.map((oil) => ({
    id: oil.id,
    name: oil.oil_name,
    amount: oil.amount,
  }));

  return (
    <>
      {/* {console.log(recipe)} */}
      <UpdateRecipeForm recipeObject={recipe} totalOil={totalOil} oilList={oilList} />
    </>
  );
}
