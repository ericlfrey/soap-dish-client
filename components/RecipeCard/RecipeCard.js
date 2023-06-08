import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';

export default function RecipeCard({
  id, uid, title, description,
}) {
  const { user } = useAuth();
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{description}</Card.Subtitle>
        {user.uid === uid
          ? (
            <>
              <Link href={`/recipe/edit/${id}`} passHref>
                <Card.Link href="#">Edit</Card.Link>
              </Link><Card.Link href="#">Delete</Card.Link>
            </>
          )
          : ''}

      </Card.Body>
    </Card>
  );
}

RecipeCard.propTypes = {
  id: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};