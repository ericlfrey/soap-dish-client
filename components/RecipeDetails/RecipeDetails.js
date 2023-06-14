/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
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
    deleteRecipe(id).then(() => router.push('/'));
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
    <>
      <Card className={styles.card}>
        <Card.Body>
          <section className={styles.favoriteDiv}>
            <button type="button" className={styles.favoriteBtn} onClick={handleFavorite}>
              {recipe.is_favorite ? <HeartFill className={styles.heartFill} /> : <Heart className={styles.heart} />}
            </button>
          </section>
          <Card.Title>{recipe.title}</Card.Title>
          {recipe.recipe_oils?.map((oil) => (
            <Card.Text key={oil.id}>{oil.oil_name}: {oil.amount} oz</Card.Text>
          ))}
          <Card.Text>Water: {recipe.water_amount} oz</Card.Text>
          <Card.Text>Lye: {recipe.lye_amount} oz</Card.Text>
          <Card.Text>Super fat: {recipe.super_fat * 100}%</Card.Text>
          <Card.Text>Description: {recipe.description}</Card.Text>
          <Card.Text>Notes: {recipe.notes}</Card.Text>
          <Card.Text>{recipe.public ? 'Public' : 'Private'}</Card.Text>
          {user.uid === recipe.maker?.uid
            ? (
              <>
                <Link href={`/recipe/edit/${id}`} passHref>
                  <Card.Link href="#">Edit</Card.Link>
                </Link><Card.Link href="#" onClick={handleDelete}>Delete</Card.Link>
              </>
            )
            : ''}
        </Card.Body>
      </Card>
    </>
  );
}

RecipeDetails.propTypes = {
  id: PropTypes.number.isRequired,
};
