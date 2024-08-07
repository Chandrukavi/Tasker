import React, { useState } from 'react';
import axios from 'axios';
import Logo from '../Assets/Logo.png';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/signup', formData);
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error.response.data);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left-panel">
        <div className="signup-logo">
          <img src={Logo} alt="Logo" />
        </div>
      </div>
      <div className="signup-right-panel">
        <h2>Create an Account</h2>
        <p>Please, fill in the details to create your account.</p>
        <form onSubmit={handleSubmit}>
          <div className="signup-form-group">
            <label htmlFor="signup-name">Name</label>
            <input type="text" id="name" placeholder="Insert your name" onChange={handleChange} />
          </div>
          <div className="signup-form-group">
            <label htmlFor="signup-email">Email</label>
            <input type="email" id="email" placeholder="Insert your email" onChange={handleChange} />
          </div>
          <div className="signup-form-group">
            <label htmlFor="signup-password">Password</label>
            <input type="password" id="password" placeholder="Insert your password" onChange={handleChange} />
          </div>
          <div className="signup-form-group">
            <label htmlFor="signup-confirm-password">Confirm Password</label>
            <input type="password" id="confirmPassword" placeholder="Confirm your password" onChange={handleChange} />
          </div>
          <button type="submit">Sign Up</button>
          <p>Already have an account? 
            <Link to="/"> 
              <span>Log-in</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
