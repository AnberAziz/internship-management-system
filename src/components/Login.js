import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h1>Internship Management System</h1>
      <div className="button-container">
        <button 
          className="admin-btn" 
          onClick={() => navigate('/admin')}
        >
          Admin Login
        </button>
        <button 
          className="intern-btn" 
          onClick={() => navigate('/intern')}
        >
          Intern Login
        </button>
      </div>
    </div>
  );
}

export default Login;