import { useState } from 'react';
import './styles/signIn.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Handle form submission logic here (e.g., authenticate the user)
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <label htmlFor="email" data-test-id="label-email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          data-test-id="input-email"
        />
        <label htmlFor="password" data-test-id="label-password">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          data-test-id="input-password"
        />
        <button type="submit" data-test-id="submit-button">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
