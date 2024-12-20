import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutVoter } from "../redux/slices/voterLoginSlices";
import "../styles/VoterLoginHeader.css";

const VoterLoginHeader = () => {
  const { voterInfo } = useSelector((state) => state.voter);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown menu
  const navigate = useNavigate();

  const handleProfileClick = (e) => {
    // Prevent click event from closing dropdown when clicking inside
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleCloseDropdown = (e) => {
    // Close dropdown if clicked outside
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the dropdown
    document.addEventListener("click", handleCloseDropdown);
    return () => {
      document.removeEventListener("click", handleCloseDropdown);
    };
  }, []);
  
  const handleLogout = () => {
    dispatch(logoutVoter());
  }

  return (
    <header className="voter-header">
      <p> Welcome { voterInfo?.fullName }</p>
      <h1>Voter Dashboard</h1>
      <div className="profile" onClick={handleProfileClick}>
        <img src="profile-icon.png" alt="Profile" className="profile-icon" />
        {showDropdown && (
          <div ref={dropdownRef} className="profile-dropdown">
            <a href="/profile">View Profile</a>
            <Link to="/voter-login" onClick={handleLogout}>Logout</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default VoterLoginHeader;