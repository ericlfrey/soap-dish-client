import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { getSingleRecipe } from '../../utils/data/recipeData';
import { useAuth } from '../../utils/context/authContext';

export default function RecipeDetails({ id }) {
  const [recipe, setRecipe] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    getSingleRecipe(id, user.uid).then(setRecipe);
  }, [id, user]);

  const handleDelete = () => {
    console.log('RECIPE DELETED');
  };

  const handleFavorite = () => {
    console.log(recipe.is_favorite);
  };

  return (
    <>
      {console.log(recipe)}
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Button variant="secondary" size="sm" onClick={handleFavorite}>
            {recipe.is_favorite ? 'Unfavorite' : 'Favorite'}
          </Button>
          <Card.Title>{recipe.title}</Card.Title>
          {recipe.recipe_oils?.map((oil) => (
            <Card.Subtitle key={oil.id} className="mb-2 text-muted">{oil.oil_name}: {oil.amount} oz</Card.Subtitle>
          ))}
          <Card.Subtitle className="mb-2 text-muted">Water: {recipe.water_amount} oz</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">Lye: {recipe.lye_amount} oz</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">Super fat: {recipe.super_fat * 100}%</Card.Subtitle>
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
