/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Navbar } from 'react-bootstrap';
import styles from './NavBar.module.css';
import ProfileDrawer from '../ProfileDrawer/ProfileDrawer';
import logoBeige from '../../public/images/logo_beige.png';

export default function NavBar() {
  return (
    <Navbar className={styles.navbar}>
      <Container fluid>
        <Navbar.Brand href="#">
          <Link passHref href="/">
            <div className={`navbar-brand ${styles.navbarBrand}`}>
              <Image src={logoBeige} height={60} width={60} className={styles.logo} />
            </div>
          </Link>
        </Navbar.Brand>
        <h1 className={styles.navHeading}>
          The Soap Dish
        </h1>
        <ProfileDrawer />
      </Container>
    </Navbar>
  );
}
