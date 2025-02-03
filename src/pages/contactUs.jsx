import React, { useState } from 'react';
import './styles/contactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // To manage form submission success message visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all required fields are filled before showing success message
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
      
      // Reset the form
      setFormData({
        name: '',
        email: '',
        message: ''
      });

      // Optionally, handle sending data to an API here
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="contact-us-container">
      <h2>Contact Us</h2>
      <p>If you have any questions, feel free to reach out using the form below.</p>
      
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          data-test-id="input-name"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          data-test-id="input-email"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          required
          data-test-id="textarea-message"
        />
        <input
          type="submit"
          value="Send Message"
          data-test-id="submit-button"
        />
      </form>

      {/* Success Popup message */}
      {isSubmitted && (
        <div className="popup-message">
          <p>Message sent successfully!</p>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
