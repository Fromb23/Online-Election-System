import React, { useState } from 'react';

const AdminHeader = () => {
	const [showProfile, setShowProfile] = useState(false);

	return (
		<header className="admin-header">
		<h1>Admin Page</h1>
		<div className="profile-section" onClick={() => setShowProfile(!showProfile)}>
		<img src="/path-to-profile-icon.png" alt="Profile Icon" className="profile-icon"/>
		{ showProfile && (
			<div className="profile-dropdown">
			<p>Admin Name </p>
			<button>Edit Profile</button>
			</div>
		)}
		</div>
		</header>
	);
};

export default AdminHeader;
