// src/pages/Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserName } from '../redux/userSlice'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css'; // Import the CSS file

function Login() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = (event) => {
    event.preventDefault();

    // Simulate authentication process
    const user = { name: username };

    // Update Redux store with the logged-in user's name
    dispatch(setUserName(user.name));

    // Redirect to the homepage after successful login
    navigate('/'); // Use navigate to redirect
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
