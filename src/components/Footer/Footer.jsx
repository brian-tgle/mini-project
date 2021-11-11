import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => (
  <footer className="footer px-0 px-lg-3">
    <Container fluid>
      <p className="copyright text-center">
        ©
        {' '}
        {new Date().getFullYear()}
        , Expenses management app
      </p>
    </Container>
  </footer>
);
export default Footer;
