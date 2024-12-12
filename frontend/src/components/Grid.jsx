import React from 'react';
import Card from './Card';

const Grid = () => {
	const items = [
		{ title: 'Login to Vote', icon: '📝', link: '/voter-login'},
		{ title: 'How to vote by mail', icon: '📬' },
		{ title: 'Election Results', icon: '📊' },
		{ title: 'What’s on the Ballot', icon: '🗳️' },
		{ title: 'Where to Vote in Person', icon: '📍' },
		{ title: 'Become an Election Worker', icon: '🛠️' },
		{ title: 'Campaign Resources', icon: '📖' },
		{ title: 'News & Press Releases', icon: '📰' },
	];

	return (
		<div style={gridStyles}>
		  {items.map((item, index) => (
			<Card key={index} title={item.title} icon={item.icon} link={item.link} />
		  ))}
		</div>
	  );
};

const gridStyles = {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
	gap: '20px',
	padding: '20px',
};

export default Grid;