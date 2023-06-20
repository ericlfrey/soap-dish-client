import React from 'react';
import PropTypes from 'prop-types';
import { Trash, PencilSquare } from 'react-bootstrap-icons';
import { Card } from 'react-bootstrap';
import styles from './Comment.module.css';
import { deleteComment } from '../../utils/data/commentData';

export default function Comment({
  userId,
  commentId,
  commenterName,
  commenterId,
  date,
  text,
  refreshPage,
}) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
      deleteComment(commentId).then(refreshPage);
    }
  };

  const displayDate = `${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString()}`;

  return (
    <Card className={styles.commentCard}>
      <Card.Body>
        <Card.Title className={styles.name}>{commenterName}</Card.Title>
        <Card.Subtitle className={styles.date}>{displayDate}</Card.Subtitle>
        <Card.Text className={styles.text}>{text} </Card.Text>
        {commenterId === userId
          ? (
            <>
              <Card.Link href="#"><PencilSquare className={styles.editIcon} /></Card.Link>
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
