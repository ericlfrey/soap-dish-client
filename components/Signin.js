import React from 'react';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import Head from 'next/head';
import { signIn } from '../utils/auth';
import logoBeige from '../public/images/logo_beige.png';

function Signin() {
  return (
    <>
      <Head>
        <title>The Soap Dish</title>
      </Head>
      <div className="signin-div">
        <Image src={logoBeige} className="logo" priority />
        <Button type="button" size="lg" className="signin_btn" onClick={signIn} id="signinBtn">
          Sign In
        </Button>
      </div>
    </>
  );
}

export default Signin;
