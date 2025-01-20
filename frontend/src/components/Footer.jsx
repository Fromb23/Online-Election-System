import React from 'react';

const Footer = () => {
	return (
		<footer style={footerStyles}>
		<p>&copy; 2024 Election System. All rights reserved </p>
		</footer>
	);
};

const footerStyles = {
	background: '#00274D',
	display: 'flex',
	flex: 1,
	color: '#fff',
	padding: '10px',
	textAlign: 'center',
};

export default Footer;
