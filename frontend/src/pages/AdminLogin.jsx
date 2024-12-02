import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminLogin = ({ setAdminName }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		// Simulating a login API request
		if (email === 'email@gmail.com' && password === 'password') {
			setAdminName('Admin User');
			navigate('/admin');
		} else {
			setError('Invalid credentials');
		}
	};

	const containerStyles = {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
		backgroundColor: '#f8f9fa',
	};

	const contentStyles = {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '20px',
	};

	const formStyles = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '30px',
		backgroundColor: '#fff',
		borderRadius: '10px',
		boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
		maxWidth: '400px',
		width: '100%',
	};

	const inputStyles = {
		margin: '10px 0',
		padding: '12px',
		width: '100%',
		borderRadius: '5px',
		border: '1px solid #ccc',
		fontSize: '16px',
	};

	const buttonStyles = {
		marginTop: '20px',
		padding: '12px 20px',
		backgroundColor: '#007bff',
		color: '#fff',
		border: 'none',
		borderRadius: '5px',
		cursor: 'pointer',
		fontSize: '16px',
		fontWeight: 'bold',
		width: '100%',
	};

	const errorStyles = {
		color: 'red',
		fontSize: '14px',
		margin: '10px 0',
	};

	const titleStyles = {
		fontSize: '24px',
		fontWeight: 'bold',
		marginBottom: '20px',
		color: '#333',
	};

	return (
		<div style={containerStyles}>
		<Header />
		<div style={contentStyles}>
		<div style={formStyles}>
		<h2 style={titleStyles}>Admin Login</h2>
		{error && <p style={errorStyles}>{error}</p>}
		<form onSubmit={handleSubmit} style={{ width: '100%' }}>
		<input
		style={inputStyles}
		type="email"
		placeholder="Email"
		value={email}
		onChange={(e) => setEmail(e.target.value)}
		/>
		<input
		style={inputStyles}
		type="password"
		placeholder="Password"
		value={password}
		onChange={(e) => setPassword(e.target.value)}
		/>
		<button style={buttonStyles} type="submit">
		Login
		</button>
		</form>
		</div>
		</div>
		<Footer />
		</div>
	);
};

export default AdminLogin;
