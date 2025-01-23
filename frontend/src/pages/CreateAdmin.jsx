import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import { createAdmin } from '../redux/slices/adminSlices';

const CreateAdmin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error, success } = useSelector((state) => state.admin);

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createAdmin({ username, email, password}));
		console.log("Admin created");
};
// useEffect hook to navigate to the admin login page when the admin is successfully created
useEffect(() => {
	if (success) {
	navigate('/admin/login');
}
}, [success, navigate]);

console.log("create admin return value check");
// Create a form to create an admin
return (
	<div>
		<h1>Create Admin</h1>
		{error && <p>{error}</p>}
		<form onSubmit={handleSubmit}>
			<div>
				<label>Username</label>
				<input 
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				required
				/>
			</div>
			<div>
				<label>Email</label>
				<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
				/>
			</div>
			<div>
				<label>Password</label>
				<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
				/>
			</div>
			<button type="submit" disabled={loading}>
				{loading ? 'Creating...' : 'Create Admin'}
			</button>
		</form>
	</div>
);
};

export default CreateAdmin;