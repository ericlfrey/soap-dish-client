import React, { useEffect, useState } from 'react';
import { getPublicRecipes } from '../../utils/data/recipeData';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import styles from '../../styles/PagesStyles.module.css';

export default function PublicViewPage() {
  const [publicRecipes, setPublicRecipes] = useState([]);

  useEffect(() => {
    getPublicRecipes().then(setPublicRecipes);
  }, []);

  return (
    <>
      <h1 className={styles.pageHeading}>Public Recipes</h1>
      <div className={styles.recipeCardsDiv}>
        {publicRecipes.map((recipe) => (
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
