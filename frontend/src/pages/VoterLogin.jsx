import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginVoter } from '../redux/actions/voterLoginActions';
import { useNavigate } from 'react-router-dom';
import '../styles/VoterLogin.css';

const VoterLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [voterId, setVoterId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Wait for the promise to resolve
      const resultAction = await dispatch(loginVoter({ voterId, password, rememberMe }));
    
      // Now you can safely access resultAction.payload
      if (loginVoter.fulfilled.match(resultAction)) {
        const { is_first_login } = resultAction.payload;
        localStorage.setItem('voterId', voterId);
        if (is_first_login) {
          navigate(`/voters/update-password/${voterId}`);
        } else {
          console.log("voterId set in localStorage:", voterId);
          navigate('/voter-dashboard');
        }
      } else {
        // Handle rejected or failed action
        const errorMessage = resultAction.payload?.message || 'Invalid username or passwords';
        alert(errorMessage);
      }
    } catch (error) {
      // Handle unexpected errors
      alert('An error occurred during login');
      console.log("Login failed error:", error);
    }
  };

  return (
    <div className="voter-login-container">
      <div className="voter-login-card">
        <h2 className="voter-login-title">E-VOTING SYSTEM</h2>
        <p className="voter-login-subtitle">Sign in to start your session</p>
        <form className="voter-login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Voter ID"
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-options">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
          </div>
          <button type="submit" className="btn-submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default VoterLogin;