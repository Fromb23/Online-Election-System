import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import '../styles/Header.css';

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

  return (
    <header className="header">
      <h1>Voter System</h1>
      <div
        className="profile"
        ref={profileRef}
        onClick={handleProfileClick}
      >
        <img
          src="/path-to-profile-icon.png"
          alt="Profile Icon"
          className="profile-icon"
        />
        <span>Welcome, {userInfo?.username || 'Admin'}</span>

        {/* Profile dropdown */}
        {showProfile && (
          <div className="profile-dropdown" ref={dropdownRef}>
            <div>Edit Profile</div>
            <div>Change to Dark Mode</div>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;