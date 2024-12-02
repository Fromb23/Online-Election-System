import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const AdminHeader = () => {
	const { userInfo } = useSelector((state) => state.user);
	const [showProfile, setShowProfile] = useState(false);
	const profileRef = useRef(null); // Reference to the profile icon and dropdown
	const dropdownRef = useRef(null); // Reference to the dropdown menu

	// Toggle the profile dropdown on icon click
	const handleProfileClick = () => {
		setShowProfile(!showProfile);
	};

	// Close dropdown if click is outside of the profile or dropdown
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				profileRef.current && 
				!profileRef.current.contains(event.target) && 
				dropdownRef.current && 
				!dropdownRef.current.contains(event.target)
			) {
				setShowProfile(false); // Close dropdown
			}
		};

		// Add event listener for outside clicks
		document.addEventListener('mousedown', handleClickOutside);

		// Cleanup event listener on component unmount
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// Define styles for the admin header and dropdown
	const headerStyles = {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '10px 20px',
		backgroundColor: '#333',
		color: '#fff',
	};

	const profileIconStyles = {
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer',
	};

	const profileDropdownStyles = {
		position: 'absolute',
		top: '50px',
		right: '20px',
		backgroundColor: '#444',
		padding: '10px',
		borderRadius: '5px',
		width: '200px',
		boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
		zIndex: '10',
	};

	const dropdownOptionStyles = {
		padding: '8px 12px',
		cursor: 'pointer',
		color: '#fff',
		textAlign: 'left',
		borderRadius: '4px',
		transition: 'background-color 0.3s',
	};

	const dropdownOptionHoverStyles = {
		backgroundColor: '#555', // Background color on hover
	};

	return (
		<header style={headerStyles}>
		<h1>Admin Page</h1>
		<div
		style={profileIconStyles}
		ref={profileRef}
		onClick={handleProfileClick}
		>
		<img
		src="/path-to-profile-icon.png"
		alt="Profile Icon"
		className="profile-icon"
		style={{ width: '30px', height: '30px', marginRight: '10px' }}
		/>
		<span>Welcome, {userInfo?.username || 'Admin'}</span>

		{/* Profile dropdown */}
		{showProfile && (
			<div ref={dropdownRef} style={profileDropdownStyles}>
			<div
			style={dropdownOptionStyles}
			onMouseEnter={(e) => e.target.style.backgroundColor = dropdownOptionHoverStyles.backgroundColor}
			onMouseLeave={(e) => e.target.style.backgroundColor = ''}
			>
			Edit Profile
			</div>
			<div
			style={dropdownOptionStyles}
			onMouseEnter={(e) => e.target.style.backgroundColor = dropdownOptionHoverStyles.backgroundColor}
			onMouseLeave={(e) => e.target.style.backgroundColor = ''}
			>
			Change to Dark Mode
			</div>
			</div>
		)}
		</div>
		</header>
	);
};

export default AdminHeader;
