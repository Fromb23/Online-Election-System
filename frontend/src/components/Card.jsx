import React from 'react';

const Card = ({ title, icon }) => {
	return (
		<div style={cardStyles}>
		<div>{icon}</div>
		<div>{title}</div>
		</div>
	);
};

const cardStyles = {
	border: '1px solid #ccc',
	borderRadius: '5px',
	padding: '20px',
	textAlign: 'center',
	cursor: 'pointer',
	boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
};

export default Card;
