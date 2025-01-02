import React, { useState, useEffect } from 'react';
import { Circles } from 'react-loader-spinner';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVoter, updateVoter, clearError } from '../redux/actions/voterActions';
// import { fetchCounties, fetchConstituencies, fetchPollingStations } from '../redux/actions/voterActions';
import '../styles/UpdateVoterPage.css';

const UpdateVoterPage = () => {
	const { voterId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { loading, error, list, voter } = useSelector((state) => state.voters);
	console.log(voter);

	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [county, setCounty] = useState('');
	const [constituency, setConstituency] = useState('');
	const [pollingStation, setPollingStation] = useState('');
	const [voted, setVoted] = useState(false);

	// Fetch voter details when the page loads
	useEffect(() => {
		if (voterId) {
			dispatch(fetchVoter(voterId));
		}
	}, [voterId, dispatch]);

	console.log("Inspecting handle submit");
	async function handleSubmit(e) {
		console.log('Form submitted');
		e.preventDefault();

		const updatedVoter = {
			fullName,
			email,
			county,
			constituency,
			pollingStation,
			voted,
		};

		try {
			const resultAction = await dispatch(updateVoter({ voterId, voterData: updatedVoter }));
			if (updateVoter.fulfilled.match(resultAction)) {
				alert('Updated voter successfully');
				navigate('/admin/voters');
			} else {
				alert('Failed to update voter');
			}
		} catch (error) {
			console.log(error);
			alert('Error updating voter');
		}
	};

	useEffect(() => {
		if (error) {
			alert(`Error: ${error}`);
			dispatch(clearError());
		}

	}, [error, dispatch, navigate]);


	console.log(voter);
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
				<label>Email:</label>
				<input type='email' value = {email}
				onChange={(e) => setEmail(e.target.value)}
				required
				/>
			</div>
			<div>
			<label>County:</label>
			<input
			type="text"
			value={county}
			onChange={(e) => setCounty(e.target.value)}
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
			<label>Polling Station:</label>
			<input
			type="text"
			value={pollingStation}
			onChange={(e) => setPollingStation(e.target.value)}
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
			<button type="submit" disabled={loading}>
			{loading ? 'Updating...' : 'Update Voter'}
			</button>
			</div>
			</form>
		) : (
			<div className="spinner">
				<Circles
    height="40"
    width="40"
    color="#333"
    ariaLabel="loading-spinner"
  />
			</div>
		)}
		</div>
	);
};

export default UpdateVoterPage;
