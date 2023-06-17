/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { List } from 'react-bootstrap-icons';
import Link from 'next/link';
import { signOut } from '../../utils/auth';
import styles from './MenuDrawer.module.css';

export default function ProfileDrawer() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <List
        className={styles.hamburger}
        onClick={handleShow}
      />

      <Offcanvas show={show} onHide={handleClose} placement="end" className={styles.offCanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={styles.offCanvas}>
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
