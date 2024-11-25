import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
	return (
		<aside className="sidebar">
		<nav>
		<ul>
		<li><Link to="/admin/voters">Voters</Link></li>
		<li><Link to="/admin/candidates">Candidates</Link></li>
		<li><Link to="/admin/vote-categories">Vote Categories</Link></li>
		<li><Link to="/admin/parties">Political Parties</Link></li>
		</ul>
		</nav>

		<button className="logout-btn">Logout</button>
		</aside>
	);
};

export default Sidebar;
