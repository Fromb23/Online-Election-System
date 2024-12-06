import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVoters, createVoter, updateVoter, deleteVoter } from '../redux/slices/voterSlices';

const VoterComponent = () => {
	const { selectedVoter, list:voters, loading, error } = useSelector((state) => state.voters);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchVoters());
	}, [dispatch]);

	const handleCreate = () => {
		const newVoter = { voterId: 'V12345', name: 'John Doe' };
		dispatch(createVoter(newVoter));
	};

	const handleUpdate = (voterId) => {
		const updatedVoter = { name: 'Updated Name' }; // Example update
		dispatch(updateVoter({ voterId, updatedVoter }));
	};
	const handleDelete = (voterId) => {
		dispatch(deleteVoter(voterId));
	};

	if (loading) return <p>Loading voters...</p>;

	console.log(selectedVoter);
	console.log(error);

	return (
		<div>
		<h2>Voters Management</h2>
		<p>Voters: <strong>{voters.length}</strong></p>
		{voters.length === 0 ? (
			<p>No voters found.</p>
		) : (
			<ul>
			{voters.map((voter) => (
				<li key={voter.voterId}>
				{voter.name} - {voter.voterId}
				<button onClick={() => handleUpdate(voter.voterId)}>Update</button>
				<button onClick={() => handleDelete(voter.voterId)}>Delete</button>
				</li>
			))}
			</ul>
		)}
		<div>
		<h3>Actions</h3>
		<button onClick={handleCreate}>Create</button>
		</div>
		{selectedVoter && (
			<div>
			<h3>Selected Voter Details</h3>
			<p>Name: {selectedVoter.name}</p>
			<p>ID: {selectedVoter.voterId}</p>
			{/* Add more details as needed */}
			</div>
		)}
		</div>
	);

};

export default VoterComponent;
