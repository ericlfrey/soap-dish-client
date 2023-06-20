import React from 'react';
import PropTypes from 'prop-types';
import { Trash, PencilSquare } from 'react-bootstrap-icons';
import styles from './Comment.module.css';
import { deleteComment } from '../../utils/data/commentData';

export default function Comment({
  userId,
  commentId,
  commenterName,
  commenterId,
  text,
  refreshPage,
}) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
      deleteComment(commentId).then(refreshPage);
    }
  };
  return (
    <section className={styles.comment}>
      <p>{text} - {commenterName}</p>
      {commenterId === userId
        ? (
          <>
            <PencilSquare className={styles.commentIcons} />
            <Trash onClick={handleDelete} className={styles.commentIcons} />
          </>
        )
        : ''}
    </section>
  );
}

Comment.propTypes = {
  userId: PropTypes.number.isRequired,
  commenterId: PropTypes.number.isRequired,
  commentId: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  commenterName: PropTypes.string.isRequired,
  refreshPage: PropTypes.func.isRequired,
};
