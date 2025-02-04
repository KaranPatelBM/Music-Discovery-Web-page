import React, { useState, useEffect } from 'react';
import './footer.css'; // Import the footer CSS file

const Footer = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > 100) { // When scroll position is more than 100px, hide the footer
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);  // Debug the scroll position
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className={isVisible ? '' : 'hidden'} data-test-id="footer-tile">
      <div className="social-links">
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" data-test-id="LinkedIn">
          <img src="/assets/linkedin.png" alt="LinkedIn" />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" data-test-id="GitHub">
          <img src="/assets/gitHub.png" alt="GitHub" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
