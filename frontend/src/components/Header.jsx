import React from 'react';

const Header = () => {
	return (
		<header style={headerStyles}>
		<h1>Election System</h1>
		<nav>
		<a href="#registration" style={linkStyles}>Registration</a>
		<a href="#voting" style={linkStyles}>Voting</a>
		<a href="#results" style={linkStyles}>Election Results</a>
		<a href="#about" style={linkStyles}>About Us</a>
		</nav>
		</header>
	);
};

const headerStyles = {
	background: '#00274D',
	color: '#fff',
	padding: '10px',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
};

const linkStyles = {
	margin: '0 10px',
};

export default Header;
