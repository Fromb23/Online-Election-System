import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlices';
import { fetchVoters } from '../redux/slices/voterSlices';

const Sidebar = () => {
	const dispatch = useDispatch();

	const sidebarStyles = {
		backgroundColor: '#333',
		color: '#fff',
		padding: '20px',
		height: '100vh',
		display: 'flex',
		flexDirection: 'column',
	};

	const navStyles = {
		listStyle: 'none',
		padding: '0',
	};

	const navItemStyles = {
		margin: '10px 0',
	};

	const linkStyles = {
		textDecoration: 'none',
		color: '#fff',
		fontSize: '18px',
		display: 'block',
		padding: '10px',
		borderRadius: '4px',
		transition: 'background-color 0.3s ease',
	};

	const logoutBtnStyles = {
		marginTop: 'auto',
		padding: '10px 20px',
		backgroundColor: '#d9534f',
		color: '#fff',
		border: 'none',
		cursor: 'pointer',
		borderRadius: '4px',
		transition: 'background-color 0.3s ease',
	};

	const handleLogout = () => {
		dispatch(logout());
	};	

	const handleFetchVoters = () => {
		dispatch(fetchVoters('V12345'));
	};

	return (
		<aside style={sidebarStyles}>
		<nav>
		<ul style={navStyles}>
		<li style={navItemStyles}>
		<Link to="/admin/voters" style={linkStyles} onClick={handleFetchVoters}>
		Voters
		</Link>
		</li>
		<li style={navItemStyles}>
		<Link to="/admin/candidates" style={linkStyles}>
		Candidates
		</Link>
		</li>
		<li style={navItemStyles}>
		<Link to="/admin/vote-categories" style={linkStyles}>
		Vote Categories
		</Link>
		</li>
		<li style={navItemStyles}>
		<Link to="/admin/parties" style={linkStyles}>
		Political Parties
		</Link>
		</li>
		</ul>
		</nav>
		<button style={logoutBtnStyles} onClick={ handleLogout}>Logout</button>

		</aside>
	);
};

export default Sidebar;
