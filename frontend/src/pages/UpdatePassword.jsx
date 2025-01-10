import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const UpdatePassword = () => {
  const { voterId } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await api.post('/voters/update-password', {
        voterId,
        newPassword,
      });

      if (response.status === 200) {
        setSuccessMessage('Password updated successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/voter-login');
        }, 2000); // Redirect after 2 seconds
      } else {
        setErrorMessage(response.data.error || 'Error updating password');
      }
    } catch (error) {
      setErrorMessage('Server error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Update Password</h1>
      <form onSubmit={handlePasswordUpdate} style={styles.form}>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          style={styles.input}
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button} disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
      {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
      {successMessage && <div style={styles.successMessage}>{successMessage}</div>}
    </div>
  );
};

export default UpdatePassword;

// Inline styles for simplicity (you can move this to a separate CSS file)
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  errorMessage: {
    color: '#dc3545',
    marginTop: '10px',
    textAlign: 'center',
  },
  successMessage: {
    color: '#28a745',
    marginTop: '10px',
    textAlign: 'center',
  },
};