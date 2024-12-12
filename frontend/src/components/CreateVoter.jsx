import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVoter } from '../redux/actions/voterActions';
import { useNavigate } from 'react-router-dom';

const CreateVoter = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error, success } = useSelector((state) => state.voters);

	const [voterId, setVoterId] = useState('');
	const [fullName, setFullName] = useState('');
	const [constituency, setConstituency] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createVoter({ voterId, fullName, constituency }));
	};

useEffect(() => {
	if (success) {
		navigate('/admin/voters');
	}
	}, [success, navigate]);

	return (
		<div><h2>Create New Voter</h2>
		{ error && <p>{error}</p>}
		<form onSubmit={handleSubmit}>
			<div>
				<label>Voter ID</label>
				<input
				type="text"
				value={voterId}
				onChange={(e) => setVoterId(e.target.value)}
				required
				/>
			</div>
			<div>
				<label>Full Name</label>
				<input
				type="text"
				value={fullName}
				onChange={(e) => setFullName(e.target.value)}
				required
				/>
			</div>
			<div>
				<label>Constituency</label>
				<input
				type="text"
				value={constituency}
				onChange={(e) => setConstituency(e.target.value)}
				required
				/>
			</div>
			<button type="submit" disabled={loading}>
				{loading ? 'Creating...' : 'Create Voter'}
			</button>
		</form>
		</div>
	);
};

export default CreateVoter;