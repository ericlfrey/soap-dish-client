import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { postComment } from '../../utils/data/commentData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  text: '',
};

export default function CommentForm({ recipeId, refreshPage }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      text: formInput.text,
      dateAdded: new Date(),
      recipeId,
    };
    setFormInput(initialState);
    postComment(payload, user.uid).then(() => refreshPage());
  };

  return (

    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Leave a Comment:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Leave a comment here"
          name="text"
          value={formInput.text}
          required
          onChange={handleChange}
        />
      </Form.Group>
      <Button type="submit">Add</Button>
    </Form>
  );
}

CommentForm.propTypes = {
  recipeId: PropTypes.number.isRequired,
  refreshPage: PropTypes.func.isRequired,
};
