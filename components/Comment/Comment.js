import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Trash, PencilSquare, Save } from 'react-bootstrap-icons';
import { Button, Card, Form } from 'react-bootstrap';
import styles from './Comment.module.css';
import { deleteComment, updateComment } from '../../utils/data/commentData';

export default function Comment({
  userId,
  commentId,
  commenterName,
  commenterId,
  date,
  text,
  refreshPage,
}) {
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState({ text });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
      deleteComment(commentId).then(refreshPage);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      text: formInput.text,
    };
    updateComment(payload, commentId).then(() => refreshPage());
    setShow(!show);
  };

  const displayDate = `${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString()}`;

  return (
    <Card className={styles.commentCard}>
      <Card.Body>
        <Card.Title className={styles.name}>{commenterName}</Card.Title>
        <Card.Subtitle className={styles.date}>{displayDate}</Card.Subtitle>
        {!show
          ? <Card.Text className={styles.text}>{text} </Card.Text>
          : (
            <>
              <Form.Control
                as="textarea"
                rows={3}
                name="text"
                value={formInput.text}
                onChange={handleChange}
                required
              />
              {/* <span className={styles.saveSpan}> */}
              <Button onClick={handleSubmit} className={styles.saveBtn}><Save className={styles.saveIcon} /> Save</Button>
              {/* <Save onClick={handleSubmit} className={styles.saveIcon} /> */}
              {/* <p>Save</p> */}
              {/* </span> */}
              {/* <Button onClick={handleSubmit}>save</Button> */}
            </>
          )}
        {commenterId === userId && !show
          ? (
            <>
              <Card.Link href="#"><PencilSquare onClick={(e) => { e.preventDefault(); setShow(!show); }} className={styles.editIcon} /></Card.Link>
              <Card.Link href="#"><Trash onClick={handleDelete} className={styles.trashIcon} /></Card.Link>
            </>
          )
          : ''}

      </Card.Body>
    </Card>
  );
}

Comment.propTypes = {
  commentId: PropTypes.number.isRequired,
  commenterId: PropTypes.number.isRequired,
  commenterName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  refreshPage: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
