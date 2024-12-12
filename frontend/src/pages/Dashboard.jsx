import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDashboardStats, fetchVoteTally } from '../redux/actions/dashboardActions';
import { Bar } from 'react-chartjs-2';
import '../styles/dashboard.css';

const Dashboard = () => {
	const dispatch = useDispatch();
	const {
		totalPositions,
		totalCandidates,
		totalVoters,
		totalVotesCast,
		voteTally,
	} = useSelector((state) => state.dashboard);

	useEffect(() => {
		dispatch(fetchDashboardStats());
		dispatch(fetchVoteTally());
	}, [dispatch]);

	const renderCharts = () => {
		return voteTally.map((position, index) => (
		  <div key={index} className="chart-container">
			<h4>{position.title}</h4>
			<Bar
			  data={{
				labels: position.candidates.map((candidate) => candidate.name),
				datasets: [
				  {
					label: 'Votes',
					data: position.candidates.map((candidate) => candidate.votes),
					backgroundColor: 'rgba(75, 192, 192, 0.6)',
					borderColor: 'rgba(75, 192, 192, 1)',
					borderWidth: 1,
				  },
				],
			  }}
			  options={{
				responsive: true,
				plugins: {
				  legend: { display: false },
				},
				scales: {
				  y: { beginAtZero: true },
				},
			  }}
			/>
		  </div>
		));
	  };

	  return (
		<div className="dashboard">
		  <h1>Dashboard</h1>
	
		  <div className="stats-summary">
			<div className="stat-card">
			  <h3>Total Positions</h3>
			  <p>{totalPositions}</p>
			</div>
			<div className="stat-card">
			  <h3>Total Candidates</h3>
			  <p>{totalCandidates}</p>
			</div>
			<div className="stat-card">
			  <h3>Total Voters</h3>
			  <p>{totalVoters}</p>
			</div>
			<div className="stat-card">
			  <h3>Votes Cast</h3>
			  <p>{totalVotesCast}</p>
			</div>
		  </div>
	
		  <div className="tally-section">
			<h2>Vote Tally</h2>
			{voteTally.length ? renderCharts() : <p>Loading data...</p>}
		  </div>
	
		  <button className="export-button">Print/Download PDF</button>
		</div>
	  );
	};

	export default Dashboard;