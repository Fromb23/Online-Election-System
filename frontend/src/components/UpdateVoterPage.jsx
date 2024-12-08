import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVoter, updateVoter, clearError } from '../redux/slices/voterSlices';

const UpdateVoterPage = () => {
	const { voterId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const voter = useSelector((state) => state.voters.list.find((v) => v.id === voterId));
	const { isLoading, error } = useSelector((state) => state.voters);

	const [fullName, setFullName] = useState('');
	const [constituency, setConstituency] = useState('');
	const [voted, setVoted] = useState(false);

	// Fetch voter details when the page loads
	useEffect(() => {
		if (!voter) {
			dispatch(fetchVoter(voterId));
		}
	}, [voter, voterId, dispatch]);

	console.log("Inspecting handle submit");
	const handleSubmit = async (e) => {
		console.log('Form submitted');
		e.preventDefault();

		// Prepare the updated voter data
		const updateVoter = {
			fullName,
			constituency,
			voted,
		};

		try {
			// Dispatch the updateVoter action and wait for it to complete
			const resultAction = await dispatch(updateVoter({ voterId, voterData: updateVoter }));

			// Check if the update was successful
			if (updateVoter.fulfilled.match(resultAction)) {
				// Alert the user and redirect after the update is successful
				alert('Updated voter successfully');
				navigate('/admin/voters');  // Redirect back to voters list
			} else {
				// Handle the error case
				alert('Failed to update voter');
			}
		} catch (error) {
			// Handle unexpected errors
			console.error('Error updating voter:', error);
			alert('Error updating voter');
		}
	};

	// Redirect or show success message after successful update
	useEffect(() => {
		if (error) {
			alert(`Error: ${error}`);
			dispatch(clearError());
		}

		if (isLoading && !error) {
			alert('Voter details updated successfully');
			navigate.push('/voters');
		}
	}, [isLoading, error, dispatch, navigate]);


	console.log("Moments before return");
	return (
		<div>
		<h2>Update Voter Details</h2>
		{voter ? (
			<form onSubmit={handleSubmit}>
			<div>
			<label>Voter ID (cannot be changed):</label>
			<input type="text" value={voterId} disabled />
			</div>
			<div>
			<label>Full Name:</label>
			<input
			type="text"
			value={fullName}
			onChange={(e) => setFullName(e.target.value)}
			required
			/>
			</div>
			<div>
			<label>Constituency:</label>
			<input
			type="text"
			value={constituency}
			onChange={(e) => setConstituency(e.target.value)}
			required
			/>
			</div>
			<div>
			<label>Has Voted:</label>
			<select
			value={voted}
			onChange={(e) => setVoted(e.target.value === 'true')}
			>
			<option value={false}>No</option>
			<option value={true}>Yes</option>
			</select>
			</div>
			<div>
			<button type="submit" disabled={isLoading}>
			{isLoading ? 'Updating...' : 'Update Voter'}
			</button>
			</div>
			</form>
		) : (
			<p>Loading voter details...</p>
		)}
		</div>
	);
};

export default UpdateVoterPage;
