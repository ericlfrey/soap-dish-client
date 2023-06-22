/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import {
  Heart, HeartFill, Trash, PencilSquare,
} from 'react-bootstrap-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  deleteRecipe, favoriteRecipe, getSingleRecipe, unfavoriteRecipe,
} from '../../utils/data/recipeData';
import { useAuth } from '../../utils/context/authContext';
import styles from './RecipeDetails.module.css';
import CommentForm from '../CommentForm/CommentForm';
import Comment from '../Comment/Comment';

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
            {user.id === recipe.maker
              ? (
                <>
                  <Link href={`/recipe/edit/${id}`} passHref>
                    <button
                      type="button"
                      className={styles.favoriteBtn}
                    >
                      <PencilSquare className={styles.edit} />
                      Edit
                    </button>
                  </Link>
                  <button
                    type="button"
                    className={styles.favoriteBtn}
                    onClick={handleDelete}
                  >
                    <Trash className={styles.trash} />
                    Delete
                  </button>
                </>
              )
              : ''}
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
              <Card.Text className={styles.ingredients}>{oil.oil.name}:</Card.Text>
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
          <>
            <hr />
            <Card.Title className={styles.flex}>Comments
              <div className={styles.commentNumber}>{recipe.comments?.length}</div>
              :
            </Card.Title>
            {recipe.comments?.map((comment) => (
              <Comment
                key={comment.id}
                text={comment.text}
                commentId={comment.id}
                commenterName={comment.commenter_name}
                commenterId={comment.soaper}
                date={comment.date_added}
                userId={user.id}
                refreshPage={refreshPage}
              />
            ))}
          </>
          <CommentForm recipeId={id} refreshPage={refreshPage} />
        </Card.Body>
      </Card>
    </div>
  );
}

RecipeDetails.propTypes = {
  id: PropTypes.number.isRequired,
};
