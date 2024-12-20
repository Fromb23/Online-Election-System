import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const UpdatePassword = () => {
	const { voterId } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handlePasswordUpdate = async (e) => {
	console.log("Sending voterId above:", voterId);
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

	console.log("Sending voterId:", voterId);
    try {
      const response = await api.post('/voters/update-password', {
        voterId,
        newPassword,
      });

      const data = await response.data;

      if (response.status === 200) {
        // If successful, redirect to the dashboard
        navigate('/voterDashboard');
      } else {
        // Handle any error returned by the API
        setErrorMessage(data.error || 'Error updating password');
      }
    } catch (error) {
      setErrorMessage('Server error');
    }
  };

  return (
    <div>
      <h1>Update Password</h1>
      <form onSubmit={handlePasswordUpdate}>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Update Password</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default UpdatePassword;