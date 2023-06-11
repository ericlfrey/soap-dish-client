import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { getSingleRecipe } from '../../utils/data/recipeData';
import { useAuth } from '../../utils/context/authContext';

export default function RecipeDetails({ id }) {
  const [recipe, setRecipe] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    getSingleRecipe(id, user.uid).then(setRecipe);
  }, [id, user]);

  return (
    <>
      {console.log(recipe)}
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{recipe.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Oils: { }</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">Water: {recipe.water_amount} oz</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">Lye: {recipe.lye_amount} oz</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">Super fat: {recipe.super_fat * 100}%</Card.Subtitle>
          <Card.Text>Description: {recipe.description}</Card.Text>
          <Card.Text>Notes: {recipe.notes}</Card.Text>
          <Card.Link href="#">Edit</Card.Link>
          <Card.Link href="#">Delete</Card.Link>
        </Card.Body>
      </Card>
    </>
  );
}

RecipeDetails.propTypes = {
  id: PropTypes.number.isRequired,
};
