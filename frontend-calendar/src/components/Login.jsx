import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      // Save the token to local storage or context
      localStorage.setItem('authToken', token);
      navigate('/dashboard'); // Redirect to the desired page after login
    }
  }, [navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome In DataNexify</h2>
        <br />
        <p>Sign in to continue</p>
        <br />
        <a href="https://google-calendar-nine-blond.vercel.app/api/auth/google" className="google-btn">
          <button className="google-btn-text">
            <span>
              <img className='googleIcon' src="https://banner2.cleanpng.com/20180413/rfe/avfci721i.webp" alt="" />
            </span>
            Sign in with Google
          </button>
        </a>
      </div>
    </div>
  );
};

export default Login;
