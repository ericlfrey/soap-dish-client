import React from 'react';
import PropTypes from 'prop-types';
import { Trash, PencilSquare } from 'react-bootstrap-icons';
import styles from './Comment.module.css';

export default function Comment({
  userId,
  commenterName,
  commenterId,
  text,
}) {
  return (
    <section className={styles.comment}>
      <p>{text} - {commenterName}</p>
      {commenterId === userId
        ? (
          <>
            <PencilSquare />
            <Trash />
          </>
        )
        : ''}
    </section>
  );
}

Comment.propTypes = {
  userId: PropTypes.number.isRequired,
  commenterId: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  commenterName: PropTypes.string.isRequired,
};
