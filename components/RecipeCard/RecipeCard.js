import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { deleteRecipe } from '../../utils/data/recipeData';
import styles from './RecipeCard.module.css';

export default function RecipeCard({
  id, uid, title, description, onUpdate,
}) {
  const { user } = useAuth();

  const handleDelete = () => {
    deleteRecipe(id).then(() => onUpdate());
  };

  return (
    <Card className={styles.card}>
      <Link href={`/recipe/${id}`} passHref>
        <Card.Header className={styles.cardHeader}>
          <Card.Title className={styles.cardTitle}>{title}</Card.Title>
        </Card.Header>
      </Link>
      <Card.Body className={styles.cardBody}>
        <Card.Subtitle className="mb-2 text-muted">{description}</Card.Subtitle>
      </Card.Body>
      <Card.Footer className={styles.cardFooter}>
        {user.uid === uid
          ? (
            <div className={styles.cardLinks}>
              <Link href={`/recipe/edit/${id}`} passHref>
                <Card.Link href="#">Edit</Card.Link>
              </Link>
              <Card.Link href="#" onClick={handleDelete}>Delete</Card.Link>
            </div>
          )
          : ''}
      </Card.Footer>
    </Card>
  );
}

RecipeCard.propTypes = {
  id: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
