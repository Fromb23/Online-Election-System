import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutVoter } from "../redux/slices/voterLoginSlices";
import "../styles/VoterLoginHeader.css";

const VoterLoginHeader = () => {
  const { voterInfo, fullName } = useSelector((state) => state.voter);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileIcon, setProfileIcon] = useState("profile-icon.png");
  const dropdownRef = useRef(null);

  // Handle opening/closing the dropdown
  const handleProfileClick = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  // Handle closing the dropdown when clicking outside
  const handleCloseDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  // Handle opening/closing the profile modal
  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
    setIsUpdatingPassword(false);
  };

  // Handle updating the profile icon
  const handleIconUpdate = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileIcon(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle updating the password
  const handlePasswordUpdate = () => {
    if (newPassword === confirmPassword) {
      alert("Password updated successfully!");
      setIsUpdatingPassword(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert("New password and confirm password do not match.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logoutVoter());
  };

  // Add event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener("click", handleCloseDropdown);
    return () => {
      document.removeEventListener("click", handleCloseDropdown);
    };
  }, []);

  return (
    <header className="voter-header">
      <p> Welcome </p>
      <h1>Voter Dashboard {fullName}</h1>
      <div className="profile" onClick={handleProfileClick}>
        <img src={profileIcon} alt="Profile" className="profile-icon" />
        {showDropdown && (
          <div ref={dropdownRef} className="profile-dropdown">
            <a href="#" onClick={toggleProfileModal}>
              View Profile
            </a>
            <Link to="/voter-login" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="profile-modal">
          <div className="profile-modal-content">
            {/* Close Button */}
            <button className="close-button" onClick={toggleProfileModal}>
              &times;
            </button>

            {/* Profile Details */}
            <h2>Your Profile</h2>
            <div className="profile-details">
              <p>
                <strong>Username:</strong> {voterInfo?.username}
              </p>
              <p>
                <strong>Constituency:</strong> {voterInfo?.constituency}
              </p>
              <p>
                <strong>County:</strong> {voterInfo?.county}
              </p>
              <p>
                <strong>Polling Station:</strong> {voterInfo?.pollingStation}
              </p>
            </div>

            {/* Update Profile Icon */}
            <div className="update-icon">
              <label htmlFor="icon-upload">
                <img
                  src={profileIcon}
                  alt="Profile Icon"
                  className="profile-icon-preview"
                />
              </label>
              <input
                type="file"
                id="icon-upload"
                accept="image/*"
                onChange={handleIconUpdate}
                style={{ display: "none" }}
              />
              <p>Click the icon to update it.</p>
            </div>

            {/* Update Password Section */}
            <div className="update-password">
              <h3>Update Password</h3>
              {!isUpdatingPassword ? (
                <button onClick={() => setIsUpdatingPassword(true)}>
                  Update Password
                </button>
              ) : (
                <div>
                  <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button onClick={handlePasswordUpdate}>Save Changes</button>
                  <button onClick={() => setIsUpdatingPassword(false)}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default VoterLoginHeader;