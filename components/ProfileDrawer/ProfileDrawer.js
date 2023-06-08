import React, { useState } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { signOut } from '../../utils/auth';
import styles from './ProfileDrawer.module.css';

export default function ProfileDrawer() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button type="button" onClick={handleShow} className={styles.profileBtn}>
        Profile
      </button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists,
        </Offcanvas.Body>
        <Button type="button" onClick={signOut}>
          Sign Out
        </Button>
      </Offcanvas>
    </>
  );
}
