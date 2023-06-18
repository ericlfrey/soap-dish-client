import React from 'react';
import Head from 'next/head';
import RecipeForm from '../../components/RecipeForm/RecipeForm';
import styles from '../../styles/PagesStyles.module.css';

export default function CreateRecipePage() {
  return (
    <>
      <Head>
        <title>The Soap Dish | Create New Recipe</title>
      </Head>
      <h1 className={styles.pageHeading}>Create New Recipe</h1>
      <hr />
      <RecipeForm />
    </>
  );
}
