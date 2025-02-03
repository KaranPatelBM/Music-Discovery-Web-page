import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Import the header CSS file

const Header = () => {
  return (
    <header data-test-id="header-tile">
      <div className="header-left">
        <h1>Karna</h1>
      </div>
      <div className="header-right">
        <nav>
          <Link to="/" className="link" data-test-id="home">Home</Link>
          <Link to="/contact" className="link" data-test-id="contact-us">Contact Us</Link>
          <Link to="/signin" className="link" data-test-id="signin">Sign In</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
