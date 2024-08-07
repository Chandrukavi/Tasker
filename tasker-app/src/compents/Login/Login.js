import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Assets/Logo.png';


function LogIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' });  // Clear error when user starts typing
  };

  const isPasswordStrong = (password) => {
    // Password strength validation (at least 8 characters, 1 uppercase, 1 number, 1 special character)
    const strongPasswordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return strongPasswordPattern.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (!isPasswordStrong(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post('http://localhost:3001/login', formData);
      navigate('/TaskList', { replace: true });
    } catch (error) {
      setErrors({ general: 'Invalid email or password. Please try again.' });
    }
  };

  return (
    <div className="container">
      <div className="left-panel">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
      </div>
      <div className="right-panel">
        <h2>Welcome to Tasker</h2>
        <p>Please, insert your information to access your tasks.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Insert your email"
              value={formData.email}
              onChange={handleChange}
              aria-label="Email"
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Insert your password"
              value={formData.password}
              onChange={handleChange}
              aria-label="Password"
              required
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <div className="form-group">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {errors.general && <p className="error-message">{errors.general}</p>}
          <button type="submit">Sign In</button>
          <p>Don't have an account? 
            <Link to="/Signup"> 
              <span>Sign-Up</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
