/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Navbar } from 'react-bootstrap';
import styles from './NavBar.module.css';
import ProfileDrawer from '../ProfileDrawer/ProfileDrawer';
import logoBlue from '../../public/images/logo_blue.png';

export default function NavBar() {
  return (
    <Navbar className={styles.navbar}>
      <Container fluid>
        <Navbar.Brand href="#">
          <Link passHref href="/">
            <div className={`navbar-brand ${styles.navbarBrand}`}>
              <Image src={logoBlue} height={60} width={60} className={styles.logo} />
            </div>
          </Link>
        </Navbar.Brand>
        <section>
          The Soap Dish
        </section>
        <ProfileDrawer />
      </Container>
    </Navbar>
  );
}
