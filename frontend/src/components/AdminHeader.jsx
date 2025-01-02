import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import '../styles/Header.css';

const AdminHeader = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

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