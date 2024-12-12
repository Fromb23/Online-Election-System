import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginVoter } from '../redux/actions/voterLoginActions';
import '../styles/VoterLogin.css';

const VoterLogin = () => {
  const dispatch = useDispatch();
  const [voterId, setVoterId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the action with voter credentials
    dispatch(loginVoter({ voterId, password, rememberMe }));
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
            <span className="icon-user" />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="icon-lock" />
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
        <a href="/forgot-password" className="forgot-password-link">
          I forgot my password
        </a>
      </div>
    </div>
  );
};

export default VoterLogin;