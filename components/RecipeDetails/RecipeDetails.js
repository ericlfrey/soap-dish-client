/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Heart, HeartFill } from 'react-bootstrap-icons';

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
          <Card.Text>Ingredients:</Card.Text>
          {recipe.recipe_oils?.map((oil) => (
            <Card.Text key={oil.id} className={styles.ingredients}>{oil.oil_name}: {oil.amount} oz</Card.Text>
          ))}
          <Card.Text className={styles.ingredients}>Water: {recipe.water_amount} oz</Card.Text>
          <Card.Text className={styles.ingredients}>Lye: {recipe.lye_amount} oz</Card.Text>
          <Card.Text className={styles.ingredients}>Super fat: {recipe.super_fat * 100}%</Card.Text>
          <hr />
          <Card.Text>Description:</Card.Text>
          <Card.Text>{recipe.description}</Card.Text>
          <hr />
          <Card.Text>Notes:</Card.Text>
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
        </Card.Body>
      </Card>
    </div>
  );
}

RecipeDetails.propTypes = {
  id: PropTypes.number.isRequired,
};
