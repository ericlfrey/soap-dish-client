/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import styles from './NavBar.module.css';
import ProfileDrawer from '../ProfileDrawer/ProfileDrawer';

export default function NavBar() {
  return (
    <nav className={`navbar navbar-expand-md ${styles.navbar}`}>
      <div className={`container-fluid ${styles.navContainer}`}>
        <Link passHref href="/">
          <a className={`navbar-brand ${styles.navbarBrand}`}>
            🧼 The Soap Dish
          </a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className={`navbar-nav me-auto ${styles.navbarNav}`}>
            <div className={`nav-links ${styles.navLinks}`}>
              <li className={`nav-item ${styles.navItem}`}>
                <Link passHref href="/">
                  <a className={`${styles.navLink} nav-link`}>
                    Home
                  </a>
                </Link>
              </li>
              <li className={`nav-item ${styles.navItem}`}>
                <Link passHref href="/recipe/new">
                  <a className={`${styles.navLink} nav-link`}>
                    Add New Recipe
                  </a>
                </Link>
              </li>
            </div>
            <ProfileDrawer />
          </ul>
        </div>
      </div>
    </nav>
  );
}
