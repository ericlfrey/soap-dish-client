import React from 'react';
import RecipeForm from '../../components/RecipeForm/RecipeForm';
import styles from '../../styles/PagesStyles.module.css';

export default function CreateRecipePage() {
  return (
    <>
      <h1 className={styles.pageHeading}>Create New Recipe</h1>
      <hr />
      <RecipeForm />
    </>
  );
}
