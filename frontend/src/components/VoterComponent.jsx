import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVoters, createVoter, updateVoter, deleteVoter } from '../redux/actions/voterActions';

const VoterComponent = () => {
	const { selectedVoter, list:voters, loading, error } = useSelector((state) => state.voters);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchVoters());
	}, [dispatch]);

	const handleCreate = () => {
		navigate('/voters/create');
	};

	// const handleUpdate = (voterId) => {
	// 	const updatedVoter = { name: 'Updated Name' };
	// 	dispatch(updateVoter({ voterId, updatedVoter }));
	// };
	const handleDelete = (voterId) => {
		dispatch(deleteVoter(voterId));
	};

	if (loading) return <p>Loading voters...</p>;

	console.log(selectedVoter);
	console.log(error);


	return (
		<div>
		<h2>Voters Management</h2>
		<p>Registered Voters: <strong>{voters.length}</strong></p>

		<div>
		<button
		onClick={handleCreate}
		style={{
			padding: '10px 15px',
				backgroundColor: '#008CBA',
				color: 'white',
				border: 'none',
				borderRadius: '5px',
				cursor: 'pointer',
				float: 'right',
				marginBottom: '10px'
		}}
		>
		Create New Voter
		</button>
		</div>

		{voters.length === 0 ? (
			<p>No voters found.</p>
		
		) : (
			<table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
			<thead>
			<tr style={{ backgroundColor: '#f4f4f4' }}>
			<th style={{ padding: '8px', border: '1px solid #ddd' }}>Name</th>
			<th style={{ padding: '8px', border: '1px solid #ddd' }}>Voter ID</th>
			<th style={{ padding: '8px', border: '1px solid #ddd' }}>Vote Status</th>
			<th style={{ padding: '8px', border: '1px solid #ddd' }}>Update</th>
			<th style={{ padding: '8px', border: '1px solid #ddd' }}>Delete</th>
			</tr>
			</thead>
			<tbody>
			{voters.map((voter) => (
				<tr key={voter.voterId}>
				<td style={{ padding: '8px', border: '1px solid #ddd' }}>{voter.fullName}</td>
				<td style={{ padding: '8px', border: '1px solid #ddd' }}>{voter.voterId}</td>
				<td style={{ padding: '8px', border: '1px solid #ddd' }}>{voter.voted? 'Yes' : 'No'}</td>
				<td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
				<Link
				to={`/admin/voters/update/${voter.voterId}`}
				style={{
					color: '#4CAF50',
						textDecoration: 'underline',
						padding: '6px 12px',
				}}
				>
				Update
				</Link>
				</td>
				<td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
				<a
				href="#"
				onClick={() => handleDelete(voter.voterId)}
				style={{
					color: '#F44336',
						textDecoration: 'underline',
						padding: '6px 12px',
				}}
				>
				Delete
				</a>
				</td>
				</tr>
			))}
			</tbody>
			</table>
		)}

		{selectedVoter && (
			<div style={{ marginTop: '20px' }}>
			<h3>Selected Voter Details</h3>
			<p><strong>Name:</strong> {selectedVoter.voter}</p>
			<p><strong>ID:</strong> {selectedVoter.voterId}</p>
			</div>
		)}
		</div>
	);

};

export default VoterComponent;
