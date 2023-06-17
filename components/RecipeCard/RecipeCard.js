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
    <Link href={`/recipe/${id}`} passHref>
      <Card className={styles.card}>
        {/* <Card.Header className={styles.cardHeader}>
        </Card.Header> */}
        <Card.Body className={styles.cardBody}>
          <Card.Title className={styles.cardTitle}>{title}</Card.Title>
          <Card.Text className={styles.soapIcon}>🧼</Card.Text>
          <Card.Text className={styles.cardDetails}>{description}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

RecipeCard.propTypes = {
  id: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
