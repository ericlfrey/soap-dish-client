import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './RecipeCard.module.css';

export default function RecipeCard({
  id, title, description,
}) {
  return (
    <Link href={`/recipe/${id}`} passHref>
      <Card className={styles.card}>
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
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
