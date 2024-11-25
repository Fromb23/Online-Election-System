import React from 'react';
import { useLocation } from 'react-router-dom';


const Breadcrumb = () => {
	const location = useLocation();
	const path = location.pathname.split('/').filter(Boolean);

	return (
		<div className="breadcrumb">
		{path.map((segment, index) => (
			<span key={index}>
				{segment.charAt(0).toUpperCase() + segment.slice(1)}
			{index < path.length - 1 && ' > '}
			</span>
		))}
		</div>
	);
};

export default Breadcrumb;
