/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Heart, HeartFill, TypeH1 } from 'react-bootstrap-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  deleteRecipe, favoriteRecipe, getSingleRecipe, unfavoriteRecipe,
} from '../../utils/data/recipeData';
import { useAuth } from '../../utils/context/authContext';
import styles from './RecipeDetails.module.css';

export default function RecipeDetails({ id }) {
  const [recipe, setRecipe] = useState({});
  const { user } = useAuth();
  const router = useRouter();

  const refreshPage = () => {
    getSingleRecipe(id, user.uid).then(setRecipe);
  };

  useEffect(() => {
    refreshPage();
  }, [id, user]);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${recipe.title}"? This action cannot be undone.`)) {
      deleteRecipe(id).then(() => router.push('/'));
    }
  };

  const handleFavorite = () => {
    if (!recipe.is_favorite) {
      favoriteRecipe(id, user.uid).then(refreshPage);
    }
    if (recipe.is_favorite) {
      unfavoriteRecipe(id, user.uid).then(refreshPage);
    }
  };

  return (
    <div className={styles.recipeDetailsWrapper}>
      <Card className={styles.card}>
        <Card.Body>
          <section className={styles.favoriteDiv}>
            <Card.Title className={styles.title}>{recipe.title}</Card.Title>
            <button type="button" className={styles.favoriteBtn} onClick={handleFavorite}>
              {recipe.is_favorite
                ? <HeartFill className={styles.heartFill} />
                : <Heart className={styles.heart} />}
              Favorite
            </button>
          </section>
          <hr />
          <Card.Title>Ingredients:</Card.Title>
          {recipe.recipe_oils?.map((oil) => (
            <section key={oil.id} className={styles.ingredientsSection}>
              <Card.Text className={styles.ingredients}>{oil.oil_name}:</Card.Text>
              <Card.Text className={styles.ingredients}>{Number(oil.amount)} oz</Card.Text>
            </section>
          ))}
          <section className={styles.ingredientsSection}>
            <Card.Text className={styles.ingredients}>Water:</Card.Text>
            <Card.Text className={styles.ingredients}>{Number(recipe.water_amount)} oz</Card.Text>
          </section>
          <section className={styles.ingredientsSection}>
            <Card.Text className={styles.ingredients}>Lye (NaOH):</Card.Text>
            <Card.Text className={styles.ingredients}>{Number(recipe.lye_amount)} oz</Card.Text>
          </section>
          <hr />
          <Card.Title>Description:</Card.Title>
          <Card.Text>{recipe.description}</Card.Text>
          <hr />
          <Card.Title>Notes:</Card.Title>
          <Card.Text>{recipe.notes}</Card.Text>
          {user.uid === recipe.maker?.uid
            ? (
              <>
                <hr />
                <Link href={`/recipe/edit/${id}`} passHref>
                  <Card.Link href="#">Edit</Card.Link>
                </Link><Card.Link href="#" onClick={handleDelete}>Delete</Card.Link>
              </>
            )
            : ''}
          {recipe.recipe_comments?.length > 0
            ? (
              <>
                <hr />
                <Card.Title>Comments:</Card.Title>
                {recipe.recipe_comments?.map((comment) => (
                  <>
                    <p>{comment.text}</p>
                    <p>{comment.commenter}</p>
                  </>
                ))}
              </>
            )
            : ''}
        </Card.Body>
      </Card>
    </div >
  );
}

RecipeDetails.propTypes = {
  id: PropTypes.number.isRequired,
};
