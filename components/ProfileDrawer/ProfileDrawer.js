/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import Link from 'next/link';
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
          <ul>
            <li className={styles.listItem} onClick={handleClose}>
              <Link href="/">
                Your Recipes
              </Link>
            </li>
            <li className={styles.listItem} onClick={handleClose}>
              <Link href="/recipe/favorites">
                Favorite Recipes
              </Link>
            </li>
            <li className={styles.listItem} onClick={handleClose}>
              <Link href="/recipe/public">
                Public Recipes
              </Link>
            </li>
            <li className={styles.listItem} onClick={handleClose}>
              <Link href="/recipe/new">
                Add New Recipe
              </Link>
            </li>
            <li className={styles.listItem} onClick={handleClose}>
              <button type="button" onClick={signOut} className={styles.profileBtn}>
                <Link href="/">
                  Sign Out
                </Link>
              </button>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
