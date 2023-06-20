import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { postComment } from '../../utils/data/commentData';
import { useAuth } from '../../utils/context/authContext';
import styles from './CommentForm.module.css';

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
    <Form onSubmit={handleSubmit} className={styles.commentForm}>
      <Form.Group>
        <Form.Label>Leave a comment:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="..."
          name="text"
          value={formInput.text}
          required
          onChange={handleChange}
        />
      </Form.Group>
      <div className={styles.commentFormBtnDiv}>
        <Button className={styles.commentFormBtn} type="submit">Add Comment</Button>
      </div>
    </Form>
  );
}

CommentForm.propTypes = {
  recipeId: PropTypes.number.isRequired,
  refreshPage: PropTypes.func.isRequired,
};
