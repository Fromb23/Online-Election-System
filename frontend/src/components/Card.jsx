import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ title, icon, link }) => {
  return (
    <div style={cardStyles}>
      {link ? (
        <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div>{icon}</div>
          <div>{title}</div>
        </Link>
      ) : (
        <>
          <div>{icon}</div>
          <div>{title}</div>
        </>
      )}
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