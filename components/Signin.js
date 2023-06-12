import React from 'react';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { signIn } from '../utils/auth';
import logoBlue from '../public/images/logo_blue.png';

function Signin() {
  return (
    <div className="signin-div">
      <Image src={logoBlue} className="logo" priority />
      <Button type="button" size="lg" className="signin_btn" onClick={signIn} id="signinBtn">
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
