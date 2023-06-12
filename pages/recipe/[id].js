import React from 'react';
import { useRouter } from 'next/router';
import RecipeDetails from '../../components/RecipeDetails/RecipeDetails';

export default function ViewRecipePage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <RecipeDetails id={Number(id)} />
    </>
  );
}
